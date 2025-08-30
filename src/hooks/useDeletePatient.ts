import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useDeletePatient = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (patientId: string) => {
      if (!user) throw new Error('User not authenticated');

      // First check if patient has any appointments
      const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('id')
        .eq('patient_id', patientId)
        .eq('user_id', user.id);

      if (appointmentsError) throw appointmentsError;

      if (appointments && appointments.length > 0) {
        throw new Error('Não é possível excluir paciente com consultas agendadas. Exclua as consultas primeiro.');
      }

      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', patientId)
        .eq('user_id', user.id);

      if (error) throw error;
      return patientId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: 'Paciente excluído',
        description: 'O paciente foi excluído com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error deleting patient:', error);
      toast({
        title: 'Erro ao excluir paciente',
        description: error.message || 'Ocorreu um erro ao excluir o paciente.',
        variant: 'destructive',
      });
    },
  });
};
