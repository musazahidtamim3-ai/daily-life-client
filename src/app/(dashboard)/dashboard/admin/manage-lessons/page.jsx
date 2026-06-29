'use client';

import React, { useState, useEffect } from 'react';
import {
     BookOpen, TrashBin, Eye, EyeSlash,
     Star, Check, BarsUnaligned, ArrowLeft
} from '@gravity-ui/icons';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getLessons } from '@/lib/actions/get/lessons';
import Image from 'next/image';
import { updateFeaturedLessons } from '@/lib/actions/update/lesson';
import { deleteReportedLesson } from '@/lib/actions/delete/lessons';

export default function ManageLessonsPage() {
     const [lessons, setLessons] = useState([]);
     const [categoryFilter, setCategoryFilter] = useState('all');
     const [visibilityFilter, setVisibilityFilter] = useState('all');
     const [flagFilter, setFlagFilter] = useState('all');
     const [selectedLesson, setSelectedLesson] = useState(null);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          const fetchLessons = async () => {
               try {
                    const response = await getLessons();

                    const safeArray = Array.isArray(response)
                         ? response
                         : (response?.data || response?.lessons || []);

                    setLessons(safeArray);
               } catch (err) {
                    console.error(err);
                    toast.error("Failed to load lessons.");
               }
          };
          fetchLessons();
     }, []);

     const lessonsList = Array.isArray(lessons) ? lessons : [];

     const publicCount = lessonsList.filter(l => l?.visibility === 'public').length;
     const privateCount = lessonsList.filter(l => l?.visibility === 'private').length;
     const flaggedCount = lessonsList.filter(l => l?.flags && l?.flags?.length > 0).length;

     const filteredLessons = lessonsList.filter(lesson => {
          if (!lesson) return false;

          const matchesCategory = categoryFilter === 'all' || lesson.category === categoryFilter;
          const matchesVisibility = visibilityFilter === 'all' || lesson.visibility === visibilityFilter;
          const matchesFlag =
               flagFilter === 'all' ||
               (flagFilter === 'flagged' && lesson.flags?.length > 0) ||
               (flagFilter === 'clean' && (!lesson.flags || lesson.flags.length === 0));
          return matchesCategory && matchesVisibility && matchesFlag;
     });

     const handleToggleFeatured = async (lessonId, currentStatus) => {
          const newStatus = !currentStatus;
          setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, isFeatured: newStatus } : l));
          try {
               await updateFeaturedLessons(lessonId, newStatus);
               toast.success(newStatus ? "Lesson added to Featured!" : "Removed from Featured.", {
                    style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
               });
          } catch {
               setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, isFeatured: currentStatus } : l));
               toast.error("Action failed.");
          }
     };

     const handleMarkReviewed = async (lessonId) => {
          try {
               setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, flags: [] } : l));
               toast.success("Flags cleared!", {
                    style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
               });
          } catch {
               toast.error("Action failed.");
          }
     };

     const handleDeleteConfirm = async () => {
          if (!selectedLesson) return;
          setLoading(true);
          try {
               const data = await deleteReportedLesson(selectedLesson._id);
               if (data.success) {
                    setLessons(prev => prev.filter(l => l._id !== selectedLesson._id));
                    toast.success(`"${selectedLesson.title}" deleted.`, {
                         style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
                    });
                    setIsModalOpen(false);
                    setSelectedLesson(null);
               } else {
                    toast.error("Failed to delete.");
               }
          } catch {
               toast.error("Failed to delete.");
          } finally {
               setLoading(false);
          }
     };

     const categories = ['all', ...new Set(lessonsList.map(l => l?.category).filter(Boolean))];

     return (
          <div className="w-full text-zinc-100 p-4 md:p-8 space-y-6 bg-zinc-950 min-h-screen select-none">

               {/* Header */}
               <div className="border-b border-zinc-800/60 pb-5">
                    <Link href="/dashboard/admin" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition mb-2">
                         <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-black bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight flex items-center gap-2.5">
                         <BookOpen className="w-7 h-7 text-blue-500" /> Manage Lessons ({lessonsList.length})
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Review user generated content, moderate flags, and manage featured status.</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between">
                         <div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Public Lessons</p>
                              <p className="text-2xl font-black text-emerald-400 mt-1">{publicCount}</p>
                         </div>
                         <Eye className="w-8 h-8 text-emerald-500/20" />
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between">
                         <div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Private Lessons</p>
                              <p className="text-2xl font-black text-zinc-400 mt-1">{privateCount}</p>
                         </div>
                         <EyeSlash className="w-8 h-8 text-zinc-500/20" />
                    </div>
                    <div className="bg-rose-950/10 border border-rose-500/10 p-5 rounded-2xl flex items-center justify-between">
                         <div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400/70">Flagged Content</p>
                              <p className="text-2xl font-black text-rose-400 mt-1">{flaggedCount}</p>
                         </div>
                         <BarsUnaligned className="w-8 h-8 text-rose-500/20" />
                    </div>
               </div>

               {/* Filters */}
               <div className="bg-zinc-900/20 border border-zinc-800/60 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between backdrop-blur-md">
                    
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                         <select
                              value={categoryFilter}
                              onChange={(e) => setCategoryFilter(e.target.value)}
                              className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px] rounded-xl px-3 py-2 outline-none focus:border-blue-500"
                         >
                              {categories.map(cat => (
                                   <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                              ))}
                         </select>
                         <select
                              value={visibilityFilter}
                              onChange={(e) => setVisibilityFilter(e.target.value)}
                              className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px] rounded-xl px-3 py-2 outline-none focus:border-blue-500"
                         >
                              <option value="all">All Visibility</option>
                              <option value="public">Public</option>
                              <option value="private">Private</option>
                         </select>
                         <select
                              value={flagFilter}
                              onChange={(e) => setFlagFilter(e.target.value)}
                              className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px] rounded-xl px-3 py-2 outline-none focus:border-blue-500"
                         >
                              <option value="all">All Status</option>
                              <option value="flagged">Flagged</option>
                              <option value="clean">Clean</option>
                         </select>
                    </div>
               </div>

               {/* Table */}
               <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse min-w-[700px]">
                              <thead>
                                   <tr className="bg-zinc-900/70 border-b border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                        <th className="py-4 px-5">Lesson Details</th>
                                        <th className="py-4 px-5">Category</th>
                                        <th className="py-4 px-5">Status</th>
                                        <th className="py-4 px-5 text-right">Controls</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-800/50 text-xs">
                                   {filteredLessons.length > 0 ? (
                                        filteredLessons.map((lesson) => {
                                             if (!lesson) return null;
                                             const imageUrl = Array.isArray(lesson.imageUrl) ? lesson.imageUrl[0] : lesson.imageUrl;
                                             return (
                                                  <tr key={lesson._id} className="hover:bg-zinc-900/20 transition group">
                                                       <td className="py-4 px-5">
                                                            <div className="flex items-center gap-3">
                                                                 {imageUrl ? (
                                                                      <Image
                                                                           height={40} width={60}
                                                                           src={imageUrl}
                                                                           alt={lesson.title || "Lesson Image"}
                                                                           className="w-14 h-10 rounded-lg object-cover shrink-0 border border-zinc-800"
                                                                      />
                                                                 ) : (
                                                                      <div className="w-14 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                                                                           <BookOpen className="w-4 h-4 text-zinc-600" />
                                                                      </div>
                                                                 )}
                                                                 <div className="flex flex-col gap-0.5 min-w-0">
                                                                      <span className="font-bold text-zinc-200 group-hover:text-blue-400 transition line-clamp-1">{lesson.title}</span>
                                                                      <span className="text-[11px] text-zinc-500">By: {lesson.creatorName || "Unknown"}</span>
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       <td className="py-4 px-5">
                                                            <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded-md text-[10px] font-mono uppercase text-zinc-400">
                                                                 {lesson.category || "General"}
                                                            </span>
                                                       </td>

                                                       <td className="py-4 px-5">
                                                            <div className="flex flex-wrap gap-1.5 items-center">
                                                                 {lesson.visibility === 'public' ? (
                                                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10 uppercase">
                                                                           <Eye className="w-3 h-3" /> Public
                                                                      </span>
                                                                 ) : (
                                                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800 uppercase">
                                                                           <EyeSlash className="w-3 h-3" /> Private
                                                                      </span>
                                                                 )}
                                                                 {lesson.isFeatured && (
                                                                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded-md border border-amber-500/20 uppercase">
                                                                           🌟 Featured
                                                                      </span>
                                                                 )}
                                                                 {lesson.flags?.length > 0 && (
                                                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/5 px-2 py-0.5 rounded-md border border-rose-500/10 uppercase">
                                                                           <BarsUnaligned className="w-3 h-3" /> {lesson.flags.length} Flag{lesson.flags.length > 1 ? 's' : ''}
                                                                      </span>
                                                                 )}
                                                            </div>
                                                       </td>

                                                       <td className="py-4 px-5 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                 <button
                                                                      onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                                                                      title={lesson.isFeatured ? "Remove from Featured" : "Make Featured"}
                                                                      className={`p-2 rounded-xl border transition cursor-pointer ${lesson.isFeatured
                                                                           ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-zinc-950 hover:border-zinc-800 hover:text-zinc-400'
                                                                           : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40'
                                                                           }`}
                                                                 >
                                                                      <Star className="w-4 h-4" />
                                                                 </button>

                                                                 {lesson.flags?.length > 0 && (
                                                                      <button
                                                                           onClick={() => handleMarkReviewed(lesson._id)}
                                                                           title="Clear Flags"
                                                                           className="p-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 rounded-xl transition cursor-pointer"
                                                                      >
                                                                           <Check className="w-4 h-4" />
                                                                      </button>
                                                                 )}

                                                                 <button
                                                                      onClick={() => { setSelectedLesson(lesson); setIsModalOpen(true); }}
                                                                      title="Delete Lesson"
                                                                      className="p-2 bg-zinc-950 border border-zinc-800 hover:border-rose-500/50 text-zinc-400 hover:text-rose-400 rounded-xl transition cursor-pointer"
                                                                 >
                                                                      <TrashBin className="w-4 h-4" />
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             );
                                        })
                                   ) : (
                                        <tr>
                                             <td colSpan="4" className="py-12 text-center text-zinc-600 font-medium tracking-wide">
                                                  No lessons found matching the filters.
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* Delete Confirm Modal */}
               {isModalOpen && selectedLesson && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
                              <div className="flex flex-col items-center text-center space-y-2 border-b border-zinc-800/50 pb-4 mb-4">
                                   <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-full">
                                        <TrashBin className="w-6 h-6" />
                                   </div>
                                   <h3 className="text-base font-bold text-zinc-100">Confirm Deletion</h3>
                              </div>
                              <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 text-center mb-6">
                                   <p className="text-xs text-zinc-400 leading-relaxed">
                                        Are you sure you want to delete{' '}
                                        <span className="text-blue-400 font-bold">"{selectedLesson.title}"</span>?
                                        This action cannot be undone.
                                   </p>
                              </div>
                              <div className="flex items-center gap-3">
                                   <button
                                        onClick={() => { setIsModalOpen(false); setSelectedLesson(null); }}
                                        className="flex-1 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-medium text-xs rounded-xl transition cursor-pointer"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        disabled={loading}
                                        onClick={handleDeleteConfirm}
                                        className="flex-1 py-2.5 font-bold text-xs rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition cursor-pointer disabled:opacity-50"
                                   >
                                        {loading ? 'Deleting...' : 'Yes, Delete'}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

          </div>
     );
}