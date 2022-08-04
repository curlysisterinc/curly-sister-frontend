/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable import/no-cycle */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import admin from "../../../../api/admin";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "constants";

function PayPalCheckoutButton({
  giftingDetails,
  service,
  booking,
  setBooking,
  bookingFeeTotal,
}) {
  const navigate = useNavigate();

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const handleApprove = async (orderId) => {
    setPaidFor(true);
    const confirmBooking = await admin.ConfirmBookedService({
      success: true,
      bookingId: booking._id,
    });
    console.log(confirmBooking, "confirm booking");

    navigate(AuthRoutes.successfullBooking);
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
      createOrder={async (data, actions) => {
        let hasGifting =
          giftingDetails.name.trim().length ||
          giftingDetails.email.trim().length ||
          giftingDetails.message.trim().length;
        const bookedServiceData = hasGifting
          ? {
              service: service.bookedservice._id,
              stylist: service.stylistId,
              price: service.bookingTotal,
              date: service.day.toString(),
              booking_kind: "gift",
              email: giftingDetails.email,
              name: giftingDetails.name,
            }
          : {
              service: service.bookedservice._id,
              stylist: service.stylistId,
              price: service.bookingTotal,
              date: service.day.toString(),
              // partialPayment: discountCheck,
            };
        const bookings = await admin.BookService(bookedServiceData);
        setBooking(bookings.data.data.booking);
        return actions.order.create({
          purchase_units: [
            {
              description: bookings._id,
              amount: { value: bookingFeeTotal },
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
