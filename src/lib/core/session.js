"use server";
import { headers } from "next/headers";
import { auth } from "../auth"; 

export const getUserSession = async () => {
     try {
          const nextHeaders = await headers();

          const session = await auth.api.getSession({
               headers: nextHeaders
          });

          return session?.user || null;
     } catch (error) {
          console.error("Auth Session Error:", error);
          return null;
     }
};