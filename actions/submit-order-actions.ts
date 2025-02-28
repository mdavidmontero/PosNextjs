"use server";

import getToken from "@/auth/token";
import {
  ErrorResponseSchema,
  OrderSchema,
  SuccessResponseSchema,
} from "@/schemas";
import { revalidateTag } from "next/cache";

export async function submitOrder(data: unknown) {
  const token = await getToken();
  const order = OrderSchema.parse(data);
  const url = `${process.env.API_URL}/transactions`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  const json = await req.json();
  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((issue) => issue),
    };
  }
  const success = SuccessResponseSchema.parse(json);
  revalidateTag("products-by-category");

  return {
    errors: [],
    success: success.message,
  };
}
