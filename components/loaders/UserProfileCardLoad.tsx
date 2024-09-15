import { Skeleton } from "../ui/skeleton";

const UserProfileCardLoad = () => {
  return (
    <section className="flex gap-4 flex-col items-center  md:flex-row md:items-start p-4">
      <Skeleton className="w-36 h-36 rounded-full" />
      <div className="flex flex-col items-center md:mt-4 md:items-start">
        <Skeleton className="w-80 h-9 rounded-full" />
        <Skeleton className="w-64 h-5 mt-2 rounded-full" />
      </div>
    </section>
  );
};

export default UserProfileCardLoad;
