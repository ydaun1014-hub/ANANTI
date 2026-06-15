/* ==============================
   C03 슬라이더 — slider.js
============================== */

const branches = [
    { en: 'COVE',       ko: '아난티 코브',         loc: '부산 기장', url: 'https://ananti.kr/en/cove',    img: './images/main/c03_cove.jpg'      },
    { en: 'CHORD',      ko: '아난티 코드',         loc: '경기 가평', url: 'https://ananti.kr/en/chord',   img: './images/main/c03_chord.jpg'     },
    { en: 'NAMHAE',     ko: '아난티 남해',         loc: '경남 남해', url: 'https://ananti.kr/en/namhae',  img: './images/main/c03_namhae.jpg'    },
    { en: 'GANGNAM',    ko: '아난티 앳 강남',      loc: '서울 강남', url: 'https://ananti.kr/en/ganm',    img: './images/main/c03_gangnam.jpg'   },
    { en: 'JEJU',       ko: '아난티 제주',         loc: '제주 구좌', url: 'https://ananti.kr/en/jeju',    img: './images/main/c03_jeju.jpg'      },
    { en: 'BUSAN COVE', ko: '아난티 앳 부산 코브', loc: '부산 기장', url: 'https://ananti.kr/en/busan',   img: './images/main/c03_busancove.jpg' },
    { en: 'VILLAJU',    ko: '아난티 빌라쥬',       loc: '부산',      url: 'https://ananti.kr/en/village', img: './images/main/c03_villaju.jpg'   },
];

const DURATION  = 5000;
const trackEl   = document.getElementById('track');
const tabsEl    = document.getElementById('tabs');
let cur = 0, timer, fillTimer, fillStart;

function getChunkSize() { return window.innerWidth <= 767 ? 1 : 3; }
function chunk(arr, n) {
    const out = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
}

function init() {
    trackEl.innerHTML = '';
    tabsEl.innerHTML  = '';
    cur = 0;
    clearTimeout(timer);
    if (fillTimer) cancelAnimationFrame(fillTimer);

    const slides    = chunk(branches, getChunkSize());
    const lastGroup = slides[slides.length - 1];
    while (lastGroup.length < getChunkSize()) lastGroup.push(null);

    slides.forEach(group => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        group.forEach(b => {
            if (!b) {
                const empty = document.createElement('div');
                empty.className = 'slide-thumb';
                empty.style.visibility = 'hidden';
                slide.appendChild(empty);
                return;
            }
            const a = document.createElement('a');
            a.className = 'slide-thumb';
            a.href = b.url; a.target = '_blank'; a.rel = 'noopener';
            a.style.position = 'relative';
            a.innerHTML = `
                <img src="${b.img}" alt="${b.ko}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
                <div style="position:absolute;bottom:16px;left:0;right:0;text-align:center;z-index:1;">
                    <span class="en"  style="display:block;">${b.en}</span>
                    <span class="ko"  style="display:block;">${b.ko}</span>
                    <span class="loc" style="display:block;">${b.loc}</span>
                </div>
            `;
            slide.appendChild(a);
        });
        trackEl.appendChild(slide);
    });

    const tabs = slides.map((group, i) => {
        const tab = document.createElement('div');
        tab.className = 'tab' + (i === 0 ? ' active' : '');
        tab.innerHTML = `<div class="tab-bar"><div class="tab-fill"></div></div><div class="tab-name">${group[0] ? group[0].en : ''}</div>`;
        tab.addEventListener('click', () => goTo(i, tabs, slides));
        tabsEl.appendChild(tab);
        return tab;
    });

    function updateUI(idx) {
        trackEl.style.transform = `translateX(-${idx * 100}%)`;
        tabs.forEach((t, i) => {
            t.classList.toggle('active', i === idx);
            t.querySelector('.tab-fill').style.width = i < idx ? '100%' : '0%';
        });
    }

    function startFill(tab) {
        if (fillTimer) cancelAnimationFrame(fillTimer);
        fillStart = performance.now();
        const fill = tab.querySelector('.tab-fill');
        fill.style.width = '0%';
        (function step(now) {
            const pct = Math.min(100, ((now - fillStart) / DURATION) * 100);
            fill.style.width = pct + '%';
            if (pct < 100) fillTimer = requestAnimationFrame(step);
        })(fillStart);
    }

    function goTo(idx, tabs, slides) {
        cur = idx; updateUI(idx);
        clearTimeout(timer);
        if (fillTimer) cancelAnimationFrame(fillTimer);
        startFill(tabs[idx]);
        timer = setTimeout(() => goTo((cur + 1) % slides.length, tabs, slides), DURATION);
    }

    document.getElementById('prev').onclick = () => goTo((cur - 1 + slides.length) % slides.length, tabs, slides);
    document.getElementById('next').onclick = () => goTo((cur + 1) % slides.length, tabs, slides);
    goTo(0, tabs, slides);
}

init();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 300);
});
