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
exports.showPayment = showPayment;
exports.processPayment = processPayment;
var api_1 = require("../api");
var utils_1 = require("../utils/utils");
function showPayment() {
    var pril = window.prilozhenie;
    var total = pril.korzina.reduce(function (s, i) { var _a; return s + (((_a = i.igra) === null || _a === void 0 ? void 0 : _a.tsena) || 0); }, 0);
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = "<div class=\"modal\"><button class=\"modal-close\" onclick=\"this.closest('.modal-overlay')?.remove()\">\u00D7</button><h2>\u041E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430\u043A\u0430\u0437\u0430</h2><p style=\"margin-bottom:1.5rem\">\u0421\u0443\u043C\u043C\u0430: <strong style=\"color:var(--green)\">".concat(total, " \u20BD</strong></p><div class=\"payment-option selected\"><div class=\"payment-icon card\">VISA</div><div><strong>\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430</strong></div></div><div class=\"payment-option\"><div class=\"payment-icon sbp\">SBP</div><div><strong>\u0421\u0411\u041F</strong></div></div><div class=\"payment-option\"><div class=\"payment-icon yoomoney\">U</div><div><strong>\u042EMoney</strong></div></div><div class=\"payment-option\"><div class=\"payment-icon crypto\">B</div><div><strong>\u041A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430</strong></div></div><div style=\"display:flex;gap:0.75rem;margin-top:1.5rem\"><button class=\"btn btn-secondary\" style=\"flex:1\" onclick=\"this.closest('.modal-overlay')?.remove()\">\u041E\u0442\u043C\u0435\u043D\u0430</button><button class=\"btn btn-success\" style=\"flex:1\" id=\"oplataKnopka\" onclick=\"window.prilozhenie.vypolnitOplatu()\">\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u044C ").concat(total, " \u20BD</button></div></div>");
    document.body.appendChild(overlay);
    overlay.querySelectorAll('.payment-option').forEach(function (o) { return o.addEventListener('click', function () {
        overlay.querySelectorAll('.payment-option').forEach(function (x) { return x.classList.remove('selected'); });
        o.classList.add('selected');
    }); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay)
        overlay.remove(); });
}
function processPayment() {
    return __awaiter(this, void 0, void 0, function () {
        var btn, pril;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    btn = document.getElementById('oplataKnopka');
                    btn.textContent = 'Обработка...';
                    btn.disabled = true;
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, (0, api_1.checkout)()];
                case 2:
                    _b.sent();
                    (_a = document.querySelector('.modal-overlay')) === null || _a === void 0 ? void 0 : _a.remove();
                    pril = window.prilozhenie;
                    return [4 /*yield*/, pril.zagruzitDannye()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, pril.otrisovatKorzinu()];
                case 4:
                    _b.sent();
                    (0, utils_1.showToast)('Оплата прошла! Игры в библиотеке.');
                    return [2 /*return*/];
            }
        });
    });
}
