
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Security definer function for approval check
CREATE OR REPLACE FUNCTION public.is_approved(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id AND is_approved = true
  )
$$;

-- Completed workouts table
CREATE TABLE public.completed_workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workout_name TEXT NOT NULL,
  workout_level TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.completed_workouts ENABLE ROW LEVEL SECURITY;

-- Medals table
CREATE TABLE public.medals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medal_type TEXT NOT NULL,
  medal_name TEXT NOT NULL,
  description TEXT,
  threshold INTEGER NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, medal_type)
);

ALTER TABLE public.medals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Auto-create profile on signup"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS for user_roles
CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS for completed_workouts
CREATE POLICY "Users can view own workouts"
  ON public.completed_workouts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Approved users can insert workouts"
  ON public.completed_workouts FOR INSERT
  WITH CHECK (auth.uid() = user_id AND public.is_approved(auth.uid()));

CREATE POLICY "Admins can view all workouts"
  ON public.completed_workouts FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS for medals
CREATE POLICY "Users can view own medals"
  ON public.medals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert medals"
  ON public.medals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all medals"
  ON public.medals FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check and award medals
CREATE OR REPLACE FUNCTION public.check_and_award_medals()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  workout_count INTEGER;
  medal_thresholds INTEGER[] := ARRAY[10, 50, 100];
  medal_names TEXT[] := ARRAY['Bronze 🥉', 'Prata 🥈', 'Ouro 🥇'];
  medal_descs TEXT[] := ARRAY['10 treinos concluídos!', '50 treinos concluídos!', '100 treinos concluídos!'];
  i INTEGER;
BEGIN
  SELECT COUNT(*) INTO workout_count
  FROM public.completed_workouts
  WHERE user_id = NEW.user_id;

  FOR i IN 1..3 LOOP
    IF workout_count >= medal_thresholds[i] THEN
      INSERT INTO public.medals (user_id, medal_type, medal_name, description, threshold)
      VALUES (NEW.user_id, 'workouts_' || medal_thresholds[i], medal_names[i], medal_descs[i], medal_thresholds[i])
      ON CONFLICT (user_id, medal_type) DO NOTHING;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

CREATE TRIGGER check_medals_after_workout
  AFTER INSERT ON public.completed_workouts
  FOR EACH ROW EXECUTE FUNCTION public.check_and_award_medals();
