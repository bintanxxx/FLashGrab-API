import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res
      .status(201)
      .json({ success: true, message: "Register success.", data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ message: "Login success", data: result });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
