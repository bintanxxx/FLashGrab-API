import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();

// global middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Swagger docs setup
const swaggerDoc = YAML.load(path.join(__dirname, "../docs/openAPI.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "FlashGrab API is running..." });
});

export default app;
