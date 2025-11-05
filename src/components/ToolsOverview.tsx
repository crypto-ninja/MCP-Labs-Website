import { Package, Bug, GitPullRequest, Zap, Search, Tag, User } from 'lucide-react';

export default function ToolsOverview() {
  const categories = [
    {
      icon: Package,
      title: 'Repository Management',
      count: 3,
      color: 'blue',
      tools: ['Create repos', 'Fork repos', 'List repositories']
    },
    {
      icon: Bug,
      title: 'Issue Management',
      count: 3,
      color: 'red',
      tools: ['Create issues', 'Update issues', 'Search issues']
    },
    {
      icon: GitPullRequest,
      title: 'Pull Request Operations',
      count: 3,
      color: 'purple',
      tools: ['Create PRs', 'Review PRs', 'Merge PRs']
    },
    {
      icon: Zap,
      title: 'GitHub Actions',
      count: 2,
      color: 'yellow',
      tools: ['Trigger workflows', 'Monitor runs']
    },
    {
      icon: Search,
      title: 'Search & Discovery',
      count: 2,
      color: 'green',
      tools: ['Code search', 'Repository search']
    },
    {
      icon: Tag,
      title: 'Release Management',
      count: 2,
      color: 'indigo',
      tools: ['Create releases', 'List releases']
    },
    {
      icon: User,
      title: 'User Information',
      count: 1,
      color: 'pink',
      tools: ['User profiles']
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  };

  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🐙 GitHub MCP Server
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            31 Comprehensive Tools
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Everything you need for GitHub automation in one powerful server
          </p>
          <p className="text-sm text-gray-500">
            Updated in v1.3.0 - 9 new tools added (Nov 2025)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const colors = colorMap[category.color];
            const Icon = category.icon;
            return (
              <div
                key={idx}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-10 h-10 ${colors.text}`} />
                  <span className={`${colors.text} font-bold text-lg`}>{category.count} tools</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIdx) => (
                    <li key={toolIdx} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`}></span>
                      {tool}
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
