import { SALUS_HERO_TILE_DATA_URI } from "./salus-hero-tile";

const kindeVariables = {
  baseFontFamily:
    "-apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif",
  controlSelectTextBorderRadius: "0.375rem",
  buttonPrimaryBackgroundColor: "#0015d6",
  buttonPrimaryColor: "#ffffff",
  buttonBorderRadius: "0.375rem",
  buttonSecondaryBackgroundColor: "#ffffff",
  buttonSecondaryBorderWidth: "1px",
  buttonSecondaryBorderColor: "#e2e8f0",
  buttonSecondaryBorderStyle: "solid",
  buttonSecondaryBorderRadius: "0.375rem",
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
    --kinde-button-font-weight: 600;
    --kinde-control-select-text-border-color: #e2e8f0;
    --kinde-button-primary-border-width: 0;
    --kinde-designer-base-link-color: #0015d6;
    --kinde-base-color: #0f172a;
  }

  body {
    margin: 0;
  }

  [data-kinde-control-label] {
    font-weight: 500;
  }

  [data-kinde-choice-separator] {
    color: #64748b;
  }

  [data-kinde-button-variant=primary] {
    background: #0015d6;
  }

  .kinde-branding a {
    color: #64748b;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .brand {
    display: none;
  }

  .panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 1.5rem;
  }

  .header {
    display: flex;
    align-items: center;
    padding: 0 0 2rem;
  }

  .header-logo {
    height: 3.5rem;
    width: auto;
    max-width: 200px;
    object-fit: contain;
    object-position: left;
  }

  .login-form {
    max-width: 24rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .footer {
    color: #64748b;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    padding: 2rem 0 0;
    font-size: 0.75rem;
  }

  .footer a {
    color: #64748b;
    text-decoration: none;
  }

  @media (min-width: 1024px) {
    .page {
      flex-direction: row;
    }

    .brand {
      display: flex;
      flex: 1.1;
      flex-direction: column;
      justify-content: space-between;
      padding: 3rem;
      color: #ffffff;
      background-color: #0015d6;
      background-image: url("${SALUS_HERO_TILE_DATA_URI}");
      background-repeat: repeat;
      background-size: 384px 384px;
      background-position: 0 0;
    }

    .brand-logo {
      height: 4rem;
      width: auto;
      max-width: 220px;
      object-fit: contain;
      object-position: left;
      filter: brightness(0) invert(1);
    }

    .brand-copy h1 {
      margin: 0 0 1rem;
      font-size: 2.25rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      line-height: 1.2;
    }

    .brand-copy p {
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
    }

    .brand-meta {
      margin: 0;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .panel {
      flex: 1;
      padding: 3rem 4rem;
    }

    .header {
      display: none;
    }
  }
`;
