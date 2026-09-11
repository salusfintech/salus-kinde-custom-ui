import { getDarkModeLogoUrl } from "@kinde/infrastructure";
import React from "react";

import { BrandGrid } from "../components/brand-grid";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

type LayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page">
      <aside className="brand">
        <BrandGrid />
        <img alt="Salus" className="brand-logo" src={getDarkModeLogoUrl()} />
        <div className="brand-copy">
          <h1>Make <strong>Gen Z</strong> Members for Life</h1>
          <p>
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
