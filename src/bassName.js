const isProduction = process.env.NODE_ENV === "production";

export const baseName = isProduction
  ? process.env.REACT_APP_PRO_ENV
  : process.env.REACT_APP_DEV_ENV;
