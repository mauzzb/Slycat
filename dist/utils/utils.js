export function showToast(msg, undoLabel, undoAction) {
    const c = document.getElementById('toastContainer');
    if (!c)
        return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span style="flex:1">' + msg + '</span>' + (undoLabel ? '<span class="toast-undo">' + undoLabel + '</span>' : '');
    c.appendChild(el);
    if (undoLabel && undoAction) {
        el.querySelector('.toast-undo')?.addEventListener('click', () => { undoAction(); el.remove(); });
    }
    setTimeout(() => { if (el.parentNode)
        el.remove(); }, 4000);
}
export function showUndoToast(msg, action) {
    showToast(msg, 'Отменить', action);
}
export function showLoader() {
    document.getElementById('loaderBar')?.classList.add('active');
}
export function hideLoader() {
    document.getElementById('loaderBar')?.classList.remove('active');
}
