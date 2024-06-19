import {readFile} from 'fs/promises';

function readJSON(file) {
    return readFile(file, 'utf8').then(data => JSON.parse(data));
}

function Persona(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }
const objectCreation = () => {
    const mapPersonas = new Map(readJSON("./datos/personas.json").then(data => {
        data.forEach(element => {
            mapCollection.set(1, element)
        });
    }));

    // readJSON("./datos/personas.json").then(data => {
    //     data.forEach(element => {
    //         // let persona = new Persona(element.nombre, element.apellido, element.edad);
                
    //         mapCollection.set(1, element);
    //         // const mapTbbt = new Map( element => [season: element.season + element.episode_num,
    //         //     element]);
    //     });
    // });


    return mapPersonas
}

console.log(objectCreation())