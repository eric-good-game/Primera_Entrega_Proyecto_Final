import { Router } from "express";
import CartController from "../controllers/cart";
import formatData from "../middleware/formatData";

const routerCarts = Router();

routerCarts
    .get('/:cartId', formatData, CartController.getCart)
    .get('/:cartId/products', formatData, CartController.getCartItems)
    .post('/', CartController.createCart)
    .post('/:cartId/products', formatData, CartController.addItems)
    .put('/:cartId/products/:itemId', formatData, CartController.updateCartItem)
    .delete('/:cartId/products/:itemId', formatData, CartController.removeItems)

export default routerCarts;