import app from '../config/server.config.js'
import request from 'supertest'

const GLOBAL_ROUTE = '/api/inventory/client'

const query = {
  name: 'Juan',
  lastName: 'Peredo',
  inDebt: 5000
}

describe('prove the right functionality of the client endpoint', () => {
  test('should return a 200 status when run the get method of client endpoint', async () => {
    await request(app)
      .get(GLOBAL_ROUTE)
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('should create a new client with the name `Juan Peredo` and in debt 5000', async () => {
    const response = await request(app).post(GLOBAL_ROUTE).send(query)
    expect(response.body.name).toEqual('Juan')
    expect(response.body.lastName).toEqual('Peredo')
    expect(response.body.inDebt).toEqual(5000)
  })

  test('change the visibility of a client to false', async () => {
    await request(app)
      .put(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.body.isVisible).toEqual(false)
      })
  })

  test('should not find the client created before because it is deleted', async () => {
    await request(app)
      .delete(`${GLOBAL_ROUTE}/query`)
      .send(query)
      .then((res) => {
        expect(res.text).toEqual('This client was deleted')
      })
  })
})
