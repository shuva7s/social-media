"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const CreatePostRedirect = () => {
  const pathName = usePathname();
  if (pathName !== "/create-post") {
    return (
      <Button asChild className="max-sm:hidden">
        <Link href="/create-post">Create post</Link>
      </Button>
    );
  } else {
    return null;
  }
};

export default CreatePostRedirect;
