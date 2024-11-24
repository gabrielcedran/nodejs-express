import {Router} from "express"
import {body, validationResult} from 'express-validator'
import { handleInputErrors } from "./modules/middlewares"
import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./handlers/product"

const router = Router()

/**
 * Product endpoints
 */
router.get("/products", getProducts)
router.get("/products/:id", getProduct)
router.post("/products", 
    body('name').isString().isLength({min: 4, max: 50}), 
    handleInputErrors, 
    createProduct
)
router.put("/products/:id", 
    [body('name').isString().isLength({min: 4, max: 50}), handleInputErrors], 
    updateProduct
)
router.delete("/products/:id", deleteProduct)

/**
 * Update endpoints
 */
router.get("/updates", (req: express.Request, res: express.Response) => {})
router.get("/updates/:id", (req: express.Request, res: express.Response) => {})
router.post("/updates", 
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']), 
    body('version').optional().isString(), 
    handleInputErrors, 
    (req: express.Request, res: express.Response) => {})
router.put("/updates/:id", 
    body('title').optional().isString(), 
    body('body').optional().isString(), 
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']), 
    body('version').optional().isString(), 
    handleInputErrors, 
    (req: express.Request, res: express.Response) => {})
router.delete("/updates/:id", (req: express.Request, res: express.Response) => {})


/**
 * Update point endpoints
 */
router.get("/update-points", (req: express.Request, res: express.Response) => {})
router.get("/update-points/:id", (req: express.Request, res: express.Response) => {})
router.post("/update-points", 
    body('name').exists().isString(),
    body('description').exists().isString(),
    handleInputErrors,
    (req: express.Request, res: express.Response) => {})
router.put("/update-points/:id", 
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors,
    (req: express.Request, res: express.Response) => {})
router.delete("/update-points/:id", (req: express.Request, res: express.Response) => {})
 
export default router