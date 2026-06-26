"use client";

import React, { useState, useEffect } from 'react';
import {
     BookOpen,
     TrashBin,
     Eye,
     EyeSlash,
     Star,
     Check,
     BarsUnaligned,
     Magnifier,
     ArrowLeft
} from '@gravity-ui/icons';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Button, Modal } from "@heroui/react";

import { getLessons } from '@/lib/actions/get/lessons';
import Image from 'next/image';
import { updateFeaturedLessons } from '@/lib/actions/update/lesson';
import { deleteReportedLesson } from '@/lib/actions/delete/lessons';

export default function ManageLessonsPage() {
     const [lessons, setLessons] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');
     const [categoryFilter, setCategoryFilter] = useState('all');
     const [visibilityFilter, setVisibilityFilter] = useState('all');
     const [flagFilter, setFlagFilter] = useState('all');

     const [selectedLesson, setSelectedLesson] = useState(null);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          const fetchLessons = async () => {
               try {
                    const data = await getLessons();
                    setLessons(data || []);
               } catch (err) {
                    console.error(err);
                    toast.error("Failed to load lessons.");
               }
          };
          fetchLessons();
     }, []);

     const publicCount = lessons.filter(l => l.visibility === 'public').length;
     const flaggedCount = lessons.filter(l => l.flags && l.flags.length > 0).length;

     const filteredLessons = lessons.filter(lesson => {
          const matchesSearch =
               lesson.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               lesson.creatorName?.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesCategory = categoryFilter === 'all' || lesson.category === categoryFilter;
          const matchesVisibility = visibilityFilter === 'all' || lesson.visibility === visibilityFilter;
          const matchesFlag =
               flagFilter === 'all' ||
               (flagFilter === 'flagged' && lesson.flags?.length > 0) ||
               (flagFilter === 'clean' && (!lesson.flags || lesson.flags.length === 0));

          return matchesSearch && matchesCategory && matchesVisibility && matchesFlag;
     });

     const handleToggleFeatured = async (lessonId, currentStatus) => {
          const newStatus = !currentStatus;
          setLessons(prev =>
               prev.map(l => l._id === lessonId ? { ...l, isFeatured: newStatus } : l)
          );
          try {
               await updateFeaturedLessons(lessonId, newStatus);
               toast.success(
                    newStatus ? "🌟 Lesson added to Homepage Featured!" : "Removed from Featured.",
                    { style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' } }
               );
          } catch (err) {
               setLessons(prev =>
                    prev.map(l => l._id === lessonId ? { ...l, isFeatured: currentStatus } : l)
               );
               toast.error("Action failed. Please try again.");
          }
     };

     const handleMarkReviewed = async (lessonId) => {
          try {
               setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, flags: [] } : l));
               toast.success("Content marked as reviewed and flags cleared!", {
                    style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
               });
          } catch (err) {
               toast.error("Action failed.");
          }
     };

     // Delete Lesson
     const handleDeleteConfirm = async () => {
          if (!selectedLesson) return;
          setLoading(true);
          try {
               const data = await deleteReportedLesson(selectedLesson._id); 
               if (data.success) {
                    setLessons(prev => prev.filter(l => l._id !== selectedLesson._id));
                    toast.success(`"${selectedLesson.title}" has been deleted.`, {
                         style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
                    });
                    setSelectedLesson(null);
               }
               else {
                    toast.error("Failed to delete lesson.");
               }


          } catch (err) {
               toast.error("Failed to delete lesson.");
          } finally {
               setLoading(false);
          }
     };

     const categories = ['all', ...new Set(lessons.map(l => l.category).filter(Boolean))];

     return (
          <div className="w-full text-zinc-100 p-4 md:p-8 space-y-6 bg-zinc-950 min-h-screen select-none">

               {/* ⬅️ HEADER */}
               <div className="border-b border-zinc-800/60 pb-5">
                    <Link href="/dashboard/admin" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition mb-2">
                         <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-black bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight flex items-center gap-2.5">
                         <BookOpen className="w-7 h-7 text-blue-500" /> Manage Lessons ({lessons.length})
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Review user generated contents, moderate flags, and manage homepage feature status.</p>
               </div>

               {/* 📊 STATS CARDS */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between">
                         <div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">All Lessons</p>
                              <p className="text-2xl font-black text-emerald-400 mt-1">{lessons.length}</p>
                         </div>
                         <Eye className="w-8 h-8 text-emerald-500/20" />
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800/80 border-rose-950/40 bg-rose-950/5 p-5 rounded-2xl flex items-center justify-between">
                         <div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400/70">Flagged Content</p>
                              <p className="text-2xl font-black text-rose-400 mt-1">{flaggedCount}</p>
                         </div>
                         <BarsUnaligned className="w-8 h-8 text-rose-500/20" />
                    </div>
               </div>

               {/* 🔍 FILTERS */}
               <div className="bg-zinc-900/20 border border-zinc-800/60 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between backdrop-blur-md">
                    <div className="relative w-full md:w-72">
                         <Magnifier className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                         <input
                              type="text"
                              placeholder="Search by title or author..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition"
                         />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                         <select
                              value={categoryFilter}
                              onChange={(e) => setCategoryFilter(e.target.value)}
                              className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px] rounded-xl px-3 py-2 outline-none focus:border-blue-500 uppercase tracking-tight"
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
                              <option value="flagged">⚠️ Reported / Flagged</option>
                              <option value="clean">Reviewed / Clean</option>
                         </select>
                    </div>
               </div>

               {/* 📊 TABLE */}
               <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse">
                              <thead>
                                   <tr className="bg-zinc-900/70 border-b border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                        <th className="py-4 px-6">Lesson Details</th>
                                        <th className="py-4 px-6">Category</th>
                                        <th className="py-4 px-6">Status / Flags</th>
                                        <th className="py-4 px-6 text-right">Moderation Controls</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-800/50 text-xs">
                                   {filteredLessons.length > 0 ? (
                                        filteredLessons.map((lesson) => (
                                             <tr key={lesson._id} className="hover:bg-zinc-900/20 transition group">

                                                  {/* Lesson Info */}
                                                  <td className="py-4 px-6">
                                                       <div className="flex items-center gap-2">
                                                            <Image
                                                                 height={40}
                                                                 width={60}
                                                                 src={lesson.imageUrl}
                                                                 alt={lesson.title}
                                                                 className="w-15 h-10 rounded-md object-cover"
                                                            />
                                                            <div className="flex flex-col gap-0.5">
                                                                 <span className="font-bold text-zinc-200 group-hover:text-blue-400 transition text-sm">{lesson.title}</span>
                                                                 <span className="text-[11px] text-zinc-500">By: {lesson.creatorName || "Unknown User"}</span>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Category */}
                                                  <td className="py-4 px-6">
                                                       <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded-md text-[10px] font-mono uppercase text-zinc-400">
                                                            {lesson.category || "General"}
                                                       </span>
                                                  </td>

                                                  {/* Visibility & Flags */}
                                                  <td className="py-4 px-6 space-y-1.5">
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
                                                       </div>
                                                       {lesson.flags?.length > 0 && (
                                                            <p className="text-[10px] text-rose-400 font-semibold flex items-center gap-1 bg-rose-500/5 border border-rose-500/10 px-2 py-0.5 rounded-md max-w-fit">
                                                                 <BarsUnaligned className="w-3.5 h-3.5 shrink-0" /> Reported ({lesson.flags.length} times)
                                                            </p>
                                                       )}
                                                  </td>

                                                  {/* Action Buttons */}
                                                  <td className="py-4 px-6 text-right">
                                                       <div className="flex items-center justify-end gap-2">

                                                            <button
                                                                 onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                                                                 title={lesson.isFeatured ? "Remove from Featured" : "Make Featured"}
                                                                 className={`p-2 rounded-xl border transition cursor-pointer ${lesson.isFeatured
                                                                           ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-zinc-950'
                                                                           : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40'
                                                                      }`}
                                                            >
                                                                 <Star className="w-4 h-4" />
                                                            </button>

                                                            {lesson.flags?.length > 0 && (
                                                                 <button
                                                                      onClick={() => handleMarkReviewed(lesson._id)}
                                                                      title="Mark Content as Reviewed / Clear Flags"
                                                                      className="p-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 rounded-xl transition cursor-pointer"
                                                                 >
                                                                      <Check className="w-4 h-4" />
                                                                 </button>
                                                            )}

                                                            {/* Delete Modal */}
                                                            <Modal>
                                                                 <Modal.Trigger
                                                                      onClick={() => setSelectedLesson(lesson)}
                                                                      title="Delete Lesson"
                                                                      className="p-1 bg-zinc-950 border border-zinc-800 hover:border-rose-500/50 text-zinc-400 hover:text-rose-400 rounded-xl transition cursor-pointer flex items-center justify-center"
                                                                 >
                                                                      <TrashBin className="w-4 h-4 flex justify-center items-center" />
                                                                 </Modal.Trigger>

                                                                 <Modal.Backdrop className="bg-black/70 backdrop-blur-xs">
                                                                      <Modal.Container>
                                                                           <Modal.Dialog className="sm:max-w-[400px] bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 shadow-2xl">
                                                                                <Modal.CloseTrigger className="text-zinc-400 hover:text-zinc-200" />

                                                                                <Modal.Header className="flex flex-col items-center text-center space-y-2 border-b border-zinc-800/50 pb-3">
                                                                                     <Modal.Icon className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-full inline-block">
                                                                                          <TrashBin className="size-6" />
                                                                                     </Modal.Icon>
                                                                                     <Modal.Heading className="text-base font-bold text-zinc-100">Confirm Deletion</Modal.Heading>
                                                                                </Modal.Header>

                                                                                <Modal.Body className="py-4">
                                                                                     {selectedLesson && (
                                                                                          <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 text-center">
                                                                                               <p className="text-xs text-zinc-400 leading-relaxed">
                                                                                                    Are you completely sure you want to delete{' '}
                                                                                                    <span className="text-blue-400 font-bold">"{selectedLesson.title}"</span>?
                                                                                                    {' '}This action cannot be undone.
                                                                                               </p>
                                                                                          </div>
                                                                                     )}
                                                                                </Modal.Body>

                                                                                <Modal.Footer className="flex items-center gap-3 border-t border-zinc-800/50 pt-4">
                                                                                     <Button
                                                                                          slot="close"
                                                                                          variant="secondary"
                                                                                          className="flex-1 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-medium text-xs rounded-xl transition cursor-pointer"
                                                                                     >
                                                                                          Cancel
                                                                                     </Button>
                                                                                     <Button
                                                                                          slot="close"
                                                                                          disabled={loading}
                                                                                          onClick={handleDeleteConfirm}
                                                                                          className="flex-1 py-2.5 font-bold text-xs rounded-xl shadow-lg bg-rose-600 hover:bg-rose-500 text-white transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                     >
                                                                                          {loading ? 'Deleting...' : 'Yes, Delete Lesson'}
                                                                                     </Button>
                                                                                </Modal.Footer>
                                                                           </Modal.Dialog>
                                                                      </Modal.Container>
                                                                 </Modal.Backdrop>
                                                            </Modal>

                                                       </div>
                                                  </td>

                                             </tr>
                                        ))
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

          </div>
     );
}