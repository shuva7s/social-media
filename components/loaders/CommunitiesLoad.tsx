import React from "react";
import { Skeleton } from "../ui/skeleton";

const CommunitiesLoad = () => {
  return (
    <section className="my-4">
      <Skeleton className="w-full h-10"/>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
        <Skeleton className="h-32"/>
        <Skeleton className="h-32"/>
        <Skeleton className="h-32"/>
        <Skeleton className="h-32"/>
      </div>
    </section>
  );
};

export default CommunitiesLoad;
