
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

  const modifiersClassNames = {
    hasAppointments: 'bg-blue-50 text-blue-900 font-medium border-blue-200',
  };

  console.log('AgendaCalendar - Selected date:', selectedDate);
  console.log('AgendaCalendar - Appointments:', appointments.length);
  console.log('AgendaCalendar - Appointment dates:', appointmentDates);

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          console.log('Calendar date selected:', date);
          if (date) {
            onSelectDate(date);
          }
        }}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className="rounded-md border"
        components={{
          Day: ({ date, ...props }) => {
            const dateString = date.toDateString();
            const count = appointmentCounts[dateString];
            
            return (
              <div className="relative">
                <button 
                  {...props}
                  className={`${props.className} relative h-9 w-9 p-0 font-normal aria-selected:opacity-100`}
                >
                  {date.getDate()}
                  {count && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {count}
                    </div>
                  )}
                </button>
              </div>
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
          {appointmentCounts[selectedDate.toDateString()] && (
            <Badge variant="secondary" className="bg-blue-600 text-white">
              {appointmentCounts[selectedDate.toDateString()]} consulta(s)
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaCalendar;
