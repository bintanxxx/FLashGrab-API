import { Router } from "express";
import * as voucherController from "./voucher.controller";

import {
  authenticate,
  authorizeAdmin,
} from "../../middlewares/auth.middleware";

const router = Router();

router
  .route("/")
  .get(voucherController.getAllVouchers)
  .post(authenticate, authorizeAdmin, voucherController.createVoucher);

export default router;
