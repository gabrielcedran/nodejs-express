import express from "express"
import prisma from "../modules/db"

export const getProducts = async (req: express.Request, res: express.Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user!.id
        },
        include: {
            products: true,
        }
    })

    res.json({data: user!.products})
}

export const getProduct = async (req: express.Request, res: express.Response) => {
    const id = req.params.id

    const product = await prisma.product.findUnique({
        where: {
            id,
            belongsToId: req.user!.id,
        }
    })
    res.json({data: product})
}

export const createProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    try {
        // considering everything has been properly validated by express validator, the most likely error to occurr is db related (e.g lost connection)
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user!.id
            }
        })

        res.json({data: product})
    } catch(e) {
        next(e)
    }
}

export const updateProduct = async (req: express.Request, res: express.Response) => { 
    const updated = await prisma.product.update({
        data: {
            name: req.body.name
        },
        where: {
            id: req.params.id,
            belongsToId: req.user!.id
        }
    })

    res.json({data: updated})
}

export const deleteProduct = async (req: express.Request, res: express.Response) => { 
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user!.id
        }
    })

    res.json({data: deleted})
}