import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Menu, 
  Plus,
  Activity,
  Clock,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTodayAppointments } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { Skeleton } from '@/components/ui/skeleton';
import AppointmentCard from '@/components/AppointmentCard';
import CreateAppointmentDialog from '@/components/CreateAppointmentDialog';
import CreatePatientDialog from '@/components/CreatePatientDialog';
import ModernSidebar from '@/components/Sidebar';
import ModernStatsCard from '@/components/ModernStatsCard';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: todayAppointments, isLoading: appointmentsLoading } = useTodayAppointments();
  const { data: patients } = usePatients();

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
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Pacientes Ativos',
      value: totalPatients,
      icon: Users,
      change: '+5 este mês',
      changeType: 'positive' as const,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Receita Hoje',
      value: `R$ ${monthlyRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12% vs ontem',
      changeType: 'positive' as const,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
    },
    {
      title: 'Taxa de Presença',
      value: `${attendanceRate}%`,
      icon: TrendingUp,
      change: '+2% esta semana',
      changeType: 'positive' as const,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Sidebar */}
      <ModernSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Pesquisar pacientes, consultas..."
                  className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <CreateAppointmentDialog>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Consulta
                </Button>
              </CreateAppointmentDialog>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Bom dia! 👋
                  </h1>
                  <p className="mt-2 text-lg text-gray-600">
                    Aqui está o resumo da sua prática hoje
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Relatórios
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <ModernStatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Today's Appointments */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Consultas de Hoje</h3>
                        <p className="text-sm text-gray-500 mt-1">
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
                            date={new Date(appointment.date).toLocaleDateString('pt-BR')}
                            type={appointment.type}
                            status={appointment.status}
                            value={appointment.value}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Nenhuma consulta hoje
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Que tal agendar uma nova consulta?
                        </p>
                        <CreateAppointmentDialog>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Agendar Consulta
                          </Button>
                        </CreateAppointmentDialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                      <span>Ações Rápidas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CreateAppointmentDialog>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Consulta
                      </Button>
                    </CreateAppointmentDialog>
                    <CreatePatientDialog />
                    <Button variant="outline" className="w-full rounded-xl h-12 hover:bg-gray-50">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Relatórios
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Resumo Semanal</h3>
                        <p className="text-purple-100 text-sm">Últimos 7 dias</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-100" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-100">Consultas realizadas</span>
                        <span className="font-bold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-100">Taxa de presença</span>
                        <span className="font-bold">92%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-100">Receita total</span>
                        <span className="font-bold">R$ 2.840</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
