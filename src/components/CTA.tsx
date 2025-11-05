import { Github, Mail } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Supercharge Your GitHub Workflows?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join developers who are building the next generation of AI-powered development tools
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="https://github.com/crypto-ninja/github-mcp-server"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            <Github className="w-5 h-5" />
            Start Free
          </a>
          <a
            href="mailto:licensing@mcplabs.co.uk"
            className="inline-flex items-center justify-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors shadow-xl border-2 border-white"
          >
            <Mail className="w-5 h-5" />
            Talk to Sales
          </a>
        </div>

        <p className="text-blue-100">
          Questions? Email us at{' '}
          <a
            href="mailto:licensing@mcplabs.co.uk"
            className="text-white font-semibold hover:underline"
          >
            licensing@mcplabs.co.uk
          </a>
        </p>
      </div>
    </section>
  );
}
