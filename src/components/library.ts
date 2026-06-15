import { getLibrary } from '../api';
import { UserGame } from '../types';
export function renderLibrary(): void {
    const pril = (window as any).prilozhenie;
    const app = document.getElementById('app') as HTMLElement;

    if (!pril.library || pril.library.length === 0) {
        app.innerHTML = `
            <div class="empty-state">
                <h3>Библиотека пуста</h3>
                <p>Купленные игры появятся здесь</p>
                <button class="btn btn-primary" onclick="window.prilozhenie.navigate('magazin')">
                    Перейти в магазин
                </button>
            </div>
        `;
        return;
    }

    let html = `
        <h2 class="section-title">Мои игры (${pril.library.length})</h2>
        <div class="games-grid">
    `;

    pril.library.forEach((item: UserGame) => {
        html += `
            <div class="game-card" onclick="window.prilozhenie.showDetail(${item.gameId})">
                <div class="game-cover" style="background-image:url('${item.game?.coverImage || ''}')"></div>
                <div class="game-info">
                    <div class="game-title">${item.game?.title || 'Без названия'}</div>
                    <div style="font-size:0.7rem;color:var(--text2)">
                        Куплена: ${item.purchasedAt ? item.purchasedAt.split('T')[0] : ''}
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    app.innerHTML = html;
}

export async function loadLibrary(): Promise<UserGame[]> {
    try {
        const library = await getLibrary();
        return library as UserGame[];
    } catch (error) {
        console.error('Ошибка загрузки библиотеки:', error);
        return [];
    }
}

export function isOwned(gameId: number): boolean {
    const pril = (window as any).prilozhenie;
    return pril.library.some((item: UserGame) => item.gameId === gameId);
}
