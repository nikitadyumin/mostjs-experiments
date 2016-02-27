const $login = document.querySelector('#login');
const $password = document.querySelector('#password');
const $submit = document.querySelector('#submit');

const notEmptyString = s => typeof s === 'string' && s.length > 0;

const login$ = most.fromEvent('keyup', $login)
    .map(e => e.target.value);
const password$ = most.fromEvent('keyup', $password)
    .map(e => e.target.value);

const isLoginValid$ = login$.map(notEmptyString);
const isPasswordValid$ = password$.map(notEmptyString);

const and = (x,y) => x&&y;
isLoginValid$.combine(and, isPasswordValid$)
    .startWith(false)
    .observe(x => $submit.disabled = !x);