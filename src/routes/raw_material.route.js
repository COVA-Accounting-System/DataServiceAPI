import {Router} from "express";
import _rawMaterialService from "../services/raw_material.service.js"

const router = Router();
const rawMaterialService = new _rawMaterialService();

router.get('/', async(req, res) => {
    try{
        const rawMaterials = await rawMaterialService.getRawMaterials();
        res.json(rawMaterials);
    }
    catch(err){
        console.error(err);
    }
});

router.post('/', async (req, res) => {
    try{
        const newRawMaterial = await rawMaterialService.createRawMaterial(req);
        res.json(newRawMaterial);
    }
    catch(err){
        console.error(err);
    }
});

export default router;