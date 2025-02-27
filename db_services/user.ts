'use server'

import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";
import User from "@/models/user_model";

interface addressUpdateProps {
  address?: string;
  pincode?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
}

export const getUserAccount = async (email: string) => {
  await connect_db();
  try {
    const user = await UserAccount.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.stringify(user);
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
};

export const getUser = async (email: string) => {
  await connect_db();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.stringify(user);
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
};

export const updateUser = async (email: string, data: addressUpdateProps) => {
  await connect_db();
  try {
    const user = await UserAccount.findOneAndUpdate({ email }, { $set: data }, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.stringify(user);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};
