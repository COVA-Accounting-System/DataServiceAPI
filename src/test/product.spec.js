import app from '../config/server.config.js'
import request from 'supertest'

const GLOBAL_ROUTE = '/api/inventory/product'
const query = {
  name: 'Modelo cruzado',
  description: 'Chinela',
  unitPrice: 100
}

describe('Prove the right functionality of the product endpoint', () => {
  test('should return a 200 status to prove the right functionlality of the endpoint product', async () => {
    await request(app)
      .get(GLOBAL_ROUTE)
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test("Should create a new product with the name 'Modelo cruzado and the description 'Chinela", async () => {
    await request(app)
      .post(GLOBAL_ROUTE)
      .send(query)
      .then((res) => {
        expect(res.body.name).toEqual('Modelo cruzado')
        expect(res.body.description).toEqual('Chinela')
      })
  })

  test('Should change the visibility of a product to false', async () => {
    await request(app)
      .put(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.body.isVisible).toEqual(false)
      })
  })

  test('Should not find the product created before because it is deleted', async () => {
    await request(app)
      .delete(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.text).toEqual('This product was deleted')
      })
  })
})
