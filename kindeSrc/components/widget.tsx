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
    fontSize: "1.625rem",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    lineHeight: 1.2,
  },
  description: {
    margin: "0 0 2rem",
    color: "#64748b",
    fontSize: "0.9375rem",
    lineHeight: 1.5,
  },
};

export const Widget = ({
  children,
}: {
  heading: string;
  description: string;
  children?: React.ReactNode;
}) => {
  // Kinde logs "No widget found" unless getKindeWidget() runs and its
  // markup stays in the page. The home email form replaces that markup,
  // so keep the real widget in the document without showing it.
  const kindeWidget = getKindeWidget();
  return (
    <main className="login-form">
      <div style={{ width: "100%" }}>
        <h1 style={styles.heading}>Sign in</h1>
        <p style={styles.description}>
          Enter your work email to continue.
        </p>
        {children ?? kindeWidget}
        {children ? (
          <div className="kinde-widget-sentinel">{kindeWidget}</div>
        ) : null}
        <a className="help-link" href="mailto:support@salusfintech.com">
          Having trouble signing in?
        </a>
      </div>
    </main>
  );
};
