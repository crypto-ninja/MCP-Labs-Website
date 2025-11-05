import { useEffect, useState } from 'react';
import { Key, Filter } from 'lucide-react';
import { supabase, License } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { getTierInfo } from '../../lib/license';
import LicenseCard from '../../components/dashboard/LicenseCard';

export default function Licenses() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');

  useEffect(() => {
    if (user) {
      loadLicenses();
    }
  }, [user]);

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

  const filteredLicenses = licenses.filter((license) => {
    if (statusFilter !== 'all' && license.status !== statusFilter) return false;
    if (productFilter !== 'all' && license.product_id !== productFilter) return false;
    return true;
  });

  const uniqueProducts = Array.from(new Set(licenses.map((l) => l.product_id || 'github')));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (licenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-12">
          <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Licenses Yet</h2>
          <p className="text-gray-600 mb-6">
            Purchase a license to get started with our MCP servers
          </p>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Pricing
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Licenses</h1>
          <p className="text-gray-600">{licenses.length} total licenses</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              {uniqueProducts.map((productId) => (
                <option key={productId} value={productId}>
                  {productId === 'github' ? 'GitHub MCP Server' : productId}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredLicenses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-600">No licenses match your filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLicenses.map((license) => (
            <LicenseCard
              key={license.id}
              license={license}
              onDownload={downloadSetupInstructions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
