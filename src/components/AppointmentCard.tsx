
import { Clock, User, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUpdateAppointmentStatus } from '@/hooks/useUpdateAppointmentStatus';
import { formatTimeBR } from '@/utils/dateUtils';

interface AppointmentCardProps {
  id: string;
  patientName: string;
  time: string;
  date: string;
  type: 'particular' | 'plano';
  status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
  value?: number;
}

const AppointmentCard = ({ 
  id,
  patientName, 
  time, 
  date, 
  type, 
  status, 
  value 
}: AppointmentCardProps) => {
  const updateStatus = useUpdateAppointmentStatus();

  const statusColors = {
    agendado: 'bg-blue-100 text-blue-800 border-blue-200',
    'em-andamento': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    concluido: 'bg-green-100 text-green-800 border-green-200',
    cancelado: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusLabels = {
    agendado: 'Agendado',
    'em-andamento': 'Em Andamento',
    concluido: 'Concluído',
    cancelado: 'Cancelado',
  };

  const handleStatusChange = (newStatus: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado') => {
    updateStatus.mutate({ appointmentId: id, newStatus });
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {type}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User size={16} className="text-gray-500" />
            <span className="font-medium text-gray-900">{patientName}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-gray-600">{date} às {formatTimeBR(time)}</span>
          </div>
          
          {value && (
            <div className="flex items-center space-x-2">
              <DollarSign size={16} className="text-gray-500" />
              <span className="text-gray-600">R$ {value.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 mt-4">
          {status === 'agendado' && (
            <>
              <Button 
                size="sm" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => handleStatusChange('em-andamento')}
                disabled={updateStatus.isPending}
              >
                Iniciar
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => handleStatusChange('cancelado')}
                disabled={updateStatus.isPending}
              >
                Cancelar
              </Button>
            </>
          )}
          {status === 'em-andamento' && (
            <Button 
              size="sm" 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => handleStatusChange('concluido')}
              disabled={updateStatus.isPending}
            >
              Finalizar
            </Button>
          )}
          {status === 'concluido' && (
            <Button size="sm" variant="outline" className="w-full">
              Ver Detalhes
            </Button>
          )}
          {status === 'cancelado' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={() => handleStatusChange('agendado')}
              disabled={updateStatus.isPending}
            >
              Reagendar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
