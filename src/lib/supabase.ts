import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Customer = {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type License = {
  id: string;
  license_key: string;
  customer_id: string;
  product_id: string;
  tier: 'startup' | 'business' | 'enterprise';
  status: 'active' | 'expired' | 'cancelled';
  max_developers: number;
  stripe_subscription_id: string | null;
  stripe_payment_intent_id: string | null;
  amount_paid: number;
  currency: string;
  created_at: string;
  expires_at: string | null;
  cancelled_at: string | null;
};

export type ContactRequest = {
  id?: string;
  name: string;
  email: string;
  company: string | null;
  developers_count: string | null;
  message: string | null;
  status?: 'new' | 'contacted' | 'closed';
  created_at?: string;
};
