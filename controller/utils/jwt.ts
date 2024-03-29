import jwt from "jsonwebtoken";

export function generateToken(id: String): String {
  const token = jwt.sign({ id: id }, process.env.PRIVATE_KEY || "PrivateKey", {
    expiresIn: "2d",
  });
  return token;
}
export function verifyToken(token: string): any | undefined {
  try {
    const DecodeToken: any = jwt.verify(
      token,
      process.env.PRIVATE_KEY || "PrivateKey"
    );
    return DecodeToken.id;
  } catch (error) {
    console.log(error);
  }
}
export function decodeIdToken(token: string): string | Boolean {
  try {
    const DecodeToken: any = jwt.verify(
      token,
      process.env.PRIVATE_KEY || "PrivateKey"
    );

    if (DecodeToken.id) {
      return DecodeToken.id;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
