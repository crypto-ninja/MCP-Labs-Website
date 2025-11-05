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
            <span className="text-gray-600 font-mono">v1.3.0</span>
            <span className="text-gray-500 text-sm">Nov 4, 2025</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            9 New Tools: From 22 to 31
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Our latest release adds comprehensive repository management and PR workflow automation.
            We've expanded from 22 tools to <strong>31 powerful tools</strong>, giving you even more control
            over your GitHub automation workflows.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-blue-900 mb-2">
              <strong>What's new?</strong>
            </p>
            <ul className="text-blue-900 space-y-1 ml-4">
              <li>• Enhanced repository management tools</li>
              <li>• Advanced PR workflow automation</li>
              <li>• Better integration with GitHub Actions</li>
              <li>• Improved search and discovery features</li>
            </ul>
          </div>

          <a
            href="https://github.com/mcplabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            <Github className="w-5 h-5" />
            Read the full story on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
