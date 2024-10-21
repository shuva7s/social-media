import { Users } from "lucide-react";
import Image from "next/image";

const CommunityHeader = ({
  image,
  name,
  desc,
  memberCount,
}: {
  image: string;
  name: string;
  desc: string;
  memberCount: number;
}) => {
  return (
    <section className="w-full flex flex-col items-center md:flex-row gap-8 mt-4 p-6 pt-0 border-b border-border/50">
      {image === "" ? (
        <div className="w-44 h-44 flex items-center justify-center">
          <Users className="w-24 h-24 opacity-50"/>
        </div>
      ) : (
        <Image
          src={image}
          alt="image"
          width={250}
          height={250}
          className="w-44 h-44 rounded-full"
          priority
        />
      )}

      <div className="flex flex-col text-center md:text-left">
        <h1 className="text-4xl font-semibold">@{name}</h1>
        {desc !== "" && (
          <p className="text-lg text-muted-foreground mt-3">{desc}</p>
        )}
        <p className="text-muted-foreground mt-1">Members: {memberCount}</p>
      </div>
    </section>
  );
};

export default CommunityHeader;
