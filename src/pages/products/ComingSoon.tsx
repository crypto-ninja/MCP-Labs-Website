import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Bell } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Waitlist from '../../components/Waitlist';

interface ComingSoonProps {
  product: 'GitLab' | 'Azure' | string;
}

const productInfo = {
  GitLab: {
    id: 'gitlab',
    icon: '🦊',
    name: 'GitLab MCP Server',
    tagline: 'Complete GitLab automation for AI assistants',
    description: 'Comprehensive GitLab integration bringing merge request management, CI/CD pipelines, and project automation to your AI assistant. Built with the same attention to detail and developer experience as our GitHub MCP Server.',
    features: [
      'Merge Request Management - Create, review, and merge with AI assistance',
      'CI/CD Pipeline Control - Trigger and monitor GitLab pipelines',
      'Issue & Epic Management - Track work items and connect them to code',
      'Project Administration - Manage repositories and settings',
      'Code Review Automation - Streamline review workflows',
      'Wiki & Documentation - Manage project documentation'
    ],
    launchDate: 'Q1 2026',
    estimatedTools: '25+'
  },
  Azure: {
    id: 'azure',
    icon: '🔷',
    name: 'Azure DevOps MCP Server',
    tagline: 'Enterprise DevOps automation at scale',
    description: 'Enterprise-grade Azure DevOps integration for work items, repositories, pipelines, and release management. Designed for organizations that need robust, scalable DevOps automation.',
    features: [
      'Work Item Management - Track tasks, bugs, and user stories',
      'Repository Operations - Manage Azure Repos with AI',
      'Pipeline Orchestration - Build and release automation',
      'Release Management - Control deployment workflows',
      'Test Plan Integration - Automate testing workflows',
      'Board Management - Agile project tracking'
    ],
    launchDate: 'Q2 2026',
    estimatedTools: '30+'
  }
};

export default function ComingSoon({ product }: ComingSoonProps) {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const info = productInfo[product as keyof typeof productInfo] || productInfo.GitLab;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Calendar className="w-4 h-4" />
              Coming {info.launchDate}
            </div>

            <div className="text-8xl mb-6">{info.icon}</div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {info.name}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {info.tagline}
            </p>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
              {info.estimatedTools} Tools Planned
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Be the First to Know
            </h2>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Join the waitlist to get early access, exclusive pricing discounts, and help shape the product with your feedback.
              </p>

              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                Join Waitlist
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Get notified when {info.name} launches
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What to Expect
          </h2>

          <p className="text-lg text-gray-700 mb-8 text-center">
            {info.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {info.features.map((feature, idx) => {
              const [title, description] = feature.split(' - ');
              return (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">
                  Early Access Program
                </h3>
                <p className="text-blue-800 mb-4">
                  Join our waitlist to get early access, exclusive pricing discounts, and help shape the product with your feedback.
                </p>
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Try Our GitHub MCP Server Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            While you wait for {info.name}, experience the power of AI automation with our production-ready GitHub MCP Server.
          </p>
          <Link
            to="/products/github"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Explore GitHub MCP Server
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Waitlist
        product={info.id}
        productName={info.name}
        productIcon={info.icon}
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      <Footer />
    </div>
  );
}
