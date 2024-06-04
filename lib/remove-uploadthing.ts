import { UTApi } from "uploadthing/server";

export async function removeUploadthing(value: string) {
  const newUrl = value.substring(value.lastIndexOf("/") + 1);
  const utapi = new UTApi();
  await utapi.deleteFiles(newUrl);

  return Response.json({ message: "ok" });
}
