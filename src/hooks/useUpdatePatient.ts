import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UpdatePatientData {
  id: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  birth_date?: string | null;
  notes?: string | null;
}

export const useUpdatePatient = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UpdatePatientData) => {
      if (!user) throw new Error('User not authenticated');

      const { id, ...updateData } = data;
      
      // Remove undefined values
      const cleanUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      );

      const { data: updatedPatient, error } = await supabase
        .from('patients')
        .update({
          ...cleanUpdateData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return updatedPatient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({
        title: 'Paciente atualizado',
        description: 'As informações do paciente foram atualizadas com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error updating patient:', error);
      toast({
        title: 'Erro ao atualizar paciente',
        description: 'Ocorreu um erro ao atualizar as informações do paciente.',
        variant: 'destructive',
      });
    },
  });
};
