
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CreatePatientData {
  name: string;
  email?: string;
  phone?: string;
  birth_date?: string;
  address?: string;
  notes?: string;
}

export const useCreatePatient = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePatientData) => {
      if (!user) throw new Error('User not authenticated');

      const { data: patient, error } = await supabase
        .from('patients')
        .insert({
          ...data,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return patient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({
        title: 'Paciente cadastrado com sucesso!',
        description: 'O paciente foi adicionado ao sistema.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao cadastrar paciente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
