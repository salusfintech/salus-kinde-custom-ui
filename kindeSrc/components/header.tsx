"use server";

import { getLogoUrl } from "@kinde/infrastructure";
import React from "react";

export const Header = () => {
  return (
    <div className="header">
      <img alt="Salus" className="header-logo" src={getLogoUrl()} />
    </div>
  );
};
