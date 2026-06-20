import { serverFetch } from "@/lib/core/server"

export const getLessons = async() => {
     return await serverFetch("/api/lessons")
}