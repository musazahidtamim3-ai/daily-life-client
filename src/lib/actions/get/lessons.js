import { serverFetch } from "@/lib/core/server"

export const getLessons = async() => {
     return await serverFetch("/api/lessons")
}

export const getLessonById = async (lessonId) => {
     return await serverFetch(`/api/lessons/${lessonId}`);
}