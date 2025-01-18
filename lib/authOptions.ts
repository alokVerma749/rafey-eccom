import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "./db";
import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connect_db();
        const existingUser = await UserAccount.findOne({ email: user.email });
        console.log('Existing user:', existingUser);

        if (!existingUser) {
          try {
            await UserAccount.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: 'user',
            });
            console.log('New user created successfully');
          } catch (createError) {
            console.error('Error creating new user:', createError);
            return false;
          }
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
