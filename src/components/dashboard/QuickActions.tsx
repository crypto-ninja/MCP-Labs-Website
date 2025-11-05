import { FileText, Book, Mail, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickActions() {
  const actions = [
    {
      icon: FileText,
      title: 'Setup Guide',
      description: 'Download installation instructions',
      color: 'blue',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'View complete documentation',
      color: 'purple',
      href: 'https://github.com/crypto-ninja/github-mcp-server#readme',
      external: true,
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Get help from our team',
      color: 'green',
      href: '/dashboard/support',
    },
    {
      icon: ShoppingCart,
      title: 'View Products',
      description: 'Explore more MCP servers',
      color: 'orange',
      href: '/products',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, idx) => {
        const Icon = action.icon;
        const colors = colorClasses[action.color as keyof typeof colorClasses];

        if (action.external) {
          return (
            <a
              key={idx}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${colors} rounded-xl p-4 transition-all hover:shadow-md`}
            >
              <Icon className="w-8 h-8 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-xs text-gray-600">{action.description}</p>
            </a>
          );
        }

        if (action.href) {
          return (
            <Link
              key={idx}
              to={action.href}
              className={`${colors} rounded-xl p-4 transition-all hover:shadow-md`}
            >
              <Icon className="w-8 h-8 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-xs text-gray-600">{action.description}</p>
            </Link>
          );
        }

        return (
          <button
            key={idx}
            onClick={action.action}
            className={`${colors} rounded-xl p-4 transition-all hover:shadow-md text-left`}
          >
            <Icon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
            <p className="text-xs text-gray-600">{action.description}</p>
          </button>
        );
      })}
    </div>
  );
}
