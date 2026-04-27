const fanSpeedSlider = document.getElementById('fanSpeedSlider');
const peltierSlider = document.getElementById('peltierSlider');
const fanSpeedValue = document.getElementById('fanSpeedValue');
const peltierValue = document.getElementById('peltierValue');
const batteryTime = document.getElementById('batteryTime');
const navLinks = document.querySelectorAll('.side-nav a');
const mainNav = document.getElementById('mainNav');
const heroBlades = document.getElementById('heroBlades');
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1000);
});

function calculateBatteryLife() {
    const fanSpeed = parseInt(fanSpeedSlider.value);
    const peltierIntensity = parseInt(peltierSlider.value);

    fanSpeedValue.textContent = `${fanSpeed}%`;
    peltierValue.textContent = `${peltierIntensity}%`;

    fanSpeedValue.classList.add('pop');
    peltierValue.classList.add('pop');
    setTimeout(() => {
        fanSpeedValue.classList.remove('pop');
        peltierValue.classList.remove('pop');
    }, 300);

    const minRuntime = 2;
    const maxRuntime = 16;
    const combinedIntensity = (fanSpeed + peltierIntensity) / 2;
    const intensityFactor = combinedIntensity / 100;

    const totalHours = maxRuntime - (intensityFactor * (maxRuntime - minRuntime));
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    batteryTime.textContent = `${hours}h ${minutes}m`;
    batteryTime.classList.add('pop');
    setTimeout(() => batteryTime.classList.remove('pop'), 400);
}

fanSpeedSlider.addEventListener('input', calculateBatteryLife);
peltierSlider.addEventListener('input', calculateBatteryLife);

const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    if (scrollY > 60) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }

    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroSection.style.opacity = 1 - progress * 1.3;
        heroSection.style.transform = `translateY(${scrollY * 0.35}px)`;
        heroBlades.style.animationDuration = `${Math.max(0.4, 3 - progress * 2.5)}s`;
    }
});

document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
});

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDuration = `${10 + Math.random() * 15}s`;
        p.style.animationDelay = `${Math.random() * 12}s`;
        const size = `${1 + Math.random() * 2}px`;
        p.style.width = size;
        p.style.height = size;
        container.appendChild(p);
    }
}

createParticles();
calculateBatteryLife();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
