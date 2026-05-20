import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

console.log(
  "ENV LOADED:",
  process.env.STRIPE_SECRET_KEY
);