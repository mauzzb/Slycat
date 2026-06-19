import { getUser, setUser, updateProfile, updateAvatar, changePassword } from '../api';
import { showToast } from '../utils/utils';
import { updateUI } from './navbar';

export function renderProfile(): void {
    const pril = (window as any).prilozhenie;
    const p = pril.profil || {};
    const user = getUser();
    let html = `<div class="profile-header"><div class="profile-avatar" style="background-image:url('${p.avatar || ''}')">${p.avatar ? '' : '?'}</div>`;
    html += `<h2>${p.imya || user?.username || ''}</h2><p>${p.pochta || user?.email || ''}</p><button class="btn btn-outline" style="margin-top:1rem" onclick="window.prilozhenie.pokazatRedaktirovanieProfilya()">Редактировать профиль</button></div>`;
    html += `<div class="profile-stats"><div class="stat-card"><div class="stat-number">${pril.biblioteka.length}</div><div class="stat-label">Игр</div></div><div class="stat-card"><div class="stat-number">${pril.zhelaemoe.length}</div><div class="stat-label">Желаемое</div></div><div class="stat-card"><div class="stat-number">${pril.korzina.length}</div><div class="stat-label">Корзина</div></div></div>`;
    (document.getElementById('app') as HTMLElement).innerHTML = html;
}

export function showEditProfileModal(): void {
    const pril = (window as any).prilozhenie;
    const p = pril.profil || {};
    const user = getUser();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal"><button class="modal-close" onclick="this.closest('.modal-overlay')?.remove()">×</button><h2>Редактирование профиля</h2><div style="text-align:center;margin-bottom:1.5rem"><div class="profile-avatar" id="editAvatarPreview" style="background-image:url('${p.avatar || ''}');margin:0 auto">${p.avatar ? '' : '?'}</div><input type="file" id="editAvatarInput" accept="image/*" style="margin-top:0.75rem"><button class="btn btn-outline" onclick="window.prilozhenie.zagruzitAvatar()" style="margin-top:0.5rem">Загрузить аватар</button></div><div class="form-group"><label>Имя пользователя</label><input type="text" id="editUsername" value="${p.imya || user?.username || ''}"></div><div class="form-group"><label>Email</label><input type="email" id="editEmail" value="${p.pochta || user?.email || ''}"></div><div class="form-group"><label>Введите пароль</label><input type="password" id="editOldPass" placeholder="Текущий пароль"></div><div class="form-group"><label>Повторите пароль</label><input type="password" id="editNewPass" placeholder="Новый пароль"></div><button class="btn btn-primary" style="width:100%" onclick="window.prilozhenie.sohranitProfil()">Сохранить изменения</button></div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

export async function uploadAvatar(): Promise<void> {
    const f = (document.getElementById('editAvatarInput') as HTMLInputElement).files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async (e: any) => {
        await updateAvatar(e.target.result);
        const pril = (window as any).prilozhenie;
        pril.profil.avatar = e.target.result;
        const user = getUser();
        if (user) { user.avatar = e.target.result; setUser(user); localStorage.setItem('slycat_user', JSON.stringify(user)); }
        (document.getElementById('editAvatarPreview') as HTMLElement).style.backgroundImage = `url(${e.target.result})`;
        (document.getElementById('editAvatarPreview') as HTMLElement).textContent = '';
        updateUI();
    };
    reader.readAsDataURL(f);
}

export async function saveProfile(): Promise<void> {
    const imya = (document.getElementById('editUsername') as HTMLInputElement).value;
    const pochta = (document.getElementById('editEmail') as HTMLInputElement).value;
    const oldPass = (document.getElementById('editOldPass') as HTMLInputElement).value;
    const newPass = (document.getElementById('editNewPass') as HTMLInputElement).value;
    await updateProfile({ imya, pochta });
    const user = getUser();
    if (user) { user.username = imya; user.email = pochta; setUser(user); localStorage.setItem('slycat_user', JSON.stringify(user)); }
    if (newPass && oldPass) await changePassword(oldPass, newPass);
    const pril = (window as any).prilozhenie;
    pril.profil.imya = imya; pril.profil.pochta = pochta;
    updateUI();
    document.querySelector('.modal-overlay')?.remove();
    renderProfile();
    showToast('Профиль обновлён');
}