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
            client: client,
            stateCounter: 3
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
            client: client.body,
            stateCounter: 2})
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
            client: client.body,
            stateCounter: 1
        })
        .then(res => {
            expect(res.body.client.name).toEqual("Juan");
        })
    });

    test("Get an existent order and change its state", async() => {
        const client = await request(app)
        .get(`${GLOBAL_ROUTE_CLIENT}/query`)
        .send({
            name: "Juan",
            lastName: "Gonzales",
            inDebt: 1000
        });
        expect(client.body.name).toEqual("Juan");


        const order = await request(app)
        .post(GLOBAL_ROUTE_ORDER)
        .send({
            client: client.body,
            stateCounter: 1
        });
        expect(order.body.stateCounter).toEqual(1);

        
        await request(app)
        .put(`${GLOBAL_ROUTE_ORDER}/changeStateFordward`)
        .send({
            _id: order.body._id
        })
        .then(res => {
            expect(res.body.stateCounter).toEqual(2);
        })

        await request(app)
        .put(`${GLOBAL_ROUTE_ORDER}/changeStateBackward`)
        .send({
            _id: order.body._id
        })
        .then(res => {
            expect(res.body.stateCounter).toEqual(1);
        })

    });
});