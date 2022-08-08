import fs from 'fs/promises'
import { Product, ProductFile } from '../../types';

const initialFile = {
    nextId: 1,
    data: []
}

class ProductApi{
    fileName:string;
    filePath:string;
    file:ProductFile = initialFile;
    
    constructor(fileName:string,fileExt = 'txt'){
        this.fileName = fileName;
        this.filePath = `./src/data/${fileName}.${fileExt}`;
    };

    async getFile(){
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            if(!data) throw new Error('No data');
            this.file = JSON.parse(data);   
        } catch (err) {
            if(err instanceof Error){
                err.name==='Error' && await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2));
                console.log(err.message);
            }
        };
    }

    async createProduct(product:Product){
        try {
            await this.getFile();
            product.id=this.file.nextId;
            product.timestamp = Date.now();
            this.file.data.push(product);
            this.file.nextId++;
            await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2));
            return product.id
        } catch (err) {
            console.log(err);
            return null
        }
    };
    async getProducts(id:number|null=null){
        try {
            await this.getFile();
            if(!id) return this.file.data;
            const product = this.file.data.find(product=>product.id===id);
            if(!product) throw new Error('Product not found');
            return product;
        } catch (err) {
            console.log(err);
            return null
        }
    };
    async updateProduct(id:number,product:Omit<Partial<Product>,'id'>){
        try {
            await this.getFile();
            let index:number|null = null;
            this.file.data = this.file.data.map((p,idx)=>{
                if(p.id===id){
                    index = idx
                    return{
                        ...p,
                        ...product,
                        id
                    }
                }
                return p
            });
            if(index == null) throw new Error('Product not found');
            await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2),'utf-8');
            return this.file.data[index];
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async deleteProduct(id:number){
        try {
            await this.getFile();
            let deletedProduct:Product|null = null;
            this.file.data = this.file.data.filter(p=>{
                if(p.id===id){
                    deletedProduct = p
                    return false;
                }
                return true
            });
            if(!deletedProduct) throw new Error('Product not found');
            await fs.writeFile(this.filePath, JSON.stringify(this.file, null, 2),'utf-8');
            return deletedProduct;
        } catch (err) {
            console.log(err);
            return null
        }
    }
}

export default ProductApi