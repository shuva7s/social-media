"use server";

import { Types } from "mongoose";
import Community from "../database/models/community.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { userInfo } from "./userInfo.action";
import { revalidatePath } from "next/cache";

interface communityDataProp {
  name: string;
  description: string;
  photo: string;
  isPublic: boolean;
}

export async function createCommunity({
  name,
  description,
  photo,
  isPublic,
}: communityDataProp) {
  try {
    const { userId, userName, userMail } = await userInfo();
    await connectToDatabase();

    if (!userId || !userMail || !userName) {
      return {
        success: false,
        message: "User IDs not found",
      };
    }

    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Create the community with the isPublic property
    const newCom = await Community.create({
      name,
      description,
      photo,
      isPublic, // Store the privacy setting
    });

    if (!newCom) {
      return {
        success: false,
        message: "Community not created",
      };
    }
    newCom.members.push({ _id: user._id, role: "admin" });
    user.communities.push({ _id: newCom._id, role: "admin" });

    await newCom.save();
    await user.save();

    return {
      success: true,
      key: newCom._id.toString(),
    };
  } catch (error: any) {
    console.dir(error);
    if (error.code === 11000) {
      return {
        success: false,
        message: "Community name already exists",
      };
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getCommunities(page = 1, searchParam = "", limit = 5) {
  try {
    const query = searchParam
      ? {
          $or: [
            { name: { $regex: searchParam, $options: "i" } },
            { description: { $regex: searchParam, $options: "i" } },
          ],
        }
      : {};

    const skip = (page - 1) * limit;

    const communities = await Community.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("_id name description photo members isPublic")
      .lean();

    const communitiesWithMemberCount = communities.map((community) => ({
      ...community,
      members: community.members.length, // Count of members
    }));

    const totalCommunities = await Community.countDocuments(query);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(communitiesWithMemberCount)),
      totalPages: Math.ceil(totalCommunities / limit) || 0, // Default to 0 if undefined
      currentPage: page,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error fetching communities",
    };
  }
}

// export async function getCommunityById(communityId: string) {
//   try {
//     if (!Types.ObjectId.isValid(communityId)) {
//       return { success: false, message: "Invalid community ID format" };
//     }

//     const { userId, userName, userMail } = await userInfo();
//     if (!userId || !userMail || !userName) {
//       return { success: false, message: "Error fetching your data" };
//     }

//     await connectToDatabase();

//     // Fetch the user
//     const user = await User.findOne({
//       email: userMail,
//       username: userName,
//       clerkId: userId,
//     });

//     if (!user) {
//       return { success: false, message: "User not found" };
//     }

//     // Fetch the community data without including the full members array
//     const community = await Community.findById(communityId).select(
//       "_id name description photo members isPublic"
//     );

//     if (!community) {
//       return { success: false, message: "Community not found" };
//     }

//     // Count the number of members in the community
//     const membersCount = community.members.length;

//     // Check if the user is a member of the community and their role
//     const membership = community.members.find((member: any) =>
//       member._id.equals(user._id)
//     );

//     if (membership) {
//       // If the user is an admin
//       if (membership.role === "admin") {
//         return {
//           success: true,
//           role: "admin",
//           community: {
//             _id: community._id,
//             name: community.name,
//             description: community.description,
//             photo: community.photo,
//             isPublic: community.isPublic,
//             membersCount, // Send only the count of members
//           },
//         };
//       }
//       if (membership.role === "editor") {
//         return {
//           success: true,
//           role: "editor",
//           community: {
//             _id: community._id,
//             name: community.name,
//             description: community.description,
//             photo: community.photo,
//             isPublic: community.isPublic,
//             membersCount, // Send only the count of members
//           },
//         };
//       } else {
//         // If the user is a member
//         return {
//           success: true,
//           role: "member",
//           community: {
//             _id: community._id,
//             name: community.name,
//             description: community.description,
//             photo: community.photo,
//             isPublic: community.isPublic,
//             membersCount, // Send only the count of members
//           },
//         };
//       }
//     } else {
//       // If the user is a visitor (not a member)
//       return {
//         success: true,
//         role: "visitor",
//         community: {
//           _id: community._id,
//           name: community.name,
//           description: community.description,
//           photo: community.photo,
//           isPublic: community.isPublic,
//           membersCount, // Send only the count of members
//         },
//       };
//     }
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "An error occurred while fetching the community",
//     };
//   }
// }

export async function getCommunityById(communityId: string) {
  try {
    if (!Types.ObjectId.isValid(communityId)) {
      return { success: false, message: "Invalid community ID format" };
    }

    const { userId, userName, userMail } = await userInfo();
    if (!userId || !userMail || !userName) {
      return { success: false, message: "Error fetching your data" };
    }

    await connectToDatabase();

    // Fetch the user
    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Fetch the community data without including the full members array
    const community = await Community.findById(communityId).select(
      "_id name description photo members isPublic joinRequests"
    );

    if (!community) {
      return { success: false, message: "Community not found" };
    }

    // Count the number of members in the community
    const membersCount = community.members.length;

    // Check if the user is a member of the community and their role
    const membership = community.members.find((member: any) =>
      member._id.equals(user._id)
    );

    // Determine if the user can send a join request
    let canSendReq = false;
    if (!membership && !community.isPublic) {
      // If the user is not a member and the community is private, check if they've already requested to join
      const hasPendingRequest = community.joinRequests.some((req: any) =>
        req.equals(user._id)
      );
      canSendReq = !hasPendingRequest; // User can send request if they haven't already
    }

    if (membership) {
      // If the user is an admin
      if (membership.role === "admin") {
        return {
          success: true,
          role: "admin",
          canSendReq: false, // Admins can't send join requests
          community: {
            _id: community._id,
            name: community.name,
            description: community.description,
            photo: community.photo,
            isPublic: community.isPublic,
            membersCount, // Send only the count of members
          },
        };
      }
      if (membership.role === "editor") {
        return {
          success: true,
          role: "editor",
          canSendReq: false, // Editors can't send join requests
          community: {
            _id: community._id,
            name: community.name,
            description: community.description,
            photo: community.photo,
            isPublic: community.isPublic,
            membersCount, // Send only the count of members
          },
        };
      } else {
        // If the user is a member
        return {
          success: true,
          role: "member",
          canSendReq: false, // Members can't send join requests
          community: {
            _id: community._id,
            name: community.name,
            description: community.description,
            photo: community.photo,
            isPublic: community.isPublic,
            membersCount, // Send only the count of members
          },
        };
      }
    } else {
      // If the user is a visitor (not a member)
      return {
        success: true,
        role: "visitor",
        canSendReq, // Visitor can send a request if conditions are met
        community: {
          _id: community._id,
          name: community.name,
          description: community.description,
          photo: community.photo,
          isPublic: community.isPublic,
          membersCount, // Send only the count of members
        },
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: "An error occurred while fetching the community",
    };
  }
}

export async function joinCommunity(communityId: string, isPublic: boolean) {
  try {
    console.log("join function called");
    const { userId, userName, userMail } = await userInfo();
    if (!userId || !userMail || !userName) {
      return { success: false, message: "Error fetching your data" };
    }

    await connectToDatabase();

    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    const community = await Community.findById(communityId);

    if (!community) {
      return { success: false, message: "Community not found" };
    }

    const isMember = community.members.some((member: any) =>
      member._id.equals(user._id)
    );
    if (isMember) {
      return {
        success: false,
        message: "You are already a member of this community",
      };
    }

    if (isPublic) {
      community.members.push({ _id: user._id, role: "member" });
      user.communities.push(community._id);
    } else {
      community.joinRequests.push(user._id);
    }

    await community.save();
    await user.save();

    revalidatePath(`/community/${communityId}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while joining the community",
    };
  }
}
