const $name = document.querySelector('#name');
const $min = document.querySelector('#min');
const $max = document.querySelector('#max');
const $submit = document.querySelector('#submit');

const and = (x, y) => x && y;
const lte = (x, y) => x <= y;

const notEmptyString = s => typeof s === 'string' && s.length > 0;
const gteThan = limit => n => typeof n === 'number' && n >= limit;
const isNumber = n => !isNaN(+n);

const all = (...predicates) => value => predicates.every(f => f(value));

const fromInput = el => most.fromEvent('keyup', el)
    .map(e => e.target.value);

const name$ = fromInput($name);
const min$ = fromInput($min).map(Number);
const max$ = fromInput($max).map(Number);

const isNameValid$ = name$.map(notEmptyString);
const isMinValid$ = min$.map(all(isNumber, gteThan(0)));
const isMaxValid$ = max$.map(isNumber);
const isFormValid$ = min$.combine(lte, max$).combine(and, isNameValid$, isMinValid$, isMaxValid$);

isFormValid$
    .startWith(false)
    .observe(x => $submit.disabled = !x);