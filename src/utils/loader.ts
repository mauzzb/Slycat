
// полоса что идет загрузка
export function showLoader(): void {
    const bar = document.getElementById('loaderBar');
    if (bar) {
        bar.classList.add('active');
    }
}
// убрать полоску
export function hideLoader(): void {
    const bar = document.getElementById('loaderBar');
    if (bar) {
        bar.classList.remove('active');
    }
}
