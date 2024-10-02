import { Home, Users, PlusCircle, Settings, BellDot } from "lucide-react";
let navlinks = [
  {
    name: "Home",
    icon: Home,
    href: "/",
  },
  {
    name: "Create Post",
    icon: PlusCircle,
    href: "/create-post",
  },
  {
    name: "Communities",
    icon: Users,
    href: "/communities",
  },

  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    name: "Notifications",
    icon: BellDot,
    href: "/notifications",
  },
];

let bottomBarLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Communities",
    href: "/communities",
    icon: Users,
  },
  {
    name: "Create Post",
    href: "/create-post",
    icon: PlusCircle,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Notifications",
    icon: BellDot,
    href: "/notifications",
  },
];

export { navlinks, bottomBarLinks };
