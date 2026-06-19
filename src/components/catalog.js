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
exports.renderCatalog = renderCatalog;
exports.pokazatDetali = pokazatDetali;
var api_1 = require("../api");
function renderCatalog() {
    return __awaiter(this, arguments, void 0, function (search) {
        var app, games, pril, html;
        if (search === void 0) { search = ''; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = document.getElementById('app');
                    app.innerHTML = '<div class="loading">Загрузка каталога...</div>';
                    return [4 /*yield*/, (0, api_1.getGames)(search)];
                case 1:
                    games = _a.sent();
                    pril = window.prilozhenie;
                    pril.igry = games;
                    html = '<div class="games-grid">';
                    games.forEach(function (g) {
                        var owned = pril.kuplena(g.id);
                        html += "<div class=\"game-card\" onclick=\"window.prilozhenie.pokazatDetali(".concat(g.id, ")\"><div class=\"game-cover\" style=\"background-image:url('").concat(g.kartinka, "')\"></div>");
                        if (owned)
                            html += '<div class="game-badge owned">Приобретена</div>';
                        html += "<div class=\"game-info\"><div class=\"game-title\">".concat(g.nazvanie, "</div><div class=\"game-price\">").concat(g.tsena, " \u20BD</div></div>");
                        if ((0, api_1.getUser)() && !owned) {
                            html += "<div class=\"game-actions\"><button class=\"btn btn-outline\" onclick=\"event.stopPropagation();window.prilozhenie.dobavitVZhelaemoe(".concat(g.id, ")\">\u2764</button><button class=\"btn btn-primary\" onclick=\"event.stopPropagation();window.prilozhenie.dobavitVKorzinu(").concat(g.id, ")\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button></div>");
                        }
                        html += '</div>';
                    });
                    html += '</div>';
                    app.innerHTML = html;
                    return [2 /*return*/];
            }
        });
    });
}
function pokazatDetali(id) {
    return __awaiter(this, void 0, void 0, function () {
        var g, pril, owned, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, api_1.getGame)(id)];
                case 1:
                    g = _a.sent();
                    pril = window.prilozhenie;
                    owned = pril.kuplena(g.id);
                    html = "<button class=\"btn btn-outline\" onclick=\"window.prilozhenie.perejti('magazin')\" style=\"margin-bottom:1rem\">\u2190 \u041D\u0430\u0437\u0430\u0434</button>";
                    html += "<div style=\"display:flex;gap:2rem;flex-wrap:wrap\"><img src=\"".concat(g.kartinka, "\" style=\"width:400px;border-radius:8px\" onerror=\"this.style.display='none'\"><div style=\"flex:1;min-width:280px\">");
                    html += "<h2>".concat(g.nazvanie, "</h2><p style=\"color:var(--text2)\">").concat(g.razrabotchik, " \u2022 ").concat(g.izdatel, " \u2022 ").concat((g.dataVyhoda || '').split('T')[0], "</p>");
                    html += "<p style=\"margin:1rem 0\">".concat(g.opisanie, "</p><p><strong>\u0416\u0430\u043D\u0440:</strong> ").concat(g.zhanr, "</p>");
                    html += "<p style=\"font-size:1.5rem;color:var(--green);margin:1rem 0\">".concat(g.tsena, " \u20BD</p>");
                    if ((0, api_1.getUser)() && !owned) {
                        html += "<button class=\"btn btn-primary\" onclick=\"window.prilozhenie.dobavitVKorzinu(".concat(g.id, ")\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button> <button class=\"btn btn-outline\" onclick=\"window.prilozhenie.dobavitVZhelaemoe(").concat(g.id, ")\">\u0412 \u0436\u0435\u043B\u0430\u0435\u043C\u043E\u0435</button>");
                    }
                    html += '</div></div>';
                    document.getElementById('app').innerHTML = html;
                    return [2 /*return*/];
            }
        });
    });
}
