"use server"
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
     try {
          const nextHeaders = await headers();
          const nextCookies = await cookies();

          const cookieString = nextCookies.toString();

          if (!cookieString) return null;

          const response = await fetch(`http://localhost:5000/api/auth/get-session`, {
               method: "GET",
               headers: {
                    ...Object.fromEntries(nextHeaders.entries()),
                    "cookie": cookieString 
               },
               cache: "no-store"
          });

          if (!response.ok) return null;

          const sessionData = await response.json();

          return sessionData?.data?.user || sessionData?.user || null;

     } catch (error) {
          console.error(" Route Handler Session Fetch Error:", error.message);
          return null;
     }
};

export const requiredRole = async (role) => {
     const user = await getUserSession();
     if (!user) {
          redirect("/auth/login");
     }
     if (!user || user.role !== role) {
          redirect("/unauthorized");
     }
     return user;

}