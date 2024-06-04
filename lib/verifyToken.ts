import { jwtVerify } from "jose";
interface User {
  id?: string;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}
export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SIGN_KEY)
    );
    return verified.payload.tokenData as User;
  } catch (error) {
    throw new Error("Your token has Expired!");
  }
};
