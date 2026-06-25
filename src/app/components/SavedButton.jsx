'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { UpdateSaveCount } from '@/lib/actions/update/lesson';
import { toast } from 'react-toastify';

export function SavedButton({ lesson, onSaveChange }) {
     const { data: session, isPending } = authClient.useSession();
     const user = session?.user;
     const currentUserId = user?.id || user?._id;

     const [isSaved, setIsSaved] = useState(false);
     const [savesCount, setSavesCount] = useState(lesson?.saves?.length || 0);
     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          if (lesson?.saves) {
               setSavesCount(lesson.saves.length);
               if (currentUserId) {
                    setIsSaved(lesson.saves.includes(currentUserId));
               }
          }
     }, [currentUserId, lesson?._id]);

     const handleSave = async () => {
          if (!user || isLoading) return;

          const prevIsSaved = isSaved;
          const prevCount = savesCount;
          setIsLoading(true);

          setIsSaved(!prevIsSaved);
          setSavesCount(!prevIsSaved ? prevCount + 1 : prevCount - 1);

          try {
               const data = await UpdateSaveCount(lesson._id, user);

               if (!data?.success) {
                    setIsSaved(prevIsSaved);
                    setSavesCount(prevCount);
                    toast.error("Failed to update like");
               } else {
                    setIsSaved(data.isSaved);
                    setSavesCount(data.savesCount);
                    onSaveChange?.(data.savesCount);
                    toast.success(data.isSaved ? "Saved!" : "Save removed!");
               }
          } catch (error) {
               setIsSaved(prevIsSaved);
               setSavesCount(prevCount);
               toast.error("Something went wrong");
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <div className="flex items-center gap-2">
                              <button
                    onClick={handleSave}
                    disabled={isPending || isLoading}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition active:scale-95 ${isSaved
                              ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                              : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                         }`}
               >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-indigo-500 text-indigo-500" : ""}`} />
                    {isLoading ? "..." : isSaved ? "Saved" : "Save"}
               </button>
          </div>
     );
}