'use strict';

let userCSV = document.getElementById('user-csv');
let userString = document.getElementById('user-string');
let tryFunc = document.getElementById('try-func');
let result = document.getElementById('result');

tryFunc.addEventListener('click', getResult);

function getResult() {
    result.innerHTML = csvTransformer(userCSV.innerHTML)(userString.innerHTML);
}

function csvTransformer(s) {
    let array = s.split('\n');

    array = array.filter((item) => {
        return !item.includes('#') && (item != "");
    });

    array = array.map((item) => {
        let strArr = item.split(',');
        item = {
            x: strArr[0],
            y: strArr[1],
            name: strArr[2],
            population: strArr[3]
        };
        return item;
    });

    array.sort((a, b) => (b.population || 0) - (a.population || 0));

    array = array.slice(0, 10);

    let obj = array.reduce(function (previousValue, item, index) {
        previousValue[item.name] = {
            population: item.population,
            rating: index + 1
        }
        return previousValue;
    }, {});

    let regex = Object.keys(obj).reduce(function (previousValue, item) {
        return `${previousValue}|(${item})`;
    }, '');
    regex = regex.slice(1);
    regex = new RegExp(regex, 'g');
    return (str) => {
        return str.replace(regex, (match) => {
            return `${match} (${obj[match].rating} place in the TOP-10 largest cities of Ukraine, population ${obj[match].population} people)`;
        });
    }
}
