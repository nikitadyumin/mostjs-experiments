const {create, patch, diff, h} = virtualDom;

function renderRow({city, temp, country, humidity}) {
    return h('tr', [
        h('td', city),
        h('td', country),
        h('td', temp),
        h('td', humidity)
    ]);
}

function render(data) {
    return h('tbody', data.map(renderRow));
}

let rootNode = document.querySelector('#result > tbody');

function updateDom(cur, next) {
    const patches = diff(cur, next);
    rootNode = patch(rootNode, patches);
    return next;
}

const appid = '';
const url = ([city, country]) => `http://api.apixu.com/v1/current.json?key=${appid}&q=${city}`;

const cities = [
    ['London', 'us'],
    ['Paris', 'ru'],
    ['Moscow', 'ru'],
    ['Chelyabinsk', 'ru']
];

const $first = document.querySelector('#first');
const $second = document.querySelector('#second');

const firstValues$ = most.fromEvent('keyup', $first)
    .map(e => e.target.value).startWith('');
const secondValues$ = most.fromEvent('keyup', $second)
    .map(e => e.target.value).startWith('');

const filter = (data, f, s) => data.filter(v => v[0].indexOf(f) !== -1 && v[1].indexOf(s) !== -1);

const parse = data => ({
    city: data.location.name,
    country: data.location.country,
    temp: data.current.temp_c,
    humidity: data.current.humidity
});

most.of(cities).combine(filter, firstValues$, secondValues$)
    .map(list => list.map(url).map(u => fetch(u).then(r => r.json())))
    .flatMap(list => most.fromPromise(Promise.all(list)))
    .map(list => list.map(parse))
    .map(render)
    .reduce(updateDom, render([]));