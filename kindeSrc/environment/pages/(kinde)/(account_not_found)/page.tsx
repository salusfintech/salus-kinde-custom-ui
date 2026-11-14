"use server";

import { getKindeLoginUrl, type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";

import { Widget } from "../../../../components/widget";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const FALLBACK_HEADING = "Account not found";
const FALLBACK_DESCRIPTION =
  "We couldn't find a Salus account for this sign-in. If you use Google, ask a Salus admin to add your work email first, then try again.";

/**
 * Handles /auth/cx/m:account_not_found&psid:…
 * Without this route, (default) rendered and Widget fell back to "Sign in",
 * so the failure looked like a normal login page.
 */
const AccountNotFoundPage: React.FC<KindePageEvent> = ({ context, request }) => {
  const heading = context.widget.content.heading?.trim() || FALLBACK_HEADING;
  const description =
    context.widget.content.description?.trim() || FALLBACK_DESCRIPTION;

  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <Widget heading={heading} description={description}>
          <p className="account-not-found-back">
            <a href={getKindeLoginUrl()}>Back to sign in</a>
          </p>
        </Widget>
      </DefaultLayout>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await AccountNotFoundPage(event);
  return renderToString(page);
}
