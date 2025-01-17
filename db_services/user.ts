'use server'

import connect_db from "@/config/db";
import User from "@/models/user_model";

interface addressUpdateProps {
  address?: string;
  pincode?: string;
  phone?: string;
}

export const getUser = async (email: string) => {
  console.log(email, '###');
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
    const user = await User.findOneAndUpdate({ email }, data, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.stringify(user);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};
