import app from '../config/server.config.js';
import request from 'supertest';
import {Client} from "../models/client.model.js";

const GLOBAL_ROUTE_ORDER = "/api/inventory/order";
const GLOBAL_ROUTE_CLIENT = "/api/inventory/client";


const client = new Client({
    name: "Dane",
    lastName: "Simons",
    inDebt: 2000
});

describe("prove the right functionality of the order endpoint", () => {
    test("Create an order and return it correctly", async () => {
        await request(app)
        .post(GLOBAL_ROUTE_ORDER)
        .send({
            client: client
        })
        .then(res => {
            console.log(res.body);
        })
    });

    test("Create a client, return it and create an order with that client", async () => {
        const client = await request(app)
        .post(GLOBAL_ROUTE_CLIENT)
        .send({
            name: 'Zain',
            lastName: 'Kerr',
            inDebt: 1000
        });
        expect(client.body.name).toEqual("Zain");

        await request(app)
        .post(GLOBAL_ROUTE_ORDER)
        .send({
            client: client.body})
        .then(res => {
            console.log(res.body)
            expect(res.body.client.name).toEqual("Zain");
        })
    });

    test("Get a existent client and create an order with it", async() => {
        const client = await request(app)
        .get(`${GLOBAL_ROUTE_CLIENT}/query`)
        .send({
            name: "Juan",
            lastName: "Gonzales",
            inDebt: 1000
        });

        expect(client.body.name).toEqual("Juan");
        await request(app)
        .post(GLOBAL_ROUTE_ORDER)
        .send({
            client: client.body
        })
        .then(res => {
            expect(res.body.client.name).toEqual("Juan");
        })
    });

    test
})