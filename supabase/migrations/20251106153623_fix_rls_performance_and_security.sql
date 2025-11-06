/*
  # Fix RLS Performance and Security Issues

  ## Changes Made:
  
  1. **RLS Performance Optimization**
     - Updated `Users can view own licenses` policy to use `(select auth.uid())` instead of `auth.uid()`
     - Updated `Users can insert own licenses` policy to use `(select auth.uid())` instead of `auth.uid()`
     - This prevents re-evaluation of auth functions for each row, improving query performance at scale
  
  2. **Remove Unused Indexes**
     - Drop unused indexes that are not being utilized by queries
     - Reduces storage overhead and maintenance costs
  
  3. **Fix Security Definer View**
     - Recreate `dashboard_stats` view without SECURITY DEFINER
     - Uses invoker's permissions instead of definer's permissions for better security
  
  ## Security:
  - Maintains existing RLS protections
  - Improves performance without compromising security
  - Removes potential security vulnerabilities from SECURITY DEFINER view
*/

-- =====================================================
-- 1. DROP AND RECREATE RLS POLICIES FOR PERFORMANCE
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own licenses" ON licenses;
DROP POLICY IF EXISTS "Users can insert own licenses" ON licenses;

-- Recreate with optimized auth function calls
CREATE POLICY "Users can view own licenses"
    ON licenses FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own licenses"
    ON licenses FOR INSERT
    TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

-- =====================================================
-- 2. DROP UNUSED INDEXES
-- =====================================================

-- These indexes are not being used by any queries
-- Keeping idx_licenses_user_id and idx_licenses_license_key as they are actively used

DROP INDEX IF EXISTS idx_licenses_product_id;
DROP INDEX IF EXISTS idx_licenses_status;
DROP INDEX IF EXISTS idx_licenses_expires_at;

DROP INDEX IF EXISTS idx_waitlist_product;
DROP INDEX IF EXISTS idx_waitlist_email;
DROP INDEX IF EXISTS idx_waitlist_created;
DROP INDEX IF EXISTS idx_waitlist_notified;

-- =====================================================
-- 3. FIX SECURITY DEFINER VIEW
-- =====================================================

-- Drop and recreate without SECURITY DEFINER
DROP VIEW IF EXISTS dashboard_stats;

CREATE VIEW dashboard_stats AS
SELECT 
    user_id,
    COUNT(*) as total_licenses,
    COUNT(*) FILTER (WHERE status = 'active') as active_licenses,
    COUNT(DISTINCT product_id) as products_owned,
    MIN(expires_at) FILTER (WHERE status = 'active') as next_expiration,
    MAX(created_at) as last_purchase
FROM licenses
GROUP BY user_id;

-- Grant access to authenticated users
GRANT SELECT ON dashboard_stats TO authenticated;

-- Add RLS to ensure users only see their own stats
ALTER VIEW dashboard_stats SET (security_invoker = on);
