import fs from 'fs/promises';
import { Cart, CartFile, Product } from '../../types';
const initialFile = {
    nextId: 1,
    data: []
};
class CartApi{
    fileName:string;
    filePath:string;
    file:CartFile = initialFile;
    
    constructor(fileName:string,fileExt = 'txt'){
        this.fileName = fileName;
        this.filePath = `./src/data/${fileName}.${fileExt}`;
    }
    async getFile(){
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            if(!data) throw new Error('No data');
            this.file = JSON.parse(data);   
        } catch (err) {
            if(err instanceof Error){
                err.name==='Error' && await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2),'utf-8');
                console.log(err.message);
            }
        };
    }
    async createCart(){
        try {
            await this.getFile();
            const cart:Cart = {
                id:this.file.nextId,
                timestamp: Date.now(),
                items:[],
                totalItems:0
            }
            this.file.data.push(cart);
            this.file.nextId++;
            await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2));
            return cart
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async getCartItems(cartId:number){
        try {
            await this.getFile();
            const cart = this.file.data.find(cart => cart.id === cartId);
            if(!cart) throw new Error('Cart not found');
            return cart.items
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async getCart(cartId:number){
        try {
            await this.getFile();
            const cart = this.file.data.find(cart=>cart.id===cartId);
            if(!cart) throw new Error('Cart not found');
            return cart;
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async addItems(cartId:number,newItem:Product){
        try {
            await this.getFile();
            const cart = this.file.data.find(cart=>cart.id===cartId);
            if(!cart) throw new Error('Cart not found');
            let exist = false;
            cart.items = cart.items.map(item=>{
                if(item.id===newItem.id){
                    exist = true;
                    item.quantity++;
                }
                return item;
            })
            cart.totalItems++;
            if(!exist) cart.items.push({...newItem,quantity:1});
            await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2));
            return cart;
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async removeItems(cartId:number,itemId:number){        
        try {
            await this.getFile();
            let remove = false;
            
            this.file.data = this.file.data.map(cart=>{                
                if(cart.id===cartId){                    
                    const length = cart.items.length;
                    cart.items = cart.items.filter(item=>item.id!==itemId);
                    remove = length!==cart.items.length;
                    cart.totalItems -= 1;
                    return cart;
                }
                return cart;
            })
            if(!remove) throw new Error('Item not found');
            await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2));
            return `Item with id (${itemId}) removed`;
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return err.message;
        }
    }
    async updateCartItem(cartId:number,itemId:number,quantity:number){
        try {
            await this.getFile();
            let update = false;
            this.file.data = this.file.data.map(cart=>{
                if(cart.id===cartId){
                    cart.items = cart.items.map(item=>{
                        if(item.id===itemId){
                            update = true;
                            item.quantity += quantity;
                            cart.totalItems += quantity;
                        }
                        return item;
                    })
                }
                return cart;
            })
            if(!update) throw new Error('Item not found');
            await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2));
            return `Item with id (${itemId}) updated`;
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return err.message;
        }
    }
}

export default CartApi;