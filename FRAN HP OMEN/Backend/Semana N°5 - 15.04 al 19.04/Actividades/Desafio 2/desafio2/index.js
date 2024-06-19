import {readFile} from 'fs/promises';
import fs from "node:fs"


// Lectura archivo JSON / Creación de objeto JAVASCRIPT
async function readJSON(file) {
    try {
        // Lectura de archivo en forma asincrónica
        const data = await readFile(file, 'utf8');
        
        // Conversión del contenido del archivo JSON a un objeto JAVASCRIPT
        const jsonData = JSON.parse(data);

        return jsonData;

    } catch (error) {
        // Manejo de errores si ocurre algún problema al leer y parsear el JSON
        console.error(`Error al leer el archivo JSON: ${error}`);
        throw error;
    }
}


// 1- Promedio entero de las edades de todas las personas del archivo
function ageAverage(persons) {
    // Sumatoria Edades
    const totalAge = persons.reduce((sum, person) => sum + person.edad, 0);

    // Promedio Edades
    const averageAge = Math.round(totalAge / persons.length);

    console.log(`1- el promedio entero de las edades de todas las personas es: ${averageAge}`);
}


// 2- Nombre y Apellido de la persona más joven del conjunto
function minAgePerson (persons) {
    const ages = persons.map((person) => person.edad);
    const minAge = Math.min(...ages);
    const minAgeIndex = ages.indexOf(minAge);
    const minAgeName = persons[minAgeIndex].nombre;
    const minAgeLastName = persons[minAgeIndex].apellido;
  
    console.log(`2- La persona más joven del conjunto es ${minAgeName} ${minAgeLastName}`);
}


// 3- Nombres de todas las personas con apellido GOMEZ
function namesWithGomez(persons) {
    const personsGomez = persons.filter((person) => person.apellido === "GOMEZ")
    const nameGomez = personsGomez.map((person) => person.nombre)
    const sortedNames = nameGomez.sort();

    console.log(`3- Nombres de todas las personas con apellido GOMEZ: ${sortedNames}`)
}


// 4- Suma de las edades de aquellas personas cuyo nombre tenga una longitud par y el apellido una longitud impar
function sumEvenNameOddLastName(persons) {
    sumEvenNameOddLastName = persons.reduce((sum, element) => {
        if ((element.nombre.length % 2 === 0) && (element.apellido.length % 2 !== 0)) {
            return sum + element.edad
        } else {
            return sum
        }}, 0)

    console.log(`4- Suma de las edades de aquellas personas cuyo nombre tenga una longitud par y el apellido una longitud impar: ${sumEvenNameOddLastName}`)
}


// -5/6: Generación de objeto JSON. 
function writeJSON(file, data) {
    const json = JSON.stringify(data, null, 2)
    fs.writeFile(file, json, "utf-8", (err) => {
        if (err) {
            console.log(`Error al generar el archivo JSON ${file}`, err)
            return
        }
        console.log(`\t>>> archivo ${file} creado con éxito`)
    })
}


// 5- Generación de JSON que contiene los siguientes atributos o propiedades:
//   - mayores: cantidad de personas con edad > 18
//   - menores: cantidad de personas con edad <= 18
//   - primeraMitad: cantidad de personas cuyo apellido comienza con A-L
//   - segundaMitad: cantidad de personas cuyo apellido comienza con M-Z
function objectCreation5(persons) {
    const higher18 = (persons.filter((person) => person.edad > 18)).length;
    const lower18 = (persons.filter((person) => person.edad <= 18)).length;
    const firstHalf = (persons.reduce((sum, person) => person.apellido[0] >= 'A' && person.apellido[0] <= 'L' ? sum + 1 : sum, 0));
    const secondHalf = (persons.reduce((sum, person) => person.apellido[0] >= 'M' && person.apellido[0] <= 'Z' ? sum + 1 : sum, 0));
    const obj = {mayores: higher18, menores: lower18, primeraMitad: firstHalf, segundaMitad: secondHalf};
    
    const jsonString = JSON.stringify(obj);

    writeJSON("punto5.json", jsonString);

    console.log("5- Objeto en notación JSON: ", jsonString);
}


// 6- Generación de JSON que contiene los siguientes atributos, cuyos valores son la cantidad de personas correspondientes a cada apellido:
//   - CASTILLO
//   - DIAZ
//   - FERRER
//   - PINO
//   - ROMERO
function LastNamesCount(persons) {
    const CASTILLO = (persons.filter((person) => person.apellido === "CASTILLO")).length;
    const DIAZ = (persons.filter((person) => person.apellido === "DIAZ")).length;
    const FERRER = (persons.filter((person) => person.apellido === "FERRER")).length;
    const PINO = (persons.filter((person) => person.apellido === "PINO")).length;
    const ROMERO = (persons.filter((person) => person.apellido === "ROMERO")).length;
    const obj = {CASTILLO: CASTILLO, DIAZ: DIAZ, FERRER: FERRER, PINO: PINO, ROMERO: ROMERO};
    
    const jsonString = JSON.stringify(obj);

    writeJSON("punto6.json", jsonString);

    console.log("6- Objeto en notación JSON: ", jsonString);
    }


// Función Principal
function main() {
    const file = "./datos/personas.json";

    // Lectura archivo JSON / Creación de objeto JAVASCRIPT
    const jsonData = readJSON(file)

    jsonData
    .then(data => {
        // 0- Lectura archivo JSON / Creación de objeto JAVASCRIPT
        console.log('0- Contenido del archivo JSON: \n', data);

        ageAverage(data);
        minAgePerson(data);
        namesWithGomez(data)
        sumEvenNameOddLastName(data)
        objectCreation5(data)
        LastNamesCount(data)

    })
    .catch(error => {
        // Manejo de errores si ocurre algún problema al mostrar el archivo JSON o al ejecutar una función
        console.error(`Error al mostrar el archivo JSON: ${error}`);
        throw error;
    })
    
}

main()