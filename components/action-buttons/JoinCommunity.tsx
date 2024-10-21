"use client";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { joinCommunity } from "@/lib/actions/community.actions";
import { useToast } from "@/hooks/use-toast";

const JoinCommunity = ({
  isPublic,
  communityId,
  communityName,
}: {
  isPublic: boolean;
  communityId: string;
  communityName: string;
}) => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  async function handleOnClick() {
    try {
      setLoading(true);
      const res = await joinCommunity(communityId, isPublic);

      if (res) {
        setLoading(false);
      }

      if (res.success) {
        toast({
          title: `${
            isPublic ? `Following ${communityName}` : "Join request sent"
          }`,
        });
      } else {
        toast({
          title: `${
            isPublic
              ? `Failed to follow ${communityName}`
              : `Failed to send join request`
          }`,
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: `${
          isPublic
            ? `Failed to follow ${communityName}`
            : `Failed to send join request`
        }`,
        variant: "destructive",
      });
    }
  }

  if (isPublic) {
    return (
      <Button onClick={handleOnClick} disabled={loading} className="gap-2">
        {loading ? (
          <>
            Follow <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          "Follow"
        )}
      </Button>
    );
  } else {
    return (
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-muted-foreground">
          This community is private
        </p>
        <Button onClick={handleOnClick}>
          {loading ? (
            <>
              Sending join request <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            "Send join request"
          )}
        </Button>
      </div>
    );
  }
};

export default JoinCommunity;
