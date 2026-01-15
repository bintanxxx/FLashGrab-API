import express, { Request, Response, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import authRoute from "./modules/auth/auth.router";
import voucherRoute from "./modules/vouchers/voucher.router";

const app = express();

// global middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// API VERSIONING
const v1Router = Router();

// daftarkan router
v1Router.use("/auth", authRoute);
v1Router.use("/voucher", voucherRoute);

app.use("/api/v1", v1Router);

// Swagger docs setup
const swaggerDoc = YAML.load(path.join(__dirname, "../docs/openAPI.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "FlashGrab API is running..." });
});

export default app;
