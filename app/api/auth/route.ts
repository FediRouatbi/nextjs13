import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/util/db";
import * as jwt from "jsonwebtoken";
const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10).then((hash) => hash);
};
const doesPasswordMatch = bcrypt.compareSync(
  "fedi",
  "$2b$10$s1vMRB2hTd4W3oVs4w2AqOn26763Y0iT30B3Wg8NkrXA2z9jTrU4."
);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };

  const hashedPassword = await hashPassword(password);
  let data;
  try {
    const user = await db.user.create({
      data: { email, password: hashedPassword, name: email.split("@")[0] },
    });
    const token = jwt.sign({ user: user.id }, process.env?.TOKEN_KEY || "");
    const { password: pass, ...res } = user;
    data = { ...res, token };
  } catch (err) {
    return NextResponse.json(err);
  }

  return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] || "";
  const decodedToken = jwt.decode(token);
  if (!decodedToken) return NextResponse.json("unauthorized");
  const { user } = decodedToken as { user: string };
  const userData = await db.user.findUnique({ where: { id: user } });
  if (!userData) return NextResponse.json("unauthorized");
  const { password, ...res } = userData;
  return NextResponse.json({ ...res });
}
