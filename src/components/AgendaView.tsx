
import { useState } from 'react';
import { Calendar, List, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AgendaCalendar from './AgendaCalendar';
import AppointmentsList from './AppointmentsList';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import { useAppointments } from '@/hooks/useAppointments';
import { Skeleton } from '@/components/ui/skeleton';

const AgendaView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: appointments, isLoading } = useAppointments();

  // Filter appointments for selected date
  const selectedDateAppointments = appointments?.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.toDateString() === selectedDate.toDateString();
  }) || [];

  // Get appointments count for today
  const today = new Date();
  const todayAppointments = appointments?.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.toDateString() === today.toDateString();
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'bg-blue-100 text-blue-800';
      case 'em-andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluido':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600 mt-1">Gerencie suas consultas e horários</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <CreateAppointmentDialog>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus size={20} className="mr-2" />
              Nova Consulta
            </Button>
          </CreateAppointmentDialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Data Selecionada</p>
                <p className="text-2xl font-bold text-gray-900">{selectedDateAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{appointments?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>Calendário</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center space-x-2">
            <List size={16} />
            <span>Lista</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar size={24} className="text-blue-600" />
                    <span>Calendário</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AgendaCalendar 
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    appointments={appointments || []}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Side Panel - Selected Date Appointments */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Consultas para {selectedDate.toLocaleDateString('pt-BR')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))}
                    </div>
                  ) : selectedDateAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">
                              {appointment.patient.name}
                            </span>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Horário: {appointment.time}</p>
                            <p>Tipo: {appointment.type}</p>
                            {appointment.value && (
                              <p>Valor: R$ {appointment.value.toFixed(2)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
                      <p>Nenhuma consulta agendada para esta data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <List size={24} className="text-blue-600" />
                <span>Lista de Consultas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentsList appointments={appointments || []} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgendaView;
