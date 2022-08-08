import { NextFunction, Request, Response } from "express";

const formatData = (req:Request,res:Response,next:NextFunction) => {
    let formatBody:any = {};
    
    if(Object.keys(req.params).length){
        const keys = ['itemId','cartId','productId','id'];
        keys.forEach(key => {
            if(req.params[key]){
                formatBody[key] = parseInt(req.params[key]);
            }
        });
    }
    if( req.baseUrl.includes('api/products') && req.method==='POST' || req.method==='PUT'){
        const keys = ['name','description','code','price','photoUrl','stock'];
        try {
            keys.forEach(key => {
                let value = req.body[key];
                if(!value) {
                    if(req.method==='POST') throw new Error(`Missing ${key} in body`);
                    return;
                };
                if(key === 'price'){
                    value = parseFloat(value);
                    if(isNaN(value)) throw new Error(`Invalid ${key} in body`);
                }
                if(key === 'stock'){
                    value = parseInt(value);
                    if(isNaN(value)) throw new Error(`Invalid ${key} in body`);
                }
                formatBody[key] = value;
            });
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }
    if(req.baseUrl.includes('api/carts') && req.method==='POST'){
        const keys = ['productId'];
        try {
            keys.forEach(key => {
                let value = req.body[key];
                if(!value) {
                    if(req.method==='POST') throw new Error(`Missing ${key} in body`);
                    return;
                };
                if(key === 'quantity'){
                    value = parseInt(value);
                    if(isNaN(value)) throw new Error(`Invalid ${key} in body`);
                }
                formatBody[key] = value;
            });
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }
    if( req.baseUrl.includes('api/carts') && req.method==='DELETE'){
        const keys = ['cartId','itemId'];
        try {
            keys.forEach(key => {
                let value = req.params[key];
                if(!value) {
                    throw new Error(`Missing ${key} in params`);
                };
                formatBody[key] = parseInt(value);
            });
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }
    if( req.baseUrl.includes('api/carts') && req.method==='POST' || req.method==='PUT'){
        const keys = req.method=='POST'?['productId']:['quantity','cartId','itemId'];
        try {
            keys.forEach(key => {
                let value = req.body[key];
                if(!value) {
                    if(req.method==='POST') throw new Error(`Missing ${key} in body`);
                    return;
                };
                if(key === 'quantity' || key === 'cartId' || key === 'itemId'){
                    value = parseInt(value);
                    if(isNaN(value)) throw new Error(`Invalid ${key} in body`);
                }
                formatBody[key] = value;
            });
        } catch (err) {
            console.log(err);
            if(err instanceof Error) return res.status(400).json({error:err.message});
        }
    }

    req.body = formatBody;    
    next();
}

export default formatData;