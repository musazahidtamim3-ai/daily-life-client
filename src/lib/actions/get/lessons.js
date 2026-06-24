import { serverFetch } from "@/lib/core/server"

export const getLessons = async() => {
     return await serverFetch("/api/lessons")
}

export const getLessonById = async (lessonId) => {
     return await serverFetch(`/api/lessons/${lessonId}`);
}

export const getLessonByUserId = async (creatorId) => {
     return await serverFetch(`/api/my-lessons/${creatorId}`);
}

export const getFeaturedLessons = async () => {
     return await serverFetch("/api/lessons/featured");
}