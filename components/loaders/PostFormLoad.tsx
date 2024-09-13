import { Skeleton } from "../ui/skeleton"

export const PostFormLoad = () => {
  return (
   <div className="flex flex-col gap-6 mt-6">
    <Skeleton className="w-full h-72"/>
    <Skeleton className="w-full h-12"/>
    <Skeleton className="w-full h-12"/>
    <Skeleton className="w-full h-12"/>
   </div>
  )
}
