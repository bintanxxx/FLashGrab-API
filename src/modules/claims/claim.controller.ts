import { Request, Response } from "express";
import * as claimService from "./claim.service";
import { ClaimVoucherParams } from "./claim.schema";

export const claimVoucher = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id as number;
    // const { id } = req.params as unknown as ClaimVoucherParams;
    const id = Number(req.params.id);

    const result = await claimService.claimVoucher(id, userId);

    res.status(201).json({
      success: true,
      message: "Claim voucher successfully.",
      data: result.claim,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ succses: false, message: error.message });
      }
      if (error.message.includes("claimed")) {
        return res.status(409).json({ succses: false, message: error.message });
      }
      if (
        error.message.includes("not available") ||
        error.message.includes("expired") ||
        error.message.includes("stock")
      ) {
        return res.status(400).json({ succses: false, message: error.message });
      }
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
