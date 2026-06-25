'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { UpdateSaveCount } from '@/lib/actions/update/lesson';

export function SavedButton({ lesson, onSaveChange }) {
     const { data: session, isPending } = authClient.useSession();
     const user = session?.user;
     const currentUserId = user?.id || user?._id;

     const [isSaved, setIsSaved] = useState(false);
     const [savesCount, setSavesCount] = useState(lesson?.savesCount || 0);

     useEffect(() => {
          if (lesson) {
               setSavesCount(lesson.savesCount || 0); 
          }
          if (currentUserId && lesson?.saves) {
               setIsSaved(lesson.saves.includes(currentUserId));
          }
     }, [currentUserId, lesson?._id, lesson?.likesCount]); 

     const handleSave = async () => {
          if (!user) {
               toast.error("Please log in to like this lesson!");
               return;
          }

          const prevIsSaved = isSaved;
          const prevCount = savesCount;

          try {
               const updatedIsSaved = !prevIsSaved;
               setIsSaved(updatedIsSaved);
               setSavesCount(updatedIsSaved ? prevCount + 1 : prevCount - 1);

               const data = await UpdateSaveCount(lesson._id, user);

               if (!data?.success) {
                    setIsSaved(prevIsSaved);
                    setSavesCount(prevCount);
                    toast.error("Failed to update like");
               } else {
                    setIsSaved(data.isSaved);
                    onSaveChange?.(data.savesCount);
                    toast.success(data.isSaved ? "Saved!" : "Save removed!");
               }
          } catch (error) {
               setIsSaved(prevIsSaved);
               setSavesCount(prevCount);
               toast.error("Something went wrong");
          }
     };

     return (
          <div>
               <button
                    onClick={handleSave}
                    disabled={isPending}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition active:scale-95 ${isSaved
                              ? "bg-indigo-950/30 text-indigo-400 border-indigo-900/50"
                              : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                         }`}
               >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-indigo-500 text-indigo-500" : ""}`} />
                    {isPending ? "Loading..." : isSaved ? "Saved" : "Save"}
                    <span className="ml-1">({savesCount})</span>
               </button>
          </div>
     );
}