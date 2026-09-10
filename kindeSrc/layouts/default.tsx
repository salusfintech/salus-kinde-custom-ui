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
        <div className="brand-center">
          <img alt="Salus" className="brand-logo" src={getLogoUrl()} />
          <h1 className="brand-heading">Make Gen Z Members for Life</h1>
          <p className="brand-tagline">
            Meet younger members where they are. Offer the products they want.
            Earn lifetime loyalty.
          </p>
        </div>
        <p className="brand-meta">&copy; {new Date().getFullYear()} Salus Financial Technology, Inc.</p>
      </aside>
      <section className="panel">
        <div className="panel-inner">
          <Header />
          {children}
          <Footer />
        </div>
      </section>
    </div>
  );
};
