import { addToCart, removeFromCart, clearCart } from '../api';
import { showToast, showUndoToast } from '../utils/utils';
import { CartItem } from '../types';

export async function addCart(gameId: number): Promise<void> {
    const pril = (window as any).prilozhenie;
    if (pril.kuplena(gameId)) { showToast('Игра уже приобретена'); return; }
    await addToCart(gameId);
    await pril.zagruzitDannye();
    showUndoToast('Добавлено в корзину', () => {
        const item = pril.korzina.find((c: CartItem) => c.igraId === gameId);
        if (item) removeFromCart(item.id).then(() => pril.zagruzitDannye());
    });
    if (pril.modul === 'magazin') await pril.otrisovatKatalog();
}

export async function removeCart(id: number): Promise<void> {
    await removeFromCart(id);
    const pril = (window as any).prilozhenie;
    await pril.zagruzitDannye();
    await renderCart();
    showToast('Удалено из корзины');
}

export async function renderCart(): Promise<void> {
    const pril = (window as any).prilozhenie;
    const app = document.getElementById('app') as HTMLElement;
    if (!pril.korzina.length) { app.innerHTML = '<div class="empty-state"><h3>Корзина пуста</h3></div>'; return; }
    const total = pril.korzina.reduce((sum: number, i: CartItem) => sum + (i.igra?.tsena || 0), 0);
    let html = `<h2>Корзина (${pril.korzina.length})</h2>`;
    pril.korzina.forEach((i: CartItem) => {
        html += `<div class="cart-item"><div class="cart-item-cover" style="background-image:url('${i.igra?.kartinka || ''}')"></div><div style="flex:1"><strong>${i.igra?.nazvanie || ''}</strong><div>${i.igra?.tsena || 0} ₽</div></div><button class="btn btn-danger" onclick="window.prilozhenie.udalitIzKorziny(${i.id})">×</button></div>`;
    });
    html += `<div style="text-align:right;margin-top:1rem"><h2>Итого: ${total} ₽</h2><button class="btn btn-danger" onclick="window.prilozhenie.ochistitKorzinu()">Очистить</button> <button class="btn btn-success" onclick="window.prilozhenie.pokazatOplatu()">Оплатить</button></div>`;
    app.innerHTML = html;
}

export async function clearAllCart(): Promise<void> {
    await clearCart();
    const pril = (window as any).prilozhenie;
    await pril.zagruzitDannye();
    await renderCart();
    showToast('Корзина очищена');
}