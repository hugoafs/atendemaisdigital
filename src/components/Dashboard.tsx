
import { Calendar, Users, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import StatsCard from './StatsCard';
import AppointmentCard from './AppointmentCard';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import CreatePatientDialog from './CreatePatientDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodayAppointments, useDashboardStats, useWeeklyStats, useMonthlyPatientStats } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { parseAppointmentDate, formatDateBR, formatTimeBR } from '@/utils/dateUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { data: todayAppointments, isLoading: appointmentsLoading } = useTodayAppointments();
  const { data: patients, isLoading: patientsLoading } = usePatients();
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardStats();
  const { data: weeklyStats, isLoading: weeklyLoading, error: weeklyError } = useWeeklyStats();
  const { data: monthlyPatientStats, isLoading: monthlyLoading } = useMonthlyPatientStats();

  // Debug logs
  console.log('📊 Dashboard - weeklyStats:', weeklyStats);
  console.log('📊 Dashboard - weeklyLoading:', weeklyLoading);
  console.log('📊 Dashboard - weeklyError:', weeklyError);



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

  // Calcular stats baseados nos dados reais
  const stats = [
    {
      title: 'Consultas Hoje',
      value: dashboardStats?.todayAppointments || 0,
      icon: Calendar,
      change: formatChange(dashboardStats?.appointmentsChange || 0, 'appointments'),
      changeType: (dashboardStats?.appointmentsChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      color: 'blue' as const,
    },
    {
      title: 'Pacientes Ativos',
      value: dashboardStats?.totalPatients || 0,
      icon: Users,
      change: monthlyPatientStats ? `${monthlyPatientStats.patientsChange >= 0 ? '+' : ''}${monthlyPatientStats.patientsChange} este mês` : 'Sem dados',
      changeType: (monthlyPatientStats?.patientsChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      color: 'green' as const,
    },
    {
      title: 'Receita Hoje',
      value: `R$ ${(dashboardStats?.todayRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      change: formatChange(dashboardStats?.revenueChange || 0, 'revenue'),
      changeType: (dashboardStats?.revenueChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      color: 'purple' as const,
    },
    {
      title: 'Taxa de Presença',
      value: `${dashboardStats?.todayAttendanceRate || 0}%`,
      icon: TrendingUp,
      change: formatChange(weeklyStats?.stats?.attendanceChange || 0, 'percentage'),
      changeType: (weeklyStats?.stats?.attendanceChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral da sua prática hoje</p>
        </div>
        <CreateAppointmentDialog />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading || monthlyLoading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))
        ) : (
          stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 size={24} className="text-green-600" />
              <span>Resumo Semanal</span>
              {weeklyStats?.dateRange && (
                <Badge variant="outline" className="ml-2">
                  {formatDateBR(parseAppointmentDate(weeklyStats.dateRange.startDate))} - {formatDateBR(parseAppointmentDate(weeklyStats.dateRange.endDate))}
                </Badge>
              )}
            </div>

          </CardTitle>
        </CardHeader>
        <CardContent>
          {weeklyLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : weeklyStats && weeklyStats.stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{weeklyStats.stats?.totalAppointments || 0}</div>
                <div className="text-sm text-gray-600">Total de Consultas</div>
                <div className="text-xs text-gray-500 mt-1">
                  {weeklyStats.stats?.appointmentsChange > 0 ? '+' : ''}{weeklyStats.stats?.appointmentsChange || 0} vs semana anterior
                </div>

              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{weeklyStats.stats?.completedAppointments || 0}</div>
                <div className="text-sm text-gray-600">Consultas Concluídas</div>
                <div className="text-xs text-gray-500 mt-1">
                  {weeklyStats.stats?.attendanceRate || 0}% taxa de presença
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">R$ {(weeklyStats.stats?.totalRevenue || 0).toFixed(2)}</div>
                <div className="text-sm text-gray-600">Receita Total</div>
                <div className="text-xs text-gray-500 mt-1">
                  {(weeklyStats.stats?.revenueChange || 0) > 0 ? '+' : ''}R$ {(weeklyStats.stats?.revenueChange || 0).toFixed(2)} vs semana anterior
                </div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">R$ {(weeklyStats.stats?.averageRevenue || 0).toFixed(2)}</div>
                <div className="text-sm text-gray-600">Receita Média</div>
                <div className="text-xs text-gray-500 mt-1">
                  por consulta
                </div>
              </div>
            </div>

            
            {/* Gráfico de consultas por dia */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Consultas por Dia da Semana</h4>
              <div className="grid grid-cols-7 gap-2">
                {Object.entries(weeklyStats.stats?.appointmentsByDay || {}).map(([day, count]) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-500 mb-1 capitalize">{day.slice(0, 3)}</div>
                    <div className="h-16 bg-gray-100 rounded flex items-end justify-center p-1">
                      <div 
                        className="bg-blue-500 rounded w-full transition-all duration-300"
                        style={{ 
                          height: `${Math.max((count / Math.max(...Object.values(weeklyStats.stats?.appointmentsByDay || {}))) * 100, 10)}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium mt-1">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
              {weeklyError ? (
                <>
                  <p className="text-red-600 font-medium">Erro ao carregar dados</p>
                  <p className="text-sm text-red-500 mt-2">{weeklyError.message}</p>
                </>
              ) : (
                <>
                  <p>Nenhum dado disponível para esta semana</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {weeklyLoading ? 'Carregando dados...' : 'Sem consultas agendadas nesta semana'}
                  </p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar size={24} className="text-blue-600" />
                <span>Consultas de Hoje</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : todayAppointments && todayAppointments.length > 0 ? (
                <div className="grid gap-4">
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
                <div className="text-center py-8 text-gray-500">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma consulta agendada para hoje</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CreateAppointmentDialog>
                <div className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center cursor-pointer transition-colors">
                  Agendar Consulta
                </div>
              </CreateAppointmentDialog>
              <CreatePatientDialog />
              <div className="w-full border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-center cursor-pointer transition-colors">
                Ver Relatórios
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : todayAppointments && todayAppointments.length > 0 ? (
                <div className="space-y-3">
                  {todayAppointments.slice(0, 2).map((appointment) => (
                    <div key={appointment.id} className={`p-3 rounded-lg border ${
                      appointment.status === 'em-andamento' 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <p className={`text-sm font-medium ${
                        appointment.status === 'em-andamento' 
                          ? 'text-yellow-900' 
                          : 'text-blue-900'
                      }`}>
                        {appointment.patient.name}
                      </p>
                      <p className={`text-xs ${
                        appointment.status === 'em-andamento' 
                          ? 'text-yellow-600' 
                          : 'text-blue-600'
                      }`}>
                        {appointment.status === 'em-andamento' 
                          ? 'Sessão em andamento' 
                          : `Próxima consulta às ${appointment.time}`}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">Nenhuma notificação pendente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
