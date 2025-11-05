import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TIER_CONFIGS = {
  startup: { maxDevelopers: 10, name: "Startup License" },
  business: { maxDevelopers: 50, name: "Business License" },
  enterprise: { maxDevelopers: null, name: "Enterprise License" },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Method not allowed",
          message: "Only POST requests are accepted",
        }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { license_key, product_id } = await req.json();

    if (!license_key || !product_id) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Missing required fields",
          message: "Both license_key and product_id are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Verifying license: ${license_key} for product: ${product_id}`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: license, error: queryError } = await supabase
      .from("licenses")
      .select("*")
      .eq("license_key", license_key)
      .eq("product_id", product_id)
      .maybeSingle();

    if (queryError || !license) {
      console.log(`License not found: ${license_key}`);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "License not found",
          message: "Invalid license key or product ID. Purchase a license at https://mcplabs.co.uk",
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (license.status !== "active") {
      console.log(`License inactive: ${license.status}`);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "License inactive",
          message: `License status: ${license.status}. Contact support@mcplabs.co.uk`,
          status: license.status,
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const now = new Date();
    const expiresAt = new Date(license.expires_at);

    if (expiresAt < now) {
      console.log(`License expired: ${license.expires_at}`);

      await supabase
        .from("licenses")
        .update({ status: "expired" })
        .eq("id", license.id);

      return new Response(
        JSON.stringify({
          valid: false,
          error: "License expired",
          message: `License expired on ${license.expires_at}. Renew at https://mcplabs.co.uk`,
          expires_at: license.expires_at,
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const tierConfig = TIER_CONFIGS[license.tier as keyof typeof TIER_CONFIGS];

    if (!tierConfig) {
      console.error(`Unknown tier: ${license.tier}`);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Invalid license tier",
          message: "Contact support@mcplabs.co.uk",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`License verified successfully: ${license.license_key}`);

    return new Response(
      JSON.stringify({
        valid: true,
        tier: license.tier,
        tier_name: tierConfig.name,
        product_id: license.product_id,
        expires_at: license.expires_at,
        status: license.status,
        max_developers: tierConfig.maxDevelopers,
        features: ["all"],
        checked_at: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("License verification error:", error);
    return new Response(
      JSON.stringify({
        valid: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});