"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUI = updateUI;
exports.applyTheme = applyTheme;
exports.logout = logout;
var api_1 = require("../api");
function updateUI() {
    var m = document.getElementById('userMenu');
    if (!m)
        return;
    var ids = ['navBiblioteka', 'navZhelaemoe', 'navKorzina'];
    var user = (0, api_1.getUser)();
    if (user) {
        var av = user.avatar || '';
        var avHtml = av
            ? '<img class="user-avatar" src="' + av + '" onerror="this.style.display=\'none\'" onclick="window.prilozhenie.perejti(\'profil\')" title="Профиль">'
            : '<div class="user-avatar" style="background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:1.2rem" onclick="window.prilozhenie.perejti(\'profil\')" title="Профиль">?</div>';
        m.innerHTML = avHtml + '<span class="user-name" onclick="window.prilozhenie.perejti(\'profil\')">' + user.username + '</span><button class="btn btn-outline" onclick="window.prilozhenie.vyjti()">Выйти</button>';
        ids.forEach(function (id) { var el = document.getElementById(id); if (el)
            el.style.display = ''; });
    }
    else {
        m.innerHTML = '<button class="btn btn-primary" onclick="window.prilozhenie.pokazatVhod()">Войти</button>';
        ids.forEach(function (id) { var el = document.getElementById(id); if (el)
            el.style.display = 'none'; });
    }
}
function applyTheme() {
    var pril = window.prilozhenie;
    document.body.classList.toggle('light-theme', (pril === null || pril === void 0 ? void 0 : pril.tema) === 'light');
    var btn = document.querySelector('.theme-btn');
    if (btn)
        btn.innerHTML = (pril === null || pril === void 0 ? void 0 : pril.tema) === 'dark' ? '☀' : '🌙';
}
function logout() {
    (0, api_1.setUser)(null);
    localStorage.removeItem('slycat_user');
    var pril = window.prilozhenie;
    pril.profil = null;
    pril.zhelaemoe = [];
    pril.korzina = [];
    pril.biblioteka = [];
    updateUI();
    pril.perejti('magazin');
}
