// import app from "../config/server.config.js"
import _clientService from "../services/client.service.js";
import {Router} from "express";

const router = Router();
const clientService = new _clientService();


router.get('/', async (req, res) => {
    try{
        var clients = await clientService.getClients();
        res.json(clients);
    }
    catch(error){
        console.error(error);
    }
});

router.post('/', async(req, res)=>{
    try{
        var newClient = await clientService.createClient(req);
        res.json(newClient);
    }
    catch(error){
        console.error(error);
    }
});



export default router;