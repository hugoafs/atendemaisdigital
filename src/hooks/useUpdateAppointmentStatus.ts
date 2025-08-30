
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UpdateAppointmentStatusParams {
  appointmentId: string;
  newStatus: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
}

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ appointmentId, newStatus }: UpdateAppointmentStatusParams) => {
      console.log('🔄 Atualizando status da consulta:', { appointmentId, newStatus });

      const { data, error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId)
        .select();

      if (error) {
        console.error('❌ Erro ao atualizar status:', error);
        throw new Error(`Erro ao atualizar status: ${error.message}`);
      }

      console.log('✅ Status atualizado com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      // Invalidar e recarregar as consultas
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      console.log('🔄 Consultas recarregadas após atualização de status');
    },
    onError: (error) => {
      console.error('❌ Erro na mutação de status:', error);
    },
  });
};
