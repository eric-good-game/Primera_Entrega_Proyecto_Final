import { NextFunction, Request, Response } from "express";

const isAdmin = (req:Request,res:Response,next:NextFunction) => {

    // if(req.user?.isAdmin) return next();
    if(req.body.isAdmin) return next();

    // res.status(401).json({error:'Unauthorized'});
    // res.status(401).json({error:-1,description:'Unauthorized'});
    res.status(401).json({error:-1,description:`Ruta ${req.originalUrl} método ${req.method} no autorizada`});

}

export default isAdmin;