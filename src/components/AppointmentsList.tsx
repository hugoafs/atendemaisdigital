
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { parseAppointmentDate, formatTimeBR } from '@/utils/dateUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, User, Calendar, MapPin } from 'lucide-react';
import { Appointment } from '@/hooks/useAppointments';
import { useUpdateAppointmentStatus } from '@/hooks/useUpdateAppointmentStatus';

interface AppointmentsListProps {
  appointments: Appointment[];
  isLoading: boolean;
}

const AppointmentsList = ({ appointments, isLoading }: AppointmentsListProps) => {
  const updateStatus = useUpdateAppointmentStatus();

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'Agendado';
      case 'em-andamento':
        return 'Em Andamento';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado') => {
    updateStatus.mutate({ appointmentId, newStatus });
  };

  // Sort appointments by date and time using Brazilian date parsing
  const sortedAppointments = appointments.sort((a, b) => {
    const dateA = parseAppointmentDate(a.date);
    const dateB = parseAppointmentDate(b.date);
    
    // Se as datas são iguais, comparar horários
    if (dateA.getTime() === dateB.getTime()) {
      const timeA = formatTimeBR(a.time);
      const timeB = formatTimeBR(b.time);
      return timeA.localeCompare(timeB);
    }
    
    return dateA.getTime() - dateB.getTime();
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma consulta encontrada</h3>
        <p className="text-gray-500">Você ainda não possui consultas agendadas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedAppointments.map((appointment) => (
        <Card key={appointment.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <User size={20} className="text-blue-600" />
                    <span>{appointment.patient.name}</span>
                  </h3>
                  <Badge className={getStatusColor(appointment.status)}>
                    {getStatusText(appointment.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>
                      {format(parseAppointmentDate(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{formatTimeBR(appointment.time)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{appointment.type === 'particular' ? 'Particular' : 'Plano'}</span>
                  </div>

                  {appointment.value && (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-medium">
                        R$ {appointment.value.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {appointment.notes && (
                    <div className="col-span-full">
                      <p className="text-gray-600 italic">"{appointment.notes}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto">
                {appointment.status === 'agendado' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(appointment.id, 'em-andamento')}
                      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                    >
                      Iniciar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(appointment.id, 'cancelado')}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Cancelar
                    </Button>
                  </>
                )}

                {appointment.status === 'em-andamento' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(appointment.id, 'concluido')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Finalizar
                  </Button>
                )}

                {appointment.status === 'cancelado' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(appointment.id, 'agendado')}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Reagendar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;
