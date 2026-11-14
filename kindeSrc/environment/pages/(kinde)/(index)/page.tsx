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
// data-kinde-handler-disabled keeps Kinde's global submit script from
// cancelling this navigation. That script fetches the action and rejects redirects.
const DASHBOARD_ORIGIN_BY_LOGIN_HOST: Record<string, string> = {
  "login.salusfintech.com": "https://dashboard.salusfintech.com",
  "login.salusfintech-dev.com": "https://dashboard.salusfintech-dev.com",
};

function loginHost(raw: string | undefined): string {
  return (raw ?? "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .split(":")[0]
    .toLowerCase();
}

function dashboardLoginAction(kindeDomain: string | undefined): string | undefined {
  const origin = DASHBOARD_ORIGIN_BY_LOGIN_HOST[loginHost(kindeDomain)];
  return origin ? `${origin}/api/v1/dashboard/auth/login` : undefined;
}

const POINT_FORM_AT_DASHBOARD = `(function () {
  var form = document.getElementById("home-email");
  if (!form) return;
  var targets = {
    "login.salusfintech.com": "https://dashboard.salusfintech.com",
    "login.salusfintech-dev.com": "https://dashboard.salusfintech-dev.com"
  };
  var dashboard = targets[window.location.hostname];
  if (!dashboard) {
    form.removeAttribute("action");
    return;
  }
  form.action = dashboard + "/api/v1/dashboard/auth/login";
})();`;

const IndexPage: React.FC<KindePageEvent> = ({ context, request }) => {
  const kindeDomain = (context as PageContext).domains?.kindeDomain;
  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <Widget
          heading="Sign in"
          description="Enter your work email to continue."
        >
          <form
            action={dashboardLoginAction(kindeDomain)}
            className="home-email"
            data-kinde-handler-disabled="true"
            id="home-email"
            method="post"
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
