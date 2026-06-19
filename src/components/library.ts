export function renderLibrary(): void {
    const pril = (window as any).prilozhenie;
    const app = document.getElementById('app') as HTMLElement;
    if (!pril.biblioteka.length) { app.innerHTML = '<div class="empty-state"><h3>Библиотека пуста</h3></div>'; return; }
    let html = `<h2>Мои игры (${pril.biblioteka.length})</h2><div class="games-grid">`;
    pril.biblioteka.forEach((i: any) => {
        html += `<div class="game-card" onclick="window.prilozhenie.pokazatDetali(${i.igraId})"><div class="game-cover" style="background-image:url('${i.igra?.kartinka || ''}')"></div><div class="game-info"><div class="game-title">${i.igra?.nazvanie || ''}</div></div></div>`;
    });
    html += '</div>';
    app.innerHTML = html;
}