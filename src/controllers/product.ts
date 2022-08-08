import { Request, Response } from "express";
import ProductApi from "../apis/productApi";

export const productApi = new ProductApi('products');

class ProductController{
    static async createProduct(req:Request,res:Response){
        try {
            const product = req.body;
            const id = await productApi.createProduct(product);
            if(!id) return res.status(400).json({error:'Product not created'});
            res.status(201).json({product});
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }
    static async getProducts(req:Request,res:Response){
        try {
            const {id} = req.body
            const products = await productApi.getProducts(id||null);
            if(!products) return res.status(400).json({error:'Products not found'});
            res.status(200).json(products);
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }
    static async updateProduct(req:Request,res:Response){
        try {
            const {id, ...product} = req.body
            const updatedProduct = await productApi.updateProduct(id,product);
            if(!updatedProduct) return res.status(400).json({error:'Product not updated'});
            res.status(200).json(updatedProduct);
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }
    static async deleteProduct(req:Request,res:Response){
        try {
            const {id} = req.body
            const deletedProduct = await productApi.deleteProduct(id);
            if(!deletedProduct) return res.status(400).json({error:'Product not deleted'});
            res.status(200).json(deletedProduct);
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }
}

export default ProductController;