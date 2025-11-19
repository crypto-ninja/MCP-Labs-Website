import { Star, Rocket, BookOpen, Lock, Zap, MessageCircle } from 'lucide-react';

export default function Trust() {
  const reasons = [
    {
      icon: Star,
      title: '42 Comprehensive Tools',
      description: 'Complete GitHub API coverage in one unified server'
    },
    {
      icon: Rocket,
      title: 'Production-Ready Code',
      description: 'Battle-tested in real-world AI development workflows'
    },
    {
      icon: BookOpen,
      title: 'Complete Documentation',
      description: 'Every tool documented with examples and best practices'
    },
    {
      icon: Lock,
      title: 'Secure & Tested',
      description: 'Security-first design with comprehensive test coverage'
    },
    {
      icon: Zap,
      title: 'Revolutionary Performance',
      description: 'v2.1.0 with 98% token reduction and tool discovery'
    },
    {
      icon: MessageCircle,
      title: 'Responsive Support',
      description: 'Direct access to the team building the product'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Developers Trust MCP Labs
          </h2>
          <p className="text-xl text-gray-600">
            Built by developers who use it every day
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
