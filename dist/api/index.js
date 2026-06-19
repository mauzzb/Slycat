const API = 'http://localhost:5000/api';
let currentUser = null;
export function getUser() { return currentUser; }
export function setUser(u) { currentUser = u; }
async function request(url, opts = {}) {
    const headers = { 'Content-Type': 'application/json', ...opts.headers };
    if (currentUser?.token)
        headers['Authorization'] = 'Bearer ' + currentUser.token;
    const r = await fetch(API + url, { method: opts.method || 'GET', headers, body: opts.body || undefined });
    if (r.status === 401)
        throw new Error('Auth');
    return r;
}
export async function register(username, email, password) {
    const r = await request('/auth/registraciya', { method: 'POST', body: JSON.stringify({ imya: username, pochta: email, parol: password }) });
    return r.json();
}
export async function login(email, password) {
    const r = await request('/auth/vhod', { method: 'POST', body: JSON.stringify({ email, password }) });
    return r.json();
}
export async function getGames(search) {
    const q = search ? '?poisk=' + encodeURIComponent(search) : '';
    const r = await request('/igry' + q);
    return r.json();
}
export async function getGame(id) {
    const r = await request('/igry/' + id);
    return r.json();
}
export async function getWishlist() {
    const r = await request('/zhelaemoe');
    return r.json();
}
export async function addToWishlist(gameId) {
    const r = await request('/zhelaemoe', { method: 'POST', body: String(gameId) });
    return r.json();
}
export async function removeFromWishlist(id) {
    return request('/zhelaemoe/' + id, { method: 'DELETE' });
}
export async function getCart() {
    const r = await request('/korzina');
    return r.json();
}
export async function addToCart(gameId) {
    const r = await request('/korzina', { method: 'POST', body: String(gameId) });
    return r.json();
}
export async function removeFromCart(id) {
    return request('/korzina/' + id, { method: 'DELETE' });
}
export async function clearCart() {
    return request('/korzina/ochistit', { method: 'DELETE' });
}
export async function checkout() {
    return request('/korzina/oplatit', { method: 'POST' });
}
export async function getLibrary() {
    const r = await request('/biblioteka');
    return r.json();
}
export async function getProfile() {
    const r = await request('/polzovatel/profil');
    return r.json();
}
export async function updateProfile(data) {
    const r = await request('/polzovatel/profil', { method: 'PUT', body: JSON.stringify(data) });
    return r.json();
}
export async function updateAvatar(avatar) {
    return request('/polzovatel/avatar', { method: 'POST', body: JSON.stringify({ avatar }) });
}
export async function changePassword(oldPassword, newPassword) {
    return request('/polzovatel/smenit-parol', { method: 'POST', body: JSON.stringify({ staryjParol: oldPassword, novyjParol: newPassword }) });
}
