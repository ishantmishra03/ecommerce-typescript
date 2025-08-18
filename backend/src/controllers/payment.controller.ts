import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil"
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { items, orderId } = req.body;

  try {
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.productId.name },
        unit_amount: Math.round(item.productId.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-successful?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
      metadata: {
        orderId: orderId,
      }
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    console.error("Error creating checkout session:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Stripe Webhook - handle payment confirmation
 */
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(400).send(`Webhook Error: ${(err as any).message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderId = session.metadata?.orderId;

    if (orderId) {
      try {
        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        console.log(`✅ Order ${orderId} marked as paid.`);
      } catch (err) {
        console.error("Failed to update order:", err);
      }
    } else {
      console.warn("⚠️ No orderId found in session metadata.");
    }
  }

  res.json({ received: true });
};
