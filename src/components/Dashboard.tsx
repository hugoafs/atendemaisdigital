import { Calendar, Users, DollarSign, TrendingUp, Plus, Activity, Clock, CheckCircle2 } from 'lucide-react';
import StatsCard from './StatsCard';
import AppointmentCard from './AppointmentCard';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import CreatePatientDialog from './CreatePatientDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTodayAppointments } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { data: todayAppointments, isLoading: appointmentsLoading } = useTodayAppointments();
  const { data: patients, isLoading: patientsLoading } = usePatients();

  // Calculate stats
  const totalAppointmentsToday = todayAppointments?.length || 0;
  const totalPatients = patients?.length || 0;
  
  const monthlyRevenue = todayAppointments?.reduce((sum, appointment) => {
    return sum + (appointment.value || 0);
  }, 0) || 0;

  const completedAppointments = todayAppointments?.filter(
    app => app.status === 'concluido'
  ).length || 0;
  
  const attendanceRate = totalAppointmentsToday > 0 
    ? Math.round((completedAppointments / totalAppointmentsToday) * 100)
    : 0;

  const stats = [
    {
      title: 'Consultas Hoje',
      value: totalAppointmentsToday,
      icon: Calendar,
      change: '+2 que ontem',
      changeType: 'positive' as const,
      color: 'blue' as const,
    },
    {
      title: 'Pacientes Ativos',
      value: totalPatients,
      icon: Users,
      change: '+5 este mês',
      changeType: 'positive' as const,
      color: 'green' as const,
    },
    {
      title: 'Receita Hoje',
      value: `R$ ${monthlyRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12% vs ontem',
      changeType: 'positive' as const,
      color: 'purple' as const,
    },
    {
      title: 'Taxa de Presença',
      value: `${attendanceRate}%`,
      icon: TrendingUp,
      change: '+2% esta semana',
      changeType: 'positive' as const,
      color: 'orange' as const,
    },
  ];

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Bem-vindo de volta! 👋
              </h1>
              <p className="text-blue-100 text-lg mb-4">
                {getCurrentDate()}
              </p>
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{getCurrentTime()}</span>
                </div>
                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  <span>{totalAppointmentsToday} consultas hoje</span>
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <CreateAppointmentDialog />
              <CreatePatientDialog />
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl flex-col space-y-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Calendar className="h-6 w-6" />
          <span className="text-sm font-semibold">Nova Consulta</span>
        </Button>
        <Button className="h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl flex-col space-y-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Users className="h-6 w-6" />
          <span className="text-sm font-semibold">Novo Paciente</span>
        </Button>
        <Button className="h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl flex-col space-y-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <TrendingUp className="h-6 w-6" />
          <span className="text-sm font-semibold">Relatórios</span>
        </Button>
        <Button className="h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl flex-col space-y-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <DollarSign className="h-6 w-6" />
          <span className="text-sm font-semibold">Financeiro</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Consultas de Hoje</h3>
                    <p className="text-sm text-gray-600">
                      {totalAppointmentsToday} agendamentos
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {completedAppointments}/{totalAppointmentsToday} concluídas
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {appointmentsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                  ))}
                </div>
              ) : todayAppointments && todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.slice(0, 5).map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                  {todayAppointments.length > 5 && (
                    <Button variant="outline" className="w-full rounded-xl">
                      Ver todas as {todayAppointments.length} consultas
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma consulta hoje
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Que tal agendar uma nova consulta?
                  </p>
                  <CreateAppointmentDialog />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Atividade Recente</h3>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Consulta finalizada
                    </p>
                    <p className="text-xs text-gray-500">há 2 minutos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Novo paciente cadastrado
                    </p>
                    <p className="text-xs text-gray-500">há 15 minutos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Consulta reagendada
                    </p>
                    <p className="text-xs text-gray-500">há 1 hora</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Patient Info */}
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pacientes</h3>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {patientsLoading ? (
                <Skeleton className="h-20 w-full rounded-2xl" />
              ) : (
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {totalPatients}
                  </div>
                  <p className="text-gray-600 mb-4">
                    pacientes cadastrados
                  </p>
                  <CreatePatientDialog />
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