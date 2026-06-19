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
var api_1 = require("./api");
var navbar_1 = require("./components/navbar");
var auth_1 = require("./components/auth");
var catalog_1 = require("./components/catalog");
var cart_1 = require("./components/cart");
var wishlist_1 = require("./components/wishlist");
var library_1 = require("./components/library");
var profile_1 = require("./components/profile");
var payment_1 = require("./components/payment");
var help_1 = require("./components/help");
var Prilozhenie = /** @class */ (function () {
    function Prilozhenie() {
        this.igry = [];
        this.zhelaemoe = [];
        this.korzina = [];
        this.biblioteka = [];
        this.profil = null;
        this.modul = 'magazin';
        this.tema = 'dark';
        this.otrisovatKatalog = catalog_1.renderCatalog;
        this.pokazatDetali = catalog_1.pokazatDetali;
        this.otrisovatZhelaemoe = wishlist_1.renderWishlist;
        this.otrisovatKorzinu = cart_1.renderCart;
        this.otrisovatBiblioteku = library_1.renderLibrary;
        this.otrisovatProfil = profile_1.renderProfile;
        this.otrisovatSpravku = help_1.renderHelp;
        this.pokazatVhod = auth_1.showLogin;
        this.pokazatRegistraciyu = auth_1.showRegister;
        this.obrabotatAuth = auth_1.handleAuth;
        this.dobavitVKorzinu = cart_1.addCart;
        this.udalitIzKorziny = cart_1.removeCart;
        this.ochistitKorzinu = cart_1.clearAllCart;
        this.pokazatOplatu = payment_1.showPayment;
        this.vypolnitOplatu = payment_1.processPayment;
        this.vyjti = navbar_1.logout;
    }
    Prilozhenie.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var saved;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.tema = localStorage.getItem('slycat_theme') || 'dark';
                        (0, navbar_1.applyTheme)();
                        saved = localStorage.getItem('slycat_user');
                        if (!saved) return [3 /*break*/, 2];
                        (0, api_1.setUser)(JSON.parse(saved));
                        return [4 /*yield*/, this.zagruzitDannye()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        (0, navbar_1.updateUI)();
                        this.perejti('magazin');
                        (_a = document.getElementById('poiskInput')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (e) {
                            clearTimeout(_this._t);
                            _this._t = setTimeout(function () { return _this.otrisovatKatalog(e.target.value); }, 400);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Prilozhenie.prototype.perekluchitTemu = function () { this.tema = this.tema === 'dark' ? 'light' : 'dark'; localStorage.setItem('slycat_theme', this.tema); (0, navbar_1.applyTheme)(); };
    Prilozhenie.prototype.kuplena = function (gid) { return this.biblioteka.some(function (l) { return l.igraId === gid; }); };
    Prilozhenie.prototype.zagruzitDannye = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, p, w, c, l, u;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(0, api_1.getUser)())
                            return [2 /*return*/];
                        return [4 /*yield*/, Promise.all([(0, api_1.getProfile)().catch(function () { return null; }), (0, api_1.getWishlist)().catch(function () { return []; }), (0, api_1.getCart)().catch(function () { return []; }), (0, api_1.getLibrary)().catch(function () { return []; })])];
                    case 1:
                        _a = _b.sent(), p = _a[0], w = _a[1], c = _a[2], l = _a[3];
                        this.profil = p;
                        this.zhelaemoe = w;
                        this.korzina = c;
                        this.biblioteka = l;
                        if (p === null || p === void 0 ? void 0 : p.avatar) {
                            u = (0, api_1.getUser)();
                            u.avatar = p.avatar;
                            (0, api_1.setUser)(u);
                            localStorage.setItem('slycat_user', JSON.stringify(u));
                        }
                        document.getElementById('zhelaemoeCount').textContent = String(this.zhelaemoe.length);
                        document.getElementById('korzinaCount').textContent = String(this.korzina.length);
                        (0, navbar_1.updateUI)();
                        return [2 /*return*/];
                }
            });
        });
    };
    Prilozhenie.prototype.dobavitVZhelaemoe = function (gid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.kuplena(gid))
                            return [2 /*return*/];
                        return [4 /*yield*/, (0, api_1.addToWishlist)(gid)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.zagruzitDannye()];
                    case 2:
                        _a.sent();
                        if (!(this.modul === 'magazin')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.otrisovatKatalog()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Prilozhenie.prototype.udalitIzZhelaemogo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, api_1.removeFromWishlist)(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.zagruzitDannye()];
                    case 2:
                        _a.sent();
                        this.otrisovatZhelaemoe();
                        return [2 /*return*/];
                }
            });
        });
    };
    Prilozhenie.prototype.perejti = function (m) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.modul = m;
                        if (!(0, api_1.getUser)() && m !== 'magazin' && m !== 'spravka') {
                            (0, auth_1.showLogin)();
                            return [2 /*return*/];
                        }
                        if (!((0, api_1.getUser)() && !this.profil && m !== 'spravka')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.zagruzitDannye()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(m === 'magazin')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.otrisovatKatalog()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(m === 'zhelaemoe')) return [3 /*break*/, 5];
                        this.otrisovatZhelaemoe();
                        return [3 /*break*/, 8];
                    case 5:
                        if (!(m === 'korzina')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.otrisovatKorzinu()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        if (m === 'biblioteka')
                            this.otrisovatBiblioteku();
                        else if (m === 'profil')
                            this.otrisovatProfil();
                        else if (m === 'spravka')
                            this.otrisovatSpravku();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Prilozhenie;
}());
var app = new Prilozhenie();
window.prilozhenie = app;
document.addEventListener('DOMContentLoaded', function () { return app.init(); });
