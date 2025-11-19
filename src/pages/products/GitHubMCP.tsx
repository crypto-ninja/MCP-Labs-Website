import { Github, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import ToolsOverview from '../../components/ToolsOverview';
import UseCases from '../../components/UseCases';
import RecentUpdates from '../../components/RecentUpdates';
import Trust from '../../components/Trust';
import Pricing from '../../components/Pricing';
import FAQ from '../../components/FAQ';
import ContactForm from '../../components/ContactForm';
import Footer from '../../components/Footer';

export default function GitHubMCP() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="text-2xl">🐙</span>
              GitHub MCP Server
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Most Comprehensive<br />GitHub MCP Server
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              42 powerful tools for AI-powered GitHub automation.<br />
              Built by developers, for developers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://github.com/crypto-ninja/github-mcp-server"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Github className="w-5 h-5" />
                Get Started Free
              </a>
              <a
                href="https://github.com/crypto-ninja/github-mcp-server#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                View Documentation
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Buy License
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
                <Github className="w-5 h-5 text-gray-700" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-900">Star us on GitHub</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
                ✅ Production Ready
              </div>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
                📦 v2.1.0 - 42 Tools
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Setup</h3>
              <p className="text-gray-600">
                Install via npm and configure in minutes. Most teams are up and running in under 30 minutes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-green-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure by Design</h3>
              <p className="text-gray-600">
                Uses GitHub tokens for authentication. Your credentials never leave your environment.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Well Documented</h3>
              <p className="text-gray-600">
                Comprehensive documentation with code examples for every tool and use case.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ToolsOverview />
      <UseCases />
      <RecentUpdates />
      <Trust />
      <Pricing />
      <FAQ />
      <ContactForm />

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Automate Your GitHub Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join developers using the most comprehensive GitHub MCP server
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/crypto-ninja/github-mcp-server"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              <Github className="w-5 h-5" />
              Start Free with AGPL
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors border-2 border-white"
            >
              Explore Other Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
