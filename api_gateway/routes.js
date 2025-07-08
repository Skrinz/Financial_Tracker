const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  const commonOptions = {
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  };

  app.use(
    "/api/users",
    createProxyMiddleware({
      ...commonOptions,
      target: process.env.USER_SERVICE_URL,
    })
  );

  app.use(
    "/api/expenses",
    createProxyMiddleware({
      ...commonOptions,
      target: process.env.EXPENSES_SERVICE_URL,
    })
  );

  app.use(
    "/api/budgets",
    createProxyMiddleware({
      ...commonOptions,
      target: process.env.BUDGET_SERVICE_URL,
    })
  );
};
// This code sets up the API Gateway routes using http-proxy-middleware.
