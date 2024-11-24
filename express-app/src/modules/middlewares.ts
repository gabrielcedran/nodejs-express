import { validationResult } from "express-validator"
import express from "express"

export const handleInputErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400)
        res.json({errors: errors.array()})
    } else {
        next()
    }
}