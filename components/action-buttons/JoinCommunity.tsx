import { Button } from "../ui/button";

const JoinCommunity = ({
  isPublic,
  communityId,
}: {
  isPublic: boolean;
  communityId: string;
}) => {
  if (isPublic) {
    return <Button>Join</Button>;
  } else {
    return (
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-muted-foreground">
          This community is private
        </p>
        <Button>Send join request</Button>
      </div>
    );
  }
};

export default JoinCommunity;
