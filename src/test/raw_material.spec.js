import app from '../config/server.config.js'
import request from 'supertest'

const GLOBAL_ROUTE = '/api/inventory/raw_material'
const query = {
  name: 'Cuero',
  amount: '100',
  unit: 'pies'
}

describe('Prove the right functionality of the raw_material endpoint', () => {
  test('should return a 200 status to prove the right functionlality of the endpoint raw_material', async () => {
    await request(app)
      .get(GLOBAL_ROUTE)
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test("Should create a new product with the name 'Cuero' the amount '100' and the unit 'pies'", async () => {
    await request(app)
      .post(GLOBAL_ROUTE)
      .send(query)
      .then((res) => {
        expect(res.body.name).toEqual('Cuero')
        expect(res.body.amount).toEqual('100')
        expect(res.body.unit).toEqual('pies')
      })
  })

  test('Should change the visibility of a raw_material to false', async () => {
    await request(app)
      .put(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.body.isVisible).toEqual(false)
      })
  })

  test('Should not find the raw_material created before because it is deleted', async () => {
    await request(app)
      .delete(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.text).toEqual('This raw material was deleted')
      })
  })
})
