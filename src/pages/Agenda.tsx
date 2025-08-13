import AppLayout from '@/components/layouts/AppLayout';
import AgendaView from '@/components/AgendaView';

const Agenda = () => {
  return (
    <AppLayout 
      title="Agenda" 
      subtitle="Gerencie seus compromissos e consultas"
    >
      <AgendaView />
    </AppLayout>
  );
};

export default Agenda;