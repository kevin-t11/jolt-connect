import { authConfigs } from "@/lib/auth"
import nextAuth from "next-auth"

const handler = nextAuth(authConfigs)

export { handler as GET, handler as POST }