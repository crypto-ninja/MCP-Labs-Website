import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is MCP?',
      answer: 'Model Context Protocol (MCP) is an open standard developed by Anthropic that enables AI assistants to securely interact with external tools and data sources. MCP Labs builds comprehensive MCP servers that give AI assistants powerful GitHub capabilities.'
    },
    {
      question: 'What is code-first execution?',
      answer: 'Instead of loading 41 tool definitions into Claude\'s context (consuming 70,000+ tokens), v2.0 exposes ONE execute_code tool. Claude writes TypeScript that calls tools on-demand, reducing token usage by 98%. This makes workflows faster, cheaper, and more scalable.'
    },
    {
      question: 'How does licensing work?',
      answer: 'We offer dual licensing: AGPL v3 for open source projects (requires source sharing) and commercial licenses for proprietary use. Commercial licenses start at £399/year and remove the source sharing requirement. All licenses include all 42 tools with code-first execution.'
    },
    {
      question: 'Can I try before buying?',
      answer: 'Absolutely! Start with our free AGPL version to test all features. If you need to keep your code proprietary or require commercial support, upgrade to a commercial license. We also offer trial periods for commercial licenses—contact us for details.'
    },
    {
      question: "What's included in support?",
      answer: 'Open source users get community support via GitHub. Commercial licenses include email support (Startup), priority support with faster response times (Business), or 24/7 SLA support with a dedicated account manager (Enterprise).'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes! We offer a 30-day money-back guarantee for all commercial licenses. If you\'re not satisfied for any reason within the first 30 days, we\'ll provide a full refund—no questions asked.'
    },
    {
      question: 'Can I switch between monthly and annual?',
      answer: 'Yes! You can upgrade to annual billing anytime to start saving. Annual plans save up to 16% compared to monthly. Contact support if you need assistance with your billing changes.'
    },
    {
      question: 'How do I integrate MCP Labs into my project?',
      answer: 'Integration is simple! Install via npm, configure your GitHub token, and start using any of the 42 tools. We provide comprehensive documentation with code examples for every tool. Most teams are up and running in under 30 minutes. The code-first execution requires no additional configuration.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about MCP Labs
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-2 border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                    openIndex === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
