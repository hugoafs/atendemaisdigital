
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Appointment {
  id: string;
  patient_id: string;
  date: string;
  time: string;
  type: 'particular' | 'plano';
  status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
  value?: number;
  notes?: string;
  patient: {
    name: string;
  };
}

export const useAppointments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['appointments', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients(name)
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (error) throw error;
      return (data || []) as unknown as Appointment[];
    },
    enabled: !!user,
  });
};

export const useTodayAppointments = () => {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  return useQuery({
    queryKey: ['appointments', 'today', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients(name)
        `)
        .eq('user_id', user.id)
        .eq('date', today)
        .order('time', { ascending: true });

      if (error) throw error;
      return (data || []) as unknown as Appointment[];
    },
    enabled: !!user,
  });
};
