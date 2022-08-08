import { Request, Response } from "express";
import { Product } from "../../types";
import CartApi from "../apis/cartApi";
import { productApi } from "./product";

const cartApi = new CartApi('carts');

class CartController{
    static async createCart(req:Request,res:Response){
        try {
            const cart = await cartApi.createCart();
            if(!cart) throw new Error('Cart not created');
            
            res.status(200).json(cart);
        } catch (err) {
            if(err instanceof Error){
                res.status(400).json({error:err.message});
            }
        }
    }
    static async getCart(req:Request,res:Response){
        try {
            const{cartId,} = req.body;
            const cart = await cartApi.getCart(cartId,);
            if(!cart) throw new Error('Cart not found');
            res.status(200).json(cart);
        } catch (err) {
            if(err instanceof Error){
                res.status(400).json({error:err.message});
            }
        }
    }
    static async addItems(req:Request,res:Response){
        try {            
            const{cartId,productId} = req.body;
            const item:Product = await productApi.getProducts(productId) as Product;
            if(!item) throw new Error('Product not found');
            const cart = await cartApi.addItems(cartId,item);
            if(!cart) throw new Error('Cart not found');
            res.status(200).json(cart);
        } catch (err) {
            if(err instanceof Error){
                res.status(400).json({error:err.message});
            }
        }
    }
    static async removeItems(req:Request,res:Response){
        try {            
            const{cartId,itemId} = req.body;
            const message = await cartApi.removeItems(cartId,itemId);
            res.status(200).json(message);
        } catch (err) {
            if(err instanceof Error){
                res.status(400).json({error:err.message});
            }
        }
    }
    static async getCartItems(req:Request,res:Response){
        try {
            const{cartId} = req.body;
            const cart = await cartApi.getCartItems(cartId);
            if(!cart) throw new Error('Cart not found');
            res.status(200).json(cart);
        } catch (err) {
            if(err instanceof Error){
                res.status(400).json({error:err.message});
            }
        }
    }
    static async updateCartItem(req:Request,res:Response){
        try {
            const{cartId,itemId,quantity} = req.body;            
            const message = await cartApi.updateCartItem(cartId,itemId,quantity);
            if(!message) throw new Error('item not updated');
            res.status(200).json(message);
        } catch (err) {
            if(err instanceof Error){
                res.status(400).json({error:err.message});
            }
        }
    }
}
export default CartController;