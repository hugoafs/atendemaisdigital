
import { Calendar, Users, DollarSign, TrendingUp, Plus } from 'lucide-react';
import StatsCard from './StatsCard';
import AppointmentCard from './AppointmentCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodayAppointments } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { Skeleton } from '@/components/ui/skeleton';

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral da sua prática hoje</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Nova Consulta
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

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
                      date={new Date(appointment.date).toLocaleDateString('pt-BR')}
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
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus size={16} className="mr-2" />
                Agendar Consulta
              </Button>
              <Button variant="outline" className="w-full">
                <Users size={16} className="mr-2" />
                Cadastrar Paciente
              </Button>
              <Button variant="outline" className="w-full">
                <TrendingUp size={16} className="mr-2" />
                Ver Relatórios
              </Button>
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
