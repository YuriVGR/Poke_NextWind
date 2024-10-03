"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();

  const myLinks = [
    {
      name: "Home",
      href: "/",
      color: "hover:bg-pink-300 hover:text-white border-pink-300",
      textColor: "bg-pink-500 text-white border-pink-500",
    },
    {
      name: "Pokémon",
      href: "/pokemon",
      color: "hover:bg-red-300 hover:text-white border-red-300",
      textColor: "bg-red-500 text-white border-red-500",
    },
    {
      name: "Berries",
      href: "/berries",
      color: "hover:bg-yellow-300 hover:text-white border-yellow-300",
      textColor: "bg-yellow-500 text-white border-yellow-500",
    },
    {
      name: "Items",
      href: "/items",
      color: "hover:bg-blue-300 hover:text-white border-blue-300",
      textColor: "bg-blue-500 text-white border-blue-500",
    },
    {
      name: "Locations",
      href: "/locations",
      color: "hover:bg-green-300 hover:text-white border-green-300",
      textColor: "bg-green-500 text-white border-green-500",
    },
  ];

  return (
    <header className="group fixed z-50 flex h-10 w-full items-center justify-center bg-white transition-all duration-100 hover:h-16">
      <nav className="group flex h-full w-4/5 flex-row items-center text-black">
        {myLinks.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.name}
              className={clsx(
                "flex h-full w-32 flex-col items-center justify-center border-b-4 p-2 text-base group-hover:text-lg",
                {
                  [link.color]: pathname !== link.href,
                },
                { [link.textColor]: pathname === link.href },
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
