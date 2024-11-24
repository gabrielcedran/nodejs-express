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
            belongsToId: req.user!.id
        }
    })
    res.json({data: product})
}