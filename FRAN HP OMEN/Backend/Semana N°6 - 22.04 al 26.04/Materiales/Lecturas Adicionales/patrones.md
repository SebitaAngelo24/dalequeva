# Material Adicional - Arquitecturas y Patrones de diseño

## Arquitecturas

Ninguna arquitectura es mejor que otra, todo depende de los requerimientos del sistema en cuestión.

### Arquitectura monolítica

Hasta hace unos años, las aplicaciones usaban este tipo de arquitectura.

![](imagenes/arquitectura-monolitica.png)

### ¿Cuál es el problema que surgió con esta arquitectura?

Por ejemplo si surge el requerimiento de administrar exámenes esto implicaría un nuevo subsistema de exámenes, es decir, se  agrega mas código a la capa de negocios, a la capa de presentación y a la capa de persistencia. Si este subsistema interactúa con alguno otro se estas interacciones a nivel código.

Esta interacción se llama acoplamiento y en el mejor de los casos el subsistema Usuarios le solicitara al subsistema Exámenes los exámenes del usuario logueado, en el peor de los casos el Subsistemas de usuarios hará la consulta de los exámenes logueados directamente a la capa de persistencia.

Si lo que se necesita es que el sistema sea escalable, se recomienda minimizar este acoplamiento ya que es inversamente proporcional al escalamiento.

Afirmando que el pico de concurrencia de peticiones que responde este subsistema es en época de exámenes (algunos días al año) y suponiendo que debido a esta concurrencia de peticiones el sistema completo deja de responder y queda indisponibilizado para todos los usuarios. Esta situación sería caótica ya que el quizás el 25% de los usuarios son los que rinden pero el 100% no puede acceder.

Este ejemplo representa lo monolítico del sistema, ya que el sistema se maneja como uno. Si alguno de los subsistemas falla, toda la aplicación falla. La única forma de escalar es replicar todo el sistema, y quizás el requerimiento solo necesitaba escalar la administración de exámenes.

Entre las desventajas que tiene esta arquitectura en un sistema "grande" es el mantenimiento debido a la cantidad de código que maneja.

### Arquitectura de microservicios

Esta arquitectura toma cada "subsistema" o un conjunto de subsistemas y generar una aplicación por cada uno de estos. Las buenas prácticas de microservicios indican que cada microservicio debe tener su propia bd de esta forma se logra desacoplar y en el caso de que algún microservicio deje de funcionar el sistema sigue levantado, obviamente sin la funcionalidad asociada al microservicio caído.

![](imagenes/arquitectura-microservicios.png)

## Principios Solid

[Video sugerido por la Cátedra]<https://youtu.be/B5yxXWAO-1I>

## 12 Factor App

[Video sugerido por la Cátedra]<https://youtu.be/p2k1zRYLv6U>

* Es aplicable a cualquier tipo de aplicaciones, escritas en cualquier lenguaje y que usen cualquier combinación de backing services (bases de datos, memorias cache, colas, etc).
* Tenerlo muy en cuenta cuando estamos hablando de microservicios.

### Diagrama explicativo
Link a original [aquí](https://app.diagrams.net/#G1PeZZJISgRj1elH2tMiFICHuFYTzCyHdC).

Link de solo lectura [aquí](https://drive.google.com/file/d/1PeZZJISgRj1elH2tMiFICHuFYTzCyHdC/view?usp=sharing) 
![](imagenes/12-factor-app-metodología.png)

### Bibliografía

* [Twelve Factor App. Metodología de 12 factores.](https://12factor.net/)

## Patrones de diseño

Los patrones de diseño (design patterns) son soluciones habituales a problemas comunes en el diseño de software

No se puede elegir un patrón y copiarlo en el programa como si se tratara de funciones o bibliotecas ya preparadas. El patrón no es una porción específica de código, sino un concepto general para resolver un problema particular. Puedes seguir los detalles del patrón e implementar una solución que encaje con las realidades de tu propio programa.

A menudo los patrones se confunden con algoritmos porque ambos conceptos describen soluciones típicas a problemas conocidos. Mientras que un algoritmo siempre define un grupo claro de acciones para lograr un objetivo, un patrón es una descripción de más alto nivel de una solución. El código del mismo patrón aplicado a dos programas distintos puede ser diferente.

Una analogía de un algoritmo sería una receta de cocina: ambos cuentan con pasos claros para alcanzar una meta. Por su parte, un patrón es más similar a un plano, ya que puedes observar cómo son su resultado y sus funciones, pero el orden exacto de la implementación depende de ti.

### ¿En qué consiste el patrón?
Las secciones que suelen estar presentes en la descripción de un patrón:

* El **propósito** del patrón explica brevemente el problema y la solución.
* La **motivación** explica en más detalle el problema y la solución que brinda el patrón.
* La **estructura** de las clases muestra cada una de las partes del patrón y el modo en que se relacionan.
* El **ejemplo de código** en uno de los lenguajes de programación populares facilita la asimilación de la idea que se esconde tras el patrón.

### Ventajas

* Son un juego de herramientas de **soluciones comprobadas**
* Definen un **lenguaje común** que puedes utilizar con tus compañeros de equipo para comunicarse de forma más eficiente.
* Los patrones intentan sistematizar soluciones cuyo uso ya es generalizado. 
* Siempre hay que determinar cómo adaptarlo al contexto del proyecto en particular
* No es necesario intentar aplicar patrones en todas partes, incluso en algunas situaciones un código más simple funcionaría perfectamente bien.

### Clasificación

* Los **patrones creacionales** proporcionan mecanismos de creación de objetos que incrementan la flexibilidad y la reutilización de código existente.
* Los **patrones estructurales** explican cómo ensamblar objetos y clases en estructuras más grandes a la vez que se mantiene la flexibilidad y eficiencia de la estructura.
* Los **patrones de comportamiento** se encargan de una comunicación efectiva y la asignación de responsabilidades entre objetos.

### Catálogo

```bash
├── Patrones creacionales
│   ├── Factory Method
│   ├── Abstract Factory
│   ├── Builder
│   ├── Prototype
│   └── Singleton
├── Patrones estructurales
│   ├── Adapter
│   ├── Brigde
│   ├── Composite
│   ├── Decorator
│   ├── Facade
│   ├── Flyweight
│   └── Proxy
└── Patrones de comportamiento
    ├── Change of Responsability
    ├── Command
    ├── Iterator
    ├── Mediator
    ├── Memento
    ├── Observer
    ├── State
    ├── Strategy
    ├── Template Method
    └── Visitor
```

### Bibliografía

https://refactoring.guru/es/design-patterns/

## Patrones de diseño aplicados en  ExpressJS

Código de express [aquí](https://github.com/expressjs/express/blob/master/lib/express.js#L28)

### Aplicación de Factory Method

Expressjs crea el servidor (representado con la variable `app`) a través de la función `createApplication`, dicha función es expuesta por express.

```javascript
/**
 * Expose `createApplication()`.
 */

exports = module.exports = createApplication;

function createApplication() {
    var app = function(req, res, next) {
        app.handle(req, res, next);
    };
...
    app.init();
    return app;
}
```
Cuando se necesita crear el servidor, se hace de la siguiente manera:
```javascript
import express from 'express';
..
const app = express();
```
Donde `express()` invoca a la función exportada `createApplication`. De esta forma la implementación de la inicialización de servidor (variable `app`) esta abstraida para cualquier que cree una aplicación con `express()`.

### Aplicación de Chain of Responsibility

Para entender es patro es necesario saber que es un middleware (software in the middle).
Un middlware es código que se ejecuta antes de que el punto de ejecución llegué al controlador.
Cada middle tiene un fin específico, una responsabilidad propia.

![](imagenes/middlewares.png)

Por ejemplo, todas las peticiones HTTP viajan en texto plano. La siguientes petición es un POST que va a insertar un libro

```text
POST /books HTTP/1.1
Host: localhost
Content-Type: application/json
Content-Length: 110

{
    "author": "Jonathan Lee Martin",
    "category": "learn-by-building",
    "language": "JavaScript"
}
```

Para indicarle a express que tiene que tiene que transformar el body de esta request a un JSON lo hacemos a través del siguiente middleware:

```javascript
app.use(express.json()); // para poder leer json en el body
```

De esta forma antes de que el controlador accedamos al `req.body` este nos va a devolver el siguiente objeto y un string:

```javascript
const book = req.body;
```

```text
// Salida de console.log(book);
{
    author: "Jonathan Lee Martin",
    category: "learn-by-building",
    language: "JavaScript"
}
```

#### Ejemplos de middlewares

```javascript
app.use(express.json());
```

```javascript
app.use(errorHandler);
```

```javascript
app.use(cors({
  origin: '*'
}));
```

### Bibliografía

* https://dzone.com/articles/design-patterns-in-expressjs
* https://dzone.com/articles/understanding-middleware-pattern-in-expressjs
* https://jonathanleemartin.com/books/sample.pdf
* https://github.com/expressjs/express/blob/master/lib/express.js

## Patrones de diseño aplicados en Sequelize

Código de Sequelize [aquí](https://github.com/sequelize/sequelize)

### Singleton

Se instancia un objeto de tipo `Sequelize` (`new Sequelize ...`), el cual es almacenado en la variable `sequelize`.
Cuando se quiera acceder a cualquier modelo o hacer alguna consulta se debe acceder a través de la varaible `sequelize`.

```javascript
const { Sequelize, DataTypes, Model } = require('sequelize');

// Connect to the database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

// Create a model 
class User extends Model {}

// Initialize the model
User.init({
    // Define your model's attributes
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER
    },
    favoriteColor: {
        type: DataTypes.STRING,
        defaultValue: 'green'
    }
}, {
    // Set other options here
    sequelize, // we need to pass the connection instance
    modelName: 'User' // we need to choose the model name
});

// The defined model is the class itself
console.log(User === sequelize.models.User); // true
```

La conexión a la BD `sequelize` es un singleton, es importante remarcar que cualquier configuración que se aplique sobre este instancia `sequelize` aplica para cualquier conexión a la BD que se lleve cabo.

### Bibliografía

* https://betterprogramming.pub/an-introduction-to-sequelize-a-node-js-object-relational-mapper-orm-267a51c2d978