'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { UpdateLikeCount } from '@/lib/actions/update/lesson';

export function LikeButton({ lesson, onLikeChange }) {
     const { data: session, isPending } = authClient.useSession();
     const user = session?.user;
     const currentUserId = user?.id || user?._id;

     const [isLiked, setIsLiked] = useState(false);
     const [likesCount, setLikesCount] = useState(lesson?.likes?.length || 0);
     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          if (lesson?.likes) {
               setLikesCount(lesson.likes.length);
               if (currentUserId) {
                    setIsLiked(lesson.likes.includes(currentUserId));
               }
          }
     }, [currentUserId, lesson?._id]);

     const handleLike = async () => {
          if (!user || isLoading) return;

          const prevIsLiked = isLiked;
          const prevCount = likesCount;
          setIsLoading(true);

          setIsLiked(!prevIsLiked);
          setLikesCount(!prevIsLiked ? prevCount + 1 : prevCount - 1);

          try {
               const data = await UpdateLikeCount(lesson._id, user);

               if (!data?.success) {
                    setIsLiked(prevIsLiked);
                    setLikesCount(prevCount);
                    toast.error("Failed to update like");
               } else {
                    setIsLiked(data.isLiked);
                    setLikesCount(data.likesCount);
                    onLikeChange?.(data.likesCount);
                    toast.success(data.isLiked ? "Liked!" : "Like removed!");
               }
          } catch (error) {
               setIsLiked(prevIsLiked);
               setLikesCount(prevCount);
               toast.error("Something went wrong");
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <div className="flex items-center gap-2">
                              <button
                    onClick={handleLike}
                    disabled={isPending || isLoading}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition active:scale-95 ${isLiked
                              ? "bg-rose-950/30 text-rose-400 border-rose-900/50"
                              : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                         }`}
               >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                    {isLoading ? "..." : isLiked ? "Liked" : "Like"}
               </button>
          </div>
     );
}