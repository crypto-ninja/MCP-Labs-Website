/*
  # Complete Database Setup with Safety Checks

  This migration is idempotent and can be run multiple times safely.
  All operations check for existence before creating objects.

  ## Tables Created/Updated:
  
  1. **licenses** - User license management
     - id (uuid, primary key)
     - user_id (uuid, references auth.users)
     - license_key (text, unique)
     - tier (text: startup/business/enterprise)
     - status (text: active/expired/cancelled)
     - product_id (text, which MCP server)
     - created_at, expires_at timestamps
  
  2. **waitlist_signups** - Product waitlist management
     - id (uuid, primary key)
     - product_id (text, which product)
     - email, name, company, use_case (contact info)
     - created_at timestamp
  
  ## Security (RLS):
  - All tables have Row Level Security enabled
  - Licenses: Users can only see their own licenses
  - Waitlist: Public can insert, authenticated users cannot read (admin only)
  
  ## Views:
  - dashboard_stats: Aggregated license statistics per user
  
  ## Safety:
  - All CREATE operations use IF NOT EXISTS
  - Column additions check for existence first
  - Policies checked before creation
  - Indexes created with IF NOT EXISTS
*/

-- =====================================================
-- 1. CREATE LICENSES TABLE
-- =====================================================

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'licenses'
    ) THEN
        CREATE TABLE licenses (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            license_key TEXT NOT NULL UNIQUE,
            tier TEXT NOT NULL CHECK (tier IN ('startup', 'business', 'enterprise')),
            status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
            product_id TEXT NOT NULL DEFAULT 'github',
            created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
            expires_at TIMESTAMPTZ NOT NULL,
            metadata JSONB DEFAULT '{}'::jsonb
        );
        
        RAISE NOTICE 'Created licenses table';
    ELSE
        RAISE NOTICE 'Licenses table already exists, skipping creation';
    END IF;
END $$;

-- Add product_id column if it doesn't exist (for backward compatibility)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'licenses' 
        AND column_name = 'product_id'
    ) THEN
        ALTER TABLE licenses 
        ADD COLUMN product_id TEXT DEFAULT 'github' NOT NULL;
        
        RAISE NOTICE 'Added product_id column to licenses table';
    ELSE
        RAISE NOTICE 'Product_id column already exists in licenses table';
    END IF;
END $$;

-- Add metadata column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'licenses' 
        AND column_name = 'metadata'
    ) THEN
        ALTER TABLE licenses 
        ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;
        
        RAISE NOTICE 'Added metadata column to licenses table';
    ELSE
        RAISE NOTICE 'Metadata column already exists in licenses table';
    END IF;
END $$;

-- Create indexes on licenses table
CREATE INDEX IF NOT EXISTS idx_licenses_user_id ON licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_product_id ON licenses(product_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_licenses_expires_at ON licenses(expires_at);
CREATE INDEX IF NOT EXISTS idx_licenses_license_key ON licenses(license_key);

-- Enable RLS on licenses table
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for licenses (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'licenses' 
        AND policyname = 'Users can view own licenses'
    ) THEN
        CREATE POLICY "Users can view own licenses"
            ON licenses FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
            
        RAISE NOTICE 'Created SELECT policy for licenses';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'licenses' 
        AND policyname = 'Users can insert own licenses'
    ) THEN
        CREATE POLICY "Users can insert own licenses"
            ON licenses FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = user_id);
            
        RAISE NOTICE 'Created INSERT policy for licenses';
    END IF;
END $$;

-- =====================================================
-- 2. CREATE WAITLIST_SIGNUPS TABLE
-- =====================================================

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'waitlist_signups'
    ) THEN
        CREATE TABLE waitlist_signups (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            product_id TEXT NOT NULL,
            email TEXT NOT NULL,
            name TEXT,
            company TEXT,
            use_case TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
            notified BOOLEAN DEFAULT false,
            CONSTRAINT unique_product_email UNIQUE(product_id, email)
        );
        
        RAISE NOTICE 'Created waitlist_signups table';
    ELSE
        RAISE NOTICE 'Waitlist_signups table already exists, skipping creation';
    END IF;
END $$;

-- Add notified column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'waitlist_signups' 
        AND column_name = 'notified'
    ) THEN
        ALTER TABLE waitlist_signups 
        ADD COLUMN notified BOOLEAN DEFAULT false;
        
        RAISE NOTICE 'Added notified column to waitlist_signups table';
    ELSE
        RAISE NOTICE 'Notified column already exists in waitlist_signups table';
    END IF;
END $$;

-- Create indexes on waitlist_signups table
CREATE INDEX IF NOT EXISTS idx_waitlist_product ON waitlist_signups(product_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist_signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_notified ON waitlist_signups(notified) WHERE notified = false;

-- Enable RLS on waitlist_signups table
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for waitlist_signups (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'waitlist_signups' 
        AND policyname = 'Anyone can join waitlist'
    ) THEN
        CREATE POLICY "Anyone can join waitlist"
            ON waitlist_signups FOR INSERT
            TO anon, authenticated
            WITH CHECK (true);
            
        RAISE NOTICE 'Created INSERT policy for waitlist_signups';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'waitlist_signups' 
        AND policyname = 'Only service role can view waitlist'
    ) THEN
        CREATE POLICY "Only service role can view waitlist"
            ON waitlist_signups FOR SELECT
            TO authenticated
            USING (false);
            
        RAISE NOTICE 'Created SELECT policy for waitlist_signups (restrictive)';
    END IF;
END $$;

-- =====================================================
-- 3. CREATE DASHBOARD STATS VIEW
-- =====================================================

CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    user_id,
    COUNT(*) as total_licenses,
    COUNT(*) FILTER (WHERE status = 'active') as active_licenses,
    COUNT(DISTINCT product_id) as products_owned,
    MIN(expires_at) FILTER (WHERE status = 'active') as next_expiration,
    MAX(created_at) as last_purchase
FROM licenses
GROUP BY user_id;

-- Grant access to the view
GRANT SELECT ON dashboard_stats TO authenticated;

-- =====================================================
-- 4. VERIFICATION QUERIES (commented out)
-- =====================================================

-- To verify the migration was successful, run:
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public';
-- SELECT * FROM pg_policies WHERE tablename IN ('licenses', 'waitlist_signups');
-- SELECT indexname FROM pg_indexes WHERE schemaname = 'public';
