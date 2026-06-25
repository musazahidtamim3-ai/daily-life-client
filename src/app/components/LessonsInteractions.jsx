'use client';

import { useState } from 'react';
import { Heart, Bookmark, Eye, TriangleExclamation } from '@gravity-ui/icons';
import { LikeButton } from './LikeButton';
import { SavedButton } from './SavedButton';

export function LessonInteractions({ lesson, viewsCount }) {
     const [likesCount, setLikesCount] = useState(lesson?.likes?.length || 0);

     return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl shadow-inner">

               {/* Left Side Stats */}
               <div className="flex items-center gap-5 text-xs font-semibold text-zinc-400">
                    <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-900 text-rose-400">
                         <Heart className="w-4 h-4 fill-rose-500/10" /> {likesCount} Likes
                    </span>
                    <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-900 text-indigo-400">
                         <Bookmark className="w-4 h-4" /> {lesson.favoritesCount || 0} Saved
                    </span>
                    <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-900 text-zinc-400">
                         <Eye className="w-4 h-4" /> {viewsCount} Views
                    </span>
               </div>

               {/* Right Side Buttons */}
               <div className="flex items-center gap-2">
                    <LikeButton lesson={lesson} onLikeChange={setLikesCount} />
                    <SavedButton lesson={lesson} />
                    <button className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-900/50 hover:bg-red-950/30 text-zinc-500 hover:text-red-400 border border-zinc-800 hover:border-red-900/50 transition-all duration-200">
                         <TriangleExclamation className="w-4 h-4" />
                    </button>
               </div>
          </div>
     );
}