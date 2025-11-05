import { useEffect, useState } from 'react';
import { Key, Filter, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserLicenses, LicenseWithProduct, downloadLicenseSetup } from '../../lib/dashboard';
import LicenseCard from '../../components/dashboard/LicenseCard';
import SearchBar from '../../components/dashboard/SearchBar';
import { LicenseCardSkeleton, PageLoadingSpinner } from '../../components/dashboard/LoadingSkeleton';
import ErrorState from '../../components/dashboard/ErrorState';
import Toast from '../../components/dashboard/Toast';

export default function Licenses() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<LicenseWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'expiry'>('newest');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (user) {
      loadLicenses();
    }
  }, [user]);

  const loadLicenses = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getUserLicenses(user.id);
      setLicenses(data);
    } catch (err) {
      console.error('Error loading licenses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load licenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (license: LicenseWithProduct) => {
    try {
      await downloadLicenseSetup(license);
      setToast({ message: 'Setup guide downloaded successfully!', type: 'success' });
    } catch (err) {
      console.error('Error downloading setup:', err);
      setToast({ message: 'Failed to download setup guide', type: 'error' });
    }
  };

  const filteredLicenses = licenses
    .filter((license) => {
      if (statusFilter !== 'all' && license.status !== statusFilter) return false;
      if (productFilter !== 'all' && license.product_id !== productFilter) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const productName = license.product.name.toLowerCase();
        const tierName = license.tier.toLowerCase();
        const licenseKey = license.license_key.toLowerCase();
        return productName.includes(query) || tierName.includes(query) || licenseKey.includes(query);
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'expiry') {
        return new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime();
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const uniqueProducts = Array.from(new Set(licenses.map((l) => l.product_id || 'github')));

  if (loading) {
    return <PageLoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadLicenses} />;
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
    <>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Licenses</h1>
              <p className="text-gray-600">
                {filteredLicenses.length} of {licenses.length} licenses
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by product, tier, or license key..."
              />
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

            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'expiry')}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="expiry">Expiring Soon</option>
              </select>
            </div>
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
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
