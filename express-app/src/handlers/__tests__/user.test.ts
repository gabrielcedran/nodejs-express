import * as user from '../user'
import express from 'express' 

describe("user handler", () => {
    it("should create a new user", async () => {
        const req = { body: {username: "don", password: "bob"} } as express.Request
        const res = { json({token}: {token: string}) {
            expect(token).toBeTruthy()
        }} as express.Response


        await user.createUser(req, res)
    })
})