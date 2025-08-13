import AppLayout from '@/components/layouts/AppLayout';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <AppLayout 
      title="Dashboard" 
      subtitle="Visão geral do seu consultório"
    >
      <Dashboard />
    </AppLayout>
  );
};

export default Index;