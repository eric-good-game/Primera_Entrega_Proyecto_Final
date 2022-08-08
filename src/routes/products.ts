import { Router } from "express";
import ProductController from "../controllers/product";
import formatData from "../middleware/formatData";
import isAdmin from "../middleware/isAdmin";

const routerProducts = Router();

routerProducts
    .get('/:id?', formatData, ProductController.getProducts)
    .post('/', isAdmin, formatData, ProductController.createProduct)
    .put('/:id', isAdmin, formatData, ProductController.updateProduct)
    .delete('/:id', isAdmin, formatData, ProductController.deleteProduct)

export default routerProducts;