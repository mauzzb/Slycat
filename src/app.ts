import { getUser, setUser, getProfile, getWishlist, getCart, getLibrary, addToWishlist, removeFromWishlist } from './api';
import { updateUI, applyTheme, logout as navbarLogout } from './components/navbar';
import { showLogin, showRegister, handleAuth } from './components/auth';
import { renderCatalog, pokazatDetali } from './components/catalog';
import { addCart, removeCart, renderCart, clearAllCart } from './components/cart';
import { renderWishlist } from './components/wishlist';
import { renderLibrary } from './components/library';
import { renderProfile, showEditProfileModal, uploadAvatar, saveProfile } from './components/profile';
import { showPayment, processPayment } from './components/payment';
import { renderHelp } from './components/help';
import { renderAddGame, saveGame } from './components/addGame';

class Prilozhenie {
    igry: any[] = [];
    zhelaemoe: any[] = [];
    korzina: any[] = [];
    biblioteka: any[] = [];
    profil: any = null;
    modul: string = 'magazin';
    tema: string = 'dark';

    async init(): Promise<void> {
        this.tema = localStorage.getItem('slycat_theme') || 'dark';
        applyTheme();
        const saved = localStorage.getItem('slycat_user');
        if (saved) { setUser(JSON.parse(saved)); await this.zagruzitDannye(); }
        updateUI();
        await this.perejti('magazin');
        document.getElementById('poiskInput')?.addEventListener('input', (e: any) => {
            clearTimeout((this as any)._t);
            (this as any)._t = setTimeout(() => this.otrisovatKatalog(e.target.value), 400);
        });
    }

    perekluchitTemu(): void { this.tema = this.tema === 'dark' ? 'light' : 'dark'; localStorage.setItem('slycat_theme', this.tema); applyTheme(); }

    kuplena(gid: number): boolean { return this.biblioteka.some((l: any) => l.igraId === gid); }
    vKorzine(gid: number): boolean { return this.korzina.some((c: any) => c.igraId === gid); }
    vZhelaemom(gid: number): boolean { return this.zhelaemoe.some((w: any) => w.igraId === gid); }

    async zagruzitDannye(): Promise<void> {
        if (!getUser()) return;
        const [p, w, c, l] = await Promise.all([getProfile().catch(() => null), getWishlist().catch(() => []), getCart().catch(() => []), getLibrary().catch(() => [])]);
        this.profil = p; this.zhelaemoe = w; this.korzina = c; this.biblioteka = l;
        if (p?.avatar) { const u = getUser()!; u.avatar = p.avatar; setUser(u); localStorage.setItem('slycat_user', JSON.stringify(u)); }
        (document.getElementById('zhelaemoeCount') as HTMLElement).textContent = String(this.zhelaemoe.length);
        (document.getElementById('korzinaCount') as HTMLElement).textContent = String(this.korzina.length);
        updateUI();
        if (this.modul === 'magazin') await this.otrisovatKatalog();
    }

    otrisovatKatalog = renderCatalog;
    pokazatDetali = pokazatDetali;
    otrisovatZhelaemoe = renderWishlist;
    otrisovatKorzinu = renderCart;
    otrisovatBiblioteku = renderLibrary;
    otrisovatProfil = renderProfile;
    otrisovatSpravku = renderHelp;
    otrisovatDobavitIgru = renderAddGame;
    pokazatVhod = showLogin;
    pokazatRegistraciyu = showRegister;
    obrabotatAuth = handleAuth;
    dobavitVKorzinu = addCart;
    udalitIzKorziny = removeCart;
    ochistitKorzinu = clearAllCart;
    pokazatOplatu = showPayment;
    vypolnitOplatu = processPayment;
    pokazatRedaktirovanieProfilya = showEditProfileModal;
    zagruzitAvatar = uploadAvatar;
    sohranitProfil = saveProfile;
    sohranitIgru = saveGame;
    vyjti = navbarLogout;

    async dobavitVZhelaemoe(gid: number): Promise<void> { if (this.kuplena(gid)) return; await addToWishlist(gid); await this.zagruzitDannye(); }
    async udalitIzZhelaemogo(id: number): Promise<void> { await removeFromWishlist(id); await this.zagruzitDannye(); }

    async perejti(m: string): Promise<void> {
        this.modul = m;
        if (!getUser() && m !== 'magazin' && m !== 'spravka') { showLogin(); return; }
        if (getUser() && !this.profil && m !== 'spravka') await this.zagruzitDannye();
        if (m === 'magazin') await this.otrisovatKatalog();
        else if (m === 'zhelaemoe') this.otrisovatZhelaemoe();
        else if (m === 'korzina') await this.otrisovatKorzinu();
        else if (m === 'biblioteka') this.otrisovatBiblioteku();
        else if (m === 'profil') this.otrisovatProfil();
        else if (m === 'spravka') this.otrisovatSpravku();
        else if (m === 'dobavit') this.otrisovatDobavitIgru();
    }
}

const app = new Prilozhenie();
(window as any).prilozhenie = app;
document.addEventListener('DOMContentLoaded', () => app.init());