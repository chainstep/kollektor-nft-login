import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import KollektorProvider from "../../../provider/kollektor";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.sub;
        token.email = profile.email;
        token.picture = profile.image;
        token.name = profile.name;
        console.log("token", token);
      }
      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        user: {
          id: token.sub,
          image: token.image || "",
          name: token.name,
          ...session.user,
        },
      } as any;
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    KollektorProvider({
      clientId: process.env.KOLLEKTOR_ID,
      clientSecret: process.env.KOLLEKTOR_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
