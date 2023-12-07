const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth", "/dehia", "/pibas"],
    createProxyMiddleware({
      // target: "http://0.0.0.0:5500",
      target: `http://app:5500`,
      changeOrigin: true,
    })
  );
};
