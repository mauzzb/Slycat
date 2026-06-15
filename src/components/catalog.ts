import { getGames, getGame, getUser } from '../api';
import { Game } from '../types';


export async function renderCatalog(search: string = ''): Promise<void> {
    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = '<div class="loading">Загрузка каталога...</div>';

    const games = await getGames(search);
    const pril = (window as any).prilozhenie;
    pril.games = games;

    let html = '<div class="games-grid">';

    games.forEach((game: Game) => {
        const inCart = pril.isInCart(game.id);
        const inWish = pril.isInWishlist(game.id);
        const owned = pril.isOwned(game.id);

        html += `
            <div class="game-card" onclick="window.prilozhenie.showDetail(${game.id})">
                <div class="game-cover" style="background-image:url('${game.coverImage}')"></div>
        `;

        if (owned) {
            html += '<div class="game-badge owned">Приобретена</div>';
        } else {
            if (inCart) html += '<div class="game-badge in-cart">В корзине</div>';
            if (inWish) html += '<div class="game-badge in-wishlist">В желаемом</div>';
        }

        html += `
                <div class="game-info">
                    <div class="game-title">${game.title}</div>
                    <div class="game-price">${game.price} ₽</div>
                </div>
        `;

        if (getUser()) {
            html += '<div class="game-actions">';

            if (owned) {
                html += '<button class="btn btn-owned" disabled>Приобретена</button>';
            } else {
                html += `
                    <button class="btn ${inWish ? 'btn-wishlisted' : 'btn-outline'}"
                            onclick="event.stopPropagation();${inWish ? '' : `window.prilozhenie.addWishlist(${game.id})`}"
                            ${inWish ? 'disabled' : ''}>
                        ${inWish ? 'В желаемом' : 'В желаемое'}
                    </button>
                    <button class="btn ${inCart ? 'btn-added' : 'btn-primary'}"
                            onclick="event.stopPropagation();${inCart ? '' : `window.prilozhenie.addCart(${game.id})`}"
                            ${inCart ? 'disabled' : ''}>
                        ${inCart ? 'В корзине' : 'В корзину'}
                    </button>
                `;
            }

            html += '</div>';
        }

        html += '</div>';
    });

    html += '</div>';
    app.innerHTML = html;
}

export async function showDetail(id: number): Promise<void> {
    const game = await getGame(id);
    const pril = (window as any).prilozhenie;

    const inCart = pril.isInCart(game.id);
    const inWish = pril.isInWishlist(game.id);
    const owned = pril.isOwned(game.id);

    const releaseDate = game.releaseDate ? game.releaseDate.split('T')[0] : '';

    let html = `
        <button class="btn btn-outline"
                onclick="window.prilozhenie.navigate('magazin')"
                style="margin-bottom:1rem">
            ← Назад в магазин
        </button>
        <div style="display:flex;gap:2rem;flex-wrap:wrap">
            <img src="${game.coverImage}"
                 class="detail-cover"
                 style="width:400px"
                 onerror="this.style.display='none'">
            <div style="flex:1;min-width:280px">
                <h2>${game.title}</h2>
                <p style="color:var(--text2);margin:0.5rem 0">
                    ${game.developer} • ${game.publisher} • ${releaseDate}
                </p>
                <p style="margin:1rem 0">${game.description}</p>
                <p><strong>Жанр:</strong> ${game.genre}</p>
                <p><strong>Теги:</strong> ${game.tags}</p>
                <p style="font-size:1.5rem;color:var(--green);margin:1rem 0">
                    ${game.price} ₽
                </p>
    `;

    if (getUser()) {
        html += '<div style="display:flex;gap:0.5rem">';

        if (owned) {
            html += '<button class="btn btn-owned" disabled>Игра приобретена</button>';
        } else {
            html += `
                <button class="btn ${inCart ? 'btn-added' : 'btn-primary'}"
                        onclick="${inCart ? '' : `window.prilozhenie.addCart(${game.id})`}"
                        ${inCart ? 'disabled' : ''}>
                    ${inCart ? 'Уже в корзине' : 'В корзину'}
                </button>
                <button class="btn ${inWish ? 'btn-wishlisted' : 'btn-outline'}"
                        onclick="${inWish ? '' : `window.prilozhenie.addWishlist(${game.id})`}"
                        ${inWish ? 'disabled' : ''}>
                    ${inWish ? 'Уже в желаемом' : 'В желаемое'}
                </button>
            `;
        }

        html += '</div>';
    }

    html += '</div></div>';

    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = html;
}
