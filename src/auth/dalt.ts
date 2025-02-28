import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import getToken from "./token";
import { UserSchema } from "../schemas/index";

export const verifySession = cache(async () => {
  const token = await getToken();
  if (!token) {
    redirect("/auth/login");
  }
  const url = `${process.env.API_URL}/auth/check-auth-status`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const session = await req.json();
  const result = UserSchema.safeParse(session);
  if (!result.success) {
    redirect("/auth/login");
  }
  return {
    user: result.data,
    isAuth: true,
  };
});
