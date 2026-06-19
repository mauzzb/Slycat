export function renderProfile() {
    const pril = window.prilozhenie;
    const p = pril.profil || {};
    const user = window.polzovatel;
    let html = `<div class="profile-header"><div class="profile-avatar" style="background-image:url('${p.avatar || ''}')">${p.avatar ? '' : '?'}</div>`;
    html += `<h2>${p.imya || user?.username || ''}</h2><p>${p.pochta || user?.email || ''}</p><button class="btn btn-outline" style="margin-top:1rem" onclick="window.prilozhenie.pokazatRedaktirovanieProfilya()">Редактировать профиль</button></div>`;
    html += `<div class="profile-stats"><div class="stat-card"><div class="stat-number">${pril.biblioteka.length}</div><div class="stat-label">Игр</div></div><div class="stat-card"><div class="stat-number">${pril.zhelaemoe.length}</div><div class="stat-label">Желаемое</div></div><div class="stat-card"><div class="stat-number">${pril.korzina.length}</div><div class="stat-label">Корзина</div></div></div>`;
    document.getElementById('app').innerHTML = html;
}
