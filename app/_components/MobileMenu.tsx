"use client";
import Link from "next/link";
import React from "react";
import { Item } from "./types";

// type Item = {
//   title: string;
//   href: string;
// };
interface Props {
  list: Item[];
  toggleMenu: () => void;
  pathName: string;
}

const MobileMenu = ({ list, toggleMenu, pathName }: Props) => {
  return (
    <ul className="md:hidden flex flex-col space-y-2 px-4 py-2 bg-gray-750 border-t border-zinc-400 ">
      {list.map((item) => (
        <Link
          key={item.title}
          className={`hover:text-zinc-500 ${
            pathName === item.href ? "text-zinc-100 font-bold" : "text-zinc-300"
          }`}
          href={item.href}
          onClick={toggleMenu} // Close menu on item click
        >
          {item.title}
        </Link>
      ))}
    </ul>
  );
};

export default MobileMenu;
