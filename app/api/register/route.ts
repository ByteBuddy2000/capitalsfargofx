import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { z } from "zod"

import { connectToDB } from "@/lib/connectToDB"
import { ASSET_SYMBOLS, Asset } from "@/models/Asset"
import { Referral } from "@/models/Referral"
import { User } from "@/models/User"

const registrationSchema = z.object({
  fullName: z.string().trim().min(1),
  username: z.string().trim().regex(/^[a-zA-Z0-9_]{3,30}$/),
  email: z.string().trim().email(),
  password: z.string().min(6),
  btcWallet: z.string().trim().optional().default(""),
  ethWallet: z.string().trim().optional().default(""),
  usdtWallet: z.string().trim().optional().default(""),
  referralCode: z.string().trim().optional().default(""),
  role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = registrationSchema.parse(body)

    await connectToDB()

    const normalizedUsername = data.username.toLowerCase()
    const normalizedEmail = data.email.toLowerCase()
    const normalizedWallets = {
      BTC: data.btcWallet,
      ETH: data.ethWallet,
      USDT: data.usdtWallet,
    }

    const existingUser = await User.exists({
      $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "That username or email is already registered." },
        { status: 409 }
      )
    }

    const upline = data.referralCode
      ? await User.findOne({ username: data.referralCode.toLowerCase() }).exec()
      : null

    let createdUser
    try {
      createdUser = await User.create({
        fullName: data.fullName,
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash: await bcrypt.hash(data.password, 12),
        btcWallet: normalizedWallets.BTC,
        ethWallet: normalizedWallets.ETH,
        usdtWallet: normalizedWallets.USDT,
        uplineId: upline?._id || null,
        uplineUsername: upline?.username || null,
        role: data.role,
        status: "ACTIVE",
      })
    } catch (error) {
      console.error("User creation failed:", error)
      return NextResponse.json(
        { message: "Unable to create your account." },
        { status: 400 }
      )
    }

    try {
      await Asset.insertMany(
        ASSET_SYMBOLS.map((symbol) => ({
          userId: createdUser?._id,
          symbol,
          walletAddress: normalizedWallets[symbol],
        }))
      )
    } catch (error) {
      console.error("Asset creation failed for new user:", error)
      await User.deleteOne({ _id: createdUser?._id })
      return NextResponse.json(
        { message: "Unable to create your account." },
        { status: 400 }
      )
    }

    if (upline) {
      await Referral.create({
        referrerId: upline._id,
        referredUserId: createdUser._id,
      })
    }

    return NextResponse.json(
      {
        user: {
          id: createdUser._id.toString(),
          fullName: createdUser.fullName,
          username: createdUser.username,
          email: createdUser.email,
          role: createdUser.role,
          status: createdUser.status,
          btcWallet: createdUser.btcWallet,
          ethWallet: createdUser.ethWallet,
          usdtWallet: createdUser.usdtWallet,
          uplineUsername: createdUser.uplineUsername,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message || "Invalid registration payload." },
        { status: 400 }
      )
    }

    console.error("Registration API error:", error)
    return NextResponse.json(
      { message: "Invalid registration payload." },
      { status: 400 }
    )
  }
}
