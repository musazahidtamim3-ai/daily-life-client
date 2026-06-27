import { serverFetch } from "@/lib/core/server"

export const getLessons = async (page = 1, limit = 4, search = "", category = "", emotionalTone = "") => {
     return await serverFetch(`/api/lessons?page=${page}&limit=${limit}&search=${search}&category=${category}&emotionalTone=${emotionalTone}`);
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