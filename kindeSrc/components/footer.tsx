"use server";

import React from "react";

export const Footer = () => {
  return (
    <div className="footer">
      <div style={{ display: "flex", gap: "1rem" }}>
        <a href="https://www.salusfintech.com/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy
        </a>
        <a href="https://www.salusfintech.com/terms" target="_blank" rel="noopener noreferrer">
          Terms
        </a>
      </div>
    </div>
  );
};
