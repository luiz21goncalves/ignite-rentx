const authConfig = {
  secret_token: process.env.SECRET_TOKEN || "secret_token",
  expires_in_token: "15m",
  secret_refresh_token:
    process.env.SECRET_REFRESH_TOKEN || "secret_refresh_token",
  expires_in_refresh_token: "2d",
  expires_refresh_token_days: 2,
};

export { authConfig };
