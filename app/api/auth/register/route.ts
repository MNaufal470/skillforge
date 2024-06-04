import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import moment from "moment-timezone";
export async function POST(request: Request) {
  try {
    console.log("[REGISTER API] connected");
    const { firstname, lastname, username, email, password } =
      await request.json();

    if (!firstname || !lastname || !username || !email || !password) {
      return NextResponse.json(
        {
          status: 401,
          message: "All field is required!",
        },
        { status: 411 }
      );
    }
    if (password.length < 4) {
      return NextResponse.json(
        {
          status: 401,
          message: "Password must be minimum 5 characters",
        },
        { status: 411 }
      );
    }
    let findAlreadyUsername = await db.user.findFirst({
      where: { username: username },
    });
    let findAlreadyEmail = await db.user.findFirst({
      where: { email: email },
    });
    if (findAlreadyUsername) {
      return NextResponse.json(
        {
          status: 400,
          message: "Username already exist!",
        },
        { status: 400 }
      );
    }
    if (findAlreadyEmail) {
      return NextResponse.json(
        {
          status: 400,
          message: "Email already exist!",
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hasheddPassword = await bcryptjs.hash(password, salt);
    moment.tz.setDefault("Asia/Jakarta");
    const user = await db.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hasheddPassword,
        active: true,
        username,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
    });

    await db.teacher.create({
      data: {
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        status: 201,
        message: "Successfully Registered",
        createdAt: moment().format(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("[REGISTER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
