import { TrendingDown, TrendingUp } from 'lucide-react';

export default function ComparisonTable() {
  const comparisons = [
    {
      metric: 'Token Usage',
      traditional: '70,000',
      codeFirst: '800',
      savings: '98.9%',
      highlight: true
    },
    {
      metric: 'Cost per Conversation',
      traditional: '$1.42',
      codeFirst: '$0.41',
      savings: '98.1%',
      highlight: false
    },
    {
      metric: 'Initialization Time',
      traditional: '45s',
      codeFirst: '2s',
      savings: '95%',
      highlight: true
    },
    {
      metric: 'Context Window Usage',
      traditional: 'All 41 tools',
      codeFirst: '1 tool',
      savings: '97%',
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Performance Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Traditional MCP vs Code-First MCP
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how code-first execution revolutionizes performance and cost efficiency
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-red-600 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Traditional
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-green-600 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Code-First
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-blue-600 uppercase tracking-wider">
                    Savings
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparisons.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      row.highlight ? 'bg-blue-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{row.metric}</span>
                        {row.highlight && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Key
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-red-600">{row.traditional}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">{row.codeFirst}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-green-700">{row.savings}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-sm text-gray-700 font-medium">Average Token Reduction</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-gray-700 font-medium">Faster Initialization</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">1 Tool</div>
            <div className="text-sm text-gray-700 font-medium">Replaces 41 in Context</div>
          </div>
        </div>
      </div>
    </section>
  );
}
