import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "./db";
import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client), // MongoDB Adapter for user/account management
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("User attempting sign-in:", user);

      try {
        await connect_db();

        const existingUser = await UserAccount.findOne({ email: user.email });
        console.log("Existing user in database:", existingUser);

        if (!existingUser) {
          // Create a user in the `UserAccount` collection
          await UserAccount.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
          });
          console.log("New user synced to UserAccount collection");
        }

        // Do NOT manually create users here, let MongoDB Adapter handle it.
        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false; // Deny sign-in on error
      }
    },

    async session({ session, user }) {
      // Enrich session with additional user details
      try {
        await connect_db();
        const dbUser = await UserAccount.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.role = dbUser.role; // Add role to session
        }
        return session;
      } catch (error) {
        console.error("Error enriching session:", error);
        return session;
      }
    },
  },
  session: {
    strategy: "jwt", // Use JWT instead of database sessions
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
};
