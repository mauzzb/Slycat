"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showLoader = showLoader;
exports.hideLoader = hideLoader;
// полоса что идет загрузка
function showLoader() {
    var bar = document.getElementById('loaderBar');
    if (bar) {
        bar.classList.add('active');
    }
}
// убрать полоску
function hideLoader() {
    var bar = document.getElementById('loaderBar');
    if (bar) {
        bar.classList.remove('active');
    }
}
