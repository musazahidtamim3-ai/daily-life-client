'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { UpdateLikeCount } from '@/lib/actions/update/lesson';

export function LikeButton({ lesson }) {
     const { data: session, isPending } = authClient.useSession();
     const user = session?.user;

     const [isLiked, setIsLiked] = useState(false);
     const [likesCount, setLikesCount] = useState(lesson?.likesCount || 0);

     useEffect(() => {
          if (user) {
               const currentUserId = user.id || user._id;
               setIsLiked(lesson?.likes?.includes(currentUserId) || false);
          }
     }, [user, lesson]);

     const handleLike = async () => {
          if (!user) {
               toast.error("Please log in to like this lesson!");
               return;
          }

          try {
               // Optimistic UI Update
               const updatedIsLiked = !isLiked;
               setIsLiked(updatedIsLiked);
               setLikesCount(prev => updatedIsLiked ? prev + 1 : prev - 1);

               const data = await UpdateLikeCount(lesson._id, user);

               if (!data || !data.success) {
                    setIsLiked(isLiked);
                    setLikesCount(prev => updatedIsLiked ? prev - 1 : prev + 1);
                    toast.error("Failed to update database");
               } else {
                    toast.success(updatedIsLiked ? "Liked successfully!" : "Like removed!");
               }
          } catch (error) {
               toast.error("Something went wrong");
          }
     };

     return (
          <div>
               

               <button
                    onClick={handleLike}
                    disabled={isPending}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition active:scale-95 ${isLiked
                              ? "bg-rose-950/30 text-rose-400 border-rose-900/50"
                              : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                         }`}
               >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                    {isPending ? "Loading..." : isLiked ? "Liked" : "Like"}
               </button>
          </div>
     );
}