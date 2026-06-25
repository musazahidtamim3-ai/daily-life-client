export const UpdateLikeCount = async (lessonId, currentUser) => {
     try {
          const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}/like`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({ userId: currentUser.id }),
          });

          return response.json();
     } catch (error) {
          console.error("Fetch Error:", error);
          throw error;
     }
};

export const UpdateSaveCount = async (lessonId, currentUser) => {
     try {
          const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}/save`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({ userId: currentUser.id }),
          });

          return response.json();
     } catch (error) {
          console.error("Fetch Error:", error);
          throw error;
     }
};

export const addComment = async (lessonId, text, currentUser) => {
     const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/comments`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({
               userId: currentUser.id,
               userName: currentUser.name,
               userImage: currentUser.image,
               text,
          }),
          
     });
     return res.json();
};


export const updateFeaturedLessons = async (lessonId, userId) => {
     try {
          const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}/featured`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({ userId }),
          });

          if (!response.ok) {
               const errorData = await response.json().catch(() => ({}));
               throw new Error(errorData.message || 'Failed to update featured status');
          }

          return response.json();
     } catch (error) {
          console.error("Fetch Error:", error);
          throw error;
     }
};