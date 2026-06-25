'use client';

import { useState } from 'react';
import { Heart, Bookmark, Eye } from '@gravity-ui/icons';
import { LikeButton } from './LikeButton';
import { SavedButton } from './SavedButton';
import { ReportModal } from './ReportModal';

export function LessonInteractions({ lesson, viewsCount }) {
     const [likesCount, setLikesCount] = useState(lesson?.likes?.length || 0);
     const [savesCount, setSavesCount] = useState(lesson?.saves?.length || 0);


     return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl shadow-inner">

               {/* Left Side Stats */}
               <div className="flex items-center gap-5 text-xs font-semibold text-zinc-400">
                    <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-900 text-rose-400">
                         <Heart className="w-4 h-4 fill-rose-500/10" /> {likesCount} Likes
                    </span>
                    <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-900 text-indigo-400">
                         <Bookmark className="w-4 h-4" /> {savesCount} Saves
                    </span>
                    <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-900 text-zinc-400">
                         <Eye className="w-4 h-4" /> {viewsCount} Views
                    </span>
               </div>

               {/* Right Side Buttons */}
               <div className="flex items-center gap-2">
                    <LikeButton lesson={lesson} onLikeChange={setLikesCount} />
                    <SavedButton lesson={lesson} onSaveChange={setSavesCount} />
                    <ReportModal lesson={lesson} />
               </div>
          </div>
     );
}