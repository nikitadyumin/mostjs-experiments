function log(x) {
    document.querySelector('#result').textContent = x;
}

const sum = (x, y) => x + y;

const $leftInput = document.querySelector('#leftT');
const $rightInput = document.querySelector('#rightT');
const $leftButton = document.querySelector('#leftB');
const $rightButton = document.querySelector('#rightB');

const leftValues$ = most.fromEvent('keyup', $leftInput)
    .map(e => e.target.value);
const rightValues$ = most.fromEvent('keyup', $rightInput)
    .map(e => e.target.value);

const leftClick$ = most.fromEvent('click', $leftButton);
const rightClick$ = most.fromEvent('click', $rightButton);

const a$ = leftValues$.sampleWith(leftClick$);
const b$ = rightValues$.sampleWith(rightClick$);

a$.zip(sum, b$).observe(log);