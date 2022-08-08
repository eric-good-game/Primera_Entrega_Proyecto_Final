import { NextFunction, Request, Response, Router } from "express";
import routerCarts from "./carts";
import routerProducts from "./products";

const routerIndex = Router();

// routerIndex.get("/", (req:Request, res:Response) => {
//     res.sendFile("index.html");
// });
routerIndex
    .use("/api/products", routerProducts)
    .use("/api/carts", routerCarts)
    .use("*", (req:Request, res:Response) => {res.status(404).json({error:-2,description:`Ruta ${req.originalUrl} método ${req.method} no implementada`})})
    .use((err:Error, req:Request, res:Response) => {res.status(500).send(err.message)});
    
export default routerIndex;