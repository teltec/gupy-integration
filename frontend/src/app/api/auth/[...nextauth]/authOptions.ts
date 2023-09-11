import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";

async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token?`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        `grant_type=refresh_token` +
        `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET}` +
        `&refresh_token=${token.refreshToken}` +
        `&client_id=${process.env.AZURE_AD_CLIENT_ID}`,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          // scope: `openid email profile api://${process.env.AZURE_AD_CLIENT_ID}/access_as_user`,
          scope: `openid email profile offline_access api://${process.env.AZURE_AD_CLIENT_ID}/access_as_user`,
        },
      },
    }),
  ],
  debug: false,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 1 semana
  },
  pages: {
    error: "/accessDenied",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        //@ts-ignore
        token.accessTokenExpires = account.expires_at * 1000;
        token.refreshToken = account.refresh_token;
      }

      // return token
      //@ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        return token;
      } else {
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
