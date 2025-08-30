import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Activity,
  Filter,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodayAppointments, useDashboardStats, useWeeklyStats, useMonthlyPatientStats } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { parseAppointmentDate, formatDateBR, formatTimeBR } from '@/utils/dateUtils';
import { Skeleton } from '@/components/ui/skeleton';
import AppointmentCard from '@/components/AppointmentCard';
import CreateAppointmentDialog from '@/components/CreateAppointmentDialog';
import CreatePatientDialog from '@/components/CreatePatientDialog';
import ModernStatsCard from '@/components/ModernStatsCard';
import ModernLayout from '@/components/ModernLayout';

const Index = () => {
  const { data: todayAppointments, isLoading: appointmentsLoading } = useTodayAppointments();
  const { data: patients } = usePatients();
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardStats();
  const { data: weeklyStats, isLoading: weeklyLoading } = useWeeklyStats();
  const { data: monthlyPatientStats, isLoading: monthlyLoading } = useMonthlyPatientStats();

  // Função para formatar mudanças
  const formatChange = (change: number, type: 'appointments' | 'revenue' | 'percentage') => {
    if (type === 'appointments') {
      return change > 0 ? `+${change} que ontem` : `${change} que ontem`;
    } else if (type === 'revenue') {
      return change > 0 ? `+R$ ${change.toFixed(2)} vs ontem` : `-R$ ${Math.abs(change).toFixed(2)} vs ontem`;
    } else {
      return change > 0 ? `+${change}% esta semana` : `${change}% esta semana`;
    }
  };

  // Calculate stats from real data
  const totalAppointmentsToday = dashboardStats?.todayAppointments || 0;
  const totalPatients = dashboardStats?.totalPatients || 0;
  const todayRevenue = dashboardStats?.todayRevenue || 0;
  const attendanceRate = dashboardStats?.todayAttendanceRate || 0;

  const stats = [
    {
      title: 'Consultas Hoje',
      value: totalAppointmentsToday,
      icon: Calendar,
      change: formatChange(dashboardStats?.appointmentsChange || 0, 'appointments'),
      changeType: (dashboardStats?.appointmentsChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Pacientes Ativos',
      value: totalPatients,
      icon: Users,
      change: monthlyPatientStats ? `${monthlyPatientStats.patientsChange >= 0 ? '+' : ''}${monthlyPatientStats.patientsChange} este mês` : 'Carregando...',
      changeType: (monthlyPatientStats?.patientsChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Receita Hoje',
      value: `R$ ${todayRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: formatChange(dashboardStats?.revenueChange || 0, 'revenue'),
      changeType: (dashboardStats?.revenueChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
    },
    {
      title: 'Taxa de Presença',
      value: `${attendanceRate}%`,
      icon: TrendingUp,
      change: formatChange(weeklyStats?.stats?.attendanceChange || 0, 'percentage'),
      changeType: (weeklyStats?.stats?.attendanceChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <ModernLayout>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Bom dia! 👋
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600">
              Aqui está o resumo da sua prática hoje
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-3">

          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsLoading || weeklyLoading || monthlyLoading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))
        ) : (
          stats.map((stat, index) => (
            <ModernStatsCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Consultas de Hoje</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {totalAppointmentsToday} consultas agendadas
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : todayAppointments && todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id} 
                      id={appointment.id}
                      patientName={appointment.patient.name}
                      time={appointment.time}
                      date={formatDateBR(parseAppointmentDate(appointment.date))}
                      type={appointment.type}
                      status={appointment.status}
                      value={appointment.value}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    Nenhuma consulta hoje
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                    Que tal agendar uma nova consulta?
                  </p>
                  <CreateAppointmentDialog>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base">
                      <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Agendar Consulta</span>
                      <span className="sm:hidden">Agendar</span>
                    </Button>
                  </CreateAppointmentDialog>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Actions */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Ações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              <CreateAppointmentDialog>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-10 sm:h-12 text-sm sm:text-base">
                  <Calendar className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Agendar Consulta</span>
                  <span className="sm:hidden">Agendar</span>
                </Button>
              </CreateAppointmentDialog>
              <CreatePatientDialog />
              <Button variant="outline" className="w-full rounded-xl h-10 sm:h-12 hover:bg-gray-50 text-sm sm:text-base">
                <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Ver Relatórios</span>
                <span className="sm:hidden">Relatórios</span>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">Resumo Semanal</h3>
                  <p className="text-purple-100 text-xs sm:text-sm">Últimos 7 dias</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-100" />
              </div>
              {weeklyLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full bg-purple-400/30" />
                  ))}
                </div>
              ) : weeklyStats?.stats ? (
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-purple-100">Consultas realizadas</span>
                    <span className="font-bold text-sm sm:text-base">{weeklyStats.stats.completedAppointments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-purple-100">Taxa de presença</span>
                    <span className="font-bold text-sm sm:text-base">{weeklyStats.stats.attendanceRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-purple-100">Receita total</span>
                    <span className="font-bold text-sm sm:text-base">R$ {weeklyStats.stats.totalRevenue.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-center text-purple-100 text-sm">
                    Nenhum dado disponível para esta semana
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernLayout>
  );
};

export default Index;
