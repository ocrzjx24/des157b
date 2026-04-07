(function () {
    'use strict';

    /* switch logic */
    const switchBtn = document.getElementById('switch-btn');
    const body      = document.querySelector('body');
    let mode = 'light';

    switchBtn.addEventListener('click', function () {
        if (mode === 'light') {
            body.classList.add('switch');
            mode = 'dark';
        } else {
            body.classList.remove('switch');
            mode = 'light';
        }
    });

    /* pagination */
    const sections  = Array.from(document.querySelectorAll('#section-viewport section'));
    const dots      = Array.from(document.querySelectorAll('.page-dot'));
    const btnBack   = document.getElementById('btn-back');
    const btnNext   = document.getElementById('btn-next');
    let currentPage = 0;

    function showPage(index) {
        const total = sections.length;
        index = ((index % total) + total) % total;
        
        sections.forEach(function (sec, i) {
        sec.classList.toggle('active', i === index);
        });
        dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
        });

        currentPage = index;
    }

    btnBack.addEventListener('click', function () { showPage(currentPage - 1); });
    btnNext.addEventListener('click', function () { showPage(currentPage + 1); });

    showPage(0);

    /* mouse parallax courtesy of the internet */
    const banner    = document.querySelector('#banner img.banner-light');
    const bannerDk  = document.querySelector('#banner img.banner-dark');
    const name      = document.querySelector('h1');
    const course    = document.querySelector('#course-info');
    const symbols   = document.querySelector('#symbols');
    const decoBack  = document.querySelector('.deco-back');
    const decoFront = document.querySelector('.deco-front');
    const leaves    = document.querySelectorAll('.leaf');  

    document.addEventListener('mousemove', function (e) {
        const x = (e.clientX / window.innerWidth  - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        const bannerStrength = 5;
        const nameStrength   = 15;
        const courseStrength = 5;
        const symbolStrength = 5;
        const decoStrength   = 8;
        const leafStrength   = 10;

        const bx = x * bannerStrength;
        const by = y * bannerStrength;
    
        banner.style.transform   = `translate(${bx}px, ${by}px) scale(1.08)`;
        bannerDk.style.transform = `translate(${bx}px, ${by}px) scale(1.08)`;
        name.style.transform = `translate(${x * nameStrength}px, ${y * nameStrength}px)`;
        course.style.transform = `translate(${x * courseStrength}px, ${y * courseStrength}px)`;
        symbols.style.transform = `translate(${x * symbolStrength}px, ${y * symbolStrength}px)`;
        if (decoBack)  
            decoBack.style.transform  = `translate(${x * decoStrength}px,       ${y * decoStrength}px)`;
        if (decoFront) 
            decoFront.style.transform = `translate(${x * (decoStrength + 4)}px, ${y * (decoStrength + 4)}px)`;
        leaves.forEach(function (leaf) {
            if (leaf.classList.contains('leaf-tl')) {
                leaf.style.transform =
                `translate(${x * leafStrength}px, ${y * leafStrength}px) rotate(120deg)`;
            }
            if (leaf.classList.contains('leaf-br')) {
                leaf.style.transform =
                `translate(${x * leafStrength}px, ${y * leafStrength}px) rotate(-30deg)`;
            }
        });

    });

})();