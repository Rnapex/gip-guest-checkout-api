import Stripe
  from "stripe";

import GuestCheckoutSession
  from "../models/guestCheckoutSession.model.js";

console.log(
  "Loaded Stripe Key:",
  process.env
    .STRIPE_SECRET_KEY
);

const stripe =
  new Stripe(
    process.env
      .STRIPE_SECRET_KEY
  );

export async function createGuestStripeSession({

  amount,

  currency = "cad",

  orderType,

  quotePayload,

  guestData,
}) {

  // =====================================
  // CREATE STRIPE SESSION
  // =====================================

  const session =
    await stripe.checkout.sessions.create({

      payment_method_types: [
        "card",
      ],

      mode:
        "payment",

      line_items: [
        {

          price_data: {

            currency,

            product_data: {

              name:
                "Get It Picked Delivery",

              description:
                `${orderType} guest checkout`,
            },

            unit_amount:
              Math.round(
                amount * 100
              ),
          },

          quantity: 1,
        },
      ],

      success_url:
        `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${process.env.FRONTEND_URL}/cancel`,

      metadata: {

        orderType,

        source:
          "guest-checkout",
      },
    });

  // =====================================
  // SAVE SESSION
  // =====================================

  await GuestCheckoutSession.create({

    sessionId:
      session.id,

    paymentStatus:
      "pending",

    amount,

    currency,

    orderType,

    quotePayload,

    guestData,

    stripeResponse:
      session,
  });

  // =====================================
  // RETURN SESSION
  // =====================================

  return {

    sessionId:
      session.id,

    checkoutUrl:
      session.url,
  };
}