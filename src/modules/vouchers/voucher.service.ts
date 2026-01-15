import { CreateVoucherDTO } from "./voucher.schema";
import { prisma } from "../../configs/prisma";

export const create = async (data: CreateVoucherDTO, userId: number) => {
  const isCodeExist = await prisma.voucher.findUnique({
    where: { code: data.code },
  });
  if (isCodeExist) throw new Error("Voucher code is already exist.");

  return await prisma.voucher.create({
    data: { ...data, created_by_id: userId },
    select: {
      code: true,
      name: true,
    },
  });
};

export const getAll = async () => {
  return await prisma.voucher.findMany();
};
