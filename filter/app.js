function render(data) {
    const html = data.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><tr/>`).join('');
    document.querySelector('#result > tbody').innerHTML = html;
}

const data = [
    ['1', 'a'],
    ['22', 'aa'],
    ['33', 'a'],
    ['3', 'b'],
    ['5', 'b'],
    ['66', 'b'],
    ['6', 'c']
];

const $first = document.querySelector('#first');
const $second = document.querySelector('#second');

const firstValues$ = most.fromEvent('keyup', $first)
    .map(e => e.target.value).startWith('');
const secondValues$ = most.fromEvent('keyup', $second)
    .map(e => e.target.value).startWith('');

const filter = (data, f, s) => data.filter(v => v[0].indexOf(f) !== -1  && v[1].indexOf(s) !== -1);
most.of(data).combine(filter, firstValues$, secondValues$).forEach(render);