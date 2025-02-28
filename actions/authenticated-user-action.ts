"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorResponseSchema } from "@/schemas";
import { LoginSchema } from "@/schemas/index";

type ActionStateType = {
  errors: string[];
};

export async function authenticated(
  prevState: ActionStateType,
  formData: FormData
) {
  const cookieStore = await cookies();

  const loginCredential = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const auth = LoginSchema.safeParse(loginCredential);
  if (!auth.success) {
    return {
      errors: auth.error.issues.map((issue) => issue.message),
    };
  }

  const url = `${process.env.API_URL}/auth/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  });
  const json = await req.json();
  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    console.log(errors);
    return {
      errors: errors.message.map((issue) => issue),
      success: "",
    };
  }

  cookieStore.set({
    name: "POS_VENTA_TOKEN",
    value: json.token,
    httpOnly: true,
    path: "/",
  });
  redirect("/admin");
}
