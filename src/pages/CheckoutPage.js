import React, { useState } from "react";

import { sendStreakMail }
from "../services/emailService";

import "./CheckoutPage.css";

function CheckoutPage() {

  const [email, setEmail] =
    useState("");

  const handleSubscribe =
    async () => {

      if (!email) {

        alert(
          "Enter email first"
        );

        return;
      }

      localStorage.setItem(

        "grindmapReminderEmail",

        email
      );

      await sendStreakMail(

        "Dhivya",

        email,

        localStorage.getItem(
          "grindmapStreak"
        )

          ? JSON.parse(
              localStorage.getItem(
                "grindmapStreak"
              )
            ).count

          : 0
      );

      alert(
        "Reminder feature activated 🔥"
      );
    };

  return (

    <div className="checkout-page">

      <div className="checkout-card">

        <h1>
          GrindMap Checkout 🔥
        </h1>

        <p>
          Get reminder emails when
          you miss your streak.
        </p>

        <input
          type="email"

          placeholder="Enter your email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <button
          onClick={
            handleSubscribe
          }
        >
          Activate Reminder
        </button>

      </div>

    </div>
  );
}

export default CheckoutPage;