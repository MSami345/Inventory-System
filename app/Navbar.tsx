"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes, FaAmazon } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import MobileMenu from "./_components/MobileMenu";

interface List {
  title: string;
  href: string;
}

const Navbar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const list: List[] = [
    { title: "Dashboard", href: "/" },
    { title: "Inventory", href: "/inventory" },
    { title: "Clients", href: "/clients" },
    { title: "Sales", href: "/sales" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b border-zinc-400 bg-gray-800">
      <div className="flex justify-between items-center h-14 px-4 py-4">
        <Link href={"/"}>
          <MdInventory className="text-2xl" color="white" />
        </Link>
        <div className="hidden md:flex items-center space-x-7">
          {list.map((item) => (
            <Link
              key={item.title}
              className={`hover:text-grey-400 hover:font-bold ${
                pathName === item.href ? "text-zinc-100 font-bold" : "text-zinc-300"
              }`}
              href={item.href}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes color="white" /> : <FaBars color="white" />}
        </button>
      </div>
      {isOpen && (
        <MobileMenu toggleMenu={toggleMenu} list={list} pathName={pathName} />
      )}
    </nav>
  );
};

export default Navbar;
