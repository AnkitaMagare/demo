import { Request, Response } from "express";
import prisma from "../prisma";


export const createProduct = async (req: Request, res: Response) => {
    const { prd_name, category } = req.body;

    try {
        const product = await prisma.product.create({
        data: {prd_name, category}
    });
    res.status(201).json({product})
    }
    catch(error) {
        console.error("Error creating product:", error);
        res.status(500).json({error: 'failed to create product'})
    }
}

export const getAllProduct = async (req: Request, res: Response) => {

    try {
        const product = await prisma.product.findMany();
    res.status(201).json({product})
    }
    catch(error) {
        console.error("error creating product:", error);
        res.status(500).json({error: 'failed to create product'})
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        // if (isNaN(id)) {
        //     res.status(400).json({error: 'invalid product id'});
        //     return;
        // }
        const product = await prisma.product.findUnique({where: {id}});

        if (!product) {
            res.status(404).json({error: 'user not found'});
            return;
        }
        res.status(200).json({product});
    }
    catch(error) {
        res.status(500).json({error: 'failed to fetch product'});
        return;
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const {category} = req.body;                      
        
        
        // if (isNaN(id)) {
        //     res.status(400).json({'error': 'invlaid user id'});
        //     return;
        // }
        const user = await prisma.product.update({where:{id}, data: {category}}); 
        res.status(200).json(user);
        return;

        } catch (error) {
            res.status(500).json({ error: "product not found or update failed" });
            return;
        }
    }



export const deleteProduct = async (req: Request, res: Response) => {

    try{
    const id = Number(req.params.id);
    // if (isNaN(id)) {
    //     res.status(400).json({error: 'invlaid product id'});
    //     return;
    // }

    const productExists = await prisma.product.findUnique({
        where: {id},
    });

    if (!productExists) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }

    await prisma.product.delete({where: {id}});

    res.status(200).json({'message': 'product deleted'});
    }

    catch (error) {
        res.status(500).json({error: 'failed to fetch product'});
        return;
    }
}