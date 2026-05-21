import mongoose from "mongoose";

const guestCheckoutSessionSchema =
  new mongoose.Schema(
    {
      // =====================================
      // STRIPE
      // =====================================

      sessionId: {
        type: String,
        required: true,
        unique: true,
      },

      paymentIntentId: {
        type: String,
      },

      paymentStatus: {
        type: String,
        default: "pending",
      },

      amount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        default: "cad",
      },

      stripeResponse: {
        type: Object,
      },

      // =====================================
      // ORDER
      // =====================================

      orderType: {
        type: String,
        enum: [
          "ondemand",
          "pickup-delivery",
        ],
        required: true,
      },

      quotePayload: {
        type: Object,
        required: true,
      },

      guestData: {
        type: Object,
        required: true,
      },

      // =====================================
      // GIP RESPONSE
      // =====================================

      gipOrderId: {
        type: String,
      },

      orderCode: {
        type: String,
      },

      trackOrderUrl: {
        type: String,
      },

      orderCreated: {
        type: Boolean,
        default: false,
      },

      gipOrderResponse: {
        type: Object,
      },
    },
    {
      timestamps: true,

      collection:
        "guest_checkout_sessions",
    }
  );

export default mongoose.model(
  "GuestCheckoutSession",
  guestCheckoutSessionSchema
);
