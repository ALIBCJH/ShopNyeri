import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Route for fetching all products
router.route("/").get(getProducts);

// Route for fetching a single product by ID
router.route("/:id").get(getProductById);

export default router;
