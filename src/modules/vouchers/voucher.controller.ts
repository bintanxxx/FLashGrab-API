import { Request, Response } from "express";
import * as voucherService from "./voucher.service";

export const createVoucher = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const newVoucher = await voucherService.create(req.body, userId);

    res
      .status(201)
      .json({
        success: true,
        message: "Create voucher Successful",
        data: newVoucher,
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllVouchers = async (req: Request, res: Response) => {
  try {
    const vouchers = await voucherService.getAll();
    res
      .status(200)
      .json({
        success: true,
        message: "Success get all vouchers",
        data: vouchers,
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
