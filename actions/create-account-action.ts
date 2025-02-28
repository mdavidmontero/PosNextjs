"use server";

import { ErrorResponseSchema } from "@/schemas";
import { RegisterSchema } from "@/schemas/index";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const register = RegisterSchema.safeParse(registerData);
  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message);
    return {
      errors,
      success: prevState.success,
    };
  }

  const url = `${process.env.API_URL}/auth/register`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: register.data.fullName,
      email: register.data.email,
      password: register.data.password,
    }),
  });
  const json = await req.json();

  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((issue) => issue),
      success: "",
    };
  }
  return {
    errors: [],
    success: "Cuenta Creada Correctamente",
  };
}
