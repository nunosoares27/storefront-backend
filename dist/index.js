"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var host = '0.0.0.0:3000';
server_1.server.listen(3000, function () { return console.log("Server is listening on port ".concat(host)); });
