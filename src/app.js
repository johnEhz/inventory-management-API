import express from "express";
import morgan from "morgan";
import pk_data from "../package.json";
import cors from "cors";

//ROUTES
import inventoriesRoutes from "./routes/inventories.routes";
import authRoutes from "./routes/auth.routes";
import brandRoutes from "./routes/brands.routes";
import providerRoutes from "./routes/providers.routes";
import productRoutes from './routes/products.routes'

const app = express();

app.set("pk_data", pk_data);
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({
    author: app.get("pk_data").author,
    name: app.get("pk_data").name,
    version: app.get("pk_data").version,
  });
});

//USING ROUTES
app.use("/api/brands", brandRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/inventories", inventoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

export default app;
