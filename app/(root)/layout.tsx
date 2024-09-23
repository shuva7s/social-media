import Bottombar from "@/components/shared/Bottombar";
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
      <div className="flex justify-center flex-row gap-2 relative m-2">
        <SignedIn>
          <Sidebar />
        </SignedIn>
        {children}
        <SignedIn>
          <Bottombar />
        </SignedIn>
      </div>
    </>
  );
}
