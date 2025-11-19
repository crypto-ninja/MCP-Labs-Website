import { Code2, Shield, FileCode, Search, CheckCircle, Zap } from 'lucide-react';

export default function FeaturesV2() {
  const features = [
    {
      icon: Code2,
      title: 'Code-First Execution',
      version: 'v2.0',
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
      version: 'v2.0',
      description: 'Secure TypeScript execution',
      highlights: [
        'Filesystem & network isolation',
        '30-second timeout protection',
        'Enterprise-grade security'
      ],
      color: 'green'
    },
    {
      icon: FileCode,
      title: 'TypeScript Wrappers',
      version: 'v2.0',
      description: 'Auto-generated from Python',
      highlights: [
        'Full TypeScript type safety',
        '14 categories, 42 tools',
        'Zero configuration required'
      ],
      color: 'orange'
    },
    {
      icon: Search,
      title: 'Tool Discovery Functions',
      version: 'v2.1',
      description: 'Discover tools on-demand',
      highlights: [
        'listAvailableTools() - discover on-demand',
        'searchTools(query) - find relevant tools',
        'getToolInfo(name) - get complete schemas'
      ],
      color: 'purple'
    }
  ];

  const additionalFeatures = [
    { text: '42 Tools Across 14 Categories', icon: CheckCircle },
    { text: 'Type-Safe with Full TypeScript Support', icon: CheckCircle },
    { text: 'Security: Filesystem & Network Isolation', icon: CheckCircle },
    { text: 'Backward Compatible with v1.x', icon: CheckCircle }
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
            v2.0/v2.1 Feature Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete reimagining of how MCP servers work. Code-first execution changes everything.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];
            return (
              <div
                key={idx}
                className={`${colors.bg} rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative`}
              >
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white shadow-md border-2 border-gray-200">
                    {feature.version === 'v2.1' ? (
                      <span className="text-purple-600">NEW {feature.version}</span>
                    ) : (
                      <span className="text-blue-600">{feature.version}</span>
                    )}
                  </span>
                </div>
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

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Additional Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {additionalFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-200">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Latest: v2.1.0 - Enhanced Tool Discovery
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>listAvailableTools()</strong> - Discover all tools on-demand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>searchTools(query)</strong> - Find relevant tools by keyword</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>getToolInfo(name)</strong> - Get complete tool schemas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>Zero failed tool calls</strong> from discovery issues</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
