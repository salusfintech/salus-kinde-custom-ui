import { getDarkModeLogoUrl } from "@kinde/infrastructure";
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
        <svg aria-hidden="true" className="brand-grid">
          <defs>
            <pattern
              height="384"
              id="salus-tile"
              patternUnits="userSpaceOnUse"
              width="384"
            >
              <rect fill="#EEF2F6" fillOpacity="0.08" height="64" width="64" x="128" y="0" />
              <rect fill="#EEF2F6" fillOpacity="0.08" height="64" width="64" x="320" y="64" />
              <rect fill="#EEF2F6" fillOpacity="0.08" height="64" width="64" x="0" y="128" />
              <rect fill="#EEF2F6" fillOpacity="0.08" height="64" width="64" x="192" y="192" />
              <rect fill="#EEF2F6" fillOpacity="0.08" height="64" width="64" x="64" y="256" />
              <rect fill="#EEF2F6" fillOpacity="0.08" height="64" width="64" x="256" y="320" />
              <path
                d="M64 0V384M128 0V384M192 0V384M256 0V384M320 0V384M384 0V384M0 64H384M0 128H384M0 192H384M0 256H384M0 320H384M0 384H384"
                stroke="#CDD5DF"
                strokeOpacity="0.25"
              />
            </pattern>
          </defs>
          <rect fill="url(#salus-tile)" height="100%" width="100%" />
        </svg>
        <img alt="Salus" className="brand-logo" src={getDarkModeLogoUrl()} />
        <div className="brand-copy">
          <h1>Make Gen Z Members for Life</h1>
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
