"use server";

import { getKindeNonce, type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";

import { Widget } from "../../../../components/widget";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

type PageContext = KindePageEvent["context"] & {
  domains?: { kindeDomain?: string };
};

// Home has no auth session, so getKindeWidget() renders an empty shell.
// Collect the email here and hand it to the dashboard, which starts Kinde or Auth0.
function dashboardLoginAction(kindeDomain: string | undefined): string {
  const host = (kindeDomain ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const dashboard =
    host === "login.salusfintech.com"
      ? "https://dashboard.salusfintech.com"
      : "https://dashboard.salusfintech-dev.com";
  return `${dashboard}/api/v1/dashboard/auth/login`;
}

const POINT_FORM_AT_DASHBOARD = `(function () {
  var form = document.getElementById("home-email");
  if (!form) return;
  var dashboard =
    window.location.hostname === "login.salusfintech.com"
      ? "https://dashboard.salusfintech.com"
      : "https://dashboard.salusfintech-dev.com";
  form.action = dashboard + "/api/v1/dashboard/auth/login";
})();`;

const IndexPage: React.FC<KindePageEvent> = ({ context, request }) => {
  const kindeDomain = (context as PageContext).domains?.kindeDomain;
  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <Widget
          heading={context.widget.content.heading}
          description={context.widget.content.description}
        >
          <form
            action={dashboardLoginAction(kindeDomain)}
            className="home-email"
            id="home-email"
            method="get"
          >
            <div className="kinde-form-field">
              <label
                className="kinde-control-label"
                data-kinde-control-label="true"
                htmlFor="home-email-input"
              >
                Email
              </label>
              <input
                autoCapitalize="off"
                autoComplete="username"
                autoFocus
                className="kinde-control-select-text"
                data-kinde-control-select-text="true"
                id="home-email-input"
                inputMode="email"
                name="email"
                required
                spellCheck={false}
                type="email"
              />
            </div>
            <button
              className="kinde-button kinde-button-variant-primary"
              data-kinde-button="true"
              data-kinde-button-variant="primary"
              type="submit"
            >
              <span className="kinde-button-text" data-kinde-button-text="true">
                Continue
              </span>
            </button>
          </form>
          <script
            dangerouslySetInnerHTML={{ __html: POINT_FORM_AT_DASHBOARD }}
            nonce={getKindeNonce()}
          />
        </Widget>
      </DefaultLayout>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await IndexPage(event);
  return renderToString(page);
}
