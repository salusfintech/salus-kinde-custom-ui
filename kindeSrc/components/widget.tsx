"use server";

import { getKindeWidget } from "@kinde/infrastructure";
import React from "react";

const styles: {
  heading: React.CSSProperties;
  description: React.CSSProperties;
} = {
  heading: {
    margin: "0 0 0.5rem",
    color: "#0f172a",
    fontSize: "1.5rem",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    lineHeight: 1.25,
  },
  description: {
    margin: "0 0 1.5rem",
    color: "#64748b",
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
};

export const Widget = (props: { heading: string; description: string }) => {
  return (
    <main className="login-form">
      <div style={{ width: "100%" }}>
        <h1 style={styles.heading}>{props.heading}</h1>
        <p style={styles.description}>{props.description}</p>
        {getKindeWidget()}
      </div>
    </main>
  );
};
