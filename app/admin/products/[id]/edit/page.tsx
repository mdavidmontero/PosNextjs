import Link from "next/link";
import Headin from "../../../../../components/ui/Headin";
import EditProductForm from "../../../../../components/products/EditProductForm";
import ProductForm from "../../../../../components/products/ProductForm";
import { notFound } from "next/navigation";
import { ProductSchema } from "@/schemas";
import getToken from "@/auth/token";

async function getProduct(id: string) {
  const token = await getToken();
  const url = `${process.env.API_URL}/products/${id}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  if (!req.ok) {
    notFound();
  }
  const product = ProductSchema.parse(json);
  return product;
}

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <Link
        href={"/admin/products?page=1"}
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Volver
      </Link>
      <Headin>Editar Producto: {product.name}</Headin>
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
