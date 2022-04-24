"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Store = void 0;
var database_1 = __importDefault(require("../database"));
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_connection, sql, categories, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db_connection = _a.sent();
                        sql = 'SELECT * FROM categories';
                        return [4 /*yield*/, db_connection.query(sql)];
                    case 2:
                        categories = _a.sent();
                        db_connection.release();
                        return [2 /*return*/, categories.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Cannot get categories =(, ".concat(error_1, " )"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db_connection, sql, category, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db_connection = _a.sent();
                        sql = 'SELECT * FROM categories where id = $1';
                        return [4 /*yield*/, db_connection.query(sql, [id])];
                    case 2:
                        category = _a.sent();
                        db_connection.release();
                        return [2 /*return*/, category.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Cannot create Category =(, ".concat(error_2, " )"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.create = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var db_connection, sql, newCategory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db_connection = _a.sent();
                        sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *';
                        return [4 /*yield*/, db_connection.query(sql, [name])];
                    case 2:
                        newCategory = _a.sent();
                        db_connection.release();
                        return [2 /*return*/, newCategory.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Cannot create Category =(, ".concat(error_3, " )"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.update = function (_a) {
        var id = _a.id, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var db_connection, sql, updateCategory, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db_connection = _b.sent();
                        sql = 'UPDATE categories SET name = $1 where id = $2';
                        return [4 /*yield*/, db_connection.query(sql, [name, id])];
                    case 2:
                        updateCategory = _b.sent();
                        db_connection.release();
                        return [2 /*return*/, 'updated with Sucess'];
                    case 3:
                        error_4 = _b.sent();
                        throw new Error("Cannot edit Category =(, ".concat(error_4, " )"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype["delete"] = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var db_connection, sql, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db_connection = _b.sent();
                        sql = 'DELETE FROM categories WHERE id = $1';
                        return [4 /*yield*/, db_connection.query(sql, [id])];
                    case 2:
                        _b.sent();
                        db_connection.release();
                        return [2 /*return*/, 'deleted with sucess'];
                    case 3:
                        error_5 = _b.sent();
                        throw new Error("Cannot delete Category =(, ".concat(error_5, " )"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Store;
}());
exports.Store = Store;
