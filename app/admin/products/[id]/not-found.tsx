import Link from "next/link";
import Headin from "../../../../components/ui/Headin";

export default function notFound() {
  return (
    <div className="text-center">
      <Headin>Producto no encontrado</Headin>
      <p>
        Tal vez quieras volver a{" "}
        <Link href={"/admin/products?page=1"} className="text-green-400 ">
          Productos
        </Link>{" "}
      </p>
    </div>
  );
}
