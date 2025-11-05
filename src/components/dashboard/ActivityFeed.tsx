import { Calendar, Package, CheckCircle, Info, Sparkles } from 'lucide-react';

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
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'purchase':
        return 'bg-green-50 text-green-600 border-green-100';
      case 'update':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-blue-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Activity</h3>
        <p className="text-sm text-gray-600 max-w-sm mx-auto">
          Your activity feed will show updates about new releases, purchases, and important notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Recent Updates</h2>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          {activities.length} new
        </span>
      </div>
      <div className="space-y-4" role="feed" aria-label="Activity feed">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          const color = getColor(activity.type);
          return (
            <article
              key={activity.id}
              className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
              role="article"
              aria-label={activity.title}
            >
              <div className={`flex-shrink-0 ${color} p-2.5 rounded-lg h-fit border transition-transform duration-200 group-hover:scale-110`}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                <time className="text-xs text-gray-500 mt-2 inline-block" dateTime={activity.date}>
                  {activity.date}
                </time>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
