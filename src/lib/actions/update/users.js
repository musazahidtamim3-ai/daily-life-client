export const updateUserRole = async (userId, newRole) => {
     
     const response = await fetch(`https://daily-life-server.vercel.app/api/users/${userId}/role`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({ role: newRole }),
          });

          if (!response.ok) {
               throw new Error('Failed to update user role');
          }

          return response.json();
};