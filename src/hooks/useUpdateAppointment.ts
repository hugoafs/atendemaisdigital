import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface UpdateAppointmentData {
  id: string;
  date?: string;
  time?: string;
  type?: 'particular' | 'plano';
  status?: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
  value?: number;
  notes?: string;
}

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentData: UpdateAppointmentData) => {
      console.log('🔄 Atualizando consulta:', appointmentData);

      const { id, ...updateData } = appointmentData;
      
      // Remover campos undefined para não sobrescrever com valores vazios
      const cleanData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      );

      const { data, error } = await supabase
        .from('appointments')
        .update(cleanData)
        .eq('id', id)
        .select(`
          id,
          date,
          time,
          status,
          value,
          type,
          notes,
          patient:patients(name)
        `);

      if (error) {
        console.error('❌ Erro ao atualizar consulta:', error);
        throw new Error(`Erro ao atualizar consulta: ${error.message}`);
      }

      console.log('✅ Consulta atualizada com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      // Invalidar e recarregar todas as queries relacionadas a consultas
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      console.log('🔄 Consultas recarregadas após atualização');
    },
    onError: (error) => {
      console.error('❌ Erro na mutação de atualização:', error);
    },
  });
};
