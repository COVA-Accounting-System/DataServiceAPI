import {Router} from "express"
import _providerService from "../services/provider.service.js"

const router = Router();
const providerService = new _providerService();

router.get('/', async(req, res)=>{
    try{
        const providers = await providerService.getProviders();
        res.json(providers);
    }
    catch(err){
        console.error(err);
    }
});

router.post('/', async(req, res)=>{
    try{
        const newProvider = await providerService.createProviders(req);
        res.json(newProvider);
    }
    catch(err){
        console.error(err);
    }
});

export default router;