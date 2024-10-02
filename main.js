const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $healthCharacter = document.getElementById('health-character');
const $progressbarCharacter = document.getElementById('progressbar-character');
const $enemiesContainer = document.querySelector('.enemies');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: $healthCharacter,
    elProgressbar: $progressbarCharacter,
};

const enemies = [
    {
        id: 1,
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-enemy-1'),
        elProgressbar: document.getElementById('progressbar-enemy-1'),
    },
    {
        id: 2,
        name: 'Squirtle',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-enemy-2'),
        elProgressbar: document.getElementById('progressbar-enemy-2'),
    },
];

let currentEnemyIndex = 0;
let currentEnemy = enemies[currentEnemyIndex];

$btnKick.addEventListener('click', () => attack(currentEnemy, 'kick'));
$btnSpecial.addEventListener('click', () => attack(currentEnemy, 'special'));

function init() {
    console.log('Start Game!');
    renderHP(character);
    enemies.forEach(enemy => renderHP(enemy));
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    const healthPercent = (person.damageHP / person.defaultHP) * 100;
    person.elProgressbar.style.width = healthPercent + '%';
    updateProgressbarColor(person.elProgressbar, healthPercent);
}

function updateProgressbarColor(progressbar, healthPercent) {
    if (healthPercent > 70) {
        progressbar.style.background = 'linear-gradient(to right, lime, #8bf500)';
    } else if (healthPercent > 30) {
        progressbar.style.background = 'linear-gradient(to right, #ffcc00, #f1f500)';
    } else {
        progressbar.style.background = 'linear-gradient(to right, #d20000, #f51700)';
    }
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        if (person === character) {
            alert('You Lost!');
            disableButtons();
        } else {
            alert(person.name + ' fainted!');
            nextEnemy();
        }
    } else {
        person.damageHP -= count;
    }
    renderHP(person);
}

function attack(target, attackType) {
    let damage = random(20);
    if (attackType === 'special') {
        damage = Math.ceil(damage * 1.5); // Iron Tail наносить на 50% більше урону
    }
    changeHP(damage, target);
    if (target.damageHP > 0) {
        setTimeout(() => {
            const enemyDamage = random(15);
            changeHP(enemyDamage, character);
        }, 1000);
    }
}

function nextEnemy() {
    currentEnemyIndex = (currentEnemyIndex + 1) % enemies.length;
    currentEnemy = enemies[currentEnemyIndex];
    if (currentEnemy.damageHP === 0) {
        alert('You Win!');
        disableButtons();
    }
}

function disableButtons() {
    $btnKick.disabled = true;
    $btnSpecial.disabled = true;
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();