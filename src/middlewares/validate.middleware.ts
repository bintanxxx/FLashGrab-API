import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

/**
 * Middleware untuk validasi request menggunakan Zod Schema.
 * @param schema - Zod Object yang mendefinisikan bentuk body/query/params
 */

export const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // cek apakah request sesuai schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      // kalo errornya dari zod, return 400
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error.",
          errors: error.issues.map((e) => ({
            field: e.path[1],
            message: e.message,
          })),
        });
      }
    } 
  };
