import Image from "next/image";

const UserProfileCard = ({ userData }: { userData: any }) => {
  return (
    <section className="flex gap-4 flex-col items-center md:flex-row md:items-start p-4">
      <Image
        src={userData.photo}
        alt="user profile"
        width={200}
        height={200}
        className="w-36 h-36 rounded-full"
      />
      <div className="flex flex-col md:mt-4 text-center md:text-left">
        <h1 className="text-3xl font-semibold hover:underline">
          @{userData.username}
        </h1>
        <p className="text-muted-foreground">{userData.email}</p>
      </div>
    </section>
  );
};

export default UserProfileCard;
