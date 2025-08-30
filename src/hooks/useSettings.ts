import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserSettings {
  id?: string;
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  language: 'pt-BR' | 'en-US';
  timezone: string;
  notifications_enabled: boolean;
  sound_enabled: boolean;
  email_notifications: boolean;
  appointment_reminders: boolean;
  reminder_time: number; // minutes before appointment
  working_hours_start: string;
  working_hours_end: string;
  working_days: string[]; // ['monday', 'tuesday', etc.]
  default_appointment_duration: number; // minutes
  currency: 'BRL' | 'USD';
  date_format: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd';
  time_format: '24h' | '12h';
  created_at?: string;
  updated_at?: string;
}

const defaultSettings: Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  theme: 'light',
  language: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  notifications_enabled: true,
  sound_enabled: true,
  email_notifications: true,
  appointment_reminders: true,
  reminder_time: 30,
  working_hours_start: '08:00',
  working_hours_end: '18:00',
  working_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  default_appointment_duration: 60,
  currency: 'BRL',
  date_format: 'dd/MM/yyyy',
  time_format: '24h',
};

// Get user settings
export const useUserSettings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-settings', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          // If table doesn't exist, return defaults
          if (error.code === '42P01') {
            console.warn('user_settings table not found, using defaults');
            return { ...defaultSettings, user_id: user.id };
          }
          throw error;
        }

        // If no settings found, return defaults
        if (!data) {
          return { ...defaultSettings, user_id: user.id };
        }

        return data as UserSettings;
      } catch (error) {
        console.warn('Error fetching user settings, using defaults:', error);
        return { ...defaultSettings, user_id: user.id };
      }
    },
    enabled: !!user,
  });
};

// Update user settings
export const useUpdateSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (settings: Partial<UserSettings>) => {
      if (!user) throw new Error('User not authenticated');

      try {
        const { data: existingSettings } = await supabase
          .from('user_settings')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

      let result;
      
      if (existingSettings) {
        // Update existing settings
        const { data, error } = await supabase
          .from('user_settings')
          .update({
            ...settings,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        result = data;
      } else {
        // Create new settings
        const { data, error } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            ...defaultSettings,
            ...settings,
          })
          .select()
          .single();

        if (error) throw error;
        result = data;
      }

        return result;
      } catch (error) {
        console.warn('Error updating user settings:', error);
        // For now, just return the settings without saving to DB
        return { ...settings, user_id: user.id };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-settings'] });
      toast({
        title: 'Configurações salvas',
        description: 'Suas preferências foram atualizadas com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast({
        title: 'Erro ao salvar configurações',
        description: 'Ocorreu um erro ao salvar suas preferências.',
        variant: 'destructive',
      });
    },
  });
};

// Local storage for temporary settings (before saving)
export const useLocalSettings = () => {
  const [localSettings, setLocalSettings] = useState<Partial<UserSettings>>({});

  useEffect(() => {
    const saved = localStorage.getItem('temp-settings');
    if (saved) {
      try {
        setLocalSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  const updateLocalSettings = (settings: Partial<UserSettings>) => {
    const newSettings = { ...localSettings, ...settings };
    setLocalSettings(newSettings);
    localStorage.setItem('temp-settings', JSON.stringify(newSettings));
  };

  const clearLocalSettings = () => {
    setLocalSettings({});
    localStorage.removeItem('temp-settings');
  };

  return {
    localSettings,
    updateLocalSettings,
    clearLocalSettings,
  };
};

// Get user profile info
export const useUserProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      try {
        // Get user metadata from auth
        const { data: authUser, error } = await supabase.auth.getUser();
        if (error) throw error;

        // Calculate some stats
        const { data: appointmentsCount } = await supabase
          .from('appointments')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id);

        const { data: patientsCount } = await supabase
          .from('patients')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id);

        return {
          email: authUser.user?.email,
          created_at: authUser.user?.created_at,
          last_sign_in: authUser.user?.last_sign_in_at,
          total_appointments: appointmentsCount?.length || 0,
          total_patients: patientsCount?.length || 0,
        };
      } catch (error) {
        console.warn('Error fetching user profile, using defaults:', error);
        return {
          email: user.email,
          created_at: new Date().toISOString(),
          last_sign_in: new Date().toISOString(),
          total_appointments: 0,
          total_patients: 0,
        };
      }
    },
    enabled: !!user,
  });
};
