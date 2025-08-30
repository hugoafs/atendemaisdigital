import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  UserPlus,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { usePatients } from '@/hooks/usePatients';
import { useMonthlyPatientStats } from '@/hooks/useAppointments';
import { useDeletePatient } from '@/hooks/useDeletePatient';
import CreatePatientDialog from '@/components/CreatePatientDialog';
import EditPatientDialog from '@/components/EditPatientDialog';
import CreateAppointmentDialog from '@/components/CreateAppointmentDialog';
import ModernLayout from '@/components/ModernLayout';
import ModernStatsCard from '@/components/ModernStatsCard';
import { formatDateBR, parseAppointmentDate, getCurrentDateBR } from '@/utils/dateUtils';
import { format, differenceInYears, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Patients = () => {
  const { data: patients, isLoading: patientsLoading } = usePatients();
  const { data: monthlyPatientStats, isLoading: monthlyLoading } = useMonthlyPatientStats();
  const deletePatientMutation = useDeletePatient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'active'>('all');

  // Filter patients based on search and filter type
  const filteredPatients = patients?.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone?.includes(searchTerm);

    if (!matchesSearch) return false;

    if (filterType === 'recent') {
      // Patients created in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(patient.created_at) >= thirtyDaysAgo;
    }

    return true;
  }) || [];

  // Calculate patient age
  const calculateAge = (birthDate: string | null): string => {
    if (!birthDate) return 'N/A';
    try {
      const birth = parseISO(birthDate);
      const age = differenceInYears(new Date(), birth);
      return `${age} anos`;
    } catch {
      return 'N/A';
    }
  };

  // Format creation date
  const formatCreationDate = (dateString: string): string => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  // Stats for the header
  const totalPatients = patients?.length || 0;
  const recentPatients = patients?.filter(patient => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(patient.created_at) >= thirtyDaysAgo;
  }).length || 0;

  const stats = [
    {
      title: 'Total de Pacientes',
      value: totalPatients,
      icon: Users,
      change: monthlyPatientStats ? `${monthlyPatientStats.patientsChange >= 0 ? '+' : ''}${monthlyPatientStats.patientsChange} este mês` : 'Carregando...',
      changeType: (monthlyPatientStats?.patientsChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Novos Pacientes',
      value: recentPatients,
      icon: UserPlus,
      change: 'Últimos 30 dias',
      changeType: 'neutral' as const,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Pacientes Ativos',
      value: totalPatients, // Todos são considerados ativos por enquanto
      icon: Activity,
      change: '100% dos pacientes',
      changeType: 'positive' as const,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
    },
  ];

  return (
    <ModernLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Pacientes
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie seus pacientes e histórico médico
            </p>
          </div>
          <CreatePatientDialog>
            <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12 px-6">
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </CreatePatientDialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {patientsLoading || monthlyLoading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))
        ) : (
          stats.map((stat, index) => (
            <ModernStatsCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 border-0 shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar pacientes por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                className="rounded-xl h-12"
              >
                Todos
              </Button>
              <Button
                variant={filterType === 'recent' ? 'default' : 'outline'}
                onClick={() => setFilterType('recent')}
                className="rounded-xl h-12"
              >
                Recentes
              </Button>
              <Button
                variant={filterType === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterType('active')}
                className="rounded-xl h-12"
              >
                Ativos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card className="border-0 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span>Lista de Pacientes</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {filteredPatients.length} {filteredPatients.length === 1 ? 'paciente' : 'pacientes'}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patientsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-xl">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Tente ajustar os termos de busca ou filtros.' 
                  : 'Cadastre seu primeiro paciente para começar.'
                }
              </p>
              {!searchTerm && (
                <CreatePatientDialog>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Primeiro Paciente
                  </Button>
                </CreatePatientDialog>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {patient.name.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Patient Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {patient.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {calculateAge(patient.birth_date)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            {patient.phone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <span>{patient.phone}</span>
                              </div>
                            )}
                            {patient.email && (
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-green-500" />
                                <span className="truncate">{patient.email}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-purple-500" />
                              <span>Desde {formatCreationDate(patient.created_at)}</span>
                            </div>
                          </div>
                          
                          {patient.address && (
                            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4 text-orange-500" />
                              <span className="truncate">{patient.address}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-lg">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <EditPatientDialog patient={patient}>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar Paciente
                              </DropdownMenuItem>
                            </EditPatientDialog>
                            <CreateAppointmentDialog defaultPatientId={patient.id}>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Agendar Consulta
                              </DropdownMenuItem>
                            </CreateAppointmentDialog>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => {
                                if (window.confirm(`Tem certeza que deseja excluir o paciente ${patient.name}?`)) {
                                  deletePatientMutation.mutate(patient.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir Paciente
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Patient Notes Preview */}
                    {patient.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          <span className="font-medium">Observações:</span> {patient.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ModernLayout>
  );
};

export default Patients;
