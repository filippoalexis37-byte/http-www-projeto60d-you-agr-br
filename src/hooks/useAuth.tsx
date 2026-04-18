import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isApproved: boolean;
  isSubscribed: boolean;
  subscriptionEnd: string | null;
  trialEndDate: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  isApproved: false,
  isSubscribed: false,
  subscriptionEnd: null,
  trialEndDate: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [trialEndDate, setTrialEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = async (userId: string) => {
    const [rolesRes, profileRes] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("profiles").select("is_approved, updated_at").eq("user_id", userId).single(),
    ]);

    const userIsAdmin = rolesRes.data?.some((r: any) => r.role === "admin") ?? false;
    setIsAdmin(userIsAdmin);
    setIsApproved(profileRes.data?.is_approved ?? false);

    if (profileRes.data?.is_approved && profileRes.data?.updated_at) {
      const updated = new Date(profileRes.data.updated_at);
      updated.setDate(updated.getDate() + 7);
      setTrialEndDate(updated.toISOString());
    } else {
      setTrialEndDate(null);
    }

    // Admins get automatic premium access
    if (userIsAdmin) {
      setIsSubscribed(true);
      setSubscriptionEnd(null);
    } else {
      // Check subscription for regular users
      try {
        const { data: subData } = await supabase.functions.invoke("check-subscription");
        setIsSubscribed(subData?.subscribed ?? false);
        setSubscriptionEnd(subData?.subscription_end ?? null);
      } catch {
        setIsSubscribed(false);
      }
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => checkUserStatus(session.user.id), 0);
        } else {
          setIsAdmin(false);
          setIsApproved(false);
          setIsSubscribed(false);
          setSubscriptionEnd(null);
          setTrialEndDate(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserStatus(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isApproved, isSubscribed, subscriptionEnd, trialEndDate, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
