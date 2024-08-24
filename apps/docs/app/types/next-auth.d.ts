import "next-auth/jwt"
import "next-auth"

import { type DefaultSession } from "next-auth"

declare module "next-auth/jwt" {
  interface Session {
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"]
  }
}