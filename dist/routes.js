"use strict";
exports.__esModule = true;
exports.routes = void 0;
var ProductController_1 = require("./controllers/ProductController");
var _routes = [['/products', ProductController_1.ProductController]];
var routes = function (server) {
    _routes.forEach(function (route) {
        var url = route[0], controller = route[1];
        server.use(url, controller);
    });
};
exports.routes = routes;
