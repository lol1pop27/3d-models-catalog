// Получаем элементы
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.category-card');
const toastContainer = document.getElementById('toastContainer');
const contactLink = document.querySelector('.contact-link');

// Функция показа уведомления
function showNotification(categoryName) {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
        <i class="bi bi-box-arrow-up-right" style="color: var(--primary-light);"></i>
        <span>Переход на <strong>${categoryName}</strong> на free3d.com...</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 1500);
}

// Функция поиска
function filterCards(searchText) {
    const searchLower = searchText.toLowerCase().trim();
    let visibleCount = 0;
    
    cards.forEach(card => {
        const categoryName = card.getAttribute('data-category');
        if (categoryName && categoryName.toLowerCase().includes(searchLower)) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    const grid = document.getElementById('categoriesGrid');
    const existingMsg = document.querySelector('.no-results');
    
    if (visibleCount === 0 && searchText !== '') {
        if (!existingMsg) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.style.gridColumn = '1/-1';
            noResults.style.textAlign = 'center';
            noResults.style.padding = '50px';
            noResults.innerHTML = `
                <i class="bi bi-search" style="font-size: 3rem; color: var(--gray);"></i>
                <p style="margin-top: 15px; color: var(--gray);">Ничего не найдено</p>
            `;
            grid.appendChild(noResults);
        }
    } else {
        if (existingMsg) existingMsg.remove();
    }
}

// Плавная прокрутка к футеру при клике на "Контакты"
if (contactLink) {
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        const footer = document.getElementById('footer');
        if (footer) {
            footer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Обработчики кликов на карточки
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        const categoryName = card.getAttribute('data-category');
        showNotification(categoryName);
    });
});

// Поиск с debounce
let searchTimeout;
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterCards(e.target.value);
        }, 300);
    });
}

// Плавная прокрутка для всех якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});