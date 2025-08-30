import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

import { Database } from '@/integrations/supabase/types';

export type SessionDuration = Database['public']['Tables']['session_durations']['Row'];
export type Professional = Database['public']['Tables']['professionals']['Row'];

export const useProfessionalData = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['professional-data', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('professionals')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    },
    enabled: !!user,
  });
};

export const useUpdateProfessional = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (professionalData: Partial<Professional>) => {
      if (!user) throw new Error('User not authenticated');

      const { data: existingProfessional } = await supabase
        .from('professionals')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      let result;
      
      if (existingProfessional) {
        // Update existing professional
        const { data, error } = await supabase
          .from('professionals')
          .update({
            ...professionalData,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        result = data;
      } else {
        // Create new professional record
        const { data, error } = await supabase
          .from('professionals')
          .insert({
            ...professionalData,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) throw error;
        result = data;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professional-data'] });
      toast({
        title: 'Dados atualizados',
        description: 'Suas informações profissionais foram salvas com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error updating professional data:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar suas informações. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
};

// Session Durations hooks
export const useSessionDurations = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['session-durations', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('session_durations')
        .select('*')
        .eq('user_id', user.id)
        .order('duration_minutes', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUpdateSessionDuration = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ duration_minutes, active = true }: { duration_minutes: number; active?: boolean }) => {
      if (!user) throw new Error('User not authenticated');

      // Primeiro, desativar todas as durações existentes
      await supabase
        .from('session_durations')
        .update({ active: false })
        .eq('user_id', user.id);

      // Verificar se já existe essa duração
      const { data: existing } = await supabase
        .from('session_durations')
        .select('id')
        .eq('user_id', user.id)
        .eq('duration_minutes', duration_minutes)
        .maybeSingle();

      if (existing) {
        // Ativar a duração existente
        const { data, error } = await supabase
          .from('session_durations')
          .update({ active: true })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Criar nova duração
        const { data, error } = await supabase
          .from('session_durations')
          .insert({
            user_id: user.id,
            duration_minutes,
            active: true
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session-durations'] });
      toast({
        title: 'Duração atualizada',
        description: 'A duração padrão das consultas foi atualizada.',
      });
    },
    onError: (error) => {
      console.error('Error updating session duration:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível atualizar a duração. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
};
