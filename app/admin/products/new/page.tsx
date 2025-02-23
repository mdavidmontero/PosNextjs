import Link from "next/link";
import Headin from "../../../../components/ui/Headin";
import AddProductForm from "../../../../components/products/AddProductForm";
import ProductForm from "../../../../components/products/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <Link
        href={"/admin/products?page=1"}
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Volver
      </Link>
      <Headin>Nuevo Producto</Headin>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
