import Bottombar from "@/components/shared/Bottombar";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { SignedIn } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex gap-2 relative mx-2">
        <SignedIn>
          <Sidebar />
        </SignedIn>
        {children}
      </div>
    </>
  );
}
