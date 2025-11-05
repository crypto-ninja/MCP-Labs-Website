import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

interface CheckoutRequest {
  productId: string;
  tier: "startup" | "business" | "enterprise";
  billingPeriod: "monthly" | "annual";
  priceId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { productId, tier, billingPeriod, priceId, customerEmail, successUrl, cancelUrl }: CheckoutRequest = await req.json();

    if (!STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key not configured");
    }

    if (!priceId) {
      throw new Error("Price ID is required");
    }

    const params: Record<string, string> = {
      "mode": "subscription",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "success_url": successUrl,
      "cancel_url": cancelUrl,
      "metadata[product_id]": productId,
      "metadata[tier]": tier,
      "metadata[billing_period]": billingPeriod,
    };

    if (customerEmail) {
      params["customer_email"] = customerEmail;
    }

    const formBody = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Stripe API error:", error);
      throw new Error(`Stripe API error: ${response.statusText} - ${error}`);
    }

    const session = await response.json();

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: true, message: error instanceof Error ? error.message : "Failed to create checkout" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});