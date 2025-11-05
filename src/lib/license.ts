export function generateLicenseKey(tier: 'startup' | 'business' | 'enterprise'): string {
  const tierCode = tier.toUpperCase().substring(0, 4);
  const random = generateRandomString(12);
  const checksum = generateChecksum(`MCP-1.0-${tierCode}-${random}`);

  return `MCP-1.0-${tierCode}-${random}-${checksum}`;
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }

  return result;
}

function generateChecksum(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36).toUpperCase().substring(0, 6);
}

export function validateLicenseKey(key: string): boolean {
  const pattern = /^MCP-1\.0-[A-Z]{4}-[A-Z0-9]{12}-[A-Z0-9]{6}$/;
  if (!pattern.test(key)) {
    return false;
  }

  const parts = key.split('-');
  const checksum = parts[parts.length - 1];
  const baseKey = parts.slice(0, -1).join('-');
  const expectedChecksum = generateChecksum(baseKey);

  return checksum === expectedChecksum;
}

export function getTierInfo(tier: 'startup' | 'business' | 'enterprise') {
  const tiers = {
    startup: {
      name: 'Startup',
      price: 399,
      maxDevelopers: 10,
      features: [
        'All 16 tools',
        'Up to 10 developers',
        'Email support',
        'No source sharing required',
        'Commercial use allowed',
        'Regular updates',
      ],
    },
    business: {
      name: 'Business',
      price: 1599,
      maxDevelopers: 50,
      features: [
        'All 16 tools',
        'Up to 50 developers',
        'Priority support',
        'Custom integrations',
        'Commercial use allowed',
        'Early access to new features',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      price: 3999,
      maxDevelopers: -1,
      features: [
        'All 16 tools',
        'Unlimited developers',
        '24/7 SLA support',
        'Dedicated account manager',
        'Custom features',
        'On-premise deployment options',
      ],
    },
  };

  return tiers[tier];
}
