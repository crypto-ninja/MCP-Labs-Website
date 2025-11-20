import { useState } from 'react';
import { Github, ArrowRight, Rocket, Calendar, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Waitlist from './Waitlist';

interface Product {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  toolCount?: number;
  status: 'production' | 'coming-soon';
  features?: string[];
  launchDate?: string;
  githubLink?: string;
  learnMoreLink?: string;
}

export default function ProductShowcase() {
  const [waitlistProduct, setWaitlistProduct] = useState<{ id: string; name: string; icon: string } | null>(null);
  const products: Product[] = [
    {
      id: 'github',
      icon: '🐙',
      name: 'GitHub MCP Server',
      tagline: 'Complete GitHub automation',
      toolCount: 42,
      status: 'production',
      features: [
        'Code-First Execution (98% token reduction)',
        'Tool Discovery (3 discovery functions)',
        'Repository Management (7 tools)',
        'PR Workflow & Reviews (7 tools)',
        'File Operations (5 tools)',
        'Search & Discovery (2 tools)'
      ],
      githubLink: 'https://github.com/crypto-ninja/github-mcp-server',
      learnMoreLink: '/products/github'
    },
    {
      id: 'n8n',
      icon: '⚡',
      name: 'N8N MCP Server',
      tagline: 'Workflow automation made easy',
      status: 'coming-soon',
      launchDate: 'Q1 2026',
      learnMoreLink: '/products/n8n'
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our MCP Servers
          </h2>
          <p className="text-xl text-gray-600">
            Professional tools for AI-powered development automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                product.status === 'production'
                  ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-xl hover:border-blue-400'
                  : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white'
              }`}
            >
              {product.status === 'production' && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Rocket className="w-3 h-3" />
                  Live
                </div>
              )}

              {product.status === 'coming-soon' && (
                <div className="absolute top-4 right-4 bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Coming Soon
                </div>
              )}

              <div className="text-6xl mb-4">{product.icon}</div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-4">{product.tagline}</p>

              {product.toolCount && (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.toolCount} Tools
                  </div>
                </div>
              )}

              {product.features && (
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {product.launchDate && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Launch Date:</span> {product.launchDate}
                  </p>
                </div>
              )}

              {product.status === 'production' && (
                <div className="flex flex-col gap-3">
                  <Link
                    to={product.learnMoreLink!}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={product.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Try Free
                  </a>
                </div>
              )}

              {product.status === 'coming-soon' && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setWaitlistProduct({ id: product.id, name: product.name, icon: product.icon })}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    Join Waitlist
                  </button>
                  <Link
                    to={product.learnMoreLink!}
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            More MCP servers in development. Stay tuned!
          </p>
          <a
            href="https://github.com/crypto-ninja"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            <Github className="w-5 h-5" />
            Follow us on GitHub for updates
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {waitlistProduct && (
        <Waitlist
          product={waitlistProduct.id}
          productName={waitlistProduct.name}
          productIcon={waitlistProduct.icon}
          isOpen={true}
          onClose={() => setWaitlistProduct(null)}
        />
      )}
    </section>
  );
}
