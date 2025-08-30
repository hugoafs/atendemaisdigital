import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  addMinutes, 
  subMinutes, 
  isAfter, 
  isBefore, 
  format,
  parseISO,
  addDays,
  startOfDay,
  endOfDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { parseAppointmentDate, getCurrentDateBR, formatTimeBR, formatDateBR } from '@/utils/dateUtils';

export interface Notification {
  id: string;
  type: 'appointment_reminder' | 'appointment_soon' | 'missed_appointment' | 'new_appointment' | 'system';
  title: string;
  message: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  appointment_id?: string;
  patient_name?: string;
  appointment_time?: string;
  appointment_date?: string;
}

// Generate notifications based on appointments
export const useNotifications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const now = getCurrentDateBR();
      const today = startOfDay(now);
      const tomorrow = addDays(today, 1);
      const endOfTomorrow = endOfDay(tomorrow);

      // Get appointments for today and tomorrow
      const { data: appointments, error } = await supabase
        .from('appointments')
        .select(`
          id,
          date,
          time,
          status,
          patients!inner(name)
        `)
        .eq('user_id', user.id)
        .gte('date', today.toISOString().split('T')[0])
        .lte('date', endOfTomorrow.toISOString().split('T')[0])
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (error) throw error;

      const notifications: Notification[] = [];

      // Process each appointment to generate notifications
      (appointments || []).forEach((appointment) => {
        try {
          const appointmentDate = parseAppointmentDate(appointment.date);
          const [hours, minutes] = appointment.time.split(':').map(Number);
          const appointmentDateTime = new Date(appointmentDate);
          appointmentDateTime.setHours(hours, minutes, 0, 0);

          const patientName = (appointment.patients as any)?.name || 'Paciente';
          const timeDiff = appointmentDateTime.getTime() - now.getTime();
          const minutesUntil = Math.floor(timeDiff / (1000 * 60));

          // Appointment in next 30 minutes
          if (minutesUntil > 0 && minutesUntil <= 30 && appointment.status === 'agendado') {
            notifications.push({
              id: `soon_${appointment.id}`,
              type: 'appointment_soon',
              title: 'Consulta em Breve',
              message: `${patientName} tem consulta em ${minutesUntil} minutos (${formatTimeBR(appointment.time)})`,
              read: false,
              priority: 'high',
              created_at: now.toISOString(),
              appointment_id: appointment.id,
              patient_name: patientName,
              appointment_time: appointment.time,
              appointment_date: appointment.date
            });
          }

          // Appointment in next 2 hours (reminder)
          if (minutesUntil > 30 && minutesUntil <= 120 && appointment.status === 'agendado') {
            notifications.push({
              id: `reminder_${appointment.id}`,
              type: 'appointment_reminder',
              title: 'Lembrete de Consulta',
              message: `${patientName} tem consulta hoje às ${formatTimeBR(appointment.time)}`,
              read: false,
              priority: 'medium',
              created_at: now.toISOString(),
              appointment_id: appointment.id,
              patient_name: patientName,
              appointment_time: appointment.time,
              appointment_date: appointment.date
            });
          }

          // Missed appointments (15+ minutes late)
          if (minutesUntil < -15 && appointment.status === 'agendado') {
            notifications.push({
              id: `missed_${appointment.id}`,
              type: 'missed_appointment',
              title: 'Consulta Perdida',
              message: `${patientName} não compareceu à consulta das ${formatTimeBR(appointment.time)}`,
              read: false,
              priority: 'high',
              created_at: now.toISOString(),
              appointment_id: appointment.id,
              patient_name: patientName,
              appointment_time: appointment.time,
              appointment_date: appointment.date
            });
          }

          // Tomorrow's appointments
          if (appointmentDateTime > endOfDay(now) && appointmentDateTime <= endOfTomorrow && appointment.status === 'agendado') {
            notifications.push({
              id: `tomorrow_${appointment.id}`,
              type: 'new_appointment',
              title: 'Consulta Amanhã',
              message: `${patientName} tem consulta amanhã às ${formatTimeBR(appointment.time)}`,
              read: false,
              priority: 'low',
              created_at: now.toISOString(),
              appointment_id: appointment.id,
              patient_name: patientName,
              appointment_time: appointment.time,
              appointment_date: appointment.date
            });
          }
        } catch (error) {
          console.error('Error processing appointment for notifications:', appointment, error);
        }
      });

      // Add system notifications
      const totalAppointments = appointments?.length || 0;
      if (totalAppointments === 0) {
        notifications.push({
          id: 'no_appointments_today',
          type: 'system',
          title: 'Agenda Livre',
          message: 'Você não tem consultas agendadas para hoje',
          read: false,
          priority: 'low',
          created_at: now.toISOString()
        });
      }

      // Sort by priority and time
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return notifications.sort((a, b) => {
        if (a.priority !== b.priority) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    },
    enabled: !!user,
    refetchInterval: 60000, // Refresh every minute
  });
};

// Mark notification as read
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      // For now, we'll just update the local cache since notifications are generated
      // In a real app, you'd store notifications in the database
      return notificationId;
    },
    onSuccess: (notificationId) => {
      // Update the notifications cache to mark as read
      queryClient.setQueryData(['notifications'], (oldData: Notification[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        );
      });
    },
    onError: (error) => {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível marcar a notificação como lida.',
        variant: 'destructive',
      });
    },
  });
};

// Mark all notifications as read
export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      // For now, we'll just update the local cache
      return true;
    },
    onSuccess: () => {
      // Update the notifications cache to mark all as read
      queryClient.setQueryData(['notifications'], (oldData: Notification[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(notification => ({ ...notification, read: true }));
      });
      
      toast({
        title: 'Notificações marcadas como lidas',
        description: 'Todas as notificações foram marcadas como lidas.',
      });
    },
    onError: (error) => {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível marcar as notificações como lidas.',
        variant: 'destructive',
      });
    },
  });
};

// Get notification stats
export const useNotificationStats = () => {
  const { data: notifications } = useNotifications();

  const stats = {
    total: notifications?.length || 0,
    unread: notifications?.filter(n => !n.read).length || 0,
    high: notifications?.filter(n => n.priority === 'high').length || 0,
    medium: notifications?.filter(n => n.priority === 'medium').length || 0,
    low: notifications?.filter(n => n.priority === 'low').length || 0,
    byType: {
      appointment_soon: notifications?.filter(n => n.type === 'appointment_soon').length || 0,
      appointment_reminder: notifications?.filter(n => n.type === 'appointment_reminder').length || 0,
      missed_appointment: notifications?.filter(n => n.type === 'missed_appointment').length || 0,
      new_appointment: notifications?.filter(n => n.type === 'new_appointment').length || 0,
      system: notifications?.filter(n => n.type === 'system').length || 0,
    }
  };

  return { data: stats };
};
