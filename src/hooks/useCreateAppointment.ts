
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CreateAppointmentData {
  patient_id: string;
  date: string;
  time: string;
  type: 'particular' | 'plano';
  status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
  value?: number;
  notes?: string;
}

export const useCreateAppointment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAppointmentData) => {
      if (!user) throw new Error('User not authenticated');

      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert({
          ...data,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return appointment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: 'Consulta criada com sucesso!',
        description: 'A consulta foi agendada.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar consulta',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
