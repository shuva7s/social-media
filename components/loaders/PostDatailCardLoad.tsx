import { Loader } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import PostCreatorLoad from "./PostCreatorLoad";

const PostDatailCardLoad = () => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="px-4 py-3 flex flex-row items-center gap-2">
        <Skeleton className="w-[40px] h-[40px] rounded-full" />
        <Skeleton className="w-36 h-5" />
      </CardHeader>
      <CardContent className="px-4 py-0 my-2">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-1/2 h-5 mt-2" />
        <Skeleton className="fl-center min-h-[35vh] my-2" />
      </CardContent>

      <CardFooter className="px-3 py-3">
        <div className="flex flow-row gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-24 h-10 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostDatailCardLoad;
