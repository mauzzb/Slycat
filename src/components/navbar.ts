import { getUser, setUser } from '../api';

export function updateUI(): void {
    const m = document.getElementById('userMenu');
    if (!m) return;
    const ids = ['navBiblioteka', 'navZhelaemoe', 'navKorzina'];
    const user = getUser();
    if (user) {
        const av = user.avatar || '';
        const avHtml = av
            ? '<img class="user-avatar" src="' + av + '" onerror="this.style.display=\'none\'" onclick="window.prilozhenie.perejti(\'profil\')" title="Профиль">'
            : '<div class="user-avatar" style="background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:1.2rem" onclick="window.prilozhenie.perejti(\'profil\')" title="Профиль">?</div>';
        m.innerHTML = avHtml + '<span class="user-name" onclick="window.prilozhenie.perejti(\'profil\')">' + user.username + '</span><button class="btn btn-outline" onclick="window.prilozhenie.vyjti()">Выйти</button>';
        ids.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = ''; });
    } else {
        m.innerHTML = '<button class="btn btn-primary" onclick="window.prilozhenie.pokazatVhod()">Войти</button>';
        ids.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    }
}

export function applyTheme(): void {
    const pril = (window as any).prilozhenie;
    document.body.classList.toggle('light-theme', pril?.tema === 'light');
    const btn = document.querySelector('.theme-btn') as HTMLElement;
    if (btn) btn.innerHTML = pril?.tema === 'dark' ? '☀' : '🌙';
}

export function logout(): void {
    setUser(null);
    localStorage.removeItem('slycat_user');
    const pril = (window as any).prilozhenie;
    pril.profil = null; pril.zhelaemoe = []; pril.korzina = []; pril.biblioteka = [];
    updateUI();
    pril.perejti('magazin');
}