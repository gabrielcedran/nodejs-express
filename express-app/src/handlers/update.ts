import express from "express"
import prisma from "../modules/db"

export const getUpdates = async (req: express.Request<{}, {}, {}, {productId: string}>, res: express.Response) => {
    const updates = await prisma.update.findMany({
        where: {
            productId: req.query.productId,
            product: {
                belongsToId: req.user!.id
            }
        }
    })
    res.json({data: updates})
}

export const getUpdate = async (req: express.Request, res: express.Response) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id,
            product: {
                belongsToId: req.user!.id,
            }
        }
    })

    res.json({data: update})
}

export const createUpdate = async (req: express.Request, res: express.Response) => { 
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId,
            belongsToId: req.user!.id,
        }
    })
    if (!product) {
        res.status(403)
        res.json({message: "unauthorized!"})
        return
    }
    const update = await prisma.update.create({
        data: {
            productId: req.body.productId,
            title: req.body.title,
            body: req.body.body,
            status: req.body.satus,
            version: req.body.version,
        },
    })

    res.json({data: update})
}

export const updateUpdate = async (req: express.Request, res: express.Response) => { 
    
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
            belongsToId: req.user!.id,
            updates: {
                some: {
                    id: req.params.id
                }
            }
        }
    })

    if (!product) {
        res.status(403)
        res.json({message: "unauthorized!"})
        return
    }

    const update = await prisma.update.update({
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.satus,
            version: req.body.version,
        },
        where: {
            id_productId: {
                id: req.params.id,
                productId: req.body.productId,
            }
        }
    })

    res.json({data: update})
}

export const deleteUpdate = async (req: express.Request, res: express.Response) => { 
    const update = await prisma.update.delete({
        where: {
            id: req.params.id,
            product: {
                belongsToId: req.user!.id
            }
        }
    })
    res.json(update)
}
