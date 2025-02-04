import React from "react";
import Image from "next/image";

interface CartProps {
  isOpen: boolean;
}

function CartModal() {
  return (
    <div className="absolute top-full mt-2 right-0 bg-red-300 w-32 border border-gray-300 shadow-lg rounded-md z-50">
      <div className="p-4">
        <div className="max-w-[50px] max-h-[50px] aspect-square">
          <Image
            src="/images/Racket1.webp"
            alt=""
            fill
            className=" object-center object-cover"
          />
        </div>
        <h3>Shift 99 V1 Tennis Racket</h3>
      </div>
    </div>
  );
}

export default CartModal;
