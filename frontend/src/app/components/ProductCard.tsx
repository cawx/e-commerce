import Image from "next/image";

interface CardProps {
  title: string;
  price: number;
  brand: string;
  imageUrl: string;
}

const ProductCard = ({ title, price, brand, imageUrl }: CardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square mb-3 lg:mb-4 overflow-hidden">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <Image
          src="ArrowDiagonal.svg"
          alt=""
          width={32}
          height={32}
          className="absolute m-3 right-0"
        />
      </div>
      <h3 className="text-h5 font-archivo uppercase mb-1 lg:mb-2">{title}</h3>
      <div className="flex justify-between text-base font-inter">
        <p>{brand}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
