"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderProfile = renderProfile;
function renderProfile() {
    var pril = window.prilozhenie;
    var p = pril.profil || {};
    var user = window.polzovatel;
    var html = "<div class=\"profile-header\"><div class=\"profile-avatar\" style=\"background-image:url('".concat(p.avatar || '', "')\">").concat(p.avatar ? '' : '?', "</div>");
    html += "<h2>".concat(p.imya || (user === null || user === void 0 ? void 0 : user.username) || '', "</h2><p>").concat(p.pochta || (user === null || user === void 0 ? void 0 : user.email) || '', "</p><button class=\"btn btn-outline\" style=\"margin-top:1rem\" onclick=\"window.prilozhenie.pokazatRedaktirovanieProfilya()\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</button></div>");
    html += "<div class=\"profile-stats\"><div class=\"stat-card\"><div class=\"stat-number\">".concat(pril.biblioteka.length, "</div><div class=\"stat-label\">\u0418\u0433\u0440</div></div><div class=\"stat-card\"><div class=\"stat-number\">").concat(pril.zhelaemoe.length, "</div><div class=\"stat-label\">\u0416\u0435\u043B\u0430\u0435\u043C\u043E\u0435</div></div><div class=\"stat-card\"><div class=\"stat-number\">").concat(pril.korzina.length, "</div><div class=\"stat-label\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</div></div></div>");
    document.getElementById('app').innerHTML = html;
}
