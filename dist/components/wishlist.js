export function renderWishlist() {
    const pril = window.prilozhenie;
    const app = document.getElementById('app');
    if (!pril.zhelaemoe.length) {
        app.innerHTML = '<div class="empty-state"><h3>Список желаемого пуст</h3></div>';
        return;
    }
    let html = `<h2>Желаемое (${pril.zhelaemoe.length})</h2>`;
    pril.zhelaemoe.forEach((i) => {
        html += `<div class="cart-item"><div class="cart-item-cover" style="background-image:url('${i.igra?.kartinka || ''}')"></div><div style="flex:1"><strong>${i.igra?.nazvanie || ''}</strong><div>${i.igra?.tsena || 0} ₽</div></div><button class="btn btn-danger" onclick="window.prilozhenie.udalitIzZhelaemogo(${i.id})">×</button></div>`;
    });
    app.innerHTML = html;
}
