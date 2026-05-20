import express
  from "express";

import Stripe
  from "stripe";

import GuestCheckoutSession
  from "../models/guestCheckoutSession.model.js";

import {
  createGipOrder,
} from "../services/gipOrder.service.js";

const router =
  express.Router();

const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY
  );

// =====================================
// STRIPE WEBHOOK
// =====================================

router.post(
  "/api/stripe-webhook",

  express.raw({
    type:
      "application/json",
  }),

  async (req, res) => {

    let event;

    try {

      const signature =
        req.headers[
          "stripe-signature"
        ];

      event =
        stripe.webhooks.constructEvent(

          req.body,

          signature,

          process.env
            .STRIPE_WEBHOOK_SECRET
        );

    } catch (err) {

      console.error(
        "Webhook Signature Error:",
        err.message
      );

      return res
        .status(400)
        .send(
          `Webhook Error: ${err.message}`
        );
    }

    // =====================================
    // PAYMENT SUCCESS
    // =====================================

    if (
      event.type ===
      "checkout.session.completed"
    ) {

      try {

        const session =
          event.data.object;

        console.log(
          "PAYMENT SUCCESS:",
          session.id
        );

        // FIND SESSION
        const savedSession =
          await GuestCheckoutSession
            .findOne({
              sessionId:
                session.id,
            });

        if (
          !savedSession
        ) {

          console.log(
            "Session not found"
          );

          return res.json({
            received: true,
          });
        }

        // UPDATE PAYMENT STATUS
        savedSession.paymentStatus =
          "paid";

        savedSession.paymentIntentId =
          session.payment_intent;

        await savedSession.save();

        // =====================================
        // CREATE GIP ORDER
        // =====================================

        const gipOrder =
  await createGipOrder({

    orderType:
      savedSession.orderType,

    payload:
      savedSession.quotePayload,
  });

        console.log(
          "GIP ORDER CREATED:",
          gipOrder
        );

      } catch (err) {

        console.error(
          "Webhook Processing Error:",
          err
        );
      }
    }

    res.json({
      received: true,
    });
  }
);

export default router;