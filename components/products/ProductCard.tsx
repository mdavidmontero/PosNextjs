import Image from "next/image";
import { Product } from "../../src/schemas";
import { formatCurrency } from "../../src/utils";
import AddProductButton from "./AddProductButton";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  return (
    <div className="rounded bg-white shadow relative p-5">
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/${product.image}`}
          alt={`${product.name}`}
          width={400}
          height={600}
          priority
        />
        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
          <p className="text-gray-500">Disponibles: {product.inventory}</p>
          <p className="text-2xl font-extrabold  text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      <AddProductButton product={product} />
    </div>
  );
}
