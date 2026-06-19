"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = showToast;
exports.showUndoToast = showUndoToast;
function showToast(msg, undoLabel, undoAction) {
    var _a;
    var c = document.getElementById('toastContainer');
    if (!c)
        return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span style="flex:1">' + msg + '</span>' + (undoLabel ? '<span class="toast-undo">' + undoLabel + '</span>' : '');
    c.appendChild(el);
    if (undoLabel && undoAction) {
        (_a = el.querySelector('.toast-undo')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { undoAction(); el.remove(); });
    }
    setTimeout(function () { if (el.parentNode)
        el.remove(); }, 4000);
}
function showUndoToast(msg, action) {
    showToast(msg, 'Отменить', action);
}
