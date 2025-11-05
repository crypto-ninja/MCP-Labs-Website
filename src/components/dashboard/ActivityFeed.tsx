import { Calendar, Package, CheckCircle, Info } from 'lucide-react';

interface Activity {
  id: string;
  type: 'update' | 'release' | 'purchase' | 'info';
  title: string;
  description: string;
  date: string;
}

export default function ActivityFeed() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'release',
      title: 'GitHub MCP Server v1.3.0 Released',
      description: '9 new tools added: Repository Management (6) + PR Workflow (3)',
      date: 'November 4, 2025',
    },
    {
      id: '2',
      type: 'info',
      title: 'Welcome to MCP Labs Dashboard',
      description: 'Manage your licenses, view documentation, and get support all in one place.',
      date: 'Today',
    },
  ];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'release':
        return Package;
      case 'purchase':
        return CheckCircle;
      case 'update':
        return Calendar;
      default:
        return Info;
    }
  };

  const getColor = (type: Activity['type']) => {
    switch (type) {
      case 'release':
        return 'bg-blue-50 text-blue-600';
      case 'purchase':
        return 'bg-green-50 text-green-600';
      case 'update':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Updates</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          const color = getColor(activity.type);
          return (
            <div key={activity.id} className="flex gap-4">
              <div className={`flex-shrink-0 ${color} p-2 rounded-lg h-fit`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
