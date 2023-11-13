import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import * as z from "zod"
import type { NextApiRequest, NextApiResponse } from 'next'

const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string()
    .min(1, "Password confirmation is required")
})
/*
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match"
})
*/

export async function POST(
  request: Request
){
  try {
      const body = await request.json()
      const {
          email,
          username,
          password
      } = userSchema.parse(body);
  
      const existingUserByEmail = await prisma.user.findUnique({
        where: {email: email}
      })

      if(existingUserByEmail){
        return NextResponse.json({ user: null, message: "User with this email already exists"}, {status: 409})
      }

      const existingUserByUsername = await prisma.user.findUnique({
        where: { username: username }
      })

      if(existingUserByEmail){
        return NextResponse.json({ user: null, message: "User with this username already exists"}, {status: 409})
      }

      const hashedPassword = await bcrypt.hash(password, 12)
  
      const newUser = await prisma.user.create({
          data: {
              email,
              username,
              password: hashedPassword
          }
      })
  
      const { password: newUserPassword, ...rest} = newUser

      return NextResponse.json({ user: rest, message: "User created successfully"}, {status: 201})
      

  } catch (error: any) {
      console.log(error, 'REGISTRATION_ERROR')
      return new NextResponse('Internet Error', {status: 500})
  }
}