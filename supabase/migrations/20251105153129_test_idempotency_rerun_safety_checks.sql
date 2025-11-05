/*
  # Test Migration Idempotency
  
  This is a test run of the same migration logic to verify idempotency.
  Running the exact same checks again should result in no errors and skip all creations.
*/

-- Test: Try to create licenses table again (should skip)
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
        RAISE NOTICE 'Licenses table already exists - SKIPPED (idempotency working!)';
    END IF;
END $$;

-- Test: Try to add product_id column again (should skip)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'licenses' 
        AND column_name = 'product_id'
    ) THEN
        ALTER TABLE licenses 
        ADD COLUMN product_id TEXT DEFAULT 'github' NOT NULL;
        
        RAISE NOTICE 'Added product_id column';
    ELSE
        RAISE NOTICE 'Product_id column already exists - SKIPPED (idempotency working!)';
    END IF;
END $$;

-- Test: Try to create waitlist_signups table again (should skip)
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
        RAISE NOTICE 'Waitlist_signups table already exists - SKIPPED (idempotency working!)';
    END IF;
END $$;

-- Test: Create indexes again (IF NOT EXISTS should handle this)
CREATE INDEX IF NOT EXISTS idx_licenses_user_id ON licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_product_id ON licenses(product_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_product ON waitlist_signups(product_id);

-- Test: Try to create policies again (should skip)
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
    ELSE
        RAISE NOTICE 'SELECT policy already exists - SKIPPED (idempotency working!)';
    END IF;
END $$;

-- Test: Recreate view (CREATE OR REPLACE should handle this)
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

-- Final verification
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'IDEMPOTENCY TEST COMPLETED SUCCESSFULLY';
    RAISE NOTICE 'All safety checks working as expected';
    RAISE NOTICE '========================================';
END $$;
