import app from '../server'
import supertest from 'supertest'

describe("GET /", () => {
    it("should return some data", async () => {
        const response = await supertest(app).get('/')

        expect(response.body.ourSecret).toBe("donbob")
    })
})