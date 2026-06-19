import { getGames, getGame, getUser } from '../api';
export async function renderCatalog(search = '') {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="loading">Загрузка каталога...</div>';
    const games = await getGames(search);
    const pril = window.prilozhenie;
    pril.igry = games;
    let html = '<div class="games-grid">';
    games.forEach((g) => {
        const owned = pril.kuplena(g.id);
        html += `<div class="game-card" onclick="window.prilozhenie.pokazatDetali(${g.id})"><div class="game-cover" style="background-image:url('${g.kartinka}')"></div>`;
        if (owned)
            html += '<div class="game-badge owned">Приобретена</div>';
        html += `<div class="game-info"><div class="game-title">${g.nazvanie}</div><div class="game-price">${g.tsena} ₽</div></div>`;
        if (getUser() && !owned) {
            html += `<div class="game-actions"><button class="btn btn-outline" onclick="event.stopPropagation();window.prilozhenie.dobavitVZhelaemoe(${g.id})">❤</button><button class="btn btn-primary" onclick="event.stopPropagation();window.prilozhenie.dobavitVKorzinu(${g.id})">В корзину</button></div>`;
        }
        html += '</div>';
    });
    html += '</div>';
    app.innerHTML = html;
}
export async function pokazatDetali(id) {
    const g = await getGame(id);
    const pril = window.prilozhenie;
    const owned = pril.kuplena(g.id);
    let html = `<button class="btn btn-outline" onclick="window.prilozhenie.perejti('magazin')" style="margin-bottom:1rem">← Назад</button>`;
    html += `<div style="display:flex;gap:2rem;flex-wrap:wrap"><img src="${g.kartinka}" style="width:400px;border-radius:8px" onerror="this.style.display='none'"><div style="flex:1;min-width:280px">`;
    html += `<h2>${g.nazvanie}</h2><p style="color:var(--text2)">${g.razrabotchik} • ${g.izdatel} • ${(g.dataVyhoda || '').split('T')[0]}</p>`;
    html += `<p style="margin:1rem 0">${g.opisanie}</p><p><strong>Жанр:</strong> ${g.zhanr}</p>`;
    html += `<p style="font-size:1.5rem;color:var(--green);margin:1rem 0">${g.tsena} ₽</p>`;
    if (getUser() && !owned) {
        html += `<button class="btn btn-primary" onclick="window.prilozhenie.dobavitVKorzinu(${g.id})">В корзину</button> <button class="btn btn-outline" onclick="window.prilozhenie.dobavitVZhelaemoe(${g.id})">В желаемое</button>`;
    }
    html += '</div></div>';
    document.getElementById('app').innerHTML = html;
}
