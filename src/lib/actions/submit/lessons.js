import { serverMutation } from "@/lib/core/server"

export const submitLessons = async (newLessonData) => {
     return serverMutation("/api/lessons", newLessonData)
}

export const reportLesson = async ({lessonId, lessonTitle, lessonImageUrl, reason, reporterUserId, reporterEmail, createdAt}) => {
     const res = await fetch(`https://daily-life-server.vercel.app/api/lessons/report`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({
               lessonId, lessonTitle,lessonImageUrl, reason, reporterUserId, reporterEmail, createdAt
          })
     });
     
     return res.json();
};


     