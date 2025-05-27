
import { Calendar, Users, DollarSign, TrendingUp, Plus } from 'lucide-react';
import StatsCard from './StatsCard';
import AppointmentCard from './AppointmentCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  // Mock data - in real app this would come from Supabase
  const stats = [
    {
      title: 'Consultas Hoje',
      value: 8,
      icon: Calendar,
      change: '+2 que ontem',
      changeType: 'positive' as const,
      color: 'blue' as const,
    },
    {
      title: 'Pacientes Ativos',
      value: 42,
      icon: Users,
      change: '+5 este mês',
      changeType: 'positive' as const,
      color: 'green' as const,
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 8.450',
      icon: DollarSign,
      change: '+12% vs mês anterior',
      changeType: 'positive' as const,
      color: 'purple' as const,
    },
    {
      title: 'Taxa de Presença',
      value: '94%',
      icon: TrendingUp,
      change: '+2% esta semana',
      changeType: 'positive' as const,
      color: 'orange' as const,
    },
  ];

  const todayAppointments = [
    {
      id: '1',
      patientName: 'Maria Silva',
      time: '09:00',
      date: '27/05/2025',
      type: 'particular' as const,
      status: 'agendado' as const,
      value: 150,
    },
    {
      id: '2',
      patientName: 'João Santos',
      time: '10:30',
      date: '27/05/2025',
      type: 'plano' as const,
      status: 'em-andamento' as const,
    },
    {
      id: '3',
      patientName: 'Ana Costa',
      time: '14:00',
      date: '27/05/2025',
      type: 'particular' as const,
      status: 'agendado' as const,
      value: 150,
    },
    {
      id: '4',
      patientName: 'Pedro Oliveira',
      time: '15:30',
      date: '27/05/2025',
      type: 'plano' as const,
      status: 'concluido' as const,
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
              <div className="grid gap-4">
                {todayAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} {...appointment} />
                ))}
              </div>
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
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">Maria Silva</p>
                  <p className="text-xs text-blue-600">Lembrete em 5 min</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">João Santos</p>
                  <p className="text-xs text-yellow-600">Sessão em andamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
