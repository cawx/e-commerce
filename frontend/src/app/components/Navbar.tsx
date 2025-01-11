import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  const navData = [
    {
      title: "New",
      link: "/",
    },
    {
      title: "Rackets",
      link: "/",
    },
    {
      title: "Shoes",
      link: "/",
    },
    {
      title: "Strings",
      link: "/",
    },
    {
      title: "Sale",
      link: "/",
    },
  ];

  return (
    <nav className="font-inter sticky top-0 z-[100] bg-white">
      <div className="flex py-6 justify-between items-center section-padding relative">
        <div className="pr-4 font-semibold text-2xl tracking-tighter ">
          <span className="">ClubPenguin</span>
        </div>

        <div className="flex justify-center absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-x-8">
            {navData.map((nav, index) => (
              <li key={index}>
                <Link className="text-base" href={nav.link}>
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="relative border-2 p-1 border-black/70 text-black/80 block">
            <Image
              src="/Search.svg"
              alt=""
              width={30}
              height={30}
              className="pointer-events-none opacity-80 absolute top-1/2 right-0 -translate-y-1/2"
            />
            <input
              placeholder="search..."
              className="w-full px-1 rounded-sm outline-none"
            />
          </div>
          <button>
            <Image
              src="/Account.svg"
              alt=""
              width={40}
              height={40}
              className=""
            />
          </button>
          <button>
            <Image
              src="/ShoppingCart.svg"
              alt=""
              width={35}
              height={35}
              className=""
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
