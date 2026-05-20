import "./config/env.js";

import express
  from "express";

import mongoose
  from "mongoose";

import cors
  from "cors";

import guestCheckoutRoutes
  from "./routes/guestCheckout.routes.js";

import stripeWebhookRoutes
  from "./routes/stripeWebhook.routes.js";

const app =
  express();

// =====================================
// CORS
// =====================================

app.use(cors());

// =====================================
// STRIPE WEBHOOK
// MUST COME BEFORE express.json()
// =====================================

app.use(
  "/api/stripe-webhook",
  stripeWebhookRoutes
);

// =====================================
// JSON PARSER
// =====================================

app.use(express.json());

// =====================================
// ROUTES
// =====================================

app.use(
  "/api/guest-checkout",
  guestCheckoutRoutes
);

// =====================================
// HEALTH CHECK
// =====================================

app.get(
  "/",
  (req, res) => {

    res.json({

      success: true,

      message:
        "Guest Checkout API Running",
    });
  }
);

// =====================================
// MONGO
// =====================================

mongoose.connect(
  process.env.MONGO_URI
).then(() => {

  console.log(
    "Mongo Connected"
  );

  app.listen(
    8080,
    () => {

      console.log(
        "Server running on port 8080"
      );
    }
  );

}).catch((err) => {

  console.error(
    "Mongo Error:",
    err
  );
});