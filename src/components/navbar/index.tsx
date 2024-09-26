import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faCircleQuestion,
  faBars,
} from "@fortawesome/pro-solid-svg-icons";

export default function Nav() {
  const myLinks = [
    {
      name: "Pokemon",
      href: "/pokemon",
    },
    {
      name: "Berries",
      href: "/berries",
    },
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Items",
      href: "/items",
    },
    {
      name: "Locations",
      href: "/locations",
    },
  ];

  return (
    <header className="absolute top-3 z-50 flex h-10 w-full justify-center">
      <nav className="flex h-full flex-row items-center justify-center divide-x-2 rounded-lg bg-slate-300 px-4 text-black">
        {myLinks.map((link) => {
          if (link.name === "Home") {
            return (
              <Link
                href={link.href}
                key={link.name}
                className="px-2 text-xl font-medium"
              >
                Home
              </Link>
            );
          }

          return (
            <Link
              href={link.href}
              key={link.name}
              className="px-2 text-xl font-medium"
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
