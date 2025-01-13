import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import mongoose from "mongoose";
import connect_db from "@/config/db";
import client from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        await connect_db();

        const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({ email: String, password: String }));
        const user = await User.findOne({ email });

        if (user && user.password === password) {
          return { id: user._id.toString(), email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// The handler should use NextAuth's default API handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
