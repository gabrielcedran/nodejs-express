import {Router} from "express"

const router = Router()

/**
 * Product endpoints
 */
router.get("/products", () => {})
router.get("/products/:id", (id) => {})
router.post("/products", (id) => {})
router.put("/products/:id", () => {})
router.delete("/products/:id", () => {})

/**
 * Update endpoints
 */
router.get("/updates", () => {})
router.get("/updates/:id", (id) => {})
router.post("/updates", (id) => {})
router.put("/updates/:id", () => {})
router.delete("/updates/:id", () => {})


/**
 * Update point endpoints
 */
router.get("/update-points", () => {})
router.get("/update-points/:id", (id) => {})
router.post("/update-points", (id) => {})
router.put("/update-points/:id", () => {})
router.delete("/update-points/:id", () => {})
 
export default router