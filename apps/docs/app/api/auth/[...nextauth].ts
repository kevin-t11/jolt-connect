import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(NEXT_AUTH_CONFIG as any);

export { handler as GET, handler as POST };
