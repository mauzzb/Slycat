"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLibrary = renderLibrary;
function renderLibrary() {
    var pril = window.prilozhenie;
    var app = document.getElementById('app');
    if (!pril.biblioteka.length) {
        app.innerHTML = '<div class="empty-state"><h3>Библиотека пуста</h3></div>';
        return;
    }
    var html = "<h2>\u041C\u043E\u0438 \u0438\u0433\u0440\u044B (".concat(pril.biblioteka.length, ")</h2><div class=\"games-grid\">");
    pril.biblioteka.forEach(function (i) {
        var _a, _b;
        html += "<div class=\"game-card\" onclick=\"window.prilozhenie.pokazatDetali(".concat(i.igraId, ")\"><div class=\"game-cover\" style=\"background-image:url('").concat(((_a = i.igra) === null || _a === void 0 ? void 0 : _a.kartinka) || '', "')\"></div><div class=\"game-info\"><div class=\"game-title\">").concat(((_b = i.igra) === null || _b === void 0 ? void 0 : _b.nazvanie) || '', "</div></div></div>");
    });
    html += '</div>';
    app.innerHTML = html;
}
