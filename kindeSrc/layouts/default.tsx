import { getLogoUrl } from "@kinde/infrastructure";
import React from "react";

import { Footer } from "../components/footer";
import { Header } from "../components/header";

type LayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page">
      <aside className="brand">
        <img
          alt="Salus"
          className="brand-logo"
          src={getLogoUrl()}
        />
        <div className="brand-copy">
          <h1>Make Gen Z Members for Life</h1>
          <p>
            Sign in to the Salus dashboard to manage products, members, and
            reporting for your credit union.
          </p>
        </div>
        <p className="brand-meta">For credit union staff</p>
      </aside>
      <section className="panel">
        <Header />
        {children}
        <Footer />
      </section>
    </div>
  );
};
