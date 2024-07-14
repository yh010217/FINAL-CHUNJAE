const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/back', createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
        logLevel: 'debug'
    }));

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://tsherpa.item-factory.com',
            changeOrigin: true,
            logLevel: 'debug'
        })
    );
};
