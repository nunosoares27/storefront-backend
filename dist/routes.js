"use strict";
exports.__esModule = true;
exports.routes = void 0;
var ProductController_1 = require("./controllers/ProductController");
var CategoryController_1 = require("./controllers/CategoryController");
var _routes = [
    ['/products', ProductController_1.ProductController],
    ['/categories', CategoryController_1.CategoryController],
];
var routes = function (server) {
    _routes.forEach(function (route) {
        var url = route[0], controller = route[1];
        server.use(url, controller);
    });
};
exports.routes = routes;
