import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, Stripe-Signature",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const event = JSON.parse(body);
    console.log("Stripe event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const productId = session.metadata?.product_id || "github";
      const tier = session.metadata?.tier;
      const billingPeriod = session.metadata?.billing_period || "annual";
      const customerEmail = session.customer_details?.email || session.customer_email;

      console.log("Processing checkout:", { productId, tier, billingPeriod, customerEmail });

      if (!tier || !customerEmail) {
        throw new Error("Missing required metadata: tier or customerEmail");
      }

      const { data: existingUser } = await supabase.auth.admin.listUsers();
      const user = existingUser.users.find((u) => u.email === customerEmail);

      if (!user) {
        console.error("No user found with email:", customerEmail);
        throw new Error(`No user account found for email: ${customerEmail}. User must sign up first.`);
      }

      const licenseKey = generateLicenseKey(tier);
      const expiresAt = new Date();
      
      if (billingPeriod === "monthly") {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      const licenseData = {
        user_id: user.id,
        license_key: licenseKey,
        product_id: productId,
        tier,
        status: "active",
        expires_at: expiresAt.toISOString(),
        metadata: {
          stripe_subscription_id: session.subscription || null,
          stripe_payment_intent_id: session.payment_intent,
          stripe_customer_id: session.customer,
          amount_paid: session.amount_total,
          currency: session.currency,
          billing_period: billingPeriod,
        },
      };

      console.log("Creating license:", licenseData);

      const { data: license, error: licenseError } = await supabase
        .from("licenses")
        .insert(licenseData)
        .select()
        .single();

      if (licenseError) {
        console.error("License creation error:", licenseError);
        throw licenseError;
      }

      console.log("License created successfully:", license.license_key);
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      console.log("Subscription cancelled:", subscription.id);

      const { error } = await supabase
        .from("licenses")
        .update({ status: "cancelled" })
        .eq("metadata->stripe_subscription_id", subscription.id);

      if (error) {
        console.error("Failed to cancel license:", error);
      }
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object;
      console.log("Payment failed for subscription:", invoice.subscription);

      const { error } = await supabase
        .from("licenses")
        .update({ status: "expired" })
        .eq("metadata->stripe_subscription_id", invoice.subscription);

      if (error) {
        console.error("Failed to expire license:", error);
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: error instanceof Error ? error.message : "Webhook processing failed" 
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});