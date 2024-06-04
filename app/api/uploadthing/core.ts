import { verifyAuth } from "@/lib/verifyToken";
import { verifiedToken } from "@/middleware";
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async (request: NextRequest) => {
  const token = request.cookies.get("access-token")?.value;
  const verifiedToken: verifiedToken | any =
    token && (await verifyAuth(token).catch((error) => console.log(error)));

  if (!verifiedToken) {
    throw new Error("Unauthorized!");
  }
  return verifiedToken;
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
  teacherImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "pdf", "image"])
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "1GB" } })
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
