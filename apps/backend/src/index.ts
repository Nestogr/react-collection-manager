import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import categoryRoutes from "./routes/category.routes.js";
import attributeRoutes from "./routes/attribute.routes.js";
import categoryAttributeRoutes from "./routes/category-attribute.routes.js";
import itemRoutes from "./routes/item.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/categories", categoryAttributeRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/items", itemRoutes);

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
