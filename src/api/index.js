"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getUser = getUser;
exports.setUser = setUser;
exports.register = register;
exports.login = login;
exports.getGames = getGames;
exports.getGame = getGame;
exports.getWishlist = getWishlist;
exports.addToWishlist = addToWishlist;
exports.removeFromWishlist = removeFromWishlist;
exports.getCart = getCart;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.clearCart = clearCart;
exports.checkout = checkout;
exports.getLibrary = getLibrary;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.updateAvatar = updateAvatar;
exports.changePassword = changePassword;
var API = 'http://localhost:5000/api';
var currentUser = null;
function getUser() { return currentUser; }
function setUser(u) { currentUser = u; }
function request(url_1) {
    return __awaiter(this, arguments, void 0, function (url, opts) {
        var headers, r;
        if (opts === void 0) { opts = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = __assign({ 'Content-Type': 'application/json' }, opts.headers);
                    if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.token)
                        headers['Authorization'] = 'Bearer ' + currentUser.token;
                    return [4 /*yield*/, fetch(API + url, { method: opts.method || 'GET', headers: headers, body: opts.body || undefined })];
                case 1:
                    r = _a.sent();
                    if (r.status === 401)
                        throw new Error('Auth');
                    return [2 /*return*/, r];
            }
        });
    });
}
function register(username, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/auth/registraciya', { method: 'POST', body: JSON.stringify({ imya: username, pochta: email, parol: password }) })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/auth/vhod', { method: 'POST', body: JSON.stringify({ email: email, password: password }) })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function getGames(search) {
    return __awaiter(this, void 0, void 0, function () {
        var q, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    q = search ? '?poisk=' + encodeURIComponent(search) : '';
                    return [4 /*yield*/, request('/igry' + q)];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function getGame(id) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/igry/' + id)];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function getWishlist() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/zhelaemoe')];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function addToWishlist(gameId) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/zhelaemoe', { method: 'POST', body: String(gameId) })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function removeFromWishlist(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/zhelaemoe/' + id, { method: 'DELETE' })];
        });
    });
}
function getCart() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/korzina')];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function addToCart(gameId) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/korzina', { method: 'POST', body: String(gameId) })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function removeFromCart(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/korzina/' + id, { method: 'DELETE' })];
        });
    });
}
function clearCart() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/korzina/ochistit', { method: 'DELETE' })];
        });
    });
}
function checkout() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/korzina/oplatit', { method: 'POST' })];
        });
    });
}
function getLibrary() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/biblioteka')];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function getProfile() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/polzovatel/profil')];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function updateProfile(data) {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request('/polzovatel/profil', { method: 'PUT', body: JSON.stringify(data) })];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r.json()];
            }
        });
    });
}
function updateAvatar(avatar) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/polzovatel/avatar', { method: 'POST', body: JSON.stringify({ avatar: avatar }) })];
        });
    });
}
function changePassword(oldPassword, newPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/polzovatel/smenit-parol', { method: 'POST', body: JSON.stringify({ staryjParol: oldPassword, novyjParol: newPassword }) })];
        });
    });
}
