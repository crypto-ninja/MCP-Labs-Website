import { useEffect, useState } from 'react';
import { Key, Package, Calendar, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserStats, UserStats } from '../../lib/dashboard';
import StatsCard from '../../components/dashboard/StatsCard';
import QuickActions from '../../components/dashboard/QuickActions';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { StatsCardSkeleton, ActivityFeedSkeleton } from '../../components/dashboard/LoadingSkeleton';
import ErrorState from '../../components/dashboard/ErrorState';

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getUserStats(user.id);
      setStats(data);
    } catch (err) {
      console.error('Error loading stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorState message={error} onRetry={loadStats} />;
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
        {loading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              title="Active Licenses"
              value={stats?.activeLicenses || 0}
              icon={Key}
              color="blue"
              subtitle={`${stats?.totalLicenses || 0} total licenses`}
            />
            <StatsCard
              title="Products Owned"
              value={stats?.productsOwned || 0}
              icon={Package}
              color="purple"
              subtitle="MCP Servers"
            />
            <StatsCard
              title="Days Until Renewal"
              value={stats?.daysUntilRenewal || 0}
              icon={Calendar}
              color="green"
              subtitle="Next expiration"
            />
            <StatsCard
              title="Support Tickets"
              value={stats?.supportTickets || 0}
              icon={HelpCircle}
              color="orange"
              subtitle="Open tickets"
            />
          </>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <QuickActions />
      </div>

      {loading ? <ActivityFeedSkeleton /> : <ActivityFeed />}
    </div>
  );
}
