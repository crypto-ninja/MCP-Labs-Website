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
            <span className="text-gray-500 text-sm">November 19, 2025</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Revolutionary Code-First Execution + Tool Discovery
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            GitHub MCP Server v2.1.0 introduces intelligent tool discovery on top of our revolutionary code-first architecture.
            Access all <strong>42 GitHub tools</strong> through ONE execute_code tool with <strong>98% token reduction</strong> -
            plus new discovery functions that eliminate failed tool calls.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-blue-900 mb-2">
              <strong>What's New in v2.1.0</strong>
            </p>
            <ul className="text-blue-900 space-y-1 ml-4">
              <li>• Tool Discovery: listAvailableTools(), searchTools(), getToolInfo()</li>
              <li>• Zero failed tool calls from discovery issues</li>
              <li>• 42 tools accessible on-demand (not loaded in context)</li>
              <li>• Maintains 98% token savings from v2.0</li>
              <li>• Complete type information for every tool</li>
            </ul>
            <p className="text-blue-900 mt-4 mb-2">
              <strong>v2.0 Features (November 18, 2025):</strong>
            </p>
            <ul className="text-blue-900 space-y-1 ml-4">
              <li>• Code-First Execution: 98% token reduction (70,000 → 800 tokens)</li>
              <li>• Deno Runtime: Secure TypeScript sandbox</li>
              <li>• One Tool: execute_code replaces 41 tools in context</li>
              <li>• 95% faster initialization (45s → 2s)</li>
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
