import { serverMutation } from "@/lib/core/server"

export const submitLessons = async (newLessonData) => {
     return serverMutation("/api/lessons", newLessonData)
}

export const reportLesson = async (lessonId, reporterUserId, reporterEmail, reason, createdAt) => {
     const res = await fetch(`http://localhost:5000/api/lessons/report`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
               lessonId, reporterUserId, reporterEmail, reason, createdAt
          })
     });
     
     return res.json();
};


     