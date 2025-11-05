import { supabase, License } from './supabase';
import { getProduct, Product } from './products';

export interface LicenseWithProduct extends License {
  product: Product;
  daysUntilExpiry: number;
  isExpiringSoon: boolean;
}

export interface UserStats {
  totalLicenses: number;
  activeLicenses: number;
  productsOwned: number;
  daysUntilRenewal: number;
  supportTickets: number;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  invoiceUrl?: string;
}

export async function getUserLicenses(userId: string): Promise<LicenseWithProduct[]> {
  try {
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const licenses = data || [];

    return licenses.map((license) => {
      const product = getProduct(license.product_id || 'github');
      const expiryDate = new Date(license.expires_at);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0 && license.status === 'active';

      return {
        ...license,
        product: product || {
          id: 'github',
          name: 'GitHub MCP Server',
          icon: '🐙',
          tagline: 'Complete GitHub automation',
          description: 'GitHub MCP Server',
        },
        daysUntilExpiry,
        isExpiringSoon,
      };
    });
  } catch (error) {
    console.error('Error fetching user licenses:', error);
    throw new Error('Failed to load licenses. Please try again.');
  }
}

export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    const licenses = await getUserLicenses(userId);

    const activeLicenses = licenses.filter((l) => l.status === 'active');
    const uniqueProducts = new Set(licenses.map((l) => l.product_id || 'github'));

    let daysUntilRenewal = 0;
    if (activeLicenses.length > 0) {
      const nextExpiry = activeLicenses
        .map((l) => new Date(l.expires_at).getTime())
        .sort((a, b) => a - b)[0];

      if (nextExpiry) {
        daysUntilRenewal = Math.max(0, Math.ceil((nextExpiry - Date.now()) / (1000 * 60 * 60 * 24)));
      }
    }

    return {
      totalLicenses: licenses.length,
      activeLicenses: activeLicenses.length,
      productsOwned: uniqueProducts.size,
      daysUntilRenewal,
      supportTickets: 0,
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw new Error('Failed to load statistics. Please try again.');
  }
}

export async function getInvoices(customerId?: string): Promise<Invoice[]> {
  try {
    if (!customerId) {
      return [];
    }

    return [];
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw new Error('Failed to load invoices. Please try again.');
  }
}

export async function downloadLicenseSetup(license: License): Promise<void> {
  const tierNames: Record<License['tier'], string> = {
    startup: 'Startup',
    business: 'Business',
    enterprise: 'Enterprise',
  };

  const maxDevs: Record<License['tier'], string> = {
    startup: '10',
    business: '50',
    enterprise: 'Unlimited',
  };

  const instructions = `# MCP Labs - GitHub MCP Server Setup

## Your License

License Key: ${license.license_key}
Tier: ${tierNames[license.tier]}
Max Developers: ${maxDevs[license.tier]}
Status: ${license.status}
Expires: ${new Date(license.expires_at).toLocaleDateString()}

## Installation

Add to your Claude Desktop config file:

**macOS**: ~/Library/Application Support/Claude/claude_desktop_config.json
**Windows**: %APPDATA%/Claude/claude_desktop_config.json

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token",
        "MCP_LICENSE_KEY": "${license.license_key}"
      }
    }
  }
}
\`\`\`

## Next Steps

1. Get your GitHub Personal Access Token from: https://github.com/settings/tokens
2. Add the token to your config as shown above
3. Restart Claude Desktop
4. Start using GitHub MCP Server!

## Documentation

Full documentation: https://github.com/crypto-ninja/github-mcp-server

## Support

Email: licensing@mcplabs.co.uk
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
}

export function calculateLicenseStatus(license: License): {
  color: string;
  label: string;
  isWarning: boolean;
} {
  if (license.status === 'cancelled') {
    return { color: 'gray', label: 'Cancelled', isWarning: false };
  }

  if (license.status === 'expired') {
    return { color: 'red', label: 'Expired', isWarning: true };
  }

  const expiryDate = new Date(license.expires_at);
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry <= 0) {
    return { color: 'red', label: 'Expired', isWarning: true };
  }

  if (daysUntilExpiry <= 7) {
    return { color: 'red', label: 'Expiring Soon', isWarning: true };
  }

  if (daysUntilExpiry <= 30) {
    return { color: 'yellow', label: 'Expiring Soon', isWarning: true };
  }

  return { color: 'green', label: 'Active', isWarning: false };
}
