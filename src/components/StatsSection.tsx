import { Package, Boxes, TrendingDown, Zap, Tag, Clock } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Package,
      value: '42',
      label: 'Total Tools',
      color: 'blue',
      highlight: true
    },
    {
      icon: Boxes,
      value: '14',
      label: 'Categories',
      color: 'green',
      highlight: false
    },
    {
      icon: TrendingDown,
      value: '98%',
      label: 'Token Reduction',
      color: 'orange',
      highlight: true
    },
    {
      icon: Zap,
      value: '1',
      label: 'Execute Tool (replaces 41)',
      color: 'yellow',
      highlight: true
    },
    {
      icon: Tag,
      value: 'v2.1.0',
      label: 'Latest Version',
      color: 'purple',
      highlight: false
    },
    {
      icon: Clock,
      value: '2s',
      label: 'Initialization (vs 45s)',
      color: 'teal',
      highlight: false
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; ring: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', ring: 'ring-blue-300' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', ring: 'ring-green-300' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', ring: 'ring-orange-300' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', ring: 'ring-yellow-300' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', ring: 'ring-purple-300' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', ring: 'ring-teal-300' }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            By the Numbers
          </h2>
          <p className="text-lg text-gray-600">
            Revolutionary performance metrics that set us apart
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const colors = colorMap[stat.color];
            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  stat.highlight ? `ring-4 ${colors.ring}` : ''
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg} rounded-full mb-3 ${colors.border} border-2`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className={`text-3xl md:text-4xl font-bold ${colors.text} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
          <div className="text-center">
            <p className="text-gray-700 text-lg mb-4">
              <strong className="text-gray-900">Claude writes TypeScript that calls tools on-demand.</strong> This architectural shift eliminates the need to load all tool definitions into context, dramatically reducing token usage and improving response times.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Production-ready since v2.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
