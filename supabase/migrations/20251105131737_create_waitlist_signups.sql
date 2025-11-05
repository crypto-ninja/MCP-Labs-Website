/*
  # Create waitlist_signups table

  1. New Tables
    - `waitlist_signups`
      - `id` (uuid, primary key, auto-generated)
      - `product_id` (text, required) - Which product they're interested in
      - `email` (text, required) - Contact email
      - `name` (text, optional) - User's name
      - `company` (text, optional) - Company name
      - `use_case` (text, optional) - How they plan to use the product
      - `created_at` (timestamptz) - Signup timestamp

  2. Indexes
    - Index on product_id for filtering by product
    - Index on email for duplicate checking and lookups
    - Composite index on (product_id, email) for efficient duplicate prevention

  3. Security
    - Enable RLS on waitlist_signups table
    - Allow public inserts (anonymous users can join waitlist)
    - No public reads (only admin can view waitlist)
    - Prevent duplicate signups with unique constraint
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  use_case TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_product_email 
  ON waitlist_signups(product_id, email);

CREATE INDEX IF NOT EXISTS idx_waitlist_product 
  ON waitlist_signups(product_id);

CREATE INDEX IF NOT EXISTS idx_waitlist_email 
  ON waitlist_signups(email);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON waitlist_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "No public reads"
  ON waitlist_signups
  FOR SELECT
  TO authenticated
  USING (false);
