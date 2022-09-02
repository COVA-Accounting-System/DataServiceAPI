import _orderService from "../services/order.service.js";
import Route from "express";

const router = Route();
const orderService = new _orderService();

router.get("/", async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = await orderService.createOrder(req);
    res.json(newOrder);
  } catch (err) {
    console.error(err);
  }
});

router.put("/changeStateBackward", async (req, res) => {
  try {
    const newOrder = await orderService.changeStateBackward(req);
    res.json(newOrder);
  } catch (err) {
    console.error(err);
  }
});

router.put("/changeStateFordward", async (req, res) => {
  try {
    const newOrder = await orderService.changeStateFordward(req);
    res.json(newOrder);
  } catch (err) {
    console.error(err);
  }
});

export default router;
