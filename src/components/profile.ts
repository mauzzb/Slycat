import { getProfile, getUser, setUser, updateProfile, updateAvatar, changePassword } from '../api';
import { showToast } from '../utils/toast';
import { updateUI } from './navbar';
import { UserProfile } from '../types';

export function renderProfile(): void {
    const pril = (window as any).prilozhenie;
    const profile = pril.profile as UserProfile | null;
    const user = getUser();

    const avatar = profile?.avatar || '';
    const username = profile?.username || user?.username || '';
    const email = profile?.email || user?.email || '';

    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar"
                 id="profilAvatar"
                 style="background-image:url('${avatar}')">
                ${avatar ? '' : '?'}
            </div>
            <h2>${username}</h2>
            <p>${email}</p>
            <button class="btn btn-outline"
                    style="margin-top:1rem"
                    onclick="window.prilozhenie.showEditProfileModal()">
                Редактировать профиль
            </button>
        </div>
        <div class="profile-stats">
            <div class="stat-card">
                <div class="stat-number">${pril.library.length}</div>
                <div class="stat-label">Игр в библиотеке</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${pril.wishlist.length}</div>
                <div class="stat-label">В желаемом</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${pril.cart.length}</div>
                <div class="stat-label">В корзине</div>
            </div>
        </div>
    `;
}

export function showEditProfileModal(): void {
    const pril = (window as any).prilozhenie;
    const profile = pril.profile as UserProfile | null;
    const user = getUser();

    const avatar = profile?.avatar || '';
    const username = profile?.username || user?.username || '';
    const email = profile?.email || user?.email || '';

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal">
            <button class="modal-close"
                    onclick="this.closest('.modal-overlay')?.remove()">
                ×
            </button>
            <h2>Редактирование профиля</h2>

            <div style="text-align:center;margin-bottom:1.5rem">
                <div class="profile-avatar"
                     id="editAvatarPreview"
                     style="background-image:url('${avatar}');margin:0 auto">
                    ${avatar ? '' : '?'}
                </div>
                <input type="file"
                       id="editAvatarInput"
                       accept="image/*"
                       style="margin-top:0.75rem">
                <button class="btn btn-outline"
                        onclick="window.prilozhenie.uploadAvatar()"
                        style="margin-top:0.5rem">
                    Загрузить аватар
                </button>
            </div>

            <div class="form-group">
                <label>Имя пользователя</label>
                <input type="text" id="editUsername" value="${username}">
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" id="editEmail" value="${email}">
            </div>

            <div class="form-group">
                <label>Введите пароль</label>
                <input type="password"
                       id="editOldPass"
                       placeholder="Текущий пароль">
            </div>

            <div class="form-group">
                <label>Повторите пароль</label>
                <input type="password"
                       id="editNewPass"
                       placeholder="Новый пароль">
            </div>

            <button class="btn btn-primary"
                    style="width:100%"
                    onclick="window.prilozhenie.saveProfile()">
                Сохранить изменения
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e: MouseEvent) => {
        if (e.target === overlay) overlay.remove();
    });
}

export async function uploadAvatar(): Promise<void> {
    const fileInput = document.getElementById('editAvatarInput') as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
        const base64 = e.target?.result as string;
        await updateAvatar(base64);

        const pril = (window as any).prilozhenie;
        pril.profile.avatar = base64;

        const user = getUser();
        if (user) {
            user.avatar = base64;
            setUser(user);
            localStorage.setItem('slycat_user', JSON.stringify(user));
        }

        const preview = document.getElementById('editAvatarPreview') as HTMLElement;
        preview.style.backgroundImage = `url(${base64})`;
        preview.textContent = '';
        updateUI();
        showToast('Аватар обновлён');
    };
    reader.readAsDataURL(file);
}

export async function saveProfile(): Promise<void> {
    const username = (document.getElementById('editUsername') as HTMLInputElement).value;
    const email = (document.getElementById('editEmail') as HTMLInputElement).value;
    const oldPass = (document.getElementById('editOldPass') as HTMLInputElement).value;
    const newPass = (document.getElementById('editNewPass') as HTMLInputElement).value;

    try {
        await updateProfile({ username, email });

        const user = getUser();
        if (user) {
            user.username = username;
            user.email = email;
            setUser(user);
            localStorage.setItem('slycat_user', JSON.stringify(user));
        }

        if (newPass && oldPass) {
            await changePassword(oldPass, newPass);
        }

        const pril = (window as any).prilozhenie;
        pril.profile.username = username;
        pril.profile.email = email;
        updateUI();

        document.querySelector('.modal-overlay')?.remove();
        renderProfile();
        showToast('Профиль обновлён');
    } catch (error) {
        showToast('Ошибка при сохранении');
    }
}

export async function loadProfile(): Promise<UserProfile | null> {
    try {
        const profile = await getProfile();
        return profile as UserProfile;
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        return null;
    }
}
