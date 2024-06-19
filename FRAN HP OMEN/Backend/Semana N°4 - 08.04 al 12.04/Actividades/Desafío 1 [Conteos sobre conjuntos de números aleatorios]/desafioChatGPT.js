// Importar la librería seedrandom
const seedrandom = require('seedrandom');

// Semilla para generar números aleatorios
const seed = 1763519;

// Función para generar números aleatorios enteros
function generarNumerosAleatorios(seed, cantidad) {
  const rng = seedrandom(seed);
  const numeros = [];
  for (let i = 0; i < cantidad; i++) {
    const num = rng.int32();
    numeros.push(num);
  }
  return numeros;
}

// Generar 1,000,000 de números aleatorios enteros
const numerosAleatorios = generarNumerosAleatorios(seed, 1000000);

// Cálculo de los resultados solicitados

// 1. Cantidad de números positivos y negativos
let positivos = 0;
let negativos = 0;
numerosAleatorios.forEach(num => {
  if (num > 0) positivos++;
  else if (num < 0) negativos++;
});

// 2. Cantidad de números con resto 0, 3, 5 o 6 al dividir por 7
const resto07 = [0, 0, 0, 0];
numerosAleatorios.forEach(num => {
  const resto = Math.abs(num) % 7;
  if (resto === 0 || resto === 3 || resto === 5 || resto === 6) {
    resto07[resto]++;
  }
});

// 3. Arreglo de contadores según el anteúltimo dígito
const contadoresAnteUltimoDigito = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
numerosAleatorios.forEach(num => {
  const digito = Math.floor(Math.abs(num) / 10) % 10;
  contadoresAnteUltimoDigito[digito]++;
});

// 4. Valor y posición del menor número
let menorNumero = numerosAleatorios[0];
let posicionMenor = 1;
numerosAleatorios.forEach((num, index) => {
  if (num < menorNumero) {
    menorNumero = num;
    posicionMenor = index + 1;
  }
});

// 5. Cantidad de números cuyo signo es igual al del anterior
let cantidadSignoIgualAnterior = 0;
for (let i = 1; i < numerosAleatorios.length; i++) {
  if (Math.sign(numerosAleatorios[i]) === Math.sign(numerosAleatorios[i - 1])) {
    cantidadSignoIgualAnterior++;
  }
}

// 6. Promedio entero de números con exactamente 6 dígitos
let sumaNumeros6Digitos = 0;
let cantidadNumeros6Digitos = 0;
numerosAleatorios.forEach(num => {
  if (Math.abs(num) >= 100000 && Math.abs(num) < 1000000) {
    sumaNumeros6Digitos += num;
    cantidadNumeros6Digitos++;
  }
});
const promedioNumeros6Digitos = Math.round(sumaNumeros6Digitos / cantidadNumeros6Digitos);

// Mostrar resultados
console.log('Cantidad de números positivos:', positivos);
console.log('Cantidad de números negativos:', negativos);
console.log('Cantidad de números con resto 0, 3, 5 o 6 al dividir por 7:', resto07);
console.log('Contadores según anteúltimo dígito:', contadoresAnteUltimoDigito);
console.log('Menor número:', menorNumero, 'en la posición:', posicionMenor);
console.log('Cantidad de números cuyo signo es igual al del anterior:', cantidadSignoIgualAnterior);
console.log('Promedio entero de números con exactamente 6 dígitos:', promedioNumeros6Digitos);
