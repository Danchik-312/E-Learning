async function loadComponent(selector, url) {
    const container = document.querySelector(selector);
    if (!container) return;

    try {
        const response = await fetch(url);
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error(`Ошибка загрузки ${url}:`, error);
    }
}

// Загружаем header и footer
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '/components/header/Header.html');
    loadComponent('footer', '/components/footer/Footer.html');
});