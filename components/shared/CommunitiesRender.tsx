// "use client";

// import { useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { getCommunities } from "@/lib/actions/community.actions";
// import { ICommunityFrontEnd } from "@/lib/database/models/community.model";

// const CommunitiesRender = () => {
//   const [searchParam, setSearchParam] = useState("");
//   const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
//   const [communities, setCommunities] = useState<ICommunityFrontEnd[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Debounce effect to delay API call until user stops typing
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchParam(searchParam);
//     }, 500);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [searchParam]);

//   useEffect(() => {
//     const fetchCommunities = async () => {
//       setLoading(true);
//       try {
//         const res = await getCommunities(page, debouncedSearchParam);
//         if (res.success) {
//           setCommunities(res.data);
//           setTotalPages(res.totalPages);
//         }
//       } catch (error) {
//         console.error("Error fetching communities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommunities();
//   }, [page, debouncedSearchParam]);

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchParam(e.target.value);
//     setPage(1);
//   };

//   // Handle "Load More" button click
//   const handleLoadMore = () => {
//     if (page < totalPages) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <section className="w-full p-4">
//       <Input
//         placeholder="Search communities"
//         value={searchParam}
//         onChange={handleSearchChange}
//         className="mb-4"
//       />
//       <div className="flex flex-col gap-4">
//         {communities.length > 0 ? (
//           communities.map((community) => (
//             <div key={community._id}>
//               <p>{community.name}</p>
//               <p>{community.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No communities found.</p>
//         )}
//       </div>
//       {page < totalPages && (
//         <Button onClick={handleLoadMore} disabled={loading} className="mt-4">
//           {loading ? "Loading..." : "Load More"}
//         </Button>
//       )}
//     </section>
//   );
// };

// export default CommunitiesRender;
// "use client";
// import { useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { getCommunities } from "@/lib/actions/community.actions";
// import { ICommunityFrontEnd } from "@/lib/database/models/community.model";
// import Link from "next/link";
// import Image from "next/image";
// import { Image as ImageIcon } from "lucide-react";

// const CommunitiesRender = () => {
//   const [searchParam, setSearchParam] = useState("");
//   const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
//   const [communities, setCommunities] = useState<ICommunityFrontEnd[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchParam(searchParam);
//     }, 500);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [searchParam]);

//   useEffect(() => {
//     const fetchCommunities = async () => {
//       setLoading(true);
//       try {
//         const res = await getCommunities(page, debouncedSearchParam);
//         if (res.success) {
//           setCommunities(res.data);
//           setTotalPages(res.totalPages ?? 0); // Use optional chaining with a fallback
//         }
//       } catch (error) {
//         console.error("Error fetching communities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommunities();
//   }, [page, debouncedSearchParam]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchParam(e.target.value);
//     setPage(1);
//   };

//   const handleLoadMore = () => {
//     if (page < totalPages) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <section className="w-full my-4 ">
//       <Input
//         placeholder="Search communities"
//         value={searchParam}
//         onChange={handleSearchChange}
//         className="mb-4"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//         {communities.length > 0 ? (
//           communities.map((community) => (
//             <div
//               key={community._id}
//               className="border border-border/80 hover:border-border hover:bg-accent/60 transition-colors p-4 rounded-lg"
//             >
//               <Link href={`/communities/${community._id}`}>
//                 <div className="flex flex-row flex-wrap items-center gap-4">
//                   <div className="w-28 h-28 border rounded-full overflow-hidden flex justify-center items-center">
//                     {community.photo === "" ? (
//                       <ImageIcon className="w-10 h-10 opacity-50" />
//                     ) : (
//                       <Image
//                         src={community.photo}
//                         alt={community.name}
//                         width={80}
//                         height={80}
//                         priority
//                         className="object-cover w-full h-full"
//                       />
//                     )}
//                   </div>
//                   <div>
//                     <p className="text-lg font-bold mb-2">@{community.name}</p>
//                     <p className="text-muted-foreground">
//                       {community.description}
//                     </p>
//                     <p className="text-muted-foreground text-sm">
//                       Members: {community.members}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No communities found.</p>
//         )}
//       </div>
//       {page < totalPages && (
//         <Button onClick={handleLoadMore} disabled={loading} className="mt-4">
//           {loading ? "Loading..." : "Load More"}
//         </Button>
//       )}
//     </section>
//   );
// };

// export default CommunitiesRender;

"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCommunities } from "@/lib/actions/community.actions";
import { ICommunityFrontEnd } from "@/lib/database/models/community.model";
import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

const CommunitiesRender = () => {
  const [searchParam, setSearchParam] = useState("");
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [communities, setCommunities] = useState<ICommunityFrontEnd[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchParam(searchParam);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchParam]);

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const res = await getCommunities(page, debouncedSearchParam);
        if (res.success) {
          if (page === 1) {
            // On the first page, set the communities directly
            setCommunities(res.data);
          } else {
            // On subsequent pages, append new communities to the existing list
            setCommunities((prevCommunities) => [
              ...prevCommunities,
              ...res.data,
            ]);
          }
          setTotalPages(res.totalPages ?? 0); // Use optional chaining with a fallback
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [page, debouncedSearchParam]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
    setPage(1); // Reset page to 1 when search input changes
    setCommunities([]); // Clear existing communities on new search
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="w-full my-4 relative">
      <Input
        placeholder="Search communities"
        value={searchParam}
        onChange={handleSearchChange}
        className="mb-4 py-6 rounded-2xl border-none bg-accent dark:bg-accent/60 max-w-2xl"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-32">
        {communities.length > 0 ? (
          communities.map((community) => (
            <div
              key={community._id}
              className="border border-border/80 hover:border-border hover:bg-accent/60 transition-colors p-4 rounded-lg"
            >
              <Link href={`/communities/${community._id}`}>
                <div className="flex flex-row flex-wrap items-center gap-4">
                  <div className="w-28 h-28 border rounded-full overflow-hidden flex justify-center items-center">
                    {community.photo === "" ? (
                      <ImageIcon className="w-10 h-10 opacity-50" />
                    ) : (
                      <Image
                        src={community.photo}
                        alt={community.name}
                        width={80}
                        height={80}
                        priority
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-2">@{community.name}</p>
                    <p className="text-muted-foreground">
                      {community.description}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Members: {community.members}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No communities found.</p>
        )}
        {searchParam === "" && (
          <div className="absolute h-32 bottom-0 w-full fade pointer-events-none" />
        )}
        {/* <div className="absolute h-32 bottom-0 w-full fade pointer-events-none" /> */}
      </div>
      {searchParam &&
        page < totalPages && ( // Only show "Load More" when searching
          <Button onClick={handleLoadMore} disabled={loading} className="mt-4">
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
    </section>
  );
};

export default CommunitiesRender;
