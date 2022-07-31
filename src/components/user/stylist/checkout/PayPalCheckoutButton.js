/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckoutButton(props) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const { product } = props;
  const handleApprove = (orderId) => {
    setPaidFor(true);
    // refresh user's account
  };
  if (paidFor) {
    alert("Thank you for booking!");
  }
  if (error) {
    alert(error);
  }
  return (
    <PayPalButtons
      style={{
        color: "silver",
        layout: "horizontal",
        height: 40,
        width: "100%",
        tagline: false,
      }}
      onClick={(data, actions) => {
        const hasAlreadyBooked = false;
        if (hasAlreadyBooked) {
          setError("Already booked this service");
          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.serviceName,
              amount: { value: product.price },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order, "paypal order");
        handleApprove(data.orderID);
      }}
      onCancel={() => {
        // navigate back to service profile
      }}
      onError={(err) => {
        setError(err, "paypal error");
      }}
    />
  );
}

export default PayPalCheckoutButton;
