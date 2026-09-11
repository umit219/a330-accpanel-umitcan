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
