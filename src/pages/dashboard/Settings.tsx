import { useState } from 'react';
import { User, Mail, Lock, Bell, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-3 mb-4">
          <User className="w-6 h-6 text-gray-400 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Profile Information</h2>
            <p className="text-sm text-gray-600 mb-4">Update your personal information</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Contact support to change your email address
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-3 mb-4">
          <Lock className="w-6 h-6 text-gray-400 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Password</h2>
            <p className="text-sm text-gray-600 mb-4">Change your password</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-3 mb-4">
          <Bell className="w-6 h-6 text-gray-400 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Email Preferences</h2>
            <p className="text-sm text-gray-600 mb-4">
              Manage your email notification preferences
            </p>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Email Notifications</div>
                  <div className="text-sm text-gray-600">
                    Receive emails about license renewals and important updates
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productUpdates}
                  onChange={(e) => setProductUpdates(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Product Updates</div>
                  <div className="text-sm text-gray-600">
                    Get notified about new features and product releases
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-red-900 mb-1">Danger Zone</h2>
            <p className="text-sm text-red-700 mb-4">
              Irreversible actions that affect your account
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Delete Account
            </button>
            <p className="text-xs text-red-600 mt-2">
              This action cannot be undone. All your licenses and data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
