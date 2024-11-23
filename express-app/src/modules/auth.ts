import { User } from '@prisma/client'
import express from 'express'
import jwt from 'jsonwebtoken'

export const createJWT = (user: User) => {
    const token = jwt.sign(
        {id: user.id, username: user.username}, 
        process.env.JWT_SECRET!
    )

    return token
}

export const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET) as {id: string, username: string}
        
        req.user = user;

    } catch (e) {
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    next()
}