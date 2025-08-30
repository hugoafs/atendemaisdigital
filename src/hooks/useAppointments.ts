
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getCurrentDateBR, 
  parseAppointmentDate, 
  getStartOfWeekBR, 
  getEndOfWeekBR, 
  dateToDBFormat,
  isSameDate 
} from '@/utils/dateUtils';

export interface Appointment {
  id: string;
  patient_id: string;
  date: string;
  time: string;
  type: 'particular' | 'plano';
  status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
  value?: number;
  notes?: string;
  user_id: string;
  patient?: {
    name: string;
  };
  // Campos opcionais para compatibilidade
  created_at?: string;
  updated_at?: string;
}

export const useAppointments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['appointments', user?.id],
    queryFn: async () => {
      try {
        console.log('🔍 useAppointments - Fetching appointments for user:', user?.id);
        
        if (!user) {
          console.error('❌ useAppointments - User not authenticated');
          throw new Error('Usuário não autenticado');
        }

      console.log('📡 useAppointments - Making Supabase query...');
      
      // Query simplificada para testar
      console.log('🔍 Testando query básica...');
      
      // Primeiro, vamos ver se a tabela existe e se há dados
      console.log('🔍 Verificando estrutura das tabelas...');
      
      // Teste 1: Verificar se a tabela appointments existe
      const { data: testData, error: testError } = await supabase
        .from('appointments')
        .select('count')
        .limit(1);
        
      console.log('📊 Test appointments query result:', { testData, testError });
      
      if (testError) {
        console.error('❌ Tabela appointments não encontrada:', testError);
        throw new Error(`Tabela 'appointments' não encontrada: ${testError.message}`);
      }
      
      // Teste 2: Verificar se a tabela patients existe
      const { data: patientsTestData, error: patientsTestError } = await supabase
        .from('patients')
        .select('count')
        .limit(1);
        
      console.log('📊 Test patients query result:', { patientsTestData, patientsTestError });
      
      if (patientsTestError) {
        console.error('❌ Tabela patients não encontrada:', patientsTestError);
        throw new Error(`Tabela 'patients' não encontrada: ${patientsTestError.message}`);
      }
      
      // Teste 3: Verificar se há dados nas tabelas
      console.log('📊 Contagem de appointments:', testData);
      console.log('📊 Contagem de patients:', patientsTestData);
      
      // Agora vamos buscar os dados do usuário com os dados do paciente
      console.log('🔍 Buscando consultas para o usuário:', user.id);
      
      // Buscar todas as consultas (sem filtro de usuário para debug)
      const { data: allAppointments, error: allError } = await supabase
        .from('appointments')
        .select(`
          id,
          patient_id,
          date,
          time,
          type,
          status,
          value,
          notes,
          user_id,
          patient:patients(name)
        `)
        .order('date', { ascending: true })
        .order('time', { ascending: true });
        
      console.log('📊 Todas as consultas no banco:', { allAppointments, allError });
      
      if (allError) {
        console.error('❌ Erro ao buscar todas as consultas:', allError);
        throw new Error(`Erro ao carregar consultas: ${allError.message}`);
      }
      
      // Se não há dados no banco, criar dados de exemplo
      if (!allAppointments || allAppointments.length === 0) {
        console.log('🔧 Não há dados no banco. Criando dados de exemplo...');
        
        // Criar um paciente de exemplo
        const { data: newPatient, error: patientError } = await supabase
          .from('patients')
          .insert({
            name: 'João Silva',
            email: 'joao@example.com',
            phone: '(11) 99999-9999',
            user_id: user.id
          })
          .select();
          
        console.log('📊 Paciente criado:', { newPatient, patientError });
        
        if (newPatient) {
          // Criar várias consultas de exemplo para diferentes datas
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          
          const exampleAppointments = [
            {
              patient_id: newPatient[0].id,
              date: today.toISOString().split('T')[0],
              time: '09:00',
              type: 'particular' as const,
              status: 'agendado' as const,
              value: 150,
              notes: 'Consulta de exemplo - hoje',
              user_id: user.id
            },
            {
              patient_id: newPatient[0].id,
              date: today.toISOString().split('T')[0],
              time: '14:00',
              type: 'plano' as const,
              status: 'em-andamento' as const,
              value: 120,
              notes: 'Consulta de exemplo - hoje tarde',
              user_id: user.id
            },
            {
              patient_id: newPatient[0].id,
              date: tomorrow.toISOString().split('T')[0],
              time: '10:00',
              type: 'particular' as const,
              status: 'agendado' as const,
              value: 150,
              notes: 'Consulta de exemplo - amanhã',
              user_id: user.id
            },
            {
              patient_id: newPatient[0].id,
              date: nextWeek.toISOString().split('T')[0],
              time: '16:00',
              type: 'plano' as const,
              status: 'agendado' as const,
              value: 120,
              notes: 'Consulta de exemplo - próxima semana',
              user_id: user.id
            }
          ];
          
          const { data: insertData, error: insertError } = await supabase
            .from('appointments')
            .insert(exampleAppointments)
            .select();
            
          console.log('📊 Consultas de exemplo criadas:', { insertData, insertError });
          
          if (insertData) {
            // Buscar novamente com os dados de exemplo
            const { data: newData, error: newError } = await supabase
              .from('appointments')
              .select(`
                id,
                patient_id,
                date,
                time,
                type,
                status,
                value,
                notes,
                user_id,
                patient:patients(name)
              `)
              .order('date', { ascending: true })
              .order('time', { ascending: true });
              
            console.log('📊 Nova busca com dados de exemplo:', { newData, newError });
            
            if (newData) {
              return (newData || []) as unknown as Appointment[];
            }
          }
        }
      }
      
      // Se há dados, retornar todas as consultas (sem filtro de usuário por enquanto)
      console.log('✅ Retornando todas as consultas do banco:', allAppointments?.length || 0);
      
      const appointments = (allAppointments || []) as unknown as Appointment[];
      console.log('✅ useAppointments - Successfully loaded appointments:', appointments.length);
      console.log('📊 useAppointments - First appointment sample:', appointments[0]);
      
      // Log detalhado de todos os appointments
      if (appointments.length > 0) {
        console.log('📊 useAppointments - All appointments details:');
        appointments.forEach((appointment, index) => {
          const date = new Date(appointment.date);
          console.log(`  ${index + 1}. ID: ${appointment.id}, Raw Date: ${appointment.date}, Parsed Date: ${date}, toDateString: ${date.toDateString()}, Patient: ${appointment.patient?.name || 'Unknown'}, Time: ${appointment.time}`);
        });
      }
      
      // Verificar se os dados estão corretos
      if (appointments.length > 0) {
        try {
          const firstAppointment = appointments[0];
          console.log('🔍 Verificando estrutura do primeiro appointment:');
          console.log('- ID:', firstAppointment.id);
          console.log('- Date (raw):', firstAppointment.date);
          console.log('- Date (type):', typeof firstAppointment.date);
          console.log('- Date (parsed):', new Date(firstAppointment.date));
          console.log('- Date (normalized):', new Date(firstAppointment.date).toDateString());
          console.log('- Patient:', firstAppointment.patient);
          console.log('- User ID:', firstAppointment.user_id);
        } catch (error) {
          console.error('Error checking appointment structure:', error);
        }
      } else {
        console.log('⚠️ Nenhuma consulta encontrada no banco');
      }
      
      return appointments;
      } catch (error) {
        console.error('❌ useAppointments - Unexpected error:', error);
        // Retornar array vazio em caso de erro para evitar quebra da interface
        return [];
      }
    },
    enabled: !!user,
    retry: 1,
  });
};

export const useTodayAppointments = () => {
  const { user } = useAuth();
  const today = getCurrentDateBR();

  return useQuery({
    queryKey: ['appointments', 'today', user?.id],
    queryFn: async () => {
      console.log('🔍 useTodayAppointments - Fetching today appointments for user:', user?.id, 'date:', today);
      
      if (!user) {
        console.error('❌ useTodayAppointments - User not authenticated');
        throw new Error('Usuário não autenticado');
      }

      console.log('📡 useTodayAppointments - Making Supabase query...');

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients(name)
        `)
        .eq('user_id', user.id)
        .eq('date', today)
        .order('time', { ascending: true });

      console.log('📊 useTodayAppointments - Query result:', { data, error });

      if (error) {
        console.error('❌ useTodayAppointments - Supabase error:', error);
        throw new Error(`Erro ao carregar consultas de hoje: ${error.message}`);
      }

      const appointments = (data || []) as unknown as Appointment[];
      console.log('✅ useTodayAppointments - Successfully loaded today appointments:', appointments.length);
      
      return appointments;
    },
    enabled: !!user,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useWeeklyStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['appointments', 'weekly-stats', user?.id],
    queryFn: async () => {
      console.log('🚀 useWeeklyStats - Hook iniciado');
      console.log('🚀 useWeeklyStats - User:', user?.id);
      
      if (!user) {
        console.log('❌ useWeeklyStats - Usuário não autenticado');
        throw new Error('Usuário não autenticado');
      }

      // Calcular datas da semana atual usando timezone brasileiro
      const today = new Date();
      const startOfWeek = getStartOfWeekBR(today);
      const endOfWeek = getEndOfWeekBR(today);

      const startDate = dateToDBFormat(startOfWeek);
      const endDate = dateToDBFormat(endOfWeek);

      console.log('📊 useWeeklyStats - Buscando dados da semana:', { startDate, endDate });

      // Buscar consultas da semana atual
      const { data: weeklyAppointments, error: weeklyError } = await supabase
        .from('appointments')
        .select(`
          id,
          date,
          time,
          status,
          value,
          type,
          user_id,
          patient:patients(name)
        `)
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (weeklyError) {
        console.error('❌ useWeeklyStats - Erro ao buscar consultas semanais:', weeklyError);
        throw new Error(`Erro ao carregar dados semanais: ${weeklyError.message}`);
      }

      console.log('📊 useWeeklyStats - Consultas da semana atual encontradas:', weeklyAppointments?.length || 0);
      if (weeklyAppointments && weeklyAppointments.length > 0) {
        console.log('📊 useWeeklyStats - Primeira consulta da semana:', weeklyAppointments[0]);
        console.log('📊 useWeeklyStats - Todas as consultas:', weeklyAppointments.map(app => ({ date: app.date, status: app.status, value: app.value })));
      }

      // Buscar consultas da semana anterior para comparação
      const lastWeekStart = new Date(startOfWeek);
      lastWeekStart.setDate(startOfWeek.getDate() - 7);
      const lastWeekEnd = new Date(endOfWeek);
      lastWeekEnd.setDate(endOfWeek.getDate() - 7);

      const lastWeekStartDate = dateToDBFormat(lastWeekStart);
      const lastWeekEndDate = dateToDBFormat(lastWeekEnd);

      const { data: lastWeekAppointments, error: lastWeekError } = await supabase
        .from('appointments')
        .select(`
          id,
          date,
          time,
          status,
          value,
          type,
          user_id
        `)
        .eq('user_id', user.id)
        .gte('date', lastWeekStartDate)
        .lte('date', lastWeekEndDate);

      if (lastWeekError) {
        console.error('❌ useWeeklyStats - Erro ao buscar consultas da semana anterior:', lastWeekError);
      }

      // Calcular estatísticas da semana atual
      const currentWeekAppointments = weeklyAppointments || [];
      const lastWeekAppointmentsData = lastWeekAppointments || [];

      console.log('🔍 useWeeklyStats - Processando dados:', {
        currentWeekCount: currentWeekAppointments.length,
        lastWeekCount: lastWeekAppointmentsData.length,
        currentWeekData: currentWeekAppointments.map(app => ({ date: app.date, status: app.status, value: app.value }))
      });

      const stats = {
        totalAppointments: currentWeekAppointments.length,
        completedAppointments: currentWeekAppointments.filter(app => app.status === 'concluido').length,
        cancelledAppointments: currentWeekAppointments.filter(app => app.status === 'cancelado').length,
        totalRevenue: currentWeekAppointments.reduce((sum, app) => sum + (app.value || 0), 0),
        averageRevenue: currentWeekAppointments.length > 0 
          ? currentWeekAppointments.reduce((sum, app) => sum + (app.value || 0), 0) / currentWeekAppointments.length 
          : 0,
        attendanceRate: currentWeekAppointments.length > 0 
          ? Math.round((currentWeekAppointments.filter(app => app.status === 'concluido').length / currentWeekAppointments.length) * 100)
          : 0,
        // Comparações com a semana anterior
        appointmentsChange: currentWeekAppointments.length - lastWeekAppointmentsData.length,
        revenueChange: (currentWeekAppointments.reduce((sum, app) => sum + (app.value || 0), 0)) - 
                      (lastWeekAppointmentsData.reduce((sum, app) => sum + (app.value || 0), 0)),
        attendanceChange: 0, // Será calculado abaixo
        // Dados por dia da semana
        appointmentsByDay: {
          domingo: currentWeekAppointments.filter(app => parseAppointmentDate(app.date).getDay() === 0).length,
          segunda: currentWeekAppointments.filter(app => parseAppointmentDate(app.date).getDay() === 1).length,
          terca: currentWeekAppointments.filter(app => parseAppointmentDate(app.date).getDay() === 2).length,
          quarta: currentWeekAppointments.filter(app => parseAppointmentDate(app.date).getDay() === 3).length,
          quinta: currentWeekAppointments.filter(app => parseAppointmentDate(app.date).getDay() === 4).length,
          sexta: currentWeekAppointments.filter(app => parseAppointmentDate(app.date).getDay() === 5).length,
          sabado: currentWeekAppointments.filter(app => parseAppointmentDate(app.date).getDay() === 6).length,
        },
        // Próximas consultas da semana
        upcomingAppointments: currentWeekAppointments
          .filter(app => app.status === 'agendado' && parseAppointmentDate(app.date) >= today)
          .sort((a, b) => parseAppointmentDate(a.date).getTime() - parseAppointmentDate(b.date).getTime())
          .slice(0, 5)
      };

      // Calcular mudança na taxa de presença
      const lastWeekCompleted = lastWeekAppointmentsData.filter(app => app.status === 'concluido').length;
      const lastWeekTotal = lastWeekAppointmentsData.length;
      const lastWeekAttendance = lastWeekTotal > 0 ? Math.round((lastWeekCompleted / lastWeekTotal) * 100) : 0;
      stats.attendanceChange = stats.attendanceRate - lastWeekAttendance;

      console.log('✅ useWeeklyStats - Estatísticas calculadas:', stats);
      console.log('📊 useWeeklyStats - Dados da semana atual:', currentWeekAppointments.length, 'consultas');
      console.log('📊 useWeeklyStats - Dados da semana anterior:', lastWeekAppointmentsData.length, 'consultas');
      console.log('📊 useWeeklyStats - Range de datas:', { startDate, endDate });

      const result = {
        stats,
        appointments: currentWeekAppointments,
        dateRange: { startDate, endDate }
      };

      console.log('🎯 useWeeklyStats - Retornando resultado:', result);
      return result;
    },
    enabled: !!user,
    retry: 2,
  });
};

export const useMonthlyPatientStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['patients', 'monthly-stats', user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

      const startDate = startOfMonth.toISOString().split('T')[0];
      const lastMonthStart = startOfLastMonth.toISOString().split('T')[0];
      const lastMonthEnd = endOfLastMonth.toISOString().split('T')[0];

      // Buscar pacientes criados neste mês
      const { data: thisMonthPatients, error: thisMonthError } = await supabase
        .from('patients')
        .select('id, created_at')
        .eq('user_id', user.id)
        .gte('created_at', startDate);

      if (thisMonthError) {
        console.error('❌ Erro ao buscar pacientes deste mês:', thisMonthError);
        throw new Error(`Erro ao carregar pacientes: ${thisMonthError.message}`);
      }

      // Buscar pacientes criados no mês anterior
      const { data: lastMonthPatients, error: lastMonthError } = await supabase
        .from('patients')
        .select('id, created_at')
        .eq('user_id', user.id)
        .gte('created_at', lastMonthStart)
        .lte('created_at', lastMonthEnd);

      if (lastMonthError) {
        console.error('❌ Erro ao buscar pacientes do mês anterior:', lastMonthError);
      }

      const newPatientsThisMonth = thisMonthPatients?.length || 0;
      const newPatientsLastMonth = lastMonthPatients?.length || 0;
      const patientsChange = newPatientsThisMonth - newPatientsLastMonth;

      return {
        newPatientsThisMonth,
        newPatientsLastMonth,
        patientsChange
      };
    },
    enabled: !!user,
    retry: 2,
  });
};

export const useDashboardStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['appointments', 'dashboard-stats', user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const today = getCurrentDateBR();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = dateToDBFormat(yesterday);

      // Buscar consultas de hoje
      const { data: todayAppointments, error: todayError } = await supabase
        .from('appointments')
        .select(`
          id,
          date,
          time,
          status,
          value,
          type,
          user_id
        `)
        .eq('user_id', user.id)
        .eq('date', today);

      if (todayError) {
        console.error('❌ useDashboardStats - Erro ao buscar consultas de hoje:', todayError);
        throw new Error(`Erro ao carregar dados de hoje: ${todayError.message}`);
      }

      // Buscar consultas de ontem
      const { data: yesterdayAppointments, error: yesterdayError } = await supabase
        .from('appointments')
        .select(`
          id,
          date,
          time,
          status,
          value,
          type,
          user_id
        `)
        .eq('user_id', user.id)
        .eq('date', yesterdayStr);

      if (yesterdayError) {
        console.error('❌ useDashboardStats - Erro ao buscar consultas de ontem:', yesterdayError);
      }

      // Buscar total de pacientes
      const { data: patients, error: patientsError } = await supabase
        .from('patients')
        .select('id, user_id')
        .eq('user_id', user.id);

      if (patientsError) {
        console.error('❌ useDashboardStats - Erro ao buscar pacientes:', patientsError);
      }

      // Calcular estatísticas
      const todayData = todayAppointments || [];
      const yesterdayData = yesterdayAppointments || [];
      const totalPatients = patients?.length || 0;

      const stats = {
        todayAppointments: todayData.length,
        yesterdayAppointments: yesterdayData.length,
        appointmentsChange: todayData.length - yesterdayData.length,
        
        todayRevenue: todayData.reduce((sum, app) => sum + (app.value || 0), 0),
        yesterdayRevenue: yesterdayData.reduce((sum, app) => sum + (app.value || 0), 0),
        revenueChange: (todayData.reduce((sum, app) => sum + (app.value || 0), 0)) - 
                      (yesterdayData.reduce((sum, app) => sum + (app.value || 0), 0)),
        
        todayCompleted: todayData.filter(app => app.status === 'concluido').length,
        todayAttendanceRate: todayData.length > 0 
          ? Math.round((todayData.filter(app => app.status === 'concluido').length / todayData.length) * 100)
          : 0,
        
        totalPatients,
        newPatientsThisMonth: 0, // Será calculado se necessário
      };

      console.log('✅ useDashboardStats - Estatísticas calculadas:', stats);
      console.log('📊 useDashboardStats - Consultas de hoje:', todayData.length);
      console.log('📊 useDashboardStats - Consultas de ontem:', yesterdayData.length);
      console.log('📊 useDashboardStats - Total de pacientes:', totalPatients);

      return stats;
    },
    enabled: !!user,
    retry: 2,
  });
};
