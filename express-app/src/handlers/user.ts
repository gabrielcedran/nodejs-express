import { comparePassword, createJWT, hashPassword } from '../modules/auth'
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

export const signIn = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })

        if (!user || !await comparePassword(req.body.password, user.password)) {
            res.status(401)
            res.json({message: 'unauthorized'})
            return
        }

        const token = createJWT(user)
        res.json({ token })  
    } catch (e: any) {
        // in reality, we'd inspect the exception to determine the reason
        e.type = 'input'
        next(e)
    }
}