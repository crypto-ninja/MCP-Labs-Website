import { useEffect, useState } from 'react';
import { Key, Package, Calendar, HelpCircle } from 'lucide-react';
import { supabase, License } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from '../../components/dashboard/StatsCard';
import QuickActions from '../../components/dashboard/QuickActions';
import ActivityFeed from '../../components/dashboard/ActivityFeed';

export default function Overview() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

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

  const activeLicenses = licenses.filter((l) => l.status === 'active').length;
  const uniqueProducts = new Set(licenses.map((l) => l.product_id || 'github')).size;

  const getNextRenewalDays = () => {
    if (licenses.length === 0) return 0;
    const nextExpiry = licenses
      .filter((l) => l.status === 'active')
      .map((l) => new Date(l.expires_at).getTime())
      .sort((a, b) => a - b)[0];

    if (!nextExpiry) return 0;
    const daysUntil = Math.ceil((nextExpiry - Date.now()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysUntil);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const userName = user?.email?.split('@')[0] || 'there';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-600">Here's an overview of your MCP Labs account</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Licenses"
          value={activeLicenses}
          icon={Key}
          color="blue"
          subtitle={`${licenses.length} total licenses`}
        />
        <StatsCard
          title="Products Owned"
          value={uniqueProducts}
          icon={Package}
          color="purple"
          subtitle="MCP Servers"
        />
        <StatsCard
          title="Days Until Renewal"
          value={getNextRenewalDays()}
          icon={Calendar}
          color="green"
          subtitle="Next expiration"
        />
        <StatsCard
          title="Support Tickets"
          value={0}
          icon={HelpCircle}
          color="orange"
          subtitle="Open tickets"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <QuickActions />
      </div>

      <ActivityFeed />
    </div>
  );
}
