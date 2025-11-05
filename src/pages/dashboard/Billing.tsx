import { CreditCard, ExternalLink } from 'lucide-react';
import InvoiceTable from '../../components/dashboard/InvoiceTable';

export default function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Invoices</h1>
        <p className="text-gray-600">Manage your payment methods and view invoices</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Payment Method</h2>
            <p className="text-sm text-gray-600">Manage your payment information</p>
          </div>
          <CreditCard className="w-8 h-8 text-gray-400" />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-3">
            Payment methods are managed securely through Stripe. Click below to update your
            payment information or manage your subscription.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Manage Payment Method
          </button>
          <button className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Billing Portal
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice History</h2>
        <InvoiceTable />
      </div>
    </div>
  );
}
