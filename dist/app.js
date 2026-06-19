import { getUser, setUser, getProfile, getWishlist, getCart, getLibrary, addToWishlist, removeFromWishlist } from './api';
import { updateUI, applyTheme, logout as navbarLogout } from './components/navbar';
import { showLogin, showRegister, handleAuth } from './components/auth';
import { renderCatalog, pokazatDetali } from './components/catalog';
import { addCart, removeCart, renderCart, clearAllCart } from './components/cart';
import { renderWishlist } from './components/wishlist';
import { renderLibrary } from './components/library';
import { renderProfile } from './components/profile';
import { showPayment, processPayment } from './components/payment';
import { renderHelp } from './components/help';
class Prilozhenie {
    constructor() {
        this.igry = [];
        this.zhelaemoe = [];
        this.korzina = [];
        this.biblioteka = [];
        this.profil = null;
        this.modul = 'magazin';
        this.tema = 'dark';
        this.otrisovatKatalog = renderCatalog;
        this.pokazatDetali = pokazatDetali;
        this.otrisovatZhelaemoe = renderWishlist;
        this.otrisovatKorzinu = renderCart;
        this.otrisovatBiblioteku = renderLibrary;
        this.otrisovatProfil = renderProfile;
        this.otrisovatSpravku = renderHelp;
        this.pokazatVhod = showLogin;
        this.pokazatRegistraciyu = showRegister;
        this.obrabotatAuth = handleAuth;
        this.dobavitVKorzinu = addCart;
        this.udalitIzKorziny = removeCart;
        this.ochistitKorzinu = clearAllCart;
        this.pokazatOplatu = showPayment;
        this.vypolnitOplatu = processPayment;
        this.vyjti = navbarLogout;
    }
    async init() {
        this.tema = localStorage.getItem('slycat_theme') || 'dark';
        applyTheme();
        const saved = localStorage.getItem('slycat_user');
        if (saved) {
            setUser(JSON.parse(saved));
            await this.zagruzitDannye();
        }
        updateUI();
        this.perejti('magazin');
        document.getElementById('poiskInput')?.addEventListener('input', (e) => {
            clearTimeout(this._t);
            this._t = setTimeout(() => this.otrisovatKatalog(e.target.value), 400);
        });
    }
    perekluchitTemu() { this.tema = this.tema === 'dark' ? 'light' : 'dark'; localStorage.setItem('slycat_theme', this.tema); applyTheme(); }
    kuplena(gid) { return this.biblioteka.some((l) => l.igraId === gid); }
    async zagruzitDannye() {
        if (!getUser())
            return;
        const [p, w, c, l] = await Promise.all([getProfile().catch(() => null), getWishlist().catch(() => []), getCart().catch(() => []), getLibrary().catch(() => [])]);
        this.profil = p;
        this.zhelaemoe = w;
        this.korzina = c;
        this.biblioteka = l;
        if (p?.avatar) {
            const u = getUser();
            u.avatar = p.avatar;
            setUser(u);
            localStorage.setItem('slycat_user', JSON.stringify(u));
        }
        document.getElementById('zhelaemoeCount').textContent = String(this.zhelaemoe.length);
        document.getElementById('korzinaCount').textContent = String(this.korzina.length);
        updateUI();
    }
    async dobavitVZhelaemoe(gid) {
        if (this.kuplena(gid))
            return;
        await addToWishlist(gid);
        await this.zagruzitDannye();
        if (this.modul === 'magazin')
            await this.otrisovatKatalog();
    }
    async udalitIzZhelaemogo(id) {
        await removeFromWishlist(id);
        await this.zagruzitDannye();
        this.otrisovatZhelaemoe();
    }
    async perejti(m) {
        this.modul = m;
        if (!getUser() && m !== 'magazin' && m !== 'spravka') {
            showLogin();
            return;
        }
        if (getUser() && !this.profil && m !== 'spravka')
            await this.zagruzitDannye();
        if (m === 'magazin')
            await this.otrisovatKatalog();
        else if (m === 'zhelaemoe')
            this.otrisovatZhelaemoe();
        else if (m === 'korzina')
            await this.otrisovatKorzinu();
        else if (m === 'biblioteka')
            this.otrisovatBiblioteku();
        else if (m === 'profil')
            this.otrisovatProfil();
        else if (m === 'spravka')
            this.otrisovatSpravku();
    }
}
const app = new Prilozhenie();
window.prilozhenie = app;
document.addEventListener('DOMContentLoaded', () => app.init());
