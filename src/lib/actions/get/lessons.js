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

export async function getMostSavedLessons() {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/most-saved`, {
          cache: 'no-store'
     });
     const json = await res.json();
     return json.data?.slice(0, 2) || [];
}

export const getReportedLessons = async () => {
     const res = await fetch(`https://daily-life-server.vercel.app/api/lessons/report`);
     return res.json();
}