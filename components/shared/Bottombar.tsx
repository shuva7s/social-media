import BottomBarButtons from "./BottomBarButtons";

const Bottombar = () => {
  return (
    <nav className="w-full max-w-lg fixed bottom-0 z-10 lg:hidden border bg-background py-3 px-4 rounded-t-3xl">
      <BottomBarButtons />
    </nav>
  );
};

export default Bottombar;
