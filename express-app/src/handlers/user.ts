import { createJWT, hashPassword } from '../modules/auth'
import prisma from '../modules/db'
import express from 'express'

export const createUser = async (req: express.Request, res: express.Response) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
        }
    })

    const token = createJWT(user)
    res.json({ token })
}