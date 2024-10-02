"use server";

import Community from "../database/models/community.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { userInfo } from "./userInfo.action";

type communityDataProp = {
  name: string;
  description: string;
  photo: string;
};

export async function createComunity({
  name,
  description,
  photo,
}: communityDataProp) {
  try {
    await connectToDatabase();

    const { userId, userName, userMail } = await userInfo();

    if (!userId || !userMail || !userName) {
      return {
        success: false,
        message: "idnf",
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
        message: "unf",
      };
    }

    const newCom = await Community.create({
      name,
      description,
      photo,
    });

    if (!newCom) {
      return {
        success: false,
        message: "community-not-created",
      };
    }

    newCom.members.push({ _id: user._id, role: "admin" });
    await newCom.save();

    return {
      success: true,
      key: newCom._id.toString(),
    };
  } catch (error: any) {
    console.dir(error);
    let errorMessage = "Something went wrong";
    if (error.code === 11000) {
      errorMessage = `Community name ${name} already exists`;
    }
    return {
      success: false,
      message: "swr",
      err: errorMessage,
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
      .select("_id name description photo members")
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
