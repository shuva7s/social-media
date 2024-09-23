"use client";
import { bottomBarLinks } from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const BottomBarButtons = () => {
  const pathName = usePathname();
  return (
    <ul className="flex justify-between items-center">
      {bottomBarLinks.map((link) => (
        <li key={link.name} className="">
          <Button size="icon" asChild variant="ghost">
            <Link href={link.href} className="">
              <link.icon
                className={`${
                  link.name === "Create Post"
                    ? "w-8 h-8" // Always w-8 h-8 for Create Post
                    : "w-6 h-6" // Initially w-6 h-6 for other icons
                } ${
                  pathName === link.href
                    ? "text-primary transition-all" // Apply text-primary when active for all icons
                    : ""
                } ${
                  pathName === link.href && link.name !== "Create Post"
                    ? "w-7 h-7" // Change size to w-7 h-7 when active for non-Create Post
                    : ""
                }`}
              />
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default BottomBarButtons;
