import { SALUS_HERO_TILE_DATA_URI } from "./salus-hero-tile";

const kindeVariables = {
  baseFontFamily:
    "Inter, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif",
  controlSelectTextBorderRadius: "0.5rem",
  buttonPrimaryBackgroundColor: "#0015d6",
  buttonPrimaryColor: "#ffffff",
  buttonBorderRadius: "0.5rem",
  buttonSecondaryBackgroundColor: "#ffffff",
  buttonSecondaryBorderWidth: "1px",
  buttonSecondaryBorderColor: "#e2e8f0",
  buttonSecondaryBorderStyle: "solid",
  buttonSecondaryBorderRadius: "0.5rem",
} as const;

export const getStyles = (): string => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --kinde-base-font-family: ${kindeVariables.baseFontFamily};
    --kinde-control-select-text-border-radius: ${kindeVariables.controlSelectTextBorderRadius};
    --kinde-button-primary-background-color: ${kindeVariables.buttonPrimaryBackgroundColor};
    --kinde-button-primary-color: ${kindeVariables.buttonPrimaryColor};
    --kinde-button-border-radius: ${kindeVariables.buttonBorderRadius};
    --kinde-button-secondary-border-width: ${kindeVariables.buttonSecondaryBorderWidth};
    --kinde-button-secondary-border-style: ${kindeVariables.buttonSecondaryBorderStyle};
    --kinde-button-secondary-border-radius: ${kindeVariables.buttonSecondaryBorderRadius};
    --kinde-control-label-color: #0f172a;
    --kinde-button-font-weight: 600;
    --kinde-control-select-text-border-color: #e2e8f0;
    --kinde-button-primary-border-width: 0;
    --kinde-designer-base-link-color: #0015d6;
    --kinde-base-color: #0f172a;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [data-kinde-control-label] {
    font-weight: 500;
    font-size: 0.875rem;
    margin-bottom: 0.375rem;
  }

  [data-kinde-choice-separator] {
    color: #94a3b8;
  }

  [data-kinde-button-variant=primary] {
    background: #0015d6;
    min-height: 2.75rem;
    width: 100%;
    font-size: 0.9375rem;
    letter-spacing: -0.01em;
    transition: background 150ms ease, box-shadow 150ms ease;
  }

  [data-kinde-button-variant=primary]:hover {
    background: #0012b3;
  }

  [data-kinde-button-variant=primary]:focus-visible {
    outline: 2px solid #0015d6;
    outline-offset: 2px;
  }

  [data-kinde-control-select-text],
  [data-kinde-control-input],
  input[type="email"],
  input[type="text"],
  input[type="password"] {
    min-height: 2.75rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    font-size: 0.9375rem;
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }

  [data-kinde-control-select-text]:focus,
  [data-kinde-control-input]:focus,
  input:focus {
    border-color: #0015d6;
    box-shadow: 0 0 0 3px rgba(0, 21, 214, 0.1);
    outline: none;
  }

  .kinde-branding,
  [data-kinde-branding],
  [class*="kinde-branding"] {
    display: none !important;
  }

  /* ── Page shell ── */

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f8fafc;
  }

  /* ── Blue brand panel (hidden on mobile) ── */

  .brand {
    display: none;
  }

  /* ── White form panel ── */

  .panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 1.5rem;
  }

  .panel-inner {
    width: 100%;
    max-width: 26rem;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  .header-logo {
    height: 3rem;
    width: auto;
    max-width: 200px;
    object-fit: contain;
    object-position: left;
  }

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .help-link {
    display: block;
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.8125rem;
    color: #94a3b8;
    text-decoration: none;
  }

  .help-link:hover {
    color: #0015d6;
  }

  /* ── Footer ── */

  .footer {
    color: #94a3b8;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 0 0;
    font-size: 0.75rem;
  }

  .footer a {
    color: #94a3b8;
    text-decoration: none;
  }

  .footer a:hover {
    color: #0015d6;
  }

  /* ── Desktop: split layout ── */

  @media (min-width: 1024px) {
    .page {
      flex-direction: row;
      background: #ffffff;
    }

    .brand {
      display: flex;
      flex: 1.1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 3rem;
      color: #ffffff;
      background-color: #0015d6;
      background-image: url("${SALUS_HERO_TILE_DATA_URI}");
      background-repeat: repeat;
      background-size: 384px 384px;
      background-position: 0 0;
      overflow: hidden;
      position: relative;
      text-align: center;
    }

    .brand-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 26rem;
    }

    .brand-logo {
      height: 3.5rem;
      width: auto;
      max-width: 200px;
      object-fit: contain;
      filter: brightness(0) invert(1);
      margin-bottom: 2rem;
    }

    .brand-heading {
      margin: 0 0 1rem;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }

    .brand-tagline {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.75);
    }

    .brand-meta {
      position: absolute;
      bottom: 2rem;
      left: 0;
      right: 0;
      text-align: center;
      margin: 0;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
    }

    .panel {
      flex: 1;
      padding: 3rem 4rem;
      background: #ffffff;
    }

    .header {
      display: none;
    }

    .help-link {
      text-align: left;
    }
  }
`;
