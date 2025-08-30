
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/hooks/useAppointments';
import { ptBR } from 'date-fns/locale';
import { parseAppointmentDate, dateToDBFormat, isSameDate } from '@/utils/dateUtils';

interface AgendaCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  appointments: Appointment[];
}

const AgendaCalendar = ({ selectedDate, onSelectDate, appointments }: AgendaCalendarProps) => {
  // Count appointments per date using Brazilian date parsing
  const appointmentCounts = appointments.reduce((acc, appointment) => {
    try {
      const appointmentDate = parseAppointmentDate(appointment.date);
      const dateKey = dateToDBFormat(appointmentDate); // Use YYYY-MM-DD as key for consistency
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      

    } catch (error) {
      console.error('Error parsing appointment date in calendar:', appointment.date, error);
    }
    return acc;
  }, {} as Record<string, number>);



  // Check if a date has appointments
  const hasAppointments = (date: Date): boolean => {
    const dateKey = dateToDBFormat(date);
    return (appointmentCounts[dateKey] || 0) > 0;
  };

  // Get appointment count for a specific date
  const getAppointmentCount = (date: Date): number => {
    const dateKey = dateToDBFormat(date);
    return appointmentCounts[dateKey] || 0;
  };

  const modifiers = {
    hasAppointments,
  };

  const modifiersClassNames = {
    hasAppointments: 'bg-blue-50 text-blue-900 font-medium border-blue-200',
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date) {
            onSelectDate(date);
          }
        }}
        locale={ptBR}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className="rounded-md border"
        components={{
          Day: ({ date, ...props }) => {
            const count = getAppointmentCount(date);
            const dateKey = dateToDBFormat(date);
            

            
            return (
              <button 
                {...props}
                className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                onClick={(e) => {
                  // Chamar o onClick original se existir
                  if (props.onClick) {
                    props.onClick(e);
                  }
                  // Também chamar onSelectDate diretamente
                  onSelectDate(date);
                }}
              >
                {date.getDate()}
                {count > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-blue-600 text-white rounded-full pointer-events-none flex items-center justify-center text-xs font-bold shadow-md border-2 border-white">
                    {count > 9 ? '9+' : count}
                  </div>
                )}
              </button>
            );
          },
        }}
      />
      
      <div className="text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded-full"></div>
            <span>Dias com consultas agendadas</span>
          </div>
          
          {/* Show appointment count for selected date */}
          {getAppointmentCount(selectedDate) > 0 && (
            <Badge variant="secondary" className="bg-blue-600 text-white">
              {getAppointmentCount(selectedDate)} consulta(s)
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaCalendar;
