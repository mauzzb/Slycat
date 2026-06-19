import { register, login, setUser } from '../api';
import { showToast } from '../utils/utils';
import { updateUI } from './navbar';

export function showLogin(): void { renderAuth('vhod'); }
export function showRegister(): void { renderAuth('registraciya'); }

function renderAuth(mode: string): void {
    const isLogin = mode === 'vhod';
    let html = '<div class="auth-container"><div class="auth-card"><h2>' + (isLogin ? 'Вход' : 'Регистрация') + '</h2>';
    html += '<div class="form-group"><label>Email</label><input type="email" id="authEmail"></div>';
    html += '<div class="form-group"><label>Пароль</label><input type="password" id="authParol"></div>';
    if (!isLogin) {
        html += '<div class="form-group"><label>Имя пользователя</label><input type="text" id="authImya"></div>';
        html += '<div class="form-group"><label>Повторите пароль</label><input type="password" id="authParol2"></div>';
    }
    html += '<button class="btn btn-primary" style="width:100%" onclick="window.prilozhenie.obrabotatAuth(\'' + mode + '\')">' + (isLogin ? 'Войти' : 'Создать аккаунт') + '</button>';
    html += '<div class="auth-footer">' + (isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?') + ' <a onclick="window.prilozhenie.' + (isLogin ? 'pokazatRegistraciyu()' : 'pokazatVhod()') + '">' + (isLogin ? 'Регистрация' : 'Войти') + '</a></div></div></div>';
    (document.getElementById('app') as HTMLElement).innerHTML = html;
}

export async function handleAuth(mode: string): Promise<void> {
    const e = (document.getElementById('authEmail') as HTMLInputElement).value;
    const p = (document.getElementById('authParol') as HTMLInputElement).value;
    if (mode === 'registraciya') {
        const n = (document.getElementById('authImya') as HTMLInputElement).value;
        const p2 = (document.getElementById('authParol2') as HTMLInputElement).value;
        if (p !== p2) { showToast('Пароли не совпадают'); return; }
        try {
            await register(n, e, p);
            showToast('Регистрация успешна! Войдите.');
            showLogin();
        } catch (err: any) {
            showToast('Ошибка регистрации. Возможно, email или имя уже заняты.');
        }
    } else {
        try {
            const r = await login(e, p);
            const user = { id: r.userId, username: r.username, email: r.email, token: r.token, avatar: r.avatar };
            setUser(user);
            localStorage.setItem('slycat_user', JSON.stringify(user));
            updateUI();
            const pril = (window as any).prilozhenie;
            await pril.zagruzitDannye();
            pril.perejti('magazin');
        } catch (err: any) {
            showToast('Неверный email или пароль');
        }
    }
}