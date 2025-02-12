import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  price: number;
  brand: string;
  imageUrl: string;
}

const ProductCard = ({ title, price, brand, imageUrl }: CardProps) => {
  return (
    <div className="group relative cursor-pointer">
      <div className="relative aspect-square mb-3 lg:mb-4 overflow-hidden">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <Image
          src="ArrowDiagonal.svg"
          alt=""
          width={32}
          height={32}
          className="absolute m-3 right-0"
        />
      </div>
      <div className="mt-4 flex justify-between font-archivo">
        <div>
          <h3 className="text-h6 font-extrabold uppercase">
            <Link href="/">
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className=" text-sm text-gray-500">{brand}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
