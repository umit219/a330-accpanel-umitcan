// Tema yükle
(function() {
    var saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
    var html = document.documentElement;
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeBtn(next);
}

function updateThemeBtn(theme) {
    var btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// Buton ikonunu ayarla
window.addEventListener('DOMContentLoaded', function() {
    updateThemeBtn(localStorage.getItem('theme') || 'dark');
});

// Offline bar
window.addEventListener('load', function() {
    function check() {
        var b = document.getElementById('offlineBar');
        if (!b) return;
        navigator.onLine ? b.classList.remove('show') : b.classList.add('show');
    }
    window.addEventListener('online', check);
    window.addEventListener('offline', check);
    check();
});

/* =========================================================
   MAN-HOUR / SHIFT PLANNER
   ========================================================= */

.form-group {
    margin-bottom: 16px;
}

.form-group:last-child {
    margin-bottom: 0;
}

.form-group label {
    display: block;
    margin-bottom: 7px;
    font-size: 13px;
    font-weight: 600;
    opacity: 0.8;
}

.form-group input,
.form-group select {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 12px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    outline: none;
}

.shift-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 18px;
}

.shift-info > div {
    padding: 12px;
    border-radius: 10px;
    background: var(--bg);
    border: 1px solid var(--border);
}

.info-label {
    display: block;
    font-size: 11px;
    opacity: 0.6;
    margin-bottom: 4px;
}

.shift-info strong {
    font-size: 15px;
}

.summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.summary-item {
    padding: 13px;
    border-radius: 10px;
    background: var(--bg);
    border: 1px solid var(--border);
}

.summary-label {
    display: block;
    font-size: 10px;
    opacity: 0.6;
    margin-bottom: 5px;
}

.summary-item strong {
    font-size: 18px;
}

.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
}

.section-heading h2 {
    margin: 0;
    font-size: 18px;
}

.section-subtitle {
    margin: 4px 0 0;
    font-size: 12px;
    opacity: 0.6;
}

.timeline {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.timeline-row {
    width: 100%;
    min-height: 58px;
    display: grid;
    grid-template-columns: 105px 1fr 20px;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    box-sizing: border-box;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg);
    color: var(--text);
    text-align: left;
    cursor: pointer;
    transition: 0.15s ease;
}

.timeline-row:hover {
    border-color: var(--accent);
}

.timeline-row:active {
    transform: scale(0.99);
}

.timeline-row-filled {
    border-color: var(--accent);
}

.timeline-time strong {
    font-size: 12px;
    white-space: nowrap;
}

.timeline-info {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.timeline-wo {
    font-size: 13px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.timeline-tc {
    font-size: 11px;
    opacity: 0.7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.timeline-tech {
    font-size: 10px;
    opacity: 0.55;
}

.timeline-empty {
    font-size: 12px;
    opacity: 0.45;
}

.timeline-arrow {
    font-size: 22px;
    opacity: 0.45;
    text-align: center;
}

.btn-danger {
    margin-top: 10px;
}

.btn-secondary {
    opacity: 0.75;
}

.save-status {
    min-height: 18px;
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    opacity: 0.7;
}

.saved-shifts {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.saved-shift {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    text-align: left;
    padding: 11px 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg);
    color: var(--text);
    cursor: pointer;
}

.saved-shift strong {
    font-size: 13px;
}

.saved-shift span {
    font-size: 12px;
    opacity: 0.7;
}

.saved-shift small {
    grid-column: 1 / -1;
    margin-top: 3px;
    font-size: 10px;
    opacity: 0.5;
}

.saved-empty {
    text-align: center;
    padding: 15px;
    font-size: 12px;
    opacity: 0.5;
}

/* MODAL */

.modal {
    display: none;
}

.modal.modal-open {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 9999;
    align-items: flex-end;
    justify-content: center;
    padding: 12px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.55);
}

.modal-content {
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-sizing: border-box;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--border);
}

.modal-header h2 {
    margin: 0;
    font-size: 18px;
}

.modal-close {
    border: 0;
    background: transparent;
    color: var(--text);
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
}

.modal-body {
    padding: 16px;
}

.modal-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 16px;
    border-top: 1px solid var(--border);
}

.selected-time {
    margin-bottom: 18px;
    padding: 12px;
    border-radius: 10px;
    background: var(--bg);
    border: 1px solid var(--border);
}

.selected-time span {
    display: block;
    font-size: 10px;
    opacity: 0.5;
    margin-bottom: 4px;
}

.selected-time strong {
    font-size: 16px;
}

/* iPhone Safari zoom prevention */

input,
select,
textarea {
    font-size: 16px !important;
}

@media (max-width: 420px) {

    .timeline-row {
        grid-template-columns: 94px 1fr 16px;
        gap: 6px;
        padding: 8px;
    }

    .timeline-time strong {
        font-size: 11px;
    }

    .timeline-wo {
        font-size: 12px;
    }

}
