import app from '../config/server.config.js';
import request from 'supertest';


const GLOBAL_ROUTE = "/api/inventory/employee";

const query = {
    name: 'Rayyan',
    lastName: 'Arnold',
    ci: 9654752
}


describe("prove the right functionality of the employee endpoint", () => {
    test("should return a 200 status when run the get method of employee endpoint", async() => {
        await request(app)
        .get(GLOBAL_ROUTE)
        .send()
        .then(res => {
            expect(res.statusCode).toBe(200);
        })
    });

    test("should create a new employee with the name `Rayyan Arnold` and ci 9654752", async() => {
        const response = await request(app)
            .post(GLOBAL_ROUTE)
            .send(query);
        expect(response.body.name).toEqual("Rayyan");
        expect(response.body.lastName).toEqual("Arnold");
        expect(response.body.ci).toEqual("9654752");
    });



    test("change the visibility of a employee to false", async() => {
        await request(app)
            .put(`${GLOBAL_ROUTE}/query`)
            .send(query)
            .then(res => {
                expect(res.body.isVisible).toEqual(false);
            })
    });

    test("should not find the employee created before because it is deleted", async() => {
        await request(app)
            .delete(`${GLOBAL_ROUTE}/query`)
            .send(query)
            .then(res => {
                expect(res.text).toEqual(`This employee was deleted`);
            })
    });
});