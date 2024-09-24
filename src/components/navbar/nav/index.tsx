import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";

export default function Nav() {
  const myLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Referral",
      href: "/referral",
    },
  ];

  return (
    <header className="bg-black h-12 fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between h-full">
        <h1 className="text-white text-center text-2xl font-bold absolute left-0 right-0 m-auto">
          PokeAPI
        </h1>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faSearch} className="text-white" />
        </div>
      </nav>
    </header>
  );
}
