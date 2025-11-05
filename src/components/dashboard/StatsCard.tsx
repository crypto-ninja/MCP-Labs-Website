import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'orange';
  subtitle?: string;
}

export default function StatsCard({ title, value, icon: Icon, color, subtitle }: StatsCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`${colors.bg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}
