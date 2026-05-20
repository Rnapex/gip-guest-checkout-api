import express
  from "express";

import {
  createGuestStripeSession,
} from "../services/stripeGuest.service.js";

const router =
  express.Router();

// =====================================
// CREATE STRIPE SESSION
// =====================================

router.post(
  "/create-session",

  async (req, res) => {

    try {

      const {

        orderType,

        amount,

        currency,

        quotePayload,

        guestData,
      } = req.body;

      // =====================================
      // VALIDATION
      // =====================================

      if (
        !amount ||
        !quotePayload ||
        !orderType
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Missing required fields",
          });
      }

      // =====================================
      // CREATE STRIPE SESSION
      // =====================================

      const session =
        await createGuestStripeSession({

          amount,

          currency,

          orderType,

          quotePayload,

          guestData,
        });

      // =====================================
      // RESPONSE
      // =====================================

      return res.json({

        success: true,

        data: session,
      });

    } catch (err) {

      console.error(
        "CREATE SESSION ERROR:",
        err
      );

      return res
        .status(500)
        .json({

          success: false,

          message:
            err.message,
        });
    }
  }
);

export default router;
