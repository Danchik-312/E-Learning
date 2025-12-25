const track = document.querySelector('.reviews__track');
const slides = document.querySelectorAll('.content_item');
const prevBtn = document.querySelector('.reviews__arrow--prev');
const nextBtn = document.querySelector('.reviews__arrow--next');

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

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '/components/header/Header.html');
    loadComponent('footer', '/components/footer/Footer.html');
});

let currentIndex = 0;

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0; // зацикливание
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    updateSlider();
});

// Event delegation — ловим клик на всей странице
document.addEventListener('click', (e) => {
    const question = e.target.closest('.faq__question'); // ближайший .faq__question
    if (!question) return; // если клик не по вопросу — выходим

    const item = question.closest('.faq__item'); // родитель faq__item
    const answer = item.querySelector('.faq__answer');
    const allItems = document.querySelectorAll('.faq__item');

    // Закрываем все остальные
    allItems.forEach(other => {
        if (other !== item) {
            other.classList.remove('faq__item--opened');
            const otherAnswer = other.querySelector('.faq__answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
    });

    // Переключаем текущий
    item.classList.toggle('faq__item--opened');

    if (item.classList.contains('faq__item--opened')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.style.maxHeight = null;
    }
});





