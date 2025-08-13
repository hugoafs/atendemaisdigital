import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  color = 'blue' 
}: StatsCardProps) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100',
      text: 'text-blue-600',
      shadow: 'shadow-blue-500/20'
    },
    green: {
      gradient: 'from-green-500 to-green-600',
      bg: 'from-green-50 to-green-100',
      text: 'text-green-600',
      shadow: 'shadow-green-500/20'
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      bg: 'from-purple-50 to-purple-100',
      text: 'text-purple-600',
      shadow: 'shadow-purple-500/20'
    },
    orange: {
      gradient: 'from-orange-500 to-orange-600',
      bg: 'from-orange-50 to-orange-100',
      text: 'text-orange-600',
      shadow: 'shadow-orange-500/20'
    },
  };

  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  const currentColor = colorClasses[color];

  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl overflow-hidden group ${currentColor.shadow}`}>
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${currentColor.bg} p-6 relative`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
                {value}
              </p>
            </div>
            <div className={`w-14 h-14 bg-gradient-to-br ${currentColor.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        {/* Footer with change indicator */}
        {change && (
          <div className="px-6 py-4 bg-white">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${changeColors[changeType]}`}>
              {changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
              {changeType === 'negative' && <TrendingDown className="h-3 w-3 mr-1" />}
              {change}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;