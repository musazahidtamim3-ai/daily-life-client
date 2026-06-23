export const updateUserRole = async (userId, newRole) => {
     
          const response = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({ role: newRole }),
          });

          if (!response.ok) {
               throw new Error('Failed to update user role');
          }

          return response.json();
};