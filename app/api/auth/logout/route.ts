import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const response = NextResponse.json(
      { message: "Logout Successfully", status: 200 },
      { status: 200 }
    );

    response.cookies.set("access-token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
