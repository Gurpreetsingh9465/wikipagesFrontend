const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api/*', { target: 'http://localhost:8000' }));
    app.use(proxy('/api/utils/', { target: 'http://localhost:8000' }));
    app.use(proxy('/getCsrfToken',{target: 'http://localhost:8000'}));
};