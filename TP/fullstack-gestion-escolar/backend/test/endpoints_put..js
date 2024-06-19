import { request } from "supertest";
import { app } from "../gestionEscolar";
import {sequelize} from "../data/sequelize-init"

let server
beforeAll ((done) => {
    server = app.listen(done) //iniciamos el servidor
})

afterAll((done) => {
    server.close(done) // cerramos el servidor
})

beforeAll(async () => {
    await sequelize.sync()
    await sequelize.sync({force: true}) //aseguramos que las migracione se aplique correctamente
})

afterAll(async () => {
    await sequelize.close()
})

const testPutEndpoint = (
    endpoint, //url q se va a probar
    updateData, // datos q qremos actualizar en el servidor
    expectedStatusCode = 200, // codigo de estado HTTP que esperamso q devuelva como respuesta
    expectedBody = null // objeto que representa el cuerpo de la respuesta esperada
) => {
    it(`Deberia responder con un codigo ${expectedStatusCode}`, async() => { //it: funcion proporcionada por el framework de pruebas Jest
        await request (server) // crea una intancia de solicitud que se puede configurar para diferentes tipos de solicitudes HTTP(GET,POST,PUT,...)
            .put (endpoint) //configura la solicitud para que sea especificamente PUT
            .send(updateData) //envia los datos de actualizacion en el cuerpo de la solicitud PUT
            .expect(expectedStatusCode) //verifica que la respuesta tenga el codigo de estado esperado
            .expect((res) => { //verificaciones adicionales en la respuesta
                if (expectedBody){
                    expect(res.body).toEqual(expectedBody) //verifica que el cuerpo de la respuesta sea igual al especificado
                }
            })
    })
}
describe("pruepruebas para endpoints PUT de la api gestionescolar", () => {
    describe("Pruebas para el endpoint GET principal de la api gestionEscolar", () => {
        const endpoint = [
            "/gestionEscolar/estudiantes",
            "/gestionEscolar/profesores",
            "/gestionEscolar/cursos",
            "/gestionEscolar/asignaturas",
            "/gestionEscolar/horarios",
            "/gestionEscolar/calificaciones",
            "/gestionEscolar/asistencias",
            "/gestionEscolar/materiales",
            "/gestionEscolar/actividadesExtracurriculares",
            "/gestionEscolar/matriculas",
        ]
        endpoint.forEach((endpoint) => {
            testPutEndpoint(endpoint)
        })
    })
    describe("pruebas para endpoints PUT de la api gestionescolar", () => {
        const specificPutTest = [
            {
                endpoint: "/gestionEscolar/estudiantes/1",
                expectedBody: {
                Id_Estudiante: 1,
                Nombre: "John",
                Apellido: "Doe",
                Fecha_nacimiento: "2000-01-15",
                Direccion: "123 Main St, Anytown, USA",
                Telefono: "555-1234",
                Email: "john.doe@example.com",
                },
            },
            {
                endpoint: "/gestionEscolar/profesores/1",
                expectedBody: {
                Id_Profesor: 1,
                Nombre: "Ana",
                Apellido: "García",
                Fecha_Nacimiento: "1965-03-20",
                Especialidad: "Matemáticas",
                Telefono: "555-1234",
                Email: "ana.garcia@example.com",
                },
            },
            {
                endpoint: "/gestionEscolar/cursos/1",
                expectedBody: {
                Id_Curso: 1,
                Nombre: "Analisis Matemático 1",
                Descripcion: "Curso de Analisis Matematico 1",
                Fecha_Inicio: "2021-09-01",
                Fecha_Fin: "2022-06-30",
                },
            },
            {
                endpoint: "/gestionEscolar/asignaturas/1",
                expectedBody: {
                Id_Asignatura: 1,
                Nombre: "Cálculo Diferencial",
                Descripcion: "Estudio de las derivadas y sus aplicaciones",
                },
            },
            {
                endpoint: "/gestionEscolar/horarios/1",
                expectedBody: {
                Id_Horarios: 1,
                Dia: "Lunes",
                Hora_Inicio: "08:00",
                Hora_Fin: "10:00",
                Aula: "Aula 101",
                Asignatura_Id: 1,
                Curso_Id: 1,
                Profesor_Id: 1,
                },
            },
            {
                endpoint: "/gestionEscolar/calificaciones/1",
                expectedBody: {
                Id_Calificacion: 1,
                Nota: 7.5,
                Fecha: "2024-05-10",
                Estudiante_Id: 1,
                Asignatura_Id: 1,
                },
            },
            {
                endpoint: "/gestionEscolar/asistencias/35",
                expectedBody: {
                Id_Asistencia: 1,
                Fecha: "2023-07-31",
                Asistio: true,
                Id_Estudiante: 35,
                Id_Horario: 15,
                },
            },
            {
                endpoint: "/gestionEscolar/materiales/12",
                expectedBody: {
                Id_Material: 1,
                Descripcion: "Presentación sobre la historia del arte",
                Tipo_Material: "PDF",
                URL: "https://www.museodelprado.es/en",
                Id_Curso: 12,
                },
            },
            {
                endpoint: "/gestionEscolar/actividadesExtracurriculares/23",
                expectedBody: {
                Id_Actividad: 1,
                Nombre: "Taller de teatro",
                Descripcion:"En este taller, los alumnos aprenderán técnicas básicas de actuación, improvisación y expresión corporal.",
                Fecha: "2024-06-10",
                Id_Profesor: 23,
                },
            },
            {
                endpoint: "/gestionEscolar/matriculas/27",
                expectedBody: {
                Id_Matricula: 1,
                Fecha_Matricula: "2024-06-03",
                Id_Estudiante: 27,
                Id_Curso: 39,
                },
            }
        ]
        specificPutTest.forEach((test) => { //se itera sobre specificPutTest el cual es una lista deobjetos que contiene info sobre diferentes pruebas PUT
            testPutEndpoint(test.endpoint, 200, test.expectedBody) //: Llama a la función testPutEndpoint para cada elemento de specificPutTests, pasando el endpoint, los updateData, el código de estado esperado (200) y el cuerpo de respuesta esperado.
        })
        //Pruebas para un ID inexistente
        it("deberia responder con un codigo 404 porque el estudiante con id especificado no existe", async () => {
            await request (server) //usando Supertest se realiza una solicuitud PUT al endpoint
            .put("/gestionEscolar/estudiantes/99")
            .send( { //envia los dato de actualizacion en el cuerpo de la solicitud
                Nombre: "Nonexistent",
                Apellido: "Student",
                Fecha_Nacimiento: "200-01-15",
                Direccion: "123 Main St, Nowhere, USA",
                Telefono: "555-9999",
                Email: "nonexistent.student@example.com",
            })
            .expect(404)
        })
        //prueba para FORMATO ID invalido
        it("deberia responder con un codigo 400 por formato de id invalido", async () => {
            await request(server)
                .put("/gestionEscolar/estudiantes/id-invalido")
                .send({
                    Nombre:"Invalid",
                    Apellido: "ID",
                    Fecha_Nacimiento: "2000-01-15",
                    Direccion: "123 Main St, Nowhere, USA",
                    Telefono: "555-9999",
                    Email: "invalid.id@example.com",
                })
                .expect(400)
                .expect((res) => {
                    expect(res.body).toEqual({
                        mensaje: "el formato del id es invalido"
                    })
                })
        }
        )
    })
    
})

