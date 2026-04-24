const fanSpeedSlider = document.getElementById('fanSpeedSlider');
const peltierSlider = document.getElementById('peltierSlider');
const fanSpeedValue = document.getElementById('fanSpeedValue');
const peltierValue = document.getElementById('peltierValue');
const batteryTime = document.getElementById('batteryTime');
const navLinks = document.querySelectorAll('.side-nav a');

const batteryCapacity = 10000;
const baseFanPower = 1.2;
const basePeltierPower = 2.5;

function calculateBatteryLife() {
    const fanSpeed = parseInt(fanSpeedSlider.value);
    const peltierIntensity = parseInt(peltierSlider.value);

    const fanPower = (baseFanPower * fanSpeed) / 100;
    const peltierPower = (basePeltierPower * peltierIntensity) / 100;
    const totalPower = fanPower + peltierPower;

    let hours = 0;
    let minutes = 0;

    if (totalPower > 0) {
        const totalMinutes = (batteryCapacity / totalPower) * 60;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.round(totalMinutes % 60);

        if (hours > 16) {
            hours = 16;
            minutes = 0;
        }
    } else {
        hours = 16;
        minutes = 0;
    }

    fanSpeedValue.textContent = `${fanSpeed}%`;
    peltierValue.textContent = `${peltierIntensity}%`;
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
