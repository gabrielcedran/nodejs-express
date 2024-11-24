import {Router} from "express"
import {body, validationResult} from 'express-validator'

const router = Router()

/**
 * Product endpoints
 */
router.get("/products", (req, res) => {
    res.json({message: "Test"})
})
router.get("/products/:id", (idreq, res) => {})
router.post("/products", (req, res) => {
    
})
router.put("/products/:id", body('name').isString().isLength({min: 4, max: 10}), (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400)
        res.json({errors: errors.array()})
        return
    }

    res.status(200)
    res.end()
})
router.delete("/products/:id", (req, res) => {})

/**
 * Update endpoints
 */
router.get("/updates", (req, res) => {})
router.get("/updates/:id", (req, res) => {})
router.post("/updates", (req, res) => {})
router.put("/updates/:id", (req, res) => {})
router.delete("/updates/:id", (req, res) => {})


/**
 * Update point endpoints
 */
router.get("/update-points", (req, res) => {})
router.get("/update-points/:id", (req, res) => {})
router.post("/update-points", (req, res) => {})
router.put("/update-points/:id", (req, res) => {})
router.delete("/update-points/:id", (req, res) => {})
 
export default router