import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./style.css";
import { useLocation } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
//const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const stripePromise = loadStripe("pk_test_51MhYL2B2l7RkdP70xKB6OCtOkZyPm8kKV7Wltfw7BRph8FpSnyJNKGItmkYkGfT6gf5LBlbSBRQ0aTMkCiXZCgH700Z7a6VDaj");

export default function CheckOutPage() {
  const [clientSecret, setClientSecret] = useState("");

  const location = useLocation()
  const { totalPrice } = location.state

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://103.197.204.22:8008/v.03.13.23/create-payment-intent", {
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
    <div className="checkoutPageWrap grid grid-cols-7 p-10">
      <div className="col-span-4 self-center text-center font-bold text-6xl">
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
  );
}
