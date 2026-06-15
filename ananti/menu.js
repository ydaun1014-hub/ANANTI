/* ==============================
   MEGA MENU — menu.js
============================== */

/* --- 헤더 스크롤 효과 --- */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

/* --- 메뉴 열기 / 닫기 --- */
const panel   = document.getElementById('megaPanel');
const overlay = document.getElementById('menuOverlay');

document.querySelector('.FullMenu').addEventListener('click', openMenu);
document.querySelector('.mp-close').addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

function openMenu() {
    panel.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    panel.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

/* --- 카테고리 전환 --- */
document.querySelectorAll('.mp-nav-item[data-target]').forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.dataset.target;
        document.querySelectorAll('.mp-col2').forEach(c => c.classList.remove('visible'));
        document.querySelectorAll('.mp-nav-item').forEach(i => i.classList.remove('active'));
        document.getElementById(targetId).classList.add('visible');
        item.classList.add('active');
    });
});

/* --- 경험담 서브 상세 전환 (hover) --- */
document.querySelectorAll('.exp-item[data-detail]').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.exp-detail').forEach(d => d.style.display = 'none');
        document.querySelectorAll('.exp-item').forEach(i => i.classList.remove('active-exp'));
        const target = document.getElementById(item.dataset.detail);
        if (target) target.style.display = 'flex';
        item.classList.add('active-exp');
    });
    item.addEventListener('touchstart', () => {
        document.querySelectorAll('.exp-detail').forEach(d => d.style.display = 'none');
        document.querySelectorAll('.exp-item').forEach(i => i.classList.remove('active-exp'));
        const target = document.getElementById(item.dataset.detail);
        if (target) target.style.display = 'flex';
        item.classList.add('active-exp');
    }, { passive: true });
});
