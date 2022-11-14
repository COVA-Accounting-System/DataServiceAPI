import app from '../config/server.config.js'
import request from 'supertest'

const GLOBAL_ROUTE = '/api/inventory/provider'
const query = {
  storeName: 'Casa Ortiz',
  city: 'Cochabamba',
  nit: 4673819289
}

describe('Prove the right functionality of the provider endpoint', () => {
  test('should return a 200 status to prove the right functionlality of the endpoint provider', async () => {
    await request(app)
      .get(GLOBAL_ROUTE)
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test("Should create a new product with the name 'Casa Ortiz' the city 'Cochabamba and the nit '4673819289'", async () => {
    await request(app)
      .post(GLOBAL_ROUTE)
      .send(query)
      .then((res) => {
        expect(res.body.storeName).toEqual('Casa Ortiz')
        expect(res.body.city).toEqual('Cochabamba')
        expect(res.body.nit).toEqual(4673819289)
      })
  })

  test('Should change the visibility of a provider to false', async () => {
    await request(app)
      .put(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.body.isVisible).toEqual(false)
      })
  })

  test('Should not find the provider created before because it is deleted', async () => {
    await request(app)
      .delete(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.text).toEqual('This provider was deleted')
      })
  })
})
