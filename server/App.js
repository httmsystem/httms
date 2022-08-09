import path from "path";

import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import "colors";

import requisition_slip_routes from "./routes/requisition_slip_routes.js";
import suppliers_routes from "./routes/suppliers_routes.js";
import user_routes from "./routes/user_routes.js";
import customer_routes from "./routes/customer_routes.js";
import gds_routes from "./routes/gds_routes.js";
import acr_routes from "./routes/acr_routes.js";
import receipt_routes from "./routes/receipt_routes.js";
import payment_routes from "./routes/payment_routes.js";
import adjustment_routes from "./routes/adjustment_routes.js";
import product_service_deploy_routes from "./routes/product_service_deploy_routes.js";
import invoice_routes from "./routes/invoice_routes.js";
import release_routes from "./routes/release_routes.js";
import liquidation_routes from "./routes/liquidation_routes.js";
import bank_routes from "./routes/bank_routes.js";
import utility_routes from "./routes/utility_routes.js";

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/requisition_slip", requisition_slip_routes);
app.use("/api/suppliers", suppliers_routes);
app.use("/api/users", user_routes);
app.use("/api/customer", customer_routes);
app.use("/api/gds", gds_routes);
app.use("/api/acr", acr_routes);
app.use("/api/receipt", receipt_routes);
app.use("/api/payment", payment_routes);
app.use("/api/adjustment", adjustment_routes);
app.use("/api/psd", product_service_deploy_routes);
app.use("/api/invoice", invoice_routes);
app.use("/api/release", release_routes);
app.use("/api/liquidation", liquidation_routes);
app.use("/api/utility", utility_routes);
app.use("/api/bank", bank_routes);


// Serve Client
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API Running"));
}

app.use(errorHandler);

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);
