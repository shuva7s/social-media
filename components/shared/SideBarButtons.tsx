"use client";
import { navlinks } from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const SideBarButtons = () => {
  const pathName = usePathname();
  return (
    <ul className="w-full flex flex-col gap-2">
      {navlinks.map((link) => (
        <li key={link.name}>
          <Button
            asChild
            className={`w-full justify-start rounded-2xl text-muted-foreground ${
              pathName === link.href
                ? "bg-primary py-7 text-white"
                : "bg-transparent py-6 hover:text-white"
            }`}
          >
            <Link href={link.href} className="flex gap-2">
              <link.icon />
              {link.name}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default SideBarButtons;
