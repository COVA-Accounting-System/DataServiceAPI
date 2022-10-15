import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import client from "../routes/client.route.js";
import employee from "../routes/employee.route.js";
import product from "../routes/product.route.js";
import provider from "../routes/provider.route.js";
import raw_material from "../routes/raw_material.route.js";
import order from "../routes/order.route.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import "../config/database.config.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
  res.json({ message: `welcome to inventory-api` });
});

app.use("/api/inventory/client", verifyToken, client);
app.use("/api/inventory/employee", verifyToken, employee);
app.use("/api/inventory/product", verifyToken, product);
app.use("/api/inventory/provider", verifyToken, provider);
app.use("/api/inventory/raw_material", verifyToken, raw_material);
app.use("/api/inventory/order", verifyToken, order);

export default app;
