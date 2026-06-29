"use server"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
     try {
          const session = await auth.api.getSession({
               headers: await headers()
          });
          return session?.user || null 
     } catch (error) {
          return null
     }
};

export const requiredRole = async (role) => {
     const user = await getUserSession();

     if (!user) {
          redirect("/auth/login");
     }
     if (user.role !== role) {
          redirect("/unauthorized");
     }
     return user;
}