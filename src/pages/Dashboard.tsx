import { useEffect, useState } from 'react';
import { Copy, Check, Download, Key, Users, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, License } from '../lib/supabase';
import { getTierInfo } from '../lib/license';
import { getProduct } from '../lib/products';

export default function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadLicenses();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const loadLicenses = async () => {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLicenses(data || []);
    } catch (error) {
      console.error('Error loading licenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadSetupInstructions = (license: License) => {
    const tierInfo = getTierInfo(license.tier);
    const instructions = `# MCP Labs - GitHub MCP Server Setup

## Your License

License Key: ${license.license_key}
Tier: ${tierInfo.name}
Max Developers: ${tierInfo.maxDevelopers === -1 ? 'Unlimited' : tierInfo.maxDevelopers}
Status: ${license.status}

## Installation

Add to your Claude Desktop config:
\`\`\`json
{
  "mcpServers": {
    "github": {
      "env": {
        "MCP_LICENSE_KEY": "${license.license_key}"
      }
    }
  }
}
\`\`\`

## Documentation
https://github.com/crypto-ninja/github-mcp-server

## Support
licensing@mcplabs.co.uk
`;

    const blob = new Blob([instructions], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mcp-labs-setup-${license.tier}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-gray-200">
            <LogIn className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access your dashboard and view your licenses.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Link>
            <div className="mt-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!licenses.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome, {user.email}</p>
            </div>
            <button
              onClick={signOut}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Licenses Found</h2>
            <p className="text-gray-600 mb-6">
              You don't have any active licenses yet. Purchase a license to get started.
            </p>
            <Link
              to="/#pricing"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Licenses</h1>
            <p className="text-gray-600">Manage your MCP Labs licenses</p>
          </div>
          <button
            onClick={signOut}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-6">
          {licenses.map((license) => {
            const tierInfo = getTierInfo(license.tier);
            const isActive = license.status === 'active';
            const product = getProduct(license.product_id || 'github');

            return (
              <div
                key={license.id}
                className={`bg-white rounded-2xl shadow-lg p-8 ${!isActive ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{product?.icon || '🐙'}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{tierInfo.name} License</h3>
                        <p className="text-sm text-gray-600">{product?.name || 'GitHub MCP Server'}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{tierInfo.maxDevelopers === -1 ? 'Unlimited' : `Up to ${tierInfo.maxDevelopers}`} developers</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadSetupInstructions(license)}
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
                  >
                    <Download className="w-4 h-4" />
                    Setup Guide
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Your License Key
                  </label>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-white border-2 border-gray-200 rounded-lg px-4 py-3 font-mono text-sm break-all">
                      {license.license_key}
                    </code>
                    <button
                      onClick={() => copyToClipboard(license.license_key, license.id)}
                      className="flex-shrink-0 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                      {copiedKey === license.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
