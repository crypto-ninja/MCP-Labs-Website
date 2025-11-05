import { useState } from 'react';
import { Mail, Send, Book, MessageCircle, Github } from 'lucide-react';

export default function Support() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const faqs = [
    {
      question: 'How do I install the GitHub MCP Server?',
      answer:
        'Download your setup guide from the Licenses page. It contains step-by-step installation instructions and your license key.',
    },
    {
      question: 'Can I use my license on multiple machines?',
      answer:
        'Yes, you can use your license on multiple machines as long as you stay within your developer seat limit.',
    },
    {
      question: 'What happens when my license expires?',
      answer:
        'Your MCP server will stop working after the expiration date. Renew your license to continue using the service.',
    },
    {
      question: 'How do I upgrade my license tier?',
      answer:
        'Contact our support team at licensing@mcplabs.co.uk to upgrade your license tier.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support</h1>
        <p className="text-gray-600">Get help with your MCP Labs products</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <a
          href="https://github.com/crypto-ninja/github-mcp-server#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-blue-400"
        >
          <Book className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Documentation</h3>
          <p className="text-sm text-gray-600">
            Comprehensive guides and API references for all our products
          </p>
        </a>

        <a
          href="https://github.com/crypto-ninja/github-mcp-server/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-purple-400"
        >
          <Github className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">GitHub Issues</h3>
          <p className="text-sm text-gray-600">
            Report bugs or request features on our GitHub repository
          </p>
        </a>

        <a
          href="mailto:licensing@mcplabs.co.uk"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-green-400"
        >
          <Mail className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-600">
            Direct email support at licensing@mcplabs.co.uk
          </p>
        </a>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Contact Support</h2>
            <p className="text-sm text-gray-600">
              Send us a message and we'll get back to you as soon as possible
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-green-600 font-semibold mb-1">Message Sent!</div>
            <div className="text-sm text-green-700">
              We'll get back to you at your registered email address soon.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="What do you need help with?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder="Describe your issue or question..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
