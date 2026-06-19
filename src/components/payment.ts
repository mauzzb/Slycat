import { checkout } from '../api';
import { showToast } from '../utils/utils';

export function showPayment(): void {
    const pril = (window as any).prilozhenie;
    const total = pril.korzina.reduce((s: number, i: any) => s + (i.igra?.tsena || 0), 0);
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal"><button class="modal-close" onclick="this.closest('.modal-overlay')?.remove()">×</button><h2>Оплата заказа</h2><p style="margin-bottom:1.5rem">Сумма: <strong style="color:var(--green)">${total} ₽</strong></p><div class="payment-option selected"><div class="payment-icon card">VISA</div><div><strong>Банковская карта</strong></div></div><div class="payment-option"><div class="payment-icon sbp">SBP</div><div><strong>СБП</strong></div></div><div class="payment-option"><div class="payment-icon yoomoney">U</div><div><strong>ЮMoney</strong></div></div><div class="payment-option"><div class="payment-icon crypto">B</div><div><strong>Криптовалюта</strong></div></div><div style="display:flex;gap:0.75rem;margin-top:1.5rem"><button class="btn btn-secondary" style="flex:1" onclick="this.closest('.modal-overlay')?.remove()">Отмена</button><button class="btn btn-success" style="flex:1" id="oplataKnopka" onclick="window.prilozhenie.vypolnitOplatu()">Оплатить ${total} ₽</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('.payment-option').forEach(o => o.addEventListener('click', function() {
        overlay.querySelectorAll('.payment-option').forEach(x => x.classList.remove('selected'));
        o.classList.add('selected');
    }));
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

export async function processPayment(): Promise<void> {
    const btn = document.getElementById('oplataKnopka') as HTMLButtonElement;
    btn.textContent = 'Обработка...'; btn.disabled = true;
    await new Promise(r => setTimeout(r, 2000));
    await checkout();
    document.querySelector('.modal-overlay')?.remove();
    const pril = (window as any).prilozhenie;
    await pril.zagruzitDannye();
    await pril.otrisovatKorzinu();
    showToast('Оплата прошла! Игры в библиотеке.');
}