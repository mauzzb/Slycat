import { getWishlist, addToWishlist, removeFromWishlist, addToCart, getUser } from '../api';
import { showToast, showUndoToast } from '../utils/toast';
import { WishlistItem } from '../types';


export async function loadWishlist(): Promise<WishlistItem[]> {
    try {
        const wishlist = await getWishlist();
        return wishlist as WishlistItem[];
    } catch (error) {
        console.error('Ошибка загрузки вишлиста:', error);
        return [];
    }
}

export async function addWishlist(gameId: number): Promise<void> {
    const pril = (window as any).prilozhenie;

    if (pril.isOwned(gameId)) {
        showToast('Игра уже приобретена');
        return;
    }

    if (pril.isInWishlist(gameId)) {
        showToast('Уже в желаемом');
        return;
    }

    await addToWishlist(gameId);
    await pril.loadData();

    showUndoToast('Добавлено в желаемое', () => {
        const item = pril.wishlist.find((w: WishlistItem) => w.gameId === gameId);
        if (item) {
            removeFromWishlist(item.id).then(() => {
                pril.loadData().then(() => {
                    if (pril.module === 'magazin') pril.renderCatalog();
                });
            });
        }
    });

    if (pril.module === 'magazin') {
        await pril.renderCatalog();
    }
}


export async function removeWishlist(id: number): Promise<void> {
    await removeFromWishlist(id);

    const pril = (window as any).prilozhenie;
    await pril.loadData();
    renderWishlist();
    showToast('Удалено из желаемого');
}

export function renderWishlist(): void {
    const pril = (window as any).prilozhenie;
    const app = document.getElementById('app') as HTMLElement;

    if (!pril.wishlist || pril.wishlist.length === 0) {
        app.innerHTML = `
            <div class="empty-state">
                <h3>Список желаемого пуст</h3>
                <button class="btn btn-primary"
                        onclick="window.prilozhenie.navigate('magazin')">
                    Перейти в магазин
                </button>
            </div>
        `;
        return;
    }

    let html = `
        <h2 class="section-title">Желаемое (${pril.wishlist.length})</h2>
    `;

    pril.wishlist.forEach((item: WishlistItem) => {
        const coverImage = item.game?.coverImage || '';
        const title = item.game?.title || 'Без названия';
        const price = item.game?.price || 0;

        html += `
            <div class="wishlist-item">
                <div class="wishlist-item-cover"
                     style="background-image:url('${coverImage}')">
                </div>
                <div class="wishlist-item-info">
                    <strong>${title}</strong>
                    <div>${price} ₽</div>
                </div>
                <button class="btn btn-primary"
                        onclick="window.prilozhenie.addCart(${item.gameId})">
                    В корзину
                </button>
                <button class="btn btn-danger"
                        onclick="window.prilozhenie.removeWishlist(${item.id})">
                    ×
                </button>
            </div>
        `;
    });

    app.innerHTML = html;
}

export function isInWishlist(gameId: number): boolean {
    const pril = (window as any).prilozhenie;
    return pril.wishlist.some((item: WishlistItem) => item.gameId === gameId);
}
