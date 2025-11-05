import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function generateLicenseKey(tier: string): string {
  const tierCode = tier.toUpperCase().substring(0, 4);
  const random = generateRandomString(12);
  const checksum = generateChecksum(`MCP-1.0-${tierCode}-${random}`);
  return `MCP-1.0-${tierCode}-${random}-${checksum}`;
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

function generateChecksum(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).toUpperCase().substring(0, 6);
}

function getTierMaxDevelopers(tier: string): number {
  const tiers: Record<string, number> = { startup: 10, business: 50, enterprise: -1 };
  return tiers[tier] || 10;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const event = JSON.parse(body);
    console.log("Stripe event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const productId = session.metadata?.product_id || "github";
      const tier = session.metadata?.tier;
      const billingPeriod = session.metadata?.billing_period || "annual";
      const customerEmail = session.customer_details?.email || session.customer_email;

      if (!tier || !customerEmail) {
        throw new Error("Missing required data");
      }

      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id")
        .eq("email", customerEmail)
        .maybeSingle();

      let customerId: string;

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error } = await supabase
          .from("customers")
          .insert({ email: customerEmail, stripe_customer_id: session.customer })
          .select("id")
          .single();

        if (error) throw error;
        customerId = newCustomer.id;
      }

      const licenseKey = generateLicenseKey(tier);
      const expiresAt = new Date();
      
      if (billingPeriod === "monthly") {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      const { error: licenseError } = await supabase
        .from("licenses")
        .insert({
          license_key: licenseKey,
          customer_id: customerId,
          product_id: productId,
          tier,
          status: "active",
          max_developers: getTierMaxDevelopers(tier),
          stripe_subscription_id: session.subscription || null,
          stripe_payment_intent_id: session.payment_intent,
          amount_paid: session.amount_total,
          currency: session.currency,
          expires_at: expiresAt.toISOString(),
        });

      if (licenseError) throw licenseError;
      console.log("License created:", licenseKey, "Period:", billingPeriod);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: true, message: error instanceof Error ? error.message : "Webhook failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});