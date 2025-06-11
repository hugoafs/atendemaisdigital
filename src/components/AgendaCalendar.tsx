
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/hooks/useAppointments';

interface AgendaCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  appointments: Appointment[];
}

const AgendaCalendar = ({ selectedDate, onSelectDate, appointments }: AgendaCalendarProps) => {
  // Get dates that have appointments
  const appointmentDates = appointments.map(appointment => 
    new Date(appointment.date).toDateString()
  );

  // Count appointments per date
  const appointmentCounts = appointments.reduce((acc, appointment) => {
    const dateString = new Date(appointment.date).toDateString();
    acc[dateString] = (acc[dateString] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const modifiers = {
    hasAppointments: (date: Date) => appointmentDates.includes(date.toDateString()),
  };

  const modifiersStyles = {
    hasAppointments: {
      position: 'relative',
    },
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onSelectDate(date)}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles as any}
        className="rounded-md border"
        components={{
          Day: ({ date, ...props }) => {
            const dateString = date.toDateString();
            const count = appointmentCounts[dateString];
            
            return (
              <div className="relative">
                <button {...props}>
                  {date.getDate()}
                  {count && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-blue-600 text-white"
                    >
                      {count}
                    </Badge>
                  )}
                </button>
              </div>
            );
          },
        }}
      />
      
      <div className="text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Dias com consultas agendadas</span>
        </div>
      </div>
    </div>
  );
};

export default AgendaCalendar;
