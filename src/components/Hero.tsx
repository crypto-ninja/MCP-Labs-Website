import { Github, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 pt-32 pb-32">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                MCP Labs
              </span>
            </h1>
            <p className="text-gray-600 text-lg italic">Building the Future of MCP Servers</p>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            42 GitHub Tools. 98% Token Reduction.<br />Code-First Architecture.
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-semibold">
            The only GitHub MCP Server with revolutionary code-first execution.
          </p>
          <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            98% fewer tokens, 95% faster initialization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Pricing
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <Github className="w-5 h-5 text-gray-700" />
            <span className="text-gray-600">⭐</span>
            <span className="font-semibold text-gray-900">Star us on GitHub</span>
          </div>
        </div>
      </div>
    </section>
  );
}
