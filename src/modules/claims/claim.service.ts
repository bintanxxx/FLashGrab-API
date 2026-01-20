import { prisma } from "../../configs/prisma";
import { ClaimVoucherParams, ClaimVoucherSchema } from "./claim.schema";

export const claimVoucher = async (voucherId: number, userId: number) => {
  // cek voucher
  const voucher = await prisma.voucher.findUnique({ where: { id: voucherId } });

  if (!voucher) throw new Error("Voucher not found");

  // validasi tanggal
  const now = new Date();
  if (now < voucher.valid_from)
    throw new Error("Voucher not available yet. Hang tight!");

  if (now > voucher.valid_until)
    throw new Error("Voucher expired. Please check for new offers!");

  // cek apakah user sudah claim
  const existingClaim = await prisma.claim.findUnique({
    where: {
      user_id_voucher_id: {
        user_id: userId,
        voucher_id: voucherId,
      },
    },
  });

  if (existingClaim) throw new Error("Voucher claimed by you. Spread the joy!");

  // cek stok voucher
  if (voucher.stock <= 0) throw new Error("Out of stock! Check back later.");

//   transaction
  return await prisma.$transaction(async (tx) => {
    const updatedVoucher = await tx.voucher.update({
        where : {
            id: voucherId,
            stock: {gt: 0}
        },
        data : {
            stock : {decrement: 1}
        }
    }).catch(() => {
        throw new Error("Failed to claim: Stock fought over and gone!")
    })

    const newClaim = await tx.claim.create({
        data: {
            user_id: userId,
            voucher_id: voucherId
        }
    })

    return {
        voucher: updatedVoucher,
        claim: newClaim
    }

  })
};
