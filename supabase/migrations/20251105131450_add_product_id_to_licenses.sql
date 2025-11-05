/*
  # Add product_id column to licenses table

  1. Changes
    - Add `product_id` column to `licenses` table
      - Type: text
      - Default: 'github' (for backward compatibility with existing licenses)
      - Not nullable after setting default
    - Add check constraint to ensure valid product IDs
  
  2. Purpose
    - Enable multi-product support in the licensing system
    - Maintain backward compatibility with existing GitHub MCP Server licenses
    - Allow tracking which product each license is for
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'licenses' AND column_name = 'product_id'
  ) THEN
    ALTER TABLE licenses 
    ADD COLUMN product_id TEXT DEFAULT 'github' NOT NULL;
    
    ALTER TABLE licenses
    ADD CONSTRAINT licenses_product_id_check 
    CHECK (product_id IN ('github', 'gitlab', 'azure'));
    
    CREATE INDEX IF NOT EXISTS idx_licenses_product_id ON licenses(product_id);
  END IF;
END $$;
