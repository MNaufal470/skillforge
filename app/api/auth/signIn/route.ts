import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcr from "bcryptjs";
import { SignJWT } from "jose";
import { encrypting } from "@/lib/encrypt-decrypt";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  password?: string;
  username: string;
  email: string;
}
export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json(
      {
        status: 411,
        message: "All fields is required!",
      },
      { status: 411 }
    );
  }

  try {
    const user: User | null = await db.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }],
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 400,
          message: "User not found!",
        },
        { status: 400 }
      );
    }
    const verifyPassword = await bcr.compare(password, user.password!);
    if (!verifyPassword) {
      return NextResponse.json(
        {
          status: 400,
          message: "Password is incorrect!",
        },
        { status: 400 }
      );
    }
    delete user["password"];
    const encryptId = encrypting(String(user.id));

    const tokenData = {
      id: encryptId,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    const token = await new SignJWT({ tokenData })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setExpirationTime("3h")
      .sign(new TextEncoder().encode(process.env.SIGN_KEY));
    delete user["password"];
    const response = NextResponse.json(
      {
        status: 200,
        message: "Sign In Successfully",
        user: { ...user },
      },
      { status: 200 }
    );
    response.cookies.set("access-token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
