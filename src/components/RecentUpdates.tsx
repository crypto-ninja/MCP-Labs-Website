import { Github, ArrowRight } from 'lucide-react';

export default function RecentUpdates() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Latest Release
            </div>
            <span className="text-gray-600 font-mono">v2.1.0</span>
            <span className="text-gray-500 text-sm">November 4, 2025</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            9 New Tools Added (22 → 31 Tools)
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Our latest release significantly expands the GitHub MCP Server with 9 new tools,
            bringing the total from 22 to <strong>31 powerful tools</strong>. This update focuses on
            comprehensive repository management and advanced PR workflow automation.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-blue-900 mb-2">
              <strong>What's New in v2.1.0</strong>
            </p>
            <ul className="text-blue-900 space-y-1 ml-4">
              <li>• Repository Management: 6 new tools for complete repo control</li>
              <li>• PR Workflow: 3 new tools for advanced review automation</li>
              <li>• Enhanced team and permission management</li>
              <li>• Improved file operations and branch protection</li>
            </ul>
          </div>

          <a
            href="https://github.com/crypto-ninja/github-mcp-server/releases/tag/v2.1.0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            <Github className="w-5 h-5" />
            View on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
