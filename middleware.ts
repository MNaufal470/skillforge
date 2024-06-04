import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAuth } from "./lib/verifyToken";

export interface verifiedToken {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access-token")?.value;
  const verifiedToken: verifiedToken | any = await verifyAuth(token!!).catch(
    (error) => console.log(error)
  );
  const path = request.nextUrl.pathname;

  if (path.includes("/auth") && verifiedToken) {
    return NextResponse.redirect(new URL("/?status=alreadyLogin", request.url));
  }

  if (
    !verifiedToken &&
    (path.startsWith("/student") || path.startsWith("/teacher"))
  ) {
    return NextResponse.redirect(
      new URL("/auth?status=unauthorized", request.url)
    );
  }

  if (!verifiedToken && path.startsWith("/api/course")) {
    return NextResponse.json(
      { message: "Not Authorized", status: 403 },
      { status: 403 }
    );
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/auth",
    "/student/:path*",
    "/teacher/:path*",
    "/api/course/:path*",
  ],
};
