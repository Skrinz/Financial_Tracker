const { createProxyMiddleware } = require("http-proxy-middleware");
const { authenticate } = require("./auth");

module.exports = (app) => {
  const commonOptions = {
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  };

  // Public (unauthenticated) routes
  app.use(
    "/api/users",
    createProxyMiddleware({
      ...commonOptions,
      target: process.env.USER_SERVICE_URL,
    })
  );

  // Protected routes
  app.use(
    "/api/expenses",
    authenticate,
    createProxyMiddleware({
      ...commonOptions,
      target: process.env.EXPENSES_SERVICE_URL,
    })
  );

  app.use(
    "/api/budgets",
    authenticate,
    createProxyMiddleware({
      ...commonOptions,
      target: process.env.BUDGET_SERVICE_URL,
    })
  );
};
// This code sets up the API Gateway routes using http-proxy-middleware.
