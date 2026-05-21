import mongoose from "mongoose";

const guestCheckoutSchema =
  new mongoose.Schema(
    {
      orderType: {
        type: String,
        enum: [
          "ondemand",
          "pickup-delivery",
        ],
        required: true,
      },

      guestData: {
        type: Object,
        required: true,
      },

      quotePayload: {
        type: Object,
        required: true,
      },

      stripeSessionId: {
        type: String,
        required: true,
      },

      stripePaymentIntentId: {
        type: String,
      },

      paymentStatus: {
        type: String,
        default: "pending",
      },

      // =====================================
      // GIP ORDER
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

      // =====================================
      // META
      // =====================================

      completedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,

      collection:
        "guest_checkout",
    }
  );

export default mongoose.model(
  "GuestCheckout",
  guestCheckoutSchema
);
