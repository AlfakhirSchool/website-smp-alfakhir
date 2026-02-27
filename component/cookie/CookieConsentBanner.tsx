"use client";
import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      buttonText="Accept"
      cookieName="alfakhirCookieConsent"
      style={{
        position: "fixed",
        bottom: "0",
        left: "50%",
        transform: "translateX(-50%) translateY(-30px)",
        background: "#ffffff",
        color: "#333333",
        padding: "20px 25px",
        borderRadius: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10000,
        maxWidth: "90%",
        width: "600px",
      }}
      buttonStyle={{
        background: "#0d9488",
        color: "#ffffff",
        fontSize: "14px",
        borderRadius: "9999px",
        padding: "10px 25px",
        border: "none",
        marginLeft: "20px",
      }}
      expires={150}
    >
      <span style={{ fontSize: "14px", lineHeight: "1.6" }}>
        We use cookies to enhance your browsing experience. By clicking
        "Accept", you consent to our use of cookies.
      </span>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
