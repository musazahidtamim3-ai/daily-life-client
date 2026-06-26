export const deleteReportedLesson = async (lessonId) => {
     const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
          method: 'DELETE',
     });
     return res.json();
};

export const deleteReport = async (lessonId) => {
     const res = await fetch(`http://localhost:5000/api/lessons/report/${lessonId}`, {
          method: 'DELETE',
     });
     return res.json();
};