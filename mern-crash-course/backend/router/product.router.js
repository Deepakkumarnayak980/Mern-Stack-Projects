import express from "express";

import { createProduct, detelProduct, getProduct, updatedProduct } from "../controller/product.controller.js";

const router = express.Router();



/* ================= GET ALL PRODUCTS ================= */
router.get("/",getProduct );

/* ================= CREATE PRODUCT ================= */
router.post("/", createProduct);

/* ================= UPDATE PRODUCT ================= */
router.put("/:id", updatedProduct);

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", detelProduct);

export default router;
