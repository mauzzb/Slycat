import { User } from '../types';
import { showLoader, hideLoader } from '../utils/utils';

const API: string = 'http://localhost:5000/api';
let currentUser: User | null = null;

export function getUser(): User | null { return currentUser; }
export function setUser(u: User | null): void { currentUser = u; }

async function request(url: string, opts: any = {}): Promise<Response> {
    showLoader();
    const headers: any = { 'Content-Type': 'application/json', ...opts.headers };
    if (currentUser?.token) headers['Authorization'] = 'Bearer ' + currentUser.token;
    const r = await fetch(API + url, { method: opts.method || 'GET', headers, body: opts.body || undefined });
    hideLoader();
    if (r.status === 401) { const pril = (window as any).prilozhenie; if (pril) pril.vyjti(); throw new Error('Auth'); }
    return r;
}

export async function register(username: string, email: string, password: string, rol: string = 'Buyer'): Promise<any> {
    const r = await request('/auth/registraciya', { method: 'POST', body: JSON.stringify({ Username: username, Email: email, Password: password, Rol: rol }) });
    return r.json();
}

export async function login(email: string, password: string): Promise<any> {
    const r = await request('/auth/vhod', { method: 'POST', body: JSON.stringify({ Email: email, Password: password }) });
    return r.json();
}

export async function getGames(search?: string): Promise<any> {
    const q = search ? '?poisk=' + encodeURIComponent(search) : '';
    const r = await request('/igry' + q);
    return r.json();
}

export async function getGame(id: number): Promise<any> {
    const r = await request('/igry/' + id);
    return r.json();
}

export async function addGame(data: any): Promise<any> {
    const r = await request('/igry', { method: 'POST', body: JSON.stringify(data) });
    return r.json();
}

export async function getWishlist(): Promise<any> { const r = await request('/zhelaemoe'); return r.json(); }
export async function addToWishlist(gameId: number): Promise<any> { const r = await request('/zhelaemoe', { method: 'POST', body: String(gameId) }); return r.json(); }
export async function removeFromWishlist(id: number): Promise<any> { return request('/zhelaemoe/' + id, { method: 'DELETE' }); }
export async function getCart(): Promise<any> { const r = await request('/korzina'); return r.json(); }
export async function addToCart(gameId: number): Promise<any> { const r = await request('/korzina', { method: 'POST', body: String(gameId) }); return r.json(); }
export async function removeFromCart(id: number): Promise<any> { return request('/korzina/' + id, { method: 'DELETE' }); }
export async function clearCart(): Promise<any> { return request('/korzina/ochistit', { method: 'DELETE' }); }
export async function checkout(): Promise<any> { return request('/korzina/oplatit', { method: 'POST' }); }
export async function getLibrary(): Promise<any> { const r = await request('/biblioteka'); return r.json(); }
export async function getProfile(): Promise<any> { const r = await request('/polzovatel/profil'); return r.json(); }
export async function updateProfile(data: any): Promise<any> { const r = await request('/polzovatel/profil', { method: 'PUT', body: JSON.stringify(data) }); return r.json(); }
export async function updateAvatar(avatar: string): Promise<any> { return request('/polzovatel/avatar', { method: 'POST', body: JSON.stringify({ avatar }) }); }
export async function changePassword(oldPassword: string, newPassword: string): Promise<any> { return request('/polzovatel/smenit-parol', { method: 'POST', body: JSON.stringify({ staryjParol: oldPassword, novyjParol: newPassword }) }); }