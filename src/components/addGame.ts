import { addGame } from '../api';
import { showToast } from '../utils/utils';

export function renderAddGame(): void {
    (document.getElementById('app') as HTMLElement).innerHTML = `
        <h2 style="margin-bottom:1rem">Добавить игру</h2>
        <div class="form-group"><label>Название</label><input type="text" id="gameTitle"></div>
        <div class="form-group"><label>Цена</label><input type="number" id="gamePrice"></div>
        <div class="form-group"><label>Описание</label><textarea id="gameDesc" rows="4"></textarea></div>
        <div class="form-group"><label>Картинка (URL)</label><input type="text" id="gameImage"></div>
        <div class="form-group"><label>Разработчик</label><input type="text" id="gameDev"></div>
        <div class="form-group"><label>Издатель</label><input type="text" id="gamePub"></div>
        <div class="form-group"><label>Жанр</label><input type="text" id="gameGenre"></div>
        <button class="btn btn-primary" onclick="window.prilozhenie.sohranitIgru()">Добавить</button>
    `;
}

export async function saveGame(): Promise<void> {
    const data = {
        Nazvanie: (document.getElementById('gameTitle') as HTMLInputElement).value,
        Tsena: parseFloat((document.getElementById('gamePrice') as HTMLInputElement).value),
        Opisanie: (document.getElementById('gameDesc') as HTMLTextAreaElement).value,
        Kartinka: (document.getElementById('gameImage') as HTMLInputElement).value,
        Razrabotchik: (document.getElementById('gameDev') as HTMLInputElement).value,
        Izdatel: (document.getElementById('gamePub') as HTMLInputElement).value,
        Zhanr: (document.getElementById('gameGenre') as HTMLInputElement).value,
        DataVyhoda: new Date().toISOString(),
        Tegi: '',
        Trebovaniya: ''
    };
    try {
        await addGame(data);
        showToast('Игра добавлена!');
        (window as any).prilozhenie.perejti('magazin');
    } catch (e) { showToast('Ошибка при добавлении'); }
}