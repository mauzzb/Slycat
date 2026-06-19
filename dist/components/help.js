export function renderHelp() {
    document.getElementById('app').innerHTML = `<button class="btn btn-outline" onclick="window.prilozhenie.perejti('magazin')">← В магазин</button><h2>Как пользоваться</h2><div class="help-card"><h3>Покупка</h3><p>Кнопка "В корзину" на карточке игры. В корзине нажмите "Оплатить".</p></div><div class="help-card"><h3>Желаемое</h3><p>Кнопка ❤ добавляет игру в список.</p></div><div class="help-card"><h3>Профиль</h3><p>Нажмите на аватар вверху.</p></div><div class="help-card"><h3>Тема</h3><p>Кнопка слева внизу переключает тему.</p></div>`;
}
