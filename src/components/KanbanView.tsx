import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Appointment } from '@/hooks/useAppointments';
import { useUpdateAppointmentStatus } from '@/hooks/useUpdateAppointmentStatus';
import CreateAppointmentDialog from './CreateAppointmentDialog';

interface KanbanViewProps {
  appointments: Appointment[];
  viewMode: 'week' | 'day';
  selectedDate: Date;
}

interface KanbanColumn {
  id: string;
  title: string;
  status: string;
  color: string;
}

const KanbanView = ({ appointments, viewMode, selectedDate }: KanbanViewProps) => {
  const [draggedAppointment, setDraggedAppointment] = useState<Appointment | null>(null);
  const updateStatusMutation = useUpdateAppointmentStatus();
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: 'agendado', title: 'Agendado', status: 'agendado', color: 'bg-blue-500' },
    { id: 'em-andamento', title: 'Em Andamento', status: 'em-andamento', color: 'bg-yellow-500' },
    { id: 'concluido', title: 'Concluído', status: 'concluido', color: 'bg-green-500' },
    { id: 'cancelado', title: 'Cancelado', status: 'cancelado', color: 'bg-red-500' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em-andamento':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'concluido':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toDateString();
    return appointments.filter(appointment => 
      new Date(appointment.date).toDateString() === dateString
    );
  };

  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDates.push(day);
    }
    return weekDates;
  };

  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Adicionar feedback visual
    const target = e.currentTarget as HTMLElement;
    target.classList.add('bg-blue-50', 'border-blue-300');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('bg-blue-50', 'border-blue-300');
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    
    if (draggedAppointment) {
      console.log(`Movendo consulta ${draggedAppointment.id} para status: ${targetStatus}`);
      
      // Atualizar o status no Supabase
      updateStatusMutation.mutate({
        appointmentId: draggedAppointment.id,
        newStatus: targetStatus as 'agendado' | 'em-andamento' | 'concluido' | 'cancelado'
      });
    }
    
    setDraggedAppointment(null);
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };



    const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate);
    
    return (
      <div className="space-y-4">
        {/* Header do dia com navegação */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousDay}
                className="p-1 h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 h-8 px-3"
              >
                Hoje
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextDay}
                className="p-1 h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {dayAppointments.length} consulta(s) agendada(s)
              </p>
            </div>
          </div>
          <CreateAppointmentDialog>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </CreateAppointmentDialog>
        </div>

        {/* Kanban com status como colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => {
            const columnAppointments = dayAppointments.filter(
              appointment => appointment.status === column.status
            );
            
            return (
              <div
                key={column.id}
                className="bg-gray-50 rounded-lg p-4 min-h-[400px] border-2 border-transparent transition-colors"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${column.color} mr-2`}></div>
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  </div>
                  <Badge variant="secondary" className="bg-white">
                    {columnAppointments.length}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {columnAppointments
                    .sort((a, b) => a.time.localeCompare(b.time)) // Ordenar por horário
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        draggable={!updateStatusMutation.isPending}
                        onDragStart={(e) => handleDragStart(e, appointment)}
                        className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-move ${
                          updateStatusMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {/* Horário em destaque */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="font-bold text-lg text-gray-900">
                              {appointment.time}
                            </span>
                          </div>
                          <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                            {appointment.status}
                          </Badge>
                        </div>

                        {/* Nome do paciente */}
                        <div className="mb-2">
                          <h4 className="font-semibold text-sm text-gray-900">
                            {appointment.patient?.name || `Paciente ${appointment.patient_id}`}
                          </h4>
                        </div>

                        {/* Informações adicionais */}
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            <span>{appointment.type}</span>
                          </div>
                          {appointment.value && (
                            <div className="font-semibold text-green-600">
                              R$ {appointment.value.toFixed(2)}
                            </div>
                          )}
                          {appointment.notes && (
                            <div className="text-gray-500 italic">
                              "{appointment.notes}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  {columnAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-gray-300" />
                      Nenhuma consulta
                    </div>
                  )}
                </div>
                
                {column.status === 'agendado' && (
                  <div className="mt-4">
                    <CreateAppointmentDialog>
                      <Button size="sm" variant="outline" className="w-full">
                        <Plus className="h-3 w-3 mr-1" />
                        Nova Consulta
                      </Button>
                    </CreateAppointmentDialog>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

    const renderWeekView = () => {
    const weekDates = getWeekDates(selectedDate);
    
    return (
      <div className="space-y-4">
        {/* Header da semana */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Semana de {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          <CreateAppointmentDialog>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </CreateAppointmentDialog>
        </div>

        {/* Kanban com dias como colunas */}
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date) => {
            const dayAppointments = getAppointmentsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            
            return (
              <div
                key={date.toDateString()}
                className={`bg-gray-50 rounded-xl p-4 min-h-[600px] border-2 transition-all duration-200 ${
                  isToday 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : isSelected 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'agendado')} // Por enquanto, sempre para agendado
              >
                {/* Header do dia */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold text-gray-900">
                        {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </span>
                    </div>
                    {isToday && (
                      <Badge className="bg-blue-500 text-white text-xs">Hoje</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="bg-white text-gray-700">
                      {dayAppointments.length} consulta(s)
                    </Badge>
                  </div>
                </div>

                {/* Lista de consultas do dia */}
                <div className="space-y-3">
                  {dayAppointments.length > 0 ? (
                    dayAppointments
                      .sort((a, b) => a.time.localeCompare(b.time)) // Ordenar por horário
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          draggable={!updateStatusMutation.isPending}
                          onDragStart={(e) => handleDragStart(e, appointment)}
                          className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-move ${
                            updateStatusMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {/* Horário */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-blue-600" />
                              <span className="font-semibold text-sm text-gray-900">
                                {appointment.time}
                              </span>
                            </div>
                            <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                              {appointment.status}
                            </Badge>
                          </div>

                          {/* Nome do paciente */}
                          <div className="mb-2">
                            <h4 className="font-medium text-sm text-gray-900">
                              {appointment.patient?.name || `Paciente ${appointment.patient_id}`}
                            </h4>
                          </div>

                          {/* Informações adicionais */}
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              <span>{appointment.type}</span>
                            </div>
                            {appointment.value && (
                              <div className="font-semibold text-green-600">
                                R$ {appointment.value.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-gray-300" />
                      <p className="text-xs">Nenhuma consulta</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {viewMode === 'day' ? renderDayView() : renderWeekView()}
    </div>
  );
};

export default KanbanView;
