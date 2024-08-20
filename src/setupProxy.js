const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/sitemap', {target: 'http://localhost:5000'}));
    app.use(createProxyMiddleware('/api', {target: 'http://localhost:5000'}));
}