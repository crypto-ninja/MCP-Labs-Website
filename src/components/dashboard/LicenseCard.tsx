import { useState } from 'react';
import { Copy, Check, Download, Users, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { License } from '../../lib/supabase';
import { getTierInfo } from '../../lib/license';
import { getProduct } from '../../lib/products';

interface LicenseCardProps {
  license: License;
  onDownload: (license: License) => void;
}

export default function LicenseCard({ license, onDownload }: LicenseCardProps) {
  const [copied, setCopied] = useState(false);
  const tierInfo = getTierInfo(license.tier);
  const product = getProduct(license.product_id || 'github');
  const isActive = license.status === 'active';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(license.license_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusColor = () => {
    switch (license.status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'expired':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 p-6 transition-all ${
        isActive
          ? 'border-blue-200 hover:shadow-lg hover:border-blue-400'
          : 'border-gray-200 opacity-75'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <span className="text-4xl">{product?.icon || '🐙'}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{product?.name || 'GitHub MCP Server'}</h3>
            <p className="text-sm text-gray-600">{tierInfo.name} License</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
          {license.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>
            {tierInfo.maxDevelopers === -1 ? 'Unlimited' : `${tierInfo.maxDevelopers}`} developers
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Expires: {new Date(license.expires_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <label className="block text-xs font-semibold text-gray-700 mb-2">LICENSE KEY</label>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 font-mono text-xs break-all text-gray-900">
            {license.license_key}
          </code>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onDownload(license)}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Setup Guide
        </button>
        <Link
          to={`/products/${license.product_id || 'github'}`}
          className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Product
        </Link>
      </div>
    </div>
  );
}
