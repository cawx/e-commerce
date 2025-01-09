import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex bg-zinc-900 text-white p-4 justify-between items-center px-[5%]">
      <div className="pr-4 font-semibold text-2xl tracking-tighter">
        <span>storify.</span>
      </div>
      <div className="flex-grow relative text-gray-400 focus-within:text-gray-600 block">
        <Image
          src="/Search.svg"
          alt=""
          width={30}
          height={30}
          className="pointer-events-none w-8 h-8 absolute top-1/2 right-0 -translate-y-1/2 "
        />
        <input placeholder="search..." className=" w-full p-1 rounded-sm" />
      </div>
      <div className="pl-4">
        <ul className="flex gap-x-4">
          <li>
            <Link href="/">
              <Image src="/Account.svg" alt="" width={30} height={30} />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Image src="/ShoppingCart.svg" alt="" width={30} height={30} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
