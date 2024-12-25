import { Billing } from "@notes/core/billing";
import { Util } from "@notes/core/util";
import { Resource } from "sst";
import Stripe from "stripe";

export const main = Util.handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || "{}");

  const amount = Billing.compute(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(
    Resource.StripeSecretKey.value,
    { apiVersion: "2024-12-18.acacia" }
  );

  await stripe.charges.create({
    source, amount, description, currency: "usd",
  });

  return JSON.stringify({ status: true })
})
