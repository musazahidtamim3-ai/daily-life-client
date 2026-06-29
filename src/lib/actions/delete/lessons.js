export const deleteReportedLesson = async (lessonId) => {
     const res = await fetch(`https://daily-life-server.vercel.app/api/lessons/${lessonId}`, {
          method: 'DELETE'
     });
     return res.json();
};

export const deleteReport = async (lessonId) => {
     const res = await fetch(`https://daily-life-server.vercel.app/api/lessons/report/${lessonId}`, {
          method: 'DELETE',
     });
     return res.json();
};