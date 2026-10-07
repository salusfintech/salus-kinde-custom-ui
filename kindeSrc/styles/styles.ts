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
    --kinde-base-font-weight: 400;
    --kinde-button-font-weight: 600;
    --kinde-control-select-text-block-size: 2.75rem;
    --kinde-control-select-text-border-color: #e2e8f0;
    --kinde-control-select-text-border-color-focus: #0015d6;
    --kinde-base-focus-border-radius: 0.5rem;
    --kinde-base-focus-outline-color: #0015d6;
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
    max-width: 100%;
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
  input[type=email],
  input[type=text],
  input[type=password] {
    appearance: none;
    -webkit-appearance: none;
    background-color: #ffffff;
    min-height: 2.75rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    box-shadow: none;
    color: #0f172a;
    font-size: 0.9375rem;
    font-weight: 400;
    font-feature-settings: normal;
    font-variant-numeric: lining-nums;
    letter-spacing: normal;
    line-height: 1.4;
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }

  [data-kinde-control-select-text]::placeholder,
  [data-kinde-control-input]::placeholder,
  input[type=email]::placeholder,
  input[type=text]::placeholder,
  input[type=password]::placeholder {
    color: #94a3b8;
    font-weight: 400;
    opacity: 1;
  }

  [data-kinde-control-select-text]:focus,
  [data-kinde-control-input]:focus,
  input[type=email]:focus,
  input[type=text]:focus,
  input[type=password]:focus {
    border-color: #0015d6;
    box-shadow: 0 0 0 3px #ffffff, 0 0 0 5px rgba(0, 21, 214, 0.22);
    outline: none;
  }

  .kinde-branding,
  [data-kinde-branding],
  [class*=kinde-branding] {
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
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
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
      flex: 1;
      flex-direction: column;
      justify-content: flex-start;
      padding: 3rem;
      color: #ffffff;
      background-color: #0015d6;
      overflow: hidden;
      position: relative;
    }

    /* Child combinators are escaped in this style tag and the rule is dropped,
       so each layer is named on its own. */
    .brand-logo,
    .brand-copy,
    .brand-meta {
      position: relative;
      z-index: 1;
    }

    .brand-grid {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .brand-grid .tile {
      fill: #f5f2ea;
      opacity: 0;
      animation-name: tile-glow;
      animation-duration: var(--dur, 52s);
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-delay: var(--delay, 0s);
    }

    .brand-logo {
      width: 12rem;
      height: auto;
      max-width: none;
      object-fit: contain;
      object-position: left;
    }

    .brand-copy {
      position: absolute;
      top: 50%;
      left: 3rem;
      max-width: 28rem;
      margin: 0;
      transform: translateY(-50%);
    }

    .brand-copy h1 {
      margin: 0 0 1rem;
      font-family: Poppins, Arial, sans-serif;
      font-size: 2.75rem;
      font-weight: 500;
      line-height: 1.3;
    }

    .brand-copy h1 strong {
      font-weight: 700;
    }

    .brand-copy p {
      margin: 0;
      font-family: Poppins, Arial, sans-serif;
      font-size: 1.125rem;
      font-weight: 400;
      line-height: 1.5;
      color: #ffffff;
    }

    .brand-meta {
      margin: auto 0 0;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
    }

    .panel {
      flex: 0 0 36rem;
      max-width: 36rem;
      padding: 3rem;
      background: #ffffff;
      overflow: hidden;
    }

    .header {
      display: none;
    }

    .help-link {
      text-align: left;
    }
  }

  /* Steady console. The bright window is the last 12.5% of a shared 52s cycle,
     so 8 of 64 buttons are glowing at once. Linear timing keeps that count fixed.
     Rise and fall are the same length and the same curve, and the whole square
     fades together. */
  @keyframes tile-glow {
    0%, 87.5% { opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
    91.5%, 96% { opacity: var(--peak, 0.08); animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
    100% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .brand-grid .tile {
      animation: none;
      opacity: 0;
    }

    .brand-grid .tile.is-rest {
      opacity: var(--peak, 0.08);
    }
  }
`;
