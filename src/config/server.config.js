import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import client from "../routes/client.route.js"
import employee from "../routes/employee.route.js"
import product from "../routes/product.route.js"

const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({extended: false}));

//routes
app.get("/", (req, res)=>{
    res.json({message: `welcome to inventory-api`});
});

app.use("/api/inventory/client", client);
app.use("/api/inventory/employee", employee);
app.use("/api/inventory/product", product);


export default app;