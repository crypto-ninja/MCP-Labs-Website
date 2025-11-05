import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowRight, Rocket, Calendar, Filter } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface Product {
  icon: string;
  name: string;
  tagline: string;
  description: string;
  toolCount?: number;
  status: 'production' | 'beta' | 'coming-soon';
  features: string[];
  launchDate?: string;
  githubLink?: string;
  productLink: string;
}

export default function Products() {
  const [filter, setFilter] = useState<'all' | 'production' | 'beta' | 'coming-soon'>('all');

  const products: Product[] = [
    {
      icon: '🐙',
      name: 'GitHub MCP Server',
      tagline: 'Complete GitHub automation',
      description: 'The most comprehensive GitHub MCP server with 31 powerful tools for repository management, PR workflows, issue tracking, and CI/CD automation.',
      toolCount: 31,
      status: 'production',
      features: [
        'Repository Management (7 tools)',
        'PR Workflow & Reviews (5 tools)',
        'File Operations (4 tools)',
        'Issue Tracking (3 tools)',
        'CI/CD Monitoring (2 tools)',
        'Search & Discovery (2 tools)'
      ],
      githubLink: 'https://github.com/crypto-ninja/github-mcp-server',
      productLink: '/products/github'
    },
    {
      icon: '🦊',
      name: 'GitLab MCP Server',
      tagline: 'Complete GitLab automation',
      description: 'Comprehensive GitLab integration bringing merge request management, CI/CD pipelines, and project automation to your AI assistant.',
      status: 'coming-soon',
      features: [
        'Merge Request Management',
        'CI/CD Pipeline Control',
        'Issue & Epic Management',
        'Project Administration',
        'Code Review Automation'
      ],
      launchDate: 'Q1 2026',
      productLink: '/products/gitlab'
    },
    {
      icon: '🔷',
      name: 'Azure DevOps MCP Server',
      tagline: 'Enterprise DevOps automation',
      description: 'Enterprise-grade Azure DevOps integration for work items, repositories, pipelines, and release management at scale.',
      status: 'coming-soon',
      features: [
        'Work Item Management',
        'Repository Operations',
        'Pipeline Orchestration',
        'Release Management',
        'Test Plan Integration'
      ],
      launchDate: 'Q2 2026',
      productLink: '/products/azure'
    }
  ];

  const filteredProducts = products.filter(
    (product) => filter === 'all' || product.status === filter
  );

  const statusColors = {
    production: { bg: 'bg-green-100', text: 'text-green-700', icon: Rocket, label: 'Live' },
    beta: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Rocket, label: 'Beta' },
    'coming-soon': { bg: 'bg-gray-100', text: 'text-gray-600', icon: Calendar, label: 'Coming Soon' }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our MCP Servers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional Model Context Protocol servers for AI-powered development automation.
              Built by developers, for developers.
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              All Products ({products.length})
            </button>
            <button
              onClick={() => setFilter('production')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'production'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
              }`}
            >
              Live ({products.filter((p) => p.status === 'production').length})
            </button>
            <button
              onClick={() => setFilter('coming-soon')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'coming-soon'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
              }`}
            >
              Coming Soon ({products.filter((p) => p.status === 'coming-soon').length})
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => {
              const statusInfo = statusColors[product.status];
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={idx}
                  className="relative rounded-2xl border-2 p-8 transition-all duration-300 bg-white hover:shadow-xl hover:border-blue-400"
                >
                  <div className={`absolute top-4 right-4 ${statusInfo.bg} ${statusInfo.text} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.label}
                  </div>

                  <div className="text-6xl mb-4">{product.icon}</div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-4">{product.tagline}</p>

                  {product.toolCount && (
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {product.toolCount} Tools
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-700 mb-6">{product.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {product.features.slice(0, 4).map((feature, featureIdx) => (
                        <li key={featureIdx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {product.launchDate && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Launch Date:</span> {product.launchDate}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Link
                      to={product.productLink}
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {product.status === 'production' ? 'Learn More' : 'View Details'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {product.githubLink && (
                      <a
                        href={product.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Try Free
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
