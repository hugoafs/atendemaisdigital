import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfYear, 
  endOfYear,
  subMonths,
  format,
  eachMonthOfInterval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  subDays
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { dateToDBFormat, getCurrentDateBR } from '@/utils/dateUtils';

// Monthly revenue data for the selected year
export const useMonthlyRevenue = (selectedMonth?: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['monthly-revenue', user?.id, selectedMonth],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      // Use selected month's year or current year
      const targetYear = selectedMonth ? parseInt(selectedMonth.split('-')[0]) : new Date().getFullYear();
      const startDate = new Date(targetYear, 0, 1); // January 1st
      const endDate = new Date(targetYear, 11, 31); // December 31st

      const { data, error } = await supabase
        .from('appointments')
        .select('date, value, status')
        .eq('user_id', user.id)
        .gte('date', dateToDBFormat(startDate))
        .lte('date', dateToDBFormat(endDate))
        .in('status', ['concluido', 'pago']);

      if (error) throw error;

      // Group by month
      const monthlyData = eachMonthOfInterval({ start: startDate, end: endDate }).map(month => {
        const monthStr = format(month, 'yyyy-MM');
        const monthAppointments = data?.filter(appointment => 
          appointment.date.startsWith(monthStr)
        ) || [];
        
        const revenue = monthAppointments.reduce((sum, appointment) => 
          sum + (appointment.value || 0), 0
        );

        return {
          month: format(month, 'MMM', { locale: ptBR }),
          fullMonth: format(month, 'MMMM yyyy', { locale: ptBR }),
          revenue,
          appointments: monthAppointments.length
        };
      });

      return monthlyData;
    },
    enabled: !!user,
  });
};

// Weekly appointments data for the last 4 weeks
export const useWeeklyAppointments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['weekly-appointments', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const today = getCurrentDateBR();
      const fourWeeksAgo = subDays(today, 28);

      const { data, error } = await supabase
        .from('appointments')
        .select('date, status')
        .eq('user_id', user.id)
        .gte('date', dateToDBFormat(fourWeeksAgo))
        .lte('date', dateToDBFormat(today));

      if (error) throw error;

      // Group by week
      const weeklyData = [];
      for (let i = 0; i < 4; i++) {
        const weekStart = subDays(today, (3 - i) * 7);
        const weekEnd = subDays(today, (3 - i) * 7 - 6);
        
        const weekAppointments = data?.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= weekEnd && appointmentDate <= weekStart;
        }) || [];

        weeklyData.push({
          week: `Sem ${i + 1}`,
          fullWeek: `${format(weekEnd, 'dd/MM')} - ${format(weekStart, 'dd/MM')}`,
          total: weekAppointments.length,
          completed: weekAppointments.filter(a => a.status === 'concluido').length,
          cancelled: weekAppointments.filter(a => a.status === 'cancelado').length,
          pending: weekAppointments.filter(a => a.status === 'agendado').length
        });
      }

      return weeklyData;
    },
    enabled: !!user,
  });
};

// Appointment status distribution
export const useAppointmentStatusStats = (selectedMonth?: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['appointment-status-stats', user?.id, selectedMonth],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      // Build query with month filter if provided
      let query = supabase
        .from('appointments')
        .select('status')
        .eq('user_id', user.id);

      if (selectedMonth) {
        const [year, month] = selectedMonth.split('-');
        const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        const endDate = new Date(parseInt(year), parseInt(month), 0); // Last day of month
        
        query = query
          .gte('date', dateToDBFormat(startDate))
          .lte('date', dateToDBFormat(endDate));
      }

      const { data, error } = await query;

      if (error) throw error;

      const statusCounts = (data || []).reduce((acc, appointment) => {
        acc[appointment.status] = (acc[appointment.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

      return [
        {
          status: 'Concluído',
          count: statusCounts['concluido'] || 0,
          percentage: total > 0 ? Math.round(((statusCounts['concluido'] || 0) / total) * 100) : 0,
          color: '#10b981' // green
        },
        {
          status: 'Agendado',
          count: statusCounts['agendado'] || 0,
          percentage: total > 0 ? Math.round(((statusCounts['agendado'] || 0) / total) * 100) : 0,
          color: '#3b82f6' // blue
        },
        {
          status: 'Em Andamento',
          count: statusCounts['em-andamento'] || 0,
          percentage: total > 0 ? Math.round(((statusCounts['em-andamento'] || 0) / total) * 100) : 0,
          color: '#f59e0b' // yellow
        },
        {
          status: 'Cancelado',
          count: statusCounts['cancelado'] || 0,
          percentage: total > 0 ? Math.round(((statusCounts['cancelado'] || 0) / total) * 100) : 0,
          color: '#ef4444' // red
        }
      ];
    },
    enabled: !!user,
  });
};

// Top patients by appointments count
export const useTopPatients = (selectedMonth?: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['top-patients', user?.id, selectedMonth],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      // Build query with month filter if provided
      let query = supabase
        .from('appointments')
        .select(`
          patient_id,
          patients!inner(name),
          value,
          status,
          date
        `)
        .eq('user_id', user.id);

      if (selectedMonth) {
        const [year, month] = selectedMonth.split('-');
        const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        const endDate = new Date(parseInt(year), parseInt(month), 0); // Last day of month
        
        query = query
          .gte('date', dateToDBFormat(startDate))
          .lte('date', dateToDBFormat(endDate));
      }

      const { data, error } = await query;

      if (error) throw error;

      // Group by patient
      const patientStats = (data || []).reduce((acc, appointment) => {
        const patientId = appointment.patient_id;
        const patientName = (appointment.patients as any)?.name || 'Paciente Desconhecido';
        
        if (!acc[patientId]) {
          acc[patientId] = {
            id: patientId,
            name: patientName,
            totalAppointments: 0,
            completedAppointments: 0,
            totalRevenue: 0
          };
        }

        acc[patientId].totalAppointments++;
        if (appointment.status === 'concluido') {
          acc[patientId].completedAppointments++;
          acc[patientId].totalRevenue += appointment.value || 0;
        }

        return acc;
      }, {} as Record<string, any>);

      // Convert to array and sort by total appointments
      return Object.values(patientStats)
        .sort((a: any, b: any) => b.totalAppointments - a.totalAppointments)
        .slice(0, 10); // Top 10 patients
    },
    enabled: !!user,
  });
};

// Financial summary for different periods
export const useFinancialSummary = (selectedMonth?: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['financial-summary', user?.id, selectedMonth],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      // Use selected month or current month
      const targetDate = selectedMonth ? 
        new Date(parseInt(selectedMonth.split('-')[0]), parseInt(selectedMonth.split('-')[1]) - 1, 1) :
        getCurrentDateBR();
      
      const thisMonth = startOfMonth(targetDate);
      const lastMonth = startOfMonth(subMonths(targetDate, 1));
      const thisYear = startOfYear(targetDate);

      // Get appointments for the specific month if selected, or broader range for calculations
      const { data, error } = await supabase
        .from('appointments')
        .select('date, value, type')
        .eq('user_id', user.id)
        .eq('status', 'concluido')
        .not('value', 'is', null);

      if (error) throw error;

      const appointments = data || [];

      // Calculate different periods
      const thisMonthRevenue = appointments
        .filter(a => {
          const date = new Date(a.date);
          return date >= thisMonth && date < new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 1);
        })
        .reduce((sum, a) => sum + (a.value || 0), 0);

      const lastMonthRevenue = appointments
        .filter(a => {
          const date = new Date(a.date);
          return date >= lastMonth && date < thisMonth;
        })
        .reduce((sum, a) => sum + (a.value || 0), 0);

      const thisYearRevenue = appointments
        .filter(a => new Date(a.date) >= thisYear)
        .reduce((sum, a) => sum + (a.value || 0), 0);

      // Calculate averages ONLY for the selected month
      const monthAppointments = appointments.filter(a => {
        const date = new Date(a.date);
        return date >= thisMonth && date < new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 1);
      });

      const particularRevenue = monthAppointments
        .filter(a => a.type === 'particular')
        .reduce((sum, a) => sum + (a.value || 0), 0);

      const planoRevenue = monthAppointments
        .filter(a => a.type === 'plano')
        .reduce((sum, a) => sum + (a.value || 0), 0);

      return {
        thisMonth: thisMonthRevenue,
        lastMonth: lastMonthRevenue,
        thisYear: thisYearRevenue,
        monthlyChange: lastMonthRevenue > 0 ? 
          ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0,
        particularRevenue,
        planoRevenue,
        totalRevenue: thisMonthRevenue, // Apenas receita do mês selecionado
        particularPercentage: (particularRevenue + planoRevenue) > 0 ? 
          (particularRevenue / (particularRevenue + planoRevenue)) * 100 : 0
      };
    },
    enabled: !!user,
  });
};
