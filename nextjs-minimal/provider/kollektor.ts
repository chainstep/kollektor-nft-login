import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
const __DEV__ = process.env.NODE_ENV === "development";
export interface KollektorProfile extends Record<string, any> {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  user: any;
}

export default function Kollektor<P extends KollektorProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "kollektor",
    name: "Kollektor.io",
    ...oauthServerConfig,
    type: "oauth",
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.profilePicture,
        username: profile.username,
      };
    },
    style: {
      logo: "https://kollektor.io/images/high_res_klogo.png",
      logoDark: "",
      bg: "#fff",
      text: "#000",
      bgDark: "#fff",
      textDark: "#000",
    },
    ...options,
  };
}

const oauthServerConfig = {
  authorization: {
    url: "https://oauth.kollektor.io/authorize",
    params: { scope: "edition-427988a5-fdd1-49f6-a1fc-a13105775856" },
  },
  token: "https://oauth.kollektor.io/token",
  userinfo: "https://oauth.kollektor.io/user/me",
};
