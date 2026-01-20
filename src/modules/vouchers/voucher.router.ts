import { Router } from "express";
import * as voucherController from "./voucher.controller";
import * as claimController from "../claims/claim.controller";

import { validate } from "../../middlewares/validate.middleware";
import {
  authenticate,
  authorizeAdmin,
} from "../../middlewares/auth.middleware";

import { ClaimVoucherSchema } from "../claims/claim.schema";

const router = Router();

router
  .route("/")
  .get(voucherController.getAllVouchers)
  .post(authenticate, authorizeAdmin, voucherController.createVoucher);

router.post(
  "/:id/claim",
  authenticate,
  validate(ClaimVoucherSchema),
  claimController.claimVoucher
);

export default router;
