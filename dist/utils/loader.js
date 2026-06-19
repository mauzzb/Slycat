// полоса что идет загрузка
export function showLoader() {
    const bar = document.getElementById('loaderBar');
    if (bar) {
        bar.classList.add('active');
    }
}
// убрать полоску
export function hideLoader() {
    const bar = document.getElementById('loaderBar');
    if (bar) {
        bar.classList.remove('active');
    }
}
