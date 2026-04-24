const fanSpeedSlider = document.getElementById('fanSpeedSlider');
const peltierSlider = document.getElementById('peltierSlider');
const fanSpeedValue = document.getElementById('fanSpeedValue');
const peltierValue = document.getElementById('peltierValue');
const batteryTime = document.getElementById('batteryTime');
const navLinks = document.querySelectorAll('.side-nav a');

function calculateBatteryLife() {
    const fanSpeed = parseInt(fanSpeedSlider.value);
    const peltierIntensity = parseInt(peltierSlider.value);

    fanSpeedValue.textContent = `${fanSpeed}%`;
    peltierValue.textContent = `${peltierIntensity}%`;

    const minRuntime = 2;
    const maxRuntime = 16;
    const combinedIntensity = (fanSpeed + peltierIntensity) / 2;
    const intensityFactor = combinedIntensity / 100;
    
    const totalHours = maxRuntime - (intensityFactor * (maxRuntime - minRuntime));
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    batteryTime.textContent = `${hours}h ${minutes}m`;
}

fanSpeedSlider.addEventListener('input', calculateBatteryLife);
peltierSlider.addEventListener('input', calculateBatteryLife);

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

calculateBatteryLife();
