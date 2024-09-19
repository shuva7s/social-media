import PostsContainerLoad from "@/components/loaders/PostsContainerLoad";
import UserProfileCardLoad from "@/components/loaders/UserProfileCardLoad";
import UserProfileCard from "@/components/shared/Cards/UserProfileCard";
import PostsContainer from "@/components/shared/PostsContainer";
import { getUserDataFromUserName } from "@/lib/actions/user.actions";
import { Suspense } from "react";

async function UserDataRender({ userName }: { userName: string }) {
  const res = await getUserDataFromUserName(userName);
  if (res.message === "success") {
    return <UserProfileCard userData={res.userData} />;
  }
}

export default function UserPage({ params }: { params: { userName: string } }) {
  const userName = params.userName;
  return (
    <main className="min-h-screen flex-1">
      <Suspense fallback={<UserProfileCardLoad />}>
        <UserDataRender userName={userName} />
      </Suspense>
      <h3 className="text-3xl font-semibold my-2 text-foreground/60">Posts</h3>
      <Suspense fallback={<PostsContainerLoad />}>
        <PostsContainer type="users" />
      </Suspense>
    </main>
  );
}
