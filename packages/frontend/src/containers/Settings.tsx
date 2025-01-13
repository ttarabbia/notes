import { useNavigate } from "react-router-dom";
import { BillingType } from "../types/billing";
import { useState } from "react";
import { API } from "aws-amplify";
import config from "../config";
import { loadStripe } from "@stripe/stripe-js";
import { BillingForm, BillingFormType } from "../components/BillingForm";
import { onError } from "../lib/errorLib";
import { Elements } from "@stripe/react-stripe-js";
import "./Settings.css"

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const stripePromise = loadStripe(config.STRIPE_KEY)

  function billUser(details: BillingType) {
    return API.post("notes", "/billing", {
      body: details
    });
  }
  const handleFormSubmit: BillingFormType["onSubmit"] = async (
    storage, info) => {
    if (info.error) {
      onError(info.error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage, source: info.token?.id,
      });

      alert("your card has been charged successfully");
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  return <div className="Settings">
    <Elements
      stripe={stripePromise}
      options={{
        fonts: [{
          cssSrc: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800",
        }]
      }}>
      <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
    </Elements>
  </div>
}


