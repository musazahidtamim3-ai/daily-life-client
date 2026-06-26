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

export const getReportedLessons = async () => {
     const res = await fetch(`http://localhost:5000/api/lessons/report`);
     return res.json();
}