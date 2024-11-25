import {Router} from "express"
import {body, validationResult} from 'express-validator'
import { handleInputErrors } from "./modules/middlewares"
import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./handlers/product"
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from "./handlers/update"

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
router.get("/updates", getUpdates)
router.get("/updates/:id", getUpdate)
router.post("/updates", 
    body('productId').exists().isString(),
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']), 
    body('version').optional().isString(), 
    handleInputErrors, 
    createUpdate)
router.put("/updates/:id", 
    body('productId').exists().isString(),
    body('title').optional().isString(), 
    body('body').optional().isString(), 
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']), 
    body('version').optional().isString(), 
    handleInputErrors, 
   updateUpdate)
router.delete("/updates/:id", deleteUpdate)


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