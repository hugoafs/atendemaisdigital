
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useUpdateAppointmentStatus = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      appointmentId, 
      status 
    }: { 
      appointmentId: string; 
      status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado' 
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      
      const statusMessages = {
        'agendado': 'Consulta reagendada',
        'em-andamento': 'Consulta iniciada',
        'concluido': 'Consulta finalizada',
        'cancelado': 'Consulta cancelada'
      };

      toast({
        title: statusMessages[variables.status],
        description: 'Status da consulta atualizado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar consulta',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
