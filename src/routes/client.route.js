// import app from "../config/server.config.js"
import _clientService from "../services/client.service.js";
import { Router } from "express";


const router = Router();
const clientService = new _clientService();

router.get("/", async (req, res) => {
  try {
    const clients = await clientService.getClients(req);
    res.json(clients);
  } catch (error) {
    console.error(error);
  }
});

router.get("/query", async (req, res) => {
  try {
    const client = await clientService.getClient(req);
    res.json(client);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newClient = await clientService.createClient(req);
    res.json(newClient);
  } catch (error) {
    console.error(error);
  }
});

router.put("/delete", async (req, res) => {
  try {
    const client = await clientService.updateClientVisibility(req);
    res.json(client);
  } catch (err) {
    console.error(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const client = await clientService.updateClient(req);
    res.json(client);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await clientService.deleteClient(req);
    res.send("This client was deleted");
  } catch (err) {
    console.error(err);
  }
});


export default router;
