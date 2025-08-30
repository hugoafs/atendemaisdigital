import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

export type Plan = Database['public']['Tables']['plans']['Row'];
export type CreatePlanData = Database['public']['Tables']['plans']['Insert'];
export type UpdatePlanData = Database['public']['Tables']['plans']['Update'];

// Buscar planos do usuário
export const usePlans = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['plans', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;
      return data as Plan[];
    },
    enabled: !!user,
  });
};

// Criar novo plano
export const useCreatePlan = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (planData: Omit<CreatePlanData, 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('plans')
        .insert({
          name: planData.name,
          value: planData.value,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: 'Plano criado!',
        description: 'O plano de saúde foi criado com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error creating plan:', error);
      toast({
        title: 'Erro ao criar plano',
        description: 'Não foi possível criar o plano. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
};

// Atualizar plano
export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (planData: { id: string; name: string; value: number }) => {
      const { id, name, value } = planData;
      
      const { data, error } = await supabase
        .from('plans')
        .update({ name, value })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: 'Plano atualizado!',
        description: 'O plano de saúde foi atualizado com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error updating plan:', error);
      toast({
        title: 'Erro ao atualizar plano',
        description: 'Não foi possível atualizar o plano. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
};

// Deletar plano
export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (planId: string) => {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: 'Plano removido!',
        description: 'O plano de saúde foi removido com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error deleting plan:', error);
      toast({
        title: 'Erro ao remover plano',
        description: 'Não foi possível remover o plano. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
};
