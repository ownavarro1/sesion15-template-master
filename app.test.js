import request from "supertest";
import app from "./app.js"


describe ("POST /users", () => {
    // caso de exito -  Cuando se recibe usuario y contraseña validos
    describe ("given a username and password", () => {
    // Se debe guardar el usuario y la contraseña recibidos en la db
      test("should respond with a 200 status code", async ( ) => {
        const response = await request (app).post("/users").send({
            username:"username",
            password:"password",
        });
        // se debe responder con status 200
        expect(response.statusCode).toBe(200);
      
    });

    // Se debe responder con un objeto json que retorne el id del usuario creado
    test ("should specify json in the content type header", async () => {
        const response = await request (app).post("/users").send ({
            username:"username",
            password:"password",

        });
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
       });

       // Se retorna el userId
       test("response has userId", async () => {
        const response = await request(app).post("/users").send({
        username:"username",
        password:"password",
        });
        expect(response.body.userId).toBeDefined();
       });  
       });

       // Caso de error Cuando no se recibe el usuario y contraseña
       describe ("when the username and password is missing",() => {
        // se debe retornar un error, status 400
        test("should respond with a status code of 400", async () => {
            const bodyData = [{username:"username"}, {password:"password"
        }, {}];
       for (const body of bodyData) {
            const response = await request(app).post("/users").send(body);
            expect(response.statusCode).toBe(400); 
        }
         });
       });
    });