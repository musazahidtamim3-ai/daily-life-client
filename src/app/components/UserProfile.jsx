
import { getLessonByUserId } from '@/lib/actions/get/lessons';
import { getUserSession } from '@/lib/core/session';
import { BookOpen, Heart } from '@gravity-ui/icons';
import React from 'react';

const UserProfile = async () => {
     const user = await getUserSession();

     if (!user) {
          return redirect('/login');
     }

     const creatorId = user.id;
     const myLessons = await getLessonByUserId(creatorId);

     return (
               <div className="bg-neutral-900/30 border border-neutral-800/40 p-4 rounded-xl flex items-center justify-between">
                    <div className="space-y-1">
                         <span className="text-xs text-neutral-400 font-medium">Lessons Created</span>
                         <p className="text-2xl font-black text-white tracking-tight">{myLessons?.length}</p>
                    </div>
                    <div className="p-3 bg-neutral-900/80 border border-neutral-800/60 rounded-xl">
                         <BookOpen className="w-5 h-5 text-purple-400" />
               </div>
               <div className="space-y-1">
                    <span className="text-xs text-neutral-400 font-medium">Lessons Saved</span>
                    <p className="text-2xl font-black text-white tracking-tight">45</p>
               </div>
               <div className="p-3 bg-neutral-900/80 border border-neutral-800/60 rounded-xl">
                    <Heart className="w-5 h-5 text-pink-400" /> 
               </div>
               </div>
     );
};

export default UserProfile;