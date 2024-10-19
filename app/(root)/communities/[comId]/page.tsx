import JoinCommunity from "@/components/action-buttons/JoinCommunity";
import CommunityHeader from "@/components/shared/CommunityHeader";
import { getCommunityById } from "@/lib/actions/community.actions";
import { Suspense } from "react";
import CreatePost from "../../create-post/page";
import CreatePostRedirect from "@/components/action-buttons/CreatePostRedirect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CommunityPageLoader from "@/components/loaders/CommunityPageLoader";

async function CommunitAccessCheckerAndRenderer({
  communityId,
}: {
  communityId: string;
}) {
  try {
    const res = await getCommunityById(communityId);

    if (res.success) {
      if (res.community!.isPublic) {
        // Public Community
        if (res.role === "admin") {
          return (
            <>
              <CommunityHeader
                image={res.community.photo}
                name={res.community.name}
                desc={res.community.description}
                memberCount={res.community.membersCount}
              />
              <section className="w-full flex justify-center sm:justify-end p-4">
                <Button asChild className="w-full sm:w-fit">
                  <Link href="/create-post">Create community post</Link>
                </Button>
              </section>
              <section className="min-h-[60vh]">
                <p>Access to delete any post</p>
                <p>Members access</p>
                <p>Manage members</p>
                <p>Access to community settings</p>

                <div className="h-44 text-xl font-bold">Posts</div>
              </section>
            </>
          );
        } else if (res.role === "member") {
          return (
            <>
              <CommunityHeader
                image={res.community.photo}
                name={res.community.name}
                desc={res.community.description}
                memberCount={res.community.membersCount}
              />
              <section className="w-full flex justify-center sm:justify-end p-4">
                <Button asChild className="w-full sm:w-fit">
                  <Link href="/create-post">Create community post</Link>
                </Button>
              </section>
              <section className="min-h-[60vh]">
                <div>Public Community - Member</div>
                <div className="h-44 text-xl font-bold">Posts</div>
              </section>
            </>
          );
        } else if (res.role === "visitor") {
          return (
            <>
              <CommunityHeader
                image={res.community.photo}
                name={res.community.name}
                desc={res.community.description}
                memberCount={res.community.membersCount}
              />
              <section className="w-full flex justify-center p-4">
                <JoinCommunity
                  communityId={res.community._id}
                  isPublic={res.community.isPublic}
                />
              </section>
              <section className="min-h-[60vh]">
                <div>Public Community - Visitor</div>
                <div className="h-44 text-xl font-bold">Posts</div>
              </section>
            </>
          );
        }
      } else {
        // Private Community
        if (res.role === "admin") {
          return (
            <>
              <CommunityHeader
                image={res.community.photo}
                name={res.community.name}
                desc={res.community.description}
                memberCount={res.community.membersCount}
              />
              <section className="w-full flex justify-center sm:justify-end p-4">
                <Button asChild className="w-full sm:w-fit">
                  <Link href="/create-post">Create community post</Link>
                </Button>
              </section>
              <section className="min-h-[60vh]">
                <p>Access to delete any post</p>
                <p>Members access</p>
                <p>Manage members</p>
                <p>Access to community settings</p>
                <p>Access to join requests</p>

                <div className="h-44 text-xl font-bold">Posts</div>
              </section>
            </>
          );
        } else if (res.role === "member") {
          return (
            <>
              <CommunityHeader
                image={res.community.photo}
                name={res.community.name}
                desc={res.community.description}
                memberCount={res.community.membersCount}
              />
              <section className="w-full flex justify-center sm:justify-end p-4">
                <Button asChild className="w-full sm:w-fit">
                  <Link href="/create-post">Create community post</Link>
                </Button>
              </section>
              <section className="min-h-[60vh]">
                <div>Private Community</div>
                <div className="font-bold">Member</div>
                <div className="h-44 text-xl font-bold">Posts</div>
              </section>
            </>
          );
        } else if (res.role === "visitor") {
          return (
            <>
              <CommunityHeader
                image={res.community.photo}
                name={res.community.name}
                desc={res.community.description}
                memberCount={res.community.membersCount}
              />
              <section className="min-h-[60vh] grid content-center">
                <JoinCommunity
                  communityId={res.community._id}
                  isPublic={res.community.isPublic}
                />
              </section>
            </>
          );
        }
      }
    } else {
      return (
        <div className="p-6 rounded-2xl bg-destructive/30 border border-destructive text-red-500 font-semibold">
          <p>{res.message}</p>
        </div>
      );
    }
  } catch (error: any) {
    return (
      <div className="p-6 rounded-2xl bg-destructive/30 border border-destructive text-red-500 font-semibold">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-destructive/30 border border-destructive text-red-500 text-2xl font-bold">
      <p>Who the hell are you...!!!</p>
    </div>
  );
}

export default function SpecificCommunity({
  params,
}: {
  params: { comId: string };
}) {
  return (
    <main className="flex-1 mb-24">
      <Suspense fallback={<CommunityPageLoader />}>
        <CommunitAccessCheckerAndRenderer communityId={params.comId} />
      </Suspense>
    </main>
  );
}
