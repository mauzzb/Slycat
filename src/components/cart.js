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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCart = addCart;
exports.removeCart = removeCart;
exports.renderCart = renderCart;
exports.clearAllCart = clearAllCart;
var api_1 = require("../api");
var utils_1 = require("../utils/utils");
function addCart(gameId) {
    return __awaiter(this, void 0, void 0, function () {
        var pril;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pril = window.prilozhenie;
                    if (pril.kuplena(gameId)) {
                        (0, utils_1.showToast)('Игра уже приобретена');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, api_1.addToCart)(gameId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pril.zagruzitDannye()];
                case 2:
                    _a.sent();
                    (0, utils_1.showUndoToast)('Добавлено в корзину', function () {
                        var item = pril.korzina.find(function (c) { return c.igraId === gameId; });
                        if (item)
                            (0, api_1.removeFromCart)(item.id).then(function () { return pril.zagruzitDannye(); });
                    });
                    if (!(pril.modul === 'magazin')) return [3 /*break*/, 4];
                    return [4 /*yield*/, pril.otrisovatKatalog()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function removeCart(id) {
    return __awaiter(this, void 0, void 0, function () {
        var pril;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, api_1.removeFromCart)(id)];
                case 1:
                    _a.sent();
                    pril = window.prilozhenie;
                    return [4 /*yield*/, pril.zagruzitDannye()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, renderCart()];
                case 3:
                    _a.sent();
                    (0, utils_1.showToast)('Удалено из корзины');
                    return [2 /*return*/];
            }
        });
    });
}
function renderCart() {
    return __awaiter(this, void 0, void 0, function () {
        var pril, app, total, html;
        return __generator(this, function (_a) {
            pril = window.prilozhenie;
            app = document.getElementById('app');
            if (!pril.korzina.length) {
                app.innerHTML = '<div class="empty-state"><h3>Корзина пуста</h3></div>';
                return [2 /*return*/];
            }
            total = pril.korzina.reduce(function (sum, i) { var _a; return sum + (((_a = i.igra) === null || _a === void 0 ? void 0 : _a.tsena) || 0); }, 0);
            html = "<h2>\u041A\u043E\u0440\u0437\u0438\u043D\u0430 (".concat(pril.korzina.length, ")</h2>");
            pril.korzina.forEach(function (i) {
                var _a, _b, _c;
                html += "<div class=\"cart-item\"><div class=\"cart-item-cover\" style=\"background-image:url('".concat(((_a = i.igra) === null || _a === void 0 ? void 0 : _a.kartinka) || '', "')\"></div><div style=\"flex:1\"><strong>").concat(((_b = i.igra) === null || _b === void 0 ? void 0 : _b.nazvanie) || '', "</strong><div>").concat(((_c = i.igra) === null || _c === void 0 ? void 0 : _c.tsena) || 0, " \u20BD</div></div><button class=\"btn btn-danger\" onclick=\"window.prilozhenie.udalitIzKorziny(").concat(i.id, ")\">\u00D7</button></div>");
            });
            html += "<div style=\"text-align:right;margin-top:1rem\"><h2>\u0418\u0442\u043E\u0433\u043E: ".concat(total, " \u20BD</h2><button class=\"btn btn-danger\" onclick=\"window.prilozhenie.ochistitKorzinu()\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</button> <button class=\"btn btn-success\" onclick=\"window.prilozhenie.pokazatOplatu()\">\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u044C</button></div>");
            app.innerHTML = html;
            return [2 /*return*/];
        });
    });
}
function clearAllCart() {
    return __awaiter(this, void 0, void 0, function () {
        var pril;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, api_1.clearCart)()];
                case 1:
                    _a.sent();
                    pril = window.prilozhenie;
                    return [4 /*yield*/, pril.zagruzitDannye()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, renderCart()];
                case 3:
                    _a.sent();
                    (0, utils_1.showToast)('Корзина очищена');
                    return [2 /*return*/];
            }
        });
    });
}
