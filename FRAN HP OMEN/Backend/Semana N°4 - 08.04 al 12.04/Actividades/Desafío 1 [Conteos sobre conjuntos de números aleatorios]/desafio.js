// 'seedrandom' Package load
const seedrandom = require('seedrandom');
const random = seedrandom(1763519);

// Array Making function
const array = (size) => Array.from({length: size},() => random.int32());

// 1 Positive & Negative Numbers function
const positiveNegative = (array) => {
    let pos = 0, neg = 0;
    array.forEach(x => x > 0 ? pos++ : neg++);
    console.log(`1- Positivos: ${pos}, Negativos: ${neg}`);
}

// 2 (Number % 7) Remainder = 0, 3, 5, 6 function
const remainder0356 = (array) => {
    let counter = 0;
    let remainder = [0, 3, 5, 6];
    array.forEach(x => {(remainder.includes(x % 7)) ? counter++ : counter});
    console.log(`2- Múltiplos de 0, 3, 5 o 6: ${counter}`);
}

// 3 Penultimate Number matches with index (For simplifying the code, it was used an object with key:value elements) function
const penultimateIdemIndex = (array) => {
    let counterObj = {};
    for (let i = 0; i < 10; i++) {
        counterObj[i] = 0;
    }
    array.forEach((x) => {counterObj[x.toString().slice(-2, -1)] += 1});
    
    console.log(`3- Arreglo de Contadores: {${Object.values(counterObj)}}`);
    
}

// 4 Minor Value & Position function
const minorPosition = (array, size) => {
    let minor = size;
    for (let i=0; i<array.length; i++) {
        (array[i] < minor) ? minor = array[i] : minor;
    }

    console.log(`4- Menor: ${minor}, Posición: ${array.indexOf(minor) + 1}`);
}

// 5 Same sign that previous Element function
const samePreviousSign = (array) => {
    let counter = 0;
    for (let i=0; i<array.length; i++) {
        let backward = array.length - i;
        array[backward] > 0 && array[backward - 1] > 0 || array[backward] < 0 && array[backward - 1] < 0 ? counter++ : counter;
    }

    console.log(`5- Cantidad de Números de igual signo al anterior: ${counter}`);
}

// 6 Average 6 Digit size Numbers function
const average6DigitNumbers = (array, size) => {
    let counter = 0;
    let sum = 0;
    for (let i=0; i<array.length; i++) {
        let size = array[i].toString().length;
        let firstChar = array[i].toString()[0];
        if ((size === 6 && firstChar !== '-') || (size === 7 && firstChar === '-')) {
            counter++;
            sum += array[i];
        }
    }

    console.log(`6- Promedio entero de Números de 6 cifras: ${Math.round(sum/counter)}`);
}

// Main script function
const main = () => {
    const size = 1000000;
    const list = array(size);
    console.log(list);

    positiveNegative(list);
    remainder0356(list);
    penultimateIdemIndex(list);
    minorPosition(list, size);
    samePreviousSign(list);
    average6DigitNumbers(list, size);
}

main()