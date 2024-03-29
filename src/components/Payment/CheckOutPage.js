import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./style.css";
import stripe from '../../images/stripe.png'
import { useLocation } from "react-router-dom";
import { apiUrlContextManager } from "../../App";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
//const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const stripePromise = loadStripe("pk_test_51MhYL2B2l7RkdP70xKB6OCtOkZyPm8kKV7Wltfw7BRph8FpSnyJNKGItmkYkGfT6gf5LBlbSBRQ0aTMkCiXZCgH700Z7a6VDaj");

export default function CheckOutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

  const location = useLocation();
  const { totalPrice } = location.state;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(getModelBaseUrl+"create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "net_charge": 458 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mx-auto">
      <div className="checkoutPageWrap grid grid-cols-7 relative p-10">
        <div className="col-span-4 self-center text-center font-bold text-6xl">
          <div className="absolute bottom-0 right-0"><p className="text-xs text-teal-500">Powered By Stripe</p></div>
          <div className="priceCircle">
          <h2>Total</h2>
          <h5>{totalPrice}</h5>
          </div>
        </div>
        <div className="col-span-3">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}

        </div>

      </div>
    </div>
  );
}
