import { Brain, Server, LineChart } from 'lucide-react';

export default function UseCases() {
  const useCases = [
    {
      icon: Brain,
      title: 'AI Development Teams',
      description: 'Supercharge your AI assistants with comprehensive GitHub access',
      features: [
        'Automated code review',
        'Intelligent issue triage',
        'Pattern discovery',
        'Context-aware suggestions'
      ],
      color: 'purple'
    },
    {
      icon: Server,
      title: 'DevOps Engineers',
      description: 'Streamline your CI/CD and deployment workflows',
      features: [
        'CI/CD monitoring',
        'Deployment tracking',
        'Build automation',
        'Infrastructure updates'
      ],
      color: 'blue'
    },
    {
      icon: LineChart,
      title: 'Project Managers',
      description: 'Gain visibility and control over your development process',
      features: [
        'Sprint planning',
        'Release management',
        'Team coordination',
        'Progress tracking'
      ],
      color: 'green'
    }
  ];

  const colorMap: Record<string, { gradient: string; icon: string }> = {
    purple: { gradient: 'from-purple-500 to-purple-600', icon: 'text-purple-600' },
    blue: { gradient: 'from-blue-500 to-blue-600', icon: 'text-blue-600' },
    green: { gradient: 'from-green-500 to-green-600', icon: 'text-green-600' },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built for Modern Development Teams
          </h2>
          <p className="text-xl text-gray-600">
            Whether you're building AI tools, managing infrastructure, or coordinating teams
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => {
            const colors = colorMap[useCase.color];
            const Icon = useCase.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <ul className="space-y-3">
                  {useCase.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')}`}></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
