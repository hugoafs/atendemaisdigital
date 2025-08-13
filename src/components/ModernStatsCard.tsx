import { LucideIcon, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ModernStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change: string;
  changeType: 'positive' | 'negative';
  gradient: string;
  bgGradient: string;
}

const ModernStatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType,
  gradient,
  bgGradient 
}: ModernStatsCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-1 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {value}
            </p>
            <div className="flex items-center mt-2">
              <TrendingUp className={`h-4 w-4 mr-1 ${
                changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
      <div className={`h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    </Card>
  );
};

export default ModernStatsCard;
