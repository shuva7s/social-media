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
            className={`w-full justify-start rounded-2xl ${
              pathName === link.href
                ? "bg-primary py-7"
                : "bg-accent py-6 text-accent-foreground hover:text-white"
            }`}
          >
            <Link href={link.href}>{link.name}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default SideBarButtons;
