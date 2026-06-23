import { serverFetch } from "@/lib/core/server"

export const getUsers = async () => {
     return await serverFetch("/api/users")
}