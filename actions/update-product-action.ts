"use server";

import getToken from "@/auth/token";
import { ErrorResponseSchema, Product, ProductFormSchema } from "@/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function updateProduct(
  productId: Product["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const token = await getToken();
  const product = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    image: formData.get("image"),
    inventory: formData.get("inventory"),
    categoryId: formData.get("categoryId"),
  });
  if (!product.success) {
    return {
      errors: product.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/products/${productId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product.data),
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
    success: "Producto Actualizado Correctamente",
  };
}
