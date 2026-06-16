import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Mounts Better Auth's engine onto Next.js App Router GET and POST handlers
export const { POST, GET } = toNextJsHandler(auth);
