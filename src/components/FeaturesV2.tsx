import { Code2, Shield, Search, FileCode } from 'lucide-react';

export default function FeaturesV2() {
  const features = [
    {
      icon: Code2,
      title: 'Code-First Execution',
      description: '98% token reduction (70,000 → 800 tokens)',
      highlights: [
        'Execute TypeScript with full tool access',
        'One tool replaces 41 in context',
        'Dramatically faster AI responses'
      ],
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Deno Runtime Sandbox',
      description: 'Secure TypeScript execution',
      highlights: [
        'Filesystem & network isolation',
        '30-second timeout protection',
        'Enterprise-grade security'
      ],
      color: 'green'
    },
    {
      icon: Search,
      title: 'Intelligent Tool Discovery',
      description: 'Discover tools on-demand',
      highlights: [
        'listAvailableTools() - discover on-demand',
        'searchTools(query) - find relevant tools',
        'getToolInfo(name) - get complete schemas'
      ],
      color: 'purple'
    },
    {
      icon: FileCode,
      title: 'Type-Safe Wrappers',
      description: 'Auto-generated from Python',
      highlights: [
        'Full TypeScript type safety',
        '13 categories, 42 tools',
        'Zero configuration required'
      ],
      color: 'orange'
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-900', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', text: 'text-green-900', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-900', icon: 'text-purple-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-900', icon: 'text-orange-600' }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Revolutionary Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            v2.0 Architecture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete reimagining of how MCP servers work. Code-first execution changes everything.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];
            return (
              <div
                key={idx}
                className={`${colors.bg} rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-6 ring-2 ring-white shadow-lg`}>
                  <Icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-medium mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')} flex-shrink-0`}></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              The Performance Breakthrough
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Traditional MCP servers load all tool definitions into Claude's context, consuming massive amounts of tokens.
              v2.0's code-first approach uses <strong>ONE</strong> execute_code tool, reducing token usage by 98% while maintaining full functionality.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">70,000</div>
                <div className="text-sm text-gray-600">Tokens (v1.0)</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-400">→</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">800</div>
                <div className="text-sm text-gray-600">Tokens (v2.0)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
