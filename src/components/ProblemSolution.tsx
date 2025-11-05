import { X, Check } from 'lucide-react';

export default function ProblemSolution() {
  const problems = [
    { text: 'Incomplete API coverage', solution: 'All 16 GitHub APIs fully implemented' },
    { text: 'Poor documentation', solution: 'Comprehensive docs with examples' },
    { text: 'No commercial support', solution: 'Enterprise-grade support available' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stop Reinventing the Wheel
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Building AI integrations with GitHub shouldn't require starting from scratch
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
              <X className="w-8 h-8" />
              The Problem
            </h3>
            <ul className="space-y-4">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
              <Check className="w-8 h-8" />
              MCP Labs Solution
            </h3>
            <ul className="space-y-4">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item.solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-semibold text-gray-900">
            MCP Labs provides production-ready, comprehensive tools that <span className="text-blue-600">just work</span>
          </p>
        </div>
      </div>
    </section>
  );
}
