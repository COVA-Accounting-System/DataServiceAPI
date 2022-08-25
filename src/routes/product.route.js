import {Router} from "express"
import _productService from "../services/product.service.js"


const router = Router();
const productService = new _productService();

router.get('/', async(req, res)=>{
    try{
        const products = await productService.getProducts();
        res.json(products);
    }
    catch(err){
        console.error(err);
    }
});

router.post('/', async(req, res)=>{
    try{
        const newProduct = await productService.createProduct(req);
        res.json(newProduct);
    }
    catch(err){
        console.error(err);
    }
});

router.put('/query', async(req, res) => {
    try{
        const product = await productService.updateProductVisibility(req);
        res.json(product);
    }
    catch (err){
        console.error(err);
    }
});

router.delete('/query', async(req, res) => {
    try{
        await productService.deleteProduct(req);
        res.send('This product was deleted');
    }
    catch (err){
        console.error(err);
    }
});


export default router;