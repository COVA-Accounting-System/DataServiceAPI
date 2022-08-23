import app from "../config/server.config.js"
import request from "supertest"


const GLOBAL_ROUTE = "/api/inventory/client";

describe("prove the right functionality of the client endpoint", () => {
    test("should return a 200 status when run the get method of client endpoint", async() => {
        const response = await request(app)
            .get(GLOBAL_ROUTE)
            .send();
        expect(response.statusCode).toBe(200);
        // console.log(response)
    })

    test("should create a new client with the name `Juan Peredo` and in debt 5000", async() => {
        const response = await request(app)
            .post(GLOBAL_ROUTE)
            .send({
                name: "Juan",
                lastName: "Peredo",
                inDebt: 5000
            });
        expect(response.body.name).toEqual("Juan");
        expect(response.body.lastName).toEqual("Peredo");
        expect(response.body.inDebt).toEqual("5000");
    })

    test("change the visibility of a client to false", async() => {
        const response = await request(app)
            .post()
            .
    })
});