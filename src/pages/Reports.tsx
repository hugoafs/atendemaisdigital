import { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Award,
  Target,
  Activity,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModernLayout from '@/components/ModernLayout';
import ModernStatsCard from '@/components/ModernStatsCard';
import { 
  useMonthlyRevenue, 
  useWeeklyAppointments, 
  useAppointmentStatusStats,
  useTopPatients,
  useFinancialSummary 
} from '@/hooks/useReportsData';
import { useDashboardStats } from '@/hooks/useAppointments';
import { formatDateBR, getCurrentDateBR } from '@/utils/dateUtils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  });
  
  // Data hooks
  const { data: monthlyRevenue, isLoading: monthlyLoading } = useMonthlyRevenue(selectedMonth);
  const { data: weeklyAppointments, isLoading: weeklyLoading } = useWeeklyAppointments();
  const { data: statusStats, isLoading: statusLoading } = useAppointmentStatusStats(selectedMonth);
  const { data: topPatients, isLoading: topPatientsLoading } = useTopPatients(selectedMonth);
  const { data: financialSummary, isLoading: financialLoading } = useFinancialSummary(selectedMonth);
  const { data: dashboardStats, isLoading: dashboardLoading } = useDashboardStats();

  // Main stats for header
  const mainStats = [
    {
      title: 'Receita Total',
      value: `R$ ${(financialSummary?.totalRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      change: `${financialSummary?.monthlyChange >= 0 ? '+' : ''}${(financialSummary?.monthlyChange || 0).toFixed(1)}% vs mês anterior`,
      changeType: (financialSummary?.monthlyChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Consultas Realizadas',
      value: statusStats?.find(s => s.status === 'Concluído')?.count || 0,
      icon: Calendar,
      change: `${statusStats?.find(s => s.status === 'Concluído')?.percentage || 0}% do total`,
      changeType: 'positive' as const,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Taxa de Presença',
      value: `${dashboardStats?.todayAttendanceRate || 0}%`,
      icon: Target,
      change: 'Baseado em consultas concluídas',
      changeType: 'neutral' as const,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
    },
    {
      title: 'Receita Particular',
      value: `${financialSummary?.particularPercentage.toFixed(1) || 0}%`,
      icon: CreditCard,
      change: `R$ ${(financialSummary?.particularRevenue || 0).toFixed(2)} do total`,
      changeType: 'neutral' as const,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <ModernLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Relatórios
            </h1>
            <p className="text-gray-600 mt-2">
              Análise completa do seu consultório - {(() => {
                const [year, month] = selectedMonth.split('-');
                const date = new Date(parseInt(year), parseInt(month) - 1, 1);
                return format(date, "MMMM 'de' yyyy", { locale: ptBR });
              })()}
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Select 
              value={selectedMonth} 
              onValueChange={(value) => setSelectedMonth(value)}
            >
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const now = new Date();
                  const year = now.getFullYear();
                  const month = i + 1;
                  const value = `${year}-${month.toString().padStart(2, '0')}`;
                  const label = format(new Date(year, i), 'MMMM yyyy', { locale: ptBR });
                  return (
                    <SelectItem key={value} value={value}>
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            
            <Select value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {financialLoading || statusLoading || dashboardLoading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))
        ) : (
          mainStats.map((stat, index) => (
            <ModernStatsCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Revenue Chart */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <span>Receita Mensal</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {new Date().getFullYear()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {monthlyRevenue?.slice(-6).map((month, index) => (
                    <div key={index} className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-800">{month.month}</div>
                      <div className="text-lg font-bold text-green-600">
                        R$ {month.revenue.toFixed(2)}
                      </div>
                      <div className="text-xs text-green-600">
                        {month.appointments} consultas
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Simple Bar Chart Representation */}
                <div className="mt-6">
                  <div className="flex items-end space-x-2 h-32">
                    {monthlyRevenue?.slice(-6).map((month, index) => {
                      const maxRevenue = Math.max(...(monthlyRevenue?.map(m => m.revenue) || [0]));
                      const height = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
                      
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-md min-h-[4px]"
                            style={{ height: `${Math.max(height, 4)}%` }}
                          />
                          <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
                            {month.month}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointment Status Distribution */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <PieChart className="h-4 w-4 text-white" />
              </div>
              <span>Status das Consultas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statusLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {statusStats?.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: stat.color }}
                      />
                      <span className="font-medium text-gray-900">{stat.status}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{stat.count} consultas</span>
                      <Badge variant="secondary" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                        {stat.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {/* Simple Pie Chart Representation */}
                <div className="mt-6 flex justify-center">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center relative overflow-hidden">
                    {statusStats?.map((stat, index) => {
                      const prevPercentages = statusStats.slice(0, index).reduce((sum, s) => sum + s.percentage, 0);
                      const rotation = (prevPercentages / 100) * 360;
                      const percentage = stat.percentage;
                      
                      return (
                        <div
                          key={index}
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `conic-gradient(from ${rotation}deg, ${stat.color} 0deg, ${stat.color} ${(percentage / 100) * 360}deg, transparent ${(percentage / 100) * 360}deg)`,
                          }}
                        />
                      );
                    })}
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {statusStats?.reduce((sum, s) => sum + s.count, 0) || 0}
                        </div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Patients */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <span>Top Pacientes</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Por Consultas
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPatientsLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topPatients?.slice(0, 8).map((patient: any, index) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {patient.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-600">
                          {patient.completedAppointments} consultas concluídas
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        #{index + 1}
                      </Badge>
                      <div className="text-sm font-medium text-green-600">
                        R$ {patient.totalRevenue.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financial Breakdown */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span>Resumo Financeiro</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {financialLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Period Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="text-sm text-blue-600 font-medium">Este Mês</div>
                    <div className="text-2xl font-bold text-blue-900">
                      R$ {(financialSummary?.thisMonth || 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 font-medium">Mês Anterior</div>
                    <div className="text-2xl font-bold text-gray-900">
                      R$ {(financialSummary?.lastMonth || 0).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Distribuição por Tipo</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Particular</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-900">
                          R$ {(financialSummary?.particularRevenue || 0).toFixed(2)}
                        </div>
                        <div className="text-sm text-green-600">
                          {financialSummary?.particularPercentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Plano de Saúde</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-900">
                          R$ {(financialSummary?.planoRevenue || 0).toFixed(2)}
                        </div>
                        <div className="text-sm text-blue-600">
                          {(100 - (financialSummary?.particularPercentage || 0)).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Year Summary */}
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                  <div className="text-sm font-medium text-purple-100">Receita Anual</div>
                  <div className="text-3xl font-bold">
                    R$ {(financialSummary?.thisYear || 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-purple-100">
                    Acumulado em {format(getCurrentDateBR(), "yyyy", { locale: ptBR })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card className="border-0 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span>Tendências Semanais</span>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Últimas 4 Semanas
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weeklyLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weeklyAppointments?.map((week, index) => (
                <div key={index} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">{week.week}</div>
                    <div className="text-xs text-gray-500 mb-3">{week.fullWeek}</div>
                    
                    <div className="space-y-2">
                      <div className="text-lg font-bold text-gray-900">{week.total}</div>
                      <div className="text-xs text-gray-600">Total</div>
                      
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        <div className="text-green-600">✓ {week.completed}</div>
                        <div className="text-blue-600">○ {week.pending}</div>
                        <div className="text-red-600">✗ {week.cancelled}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ModernLayout>
  );
};

export default Reports;
