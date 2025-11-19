import { Code2, Package, FileText, GitPullRequest, File, Search, FolderTree, GitBranch, GitCommit, Workflow, PackageOpen, User, Lightbulb, Scale } from 'lucide-react';

export default function ToolsOverview() {
  const categories = [
    {
      icon: Code2,
      title: 'Code Execution',
      count: 1,
      color: 'gold',
      badge: 'REVOLUTIONARY',
      isNew: true,
      tools: ['execute_code - Execute TypeScript with access to all 41 GitHub tools']
    },
    {
      icon: Package,
      title: 'Repository Management',
      count: 7,
      color: 'blue',
      tools: [
        'Get repository info',
        'Create repository',
        'Update repository',
        'Delete repository',
        'Fork repository',
        'Search repositories',
        'List repository contents'
      ]
    },
    {
      icon: FileText,
      title: 'Issues',
      count: 4,
      color: 'red',
      tools: [
        'List issues',
        'Create issue',
        'Update issue',
        'Add issue comment'
      ]
    },
    {
      icon: GitPullRequest,
      title: 'Pull Requests',
      count: 7,
      color: 'green',
      tools: [
        'List pull requests',
        'Create pull request',
        'Merge pull request',
        'Get pull request details',
        'Update pull request',
        'Create PR review',
        'Close pull request'
      ]
    },
    {
      icon: File,
      title: 'Files',
      count: 5,
      color: 'purple',
      tools: [
        'Get file content',
        'Create file',
        'Update file',
        'Delete file',
        'Push multiple files'
      ]
    },
    {
      icon: Search,
      title: 'Search',
      count: 2,
      color: 'orange',
      tools: [
        'Search code',
        'Search issues'
      ]
    },
    {
      icon: FolderTree,
      title: 'Workspace',
      count: 3,
      color: 'teal',
      tools: [
        'Workspace grep (pattern search)',
        'String replace',
        'Read file chunks'
      ]
    },
    {
      icon: GitBranch,
      title: 'Remote Operations',
      count: 3,
      color: 'indigo',
      tools: [
        'Create branch',
        'List branches',
        'List commits'
      ]
    },
    {
      icon: GitCommit,
      title: 'Commits',
      count: 1,
      color: 'gray',
      tools: [
        'Get commit details'
      ]
    },
    {
      icon: Workflow,
      title: 'Workflows',
      count: 2,
      color: 'cyan',
      tools: [
        'List workflows',
        'Get workflow runs'
      ]
    },
    {
      icon: PackageOpen,
      title: 'Releases',
      count: 4,
      color: 'blue',
      tools: [
        'List releases',
        'Get latest release',
        'Get release by tag',
        'Create release'
      ]
    },
    {
      icon: User,
      title: 'Users',
      count: 1,
      color: 'pink',
      tools: [
        'Get user info'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Advisor',
      count: 1,
      color: 'yellow',
      tools: [
        'Suggest workflow optimization'
      ]
    },
    {
      icon: Scale,
      title: 'License',
      count: 1,
      color: 'slate',
      tools: [
        'Get license info'
      ]
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    gold: { bg: 'bg-gradient-to-br from-yellow-50 to-amber-50', text: 'text-yellow-700', border: 'border-yellow-300' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
    gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' }
  };

  const totalTools = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🐙 GitHub MCP Server
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All {totalTools} Comprehensive Tools
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Complete GitHub automation toolkit with revolutionary code-first execution
          </p>
          <p className="text-sm text-gray-500 mb-6">
            v2.1.0 - 14 categories, {totalTools} tools (November 2025)
          </p>

          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg">
            <span className="text-lg">⚡</span>
            <div className="text-left">
              <div className="text-sm font-bold">Revolutionary Code-First Execution</div>
              <div className="text-xs opacity-90">Instead of loading 41 tool definitions (70,000 tokens), v2.0 exposes ONE execute_code tool</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const colors = colorMap[category.color];
            const Icon = category.icon;
            const isRevolutionary = category.badge === 'REVOLUTIONARY';

            return (
              <div
                key={idx}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isRevolutionary ? 'ring-4 ring-yellow-300 relative overflow-hidden' : ''
                }`}
              >
                {isRevolutionary && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
                    {category.badge}
                  </div>
                )}
                {category.isNew && !isRevolutionary && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
                    NEW
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-10 h-10 ${colors.text} ${isRevolutionary ? 'animate-pulse' : ''}`} />
                  <span className={`${colors.text} font-bold text-lg`}>{category.count} {category.count === 1 ? 'tool' : 'tools'}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIdx) => (
                    <li key={toolIdx} className="text-gray-600 text-sm flex items-start gap-2">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} flex-shrink-0`}></span>
                      <span className={isRevolutionary ? 'font-semibold' : ''}>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            Total: <strong className="text-gray-900 text-lg">{totalTools} tools</strong> across <strong className="text-gray-900 text-lg">14 categories</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
