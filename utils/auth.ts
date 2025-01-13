import { AuthOptions } from "next-auth";
import { Session, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user_model";
import connect_db from "@/config/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      await connect_db();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // Create a new user if they don't already exist
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true; // Allow sign-in
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Attach additional data to the session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.sub = user.id; // Attach user ID to token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

/**
 * Helper function to get the session on the server without importing `authOptions` every time.
 * @returns {Promise<Session | null>} The session object or null
 */
const getSession = (): Promise<Session | null> =>
  import("next-auth").then(({ getServerSession }) => getServerSession(authOptions));

export { authOptions, getSession };
