import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const links = {
    products: [
      { name: 'All Products', href: '/products', external: false },
      { name: 'GitHub MCP Server', href: '/products/github', external: false },
      { name: 'GitLab MCP Server', href: '/products/gitlab', external: false },
      { name: 'Azure DevOps MCP', href: '/products/azure', external: false },
    ],
    resources: [
      { name: 'Documentation', href: 'https://github.com/crypto-ninja/github-mcp-server#readme', external: true },
      { name: 'GitHub Repository', href: 'https://github.com/crypto-ninja/github-mcp-server', external: true },
      { name: 'Changelog', href: 'https://github.com/crypto-ninja/github-mcp-server/releases', external: true },
    ],
    company: [
      { name: 'Contact', href: 'mailto:licensing@mcplabs.co.uk', external: true },
      { name: 'Privacy Policy', href: '#', external: false },
      { name: 'Terms of Service', href: '#', external: false },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="inline-block mb-3">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                MCP Labs
              </h3>
            </Link>
            <p className="text-gray-400 mb-4">
              Building the future of Model Context Protocol servers for AI-powered automation.
            </p>
            <p className="text-gray-500 text-sm">
              mcplabs.co.uk
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-3">
              {links.products.map((link, idx) => (
                <li key={idx}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link, idx) => (
                <li key={idx}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 MCP Labs. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="https://github.com/mcplabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
