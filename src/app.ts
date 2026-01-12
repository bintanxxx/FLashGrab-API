import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import authRoute from "./modules/auth/auth.router";

const app = express();

// global middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// daftarkan router
app.use("/auth/", authRoute);

// Swagger docs setup
const swaggerDoc = YAML.load(path.join(__dirname, "../docs/openAPI.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "FlashGrab API is running..." });
});

export default app;
