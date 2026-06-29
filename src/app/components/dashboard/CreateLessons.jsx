'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clouds, Lock, CircleInfoFill } from '@gravity-ui/icons';
import Link from 'next/link';
import { submitLessons } from '@/lib/actions/submit/lessons';
import { toast } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function CreateLessons({ userId, isUserPremium, userName, userImage }) {
     const router = useRouter();
     const [loading, setLoading] = useState(false);

     const { data: sessionData } = authClient.useSession();
     const [formData, setFormData] = useState({
          title: '',
          description: '',
          category: 'Personal Growth',
          emotionalTone: 'Motivational',
          image: '',
          access: 'free',
          visibility: 'public',
     });

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.title.trim() || !formData.description.trim()) {
               toast.error("Please fill up required fields!");
               return;
          }

          setLoading(true);

          const payload = {
               title: formData.title,
               description: formData.description,
               category: formData.category,
               emotionalTone: formData.emotionalTone,
               imageUrl: formData.image,       
               accessLevel: formData.access,  
               visibility: formData.visibility,
               creatorId: userId, 
               creatorName: userName,
               creatorImage: userImage,
               likes: [],
               likesCount: 0,
               savesCount: 0,             
               isFeatured: false,
               isReviewed: false,
               createdAt: new Date()
          };

          try {
               const result = await submitLessons(payload);

               if (result?.success || result) {
                    toast.success('Lesson Published Successfully!', {
                         duration: 3000,
                         style: {
                              background: '#18181b', 
                              color: '#fff',
                              border: '1px solid #27272a'
                         }
                    });

                    setTimeout(() => {
                         router.push('/dashboard/user/my-lessons');
                         router.refresh();
                    }, 1500);
               } else {
                    toast.error(result?.error || "Something went wrong.");
                    setLoading(false);
               }
          } catch (err) {
               console.error("Failed to create lesson:", err);
               toast.error("Server connection failed.");
               setLoading(false);
          }
     };

     return (
          <div className="relative w-full">

               <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-5">

                    {/* 1. Lesson Title */}
                    <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Lesson Title</label>
                         <input
                              type="text"
                              required
                              placeholder="Give your life lesson a powerful title..."
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition"
                         />
                    </div>

                    {/* 2. Category & Emotional Tone Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {/* Category (Dropdown) */}
                         <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                              <select
                                   value={formData.category}
                                   onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                   className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
                              >
                                   <option value="Personal Growth">Personal Growth</option>
                                   <option value="Career">Career</option>
                                   <option value="Relationships">Relationships</option>
                                   <option value="Mindset">Mindset</option>
                                   <option value="Mistakes Learned">Mistakes Learned</option>
                              </select>
                         </div>

                         {/* Emotional Tone (Dropdown) */}
                         <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Emotional Tone</label>
                              <select
                                   value={formData.emotionalTone}
                                   onChange={(e) => setFormData(prev => ({ ...prev, emotionalTone: e.target.value }))}
                                   className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
                              >
                                   <option value="Motivational">Motivational</option>
                                   <option value="Sad">Sad</option>
                                   <option value="Realization">Realization</option>
                                   <option value="Gratitude">Gratitude</option>
                              </select>
                         </div>
                    </div>

                    {/* 3. Image URL (Optional) */}
                    <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Image URL <span className="text-zinc-600 lowercase font-normal">(optional)</span></label>
                         <input
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              value={formData.image}
                              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition"
                         />
                    </div>

                    {/* 4. Full Description / Story / Insight */}
                    <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Description / Story / Insight</label>
                         <textarea
                              rows={5}
                              required
                              placeholder="Tell your story, what happened and what is the core lesson here..."
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition resize-none leading-relaxed"
                         />
                    </div>

                    {/* 5. Access Level (Dropdown) & Tooltip Trigger */}
                    <div className="flex flex-col gap-1.5 relative group">
                         <div className="flex items-center gap-1.5">
                              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Access Level</label>

                              {!isUserPremium && (
                                   <div className="relative inline-block cursor-help text-amber-500">
                                        <CircleInfoFill className="w-3.5 h-3.5" />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex w-52 bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] p-2 rounded-lg shadow-2xl text-center font-normal leading-normal animate-in fade-in duration-200 z-30">
                                             Upgrade to Premium to create paid lessons.
                                        </div>
                                   </div>
                              )}
                         </div>

                         <div className="relative">
                              <select
                                   value={formData.access}
                                   disabled={!isUserPremium}
                                   onChange={(e) => setFormData(prev => ({ ...prev, access: e.target.value }))}
                                   className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition appearance-none ${!isUserPremium ? 'opacity-50 cursor-not-allowed bg-zinc-950/80' : 'cursor-pointer'}`}
                              >
                                   <option value="free">Free</option>
                                   {isUserPremium && <option value="premium">Premium</option>}
                              </select>

                              {!isUserPremium && (
                                   <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                              )}
                         </div>
                    </div>

                    {/* 6. Form Actions / Buttons */}
                    <div className="pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                         <Link
                              href="/dashboard/my-lessons"
                              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition py-2"
                         >
                              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Lessons
                         </Link>

                         <button
                              type="submit"
                              disabled={loading}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-l from-indigo-500 to-purple-500 hover:bg-blue-500 disabled:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-950/20 transition cursor-pointer disabled:cursor-not-allowed"
                         >
                              <Clouds className="w-4 h-4" />
                              {loading ? 'Publishing Lesson...' : 'Publish Life Lesson'}
                         </button>
                    </div>

               </form>
          </div>
     );
}