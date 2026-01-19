import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'admin' | 'coach' | 'client';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    role: null,
    isLoading: true,
  });

  const fetchUserRole = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching role:', error);
      return null;
    }

    return data?.role as AppRole | null;
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        let role: AppRole | null = null;

        if (user) {
          // Use setTimeout to avoid potential deadlock with Supabase
          setTimeout(async () => {
            role = await fetchUserRole(user.id);
            setAuthState({
              user,
              session,
              role,
              isLoading: false,
            });
          }, 0);
        } else {
          setAuthState({
            user: null,
            session: null,
            role: null,
            isLoading: false,
          });
        }
      }
    );

    // THEN get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      let role: AppRole | null = null;

      if (user) {
        role = await fetchUserRole(user.id);
      }

      setAuthState({
        user,
        session,
        role,
        isLoading: false,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserRole]);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
        },
      },
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  };

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  };

  const assignRole = async (role: AppRole, targetUserId?: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return { error: new Error('Not authenticated') };
    }

    const response = await supabase.functions.invoke('assign-role', {
      body: { role, target_user_id: targetUserId },
    });

    if (response.error) {
      return { error: response.error };
    }

    // Refresh the role in state
    if (!targetUserId || targetUserId === session.user.id) {
      const newRole = await fetchUserRole(session.user.id);
      setAuthState(prev => ({ ...prev, role: newRole }));
    }

    return { error: null };
  };

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    assignRole,
  };
}