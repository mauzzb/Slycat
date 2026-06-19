"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWishlist = renderWishlist;
function renderWishlist() {
    var pril = window.prilozhenie;
    var app = document.getElementById('app');
    if (!pril.zhelaemoe.length) {
        app.innerHTML = '<div class="empty-state"><h3>Список желаемого пуст</h3></div>';
        return;
    }
    var html = "<h2>\u0416\u0435\u043B\u0430\u0435\u043C\u043E\u0435 (".concat(pril.zhelaemoe.length, ")</h2>");
    pril.zhelaemoe.forEach(function (i) {
        var _a, _b, _c;
        html += "<div class=\"cart-item\"><div class=\"cart-item-cover\" style=\"background-image:url('".concat(((_a = i.igra) === null || _a === void 0 ? void 0 : _a.kartinka) || '', "')\"></div><div style=\"flex:1\"><strong>").concat(((_b = i.igra) === null || _b === void 0 ? void 0 : _b.nazvanie) || '', "</strong><div>").concat(((_c = i.igra) === null || _c === void 0 ? void 0 : _c.tsena) || 0, " \u20BD</div></div><button class=\"btn btn-danger\" onclick=\"window.prilozhenie.udalitIzZhelaemogo(").concat(i.id, ")\">\u00D7</button></div>");
    });
    app.innerHTML = html;
}
