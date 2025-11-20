/*
  # Update product_id constraint to support N8N

  1. Changes
    - Drop existing product_id check constraint
    - Add new check constraint with updated valid product IDs
      - Removes: 'gitlab', 'azure'
      - Adds: 'n8n'
      - Keeps: 'github'
  
  2. Purpose
    - Align database constraints with current product offerings
    - Support N8N MCP Server product
    - Remove discontinued product references
*/

DO $$ 
BEGIN
  -- Drop the old constraint if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'licenses_product_id_check' 
    AND table_name = 'licenses'
  ) THEN
    ALTER TABLE licenses
    DROP CONSTRAINT licenses_product_id_check;
  END IF;
  
  -- Add the new constraint with updated product IDs
  ALTER TABLE licenses
  ADD CONSTRAINT licenses_product_id_check 
  CHECK (product_id IN ('github', 'n8n'));
END $$;
