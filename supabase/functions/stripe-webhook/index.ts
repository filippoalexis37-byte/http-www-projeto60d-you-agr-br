import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.client_reference_id;
      const referrerId = session.metadata?.referrer_id;

      if (userId) {
        // Update user status
        await supabaseAdmin
          .from("profiles")
          .update({ is_paid: true })
          .eq("user_id", userId);

        // Update referral
        if (referrerId) {
          await supabaseAdmin
            .from("referrals")
            .update({ 
              status: "paid",
              sale_amount: session.amount_total / 100,
              commission_amount: (session.amount_total / 100) * 0.4 // 40% commission
            })
            .eq("referred_user_id", userId)
            .eq("referrer_id", referrerId);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});
