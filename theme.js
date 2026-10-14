// Tema düğmesi yalnızca ana sayfada bulunur; seçilen tema tüm sayfalarda korunur.
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

// Keep bottom search dock attached to the visible viewport while the iOS keyboard is open.
(function() {
    function bindKeyboardAwareSearch() {
        var body = document.body;
        if (!body || !body.classList.contains('has-bottom-search')) return;

        var viewport = window.visualViewport;
        function updateDockPosition() {
            var keyboardOffset = 0;
            if (viewport) {
                keyboardOffset = Math.max(0, window.innerHeight - (viewport.height + viewport.offsetTop));
                // Ignore tiny viewport differences when the keyboard is closed.
                if (keyboardOffset < 100) keyboardOffset = 0;
            }
            body.style.setProperty('--search-keyboard-offset', keyboardOffset + 'px');
        }

        updateDockPosition();
        window.addEventListener('resize', updateDockPosition, { passive: true });
        window.addEventListener('orientationchange', updateDockPosition, { passive: true });
        if (viewport) {
            viewport.addEventListener('resize', updateDockPosition, { passive: true });
            viewport.addEventListener('scroll', updateDockPosition, { passive: true });
        }

        document.addEventListener('focusin', function(event) {
            if (event.target && event.target.matches('input[type="search"], .search-input')) {
                window.setTimeout(updateDockPosition, 60);
            }
        });
        document.addEventListener('focusout', function() {
            window.setTimeout(updateDockPosition, 180);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindKeyboardAwareSearch, { once: true });
    } else {
        bindKeyboardAwareSearch();
    }
})();
