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
      name: "Home",
      href: "/",
      icon: faHome,
    },
    {
      name: "About",
      href: "/about",
      icon: faCircleQuestion,
    },
  ];

  return (
    <header className="absolute z-50 flex h-10 w-full justify-center">
      <nav className="flex h-full w-full gap-4 px-4">
        <div className="flex w-full justify-between gap-4 p-4">
          {myLinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <FontAwesomeIcon icon={link.icon} className="text-white hover:text-red-300 transition-all text-xl" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
