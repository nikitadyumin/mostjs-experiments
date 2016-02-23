function render(data) {
    const html = data.map(({city, temp, humidity}) => `<tr><td>${city}</td><td>${temp}</td><td>${humidity}</td><tr/>`).join('');
    document.querySelector('#result > tbody').innerHTML = html;
}

const appid = '';
const url = ([city, country]) => `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&mode=json&appid=${appid}`;

const cities = [
    ['London', 'us'],
    ['Moscow', 'ru'],
    ['Chelyabinsk', 'ru']
];

const log = x => (console.log(x), x);

const $first = document.querySelector('#first');
const $second = document.querySelector('#second');

const firstValues$ = most.fromEvent('keyup', $first)
    .map(e => e.target.value).startWith('');
const secondValues$ = most.fromEvent('keyup', $second)
    .map(e => e.target.value).startWith('');

const filter = (data, f, s) => data.filter(v => v[0].indexOf(f) !== -1 && v[1].indexOf(s) !== -1);
const parse = data => ({city: data.name, temp: data.main.temp, humidity: data.main.humidity});
most.of(cities).combine(filter, firstValues$, secondValues$)
    .map(list => list.map(url).map(u => fetch(u).then(r => r.json())))
    .flatMap(list => most.fromPromise(Promise.all(list)))
    .map(list => list.map(parse))
    .forEach(render);