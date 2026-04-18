-- 1. Profiles Update
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referrer_id UUID REFERENCES auth.users(id);

-- 2. Referrals Table (Real tracking)
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'signed_up', -- 'signed_up', 'paid'
  sale_amount DECIMAL(10,2),
  commission_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Referrers can view their own referrals"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_id);

CREATE POLICY "Admins can view all referrals"
  ON public.referrals FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Running Goals Table
CREATE TABLE IF NOT EXISTS public.running_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  weekly_distance_goal DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- RLS for running_goals
ALTER TABLE public.running_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own running goals"
  ON public.running_goals FOR ALL
  USING (auth.uid() = user_id);

-- 4. Update handle_new_user Trigger
-- We need to check if the metadata has a referrer_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, referrer_id, is_approved)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    (NEW.raw_user_meta_data->>'referrer_id')::UUID,
    true
  );

  -- If there's a referrer, create a referral record
  IF (NEW.raw_user_meta_data->>'referrer_id') IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_user_id, status)
    VALUES ((NEW.raw_user_meta_data->>'referrer_id')::UUID, NEW.id, 'signed_up');
  END IF;

  RETURN NEW;
END;
$$;

-- 5. Approve all existing users (One-time)
UPDATE public.profiles SET is_approved = true WHERE is_approved = false OR is_approved IS NULL;
