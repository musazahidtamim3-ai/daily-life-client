export const UpdateLikeCount = async (lessonId, currentUser) => {
     try {
          const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}/like`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({ userId: currentUser.id }),
          });

          const data = await response.json();
          return data;
     } catch (error) {
          console.error("Fetch Error:", error);
          throw error;
     }
};