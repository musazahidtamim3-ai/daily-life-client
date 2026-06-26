"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Chip } from "@heroui/react";
import { Sparkles, BookOpen, Heart, CloudArrowUpIn, TrashBin, Pencil } from "@gravity-ui/icons";
import Image from "next/image";
import { serverFetch } from "@/lib/core/server";
import { toast } from "react-toastify";

export const getLessonByUserId = async (creatorId) => {
     return await serverFetch(`/api/my-lessons/${creatorId}`);
}

export default function ProfilePage() {
          const [isSubmitting, setIsSubmitting] = useState(false);
     
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [userLessons, setUserLessons] = useState([]);
     const [isLessonsLoading, setIsLessonsLoading] = useState(true); 

     const { data: sessionData, isPending } = authClient.useSession();

     const user = sessionData?.user;
     const isPremium = user?.plan === "premium";
     const creatorId = user?.id; 

     const [tempName, setTempName] = useState("");
     const [tempAvatar, setTempAvatar] = useState("");

     useEffect(() => {
          if (user) {
               setTempName(user.name || "");
               setTempAvatar(user.image || "");
          }
     }, [user]);

     useEffect(() => {
          if (!creatorId) return;

          const fetchUserLessons = async () => {
               setIsLessonsLoading(true);
               try {
                    const lessons = await getLessonByUserId(creatorId);
                    setUserLessons(lessons || []);
               } catch (error) {
                    console.error("Failed to fetch lessons:", error);
               } finally {
                    setIsLessonsLoading(false);
               }
          };

          fetchUserLessons();
     }, [creatorId]);

     const stats = [
          { label: "Lessons Created", count: userLessons.length, icon: <BookOpen className="w-5 h-5 text-purple-400" /> },
          { label: "Lessons Saved", count: 45, icon: <Heart className="w-5 h-5 text-pink-400" /> },
     ];

     const handleSaveChanges = async () => {
          if (!tempName.trim()) {
               return toast.error("Display name cannot be empty.");
          }

          setIsSubmitting(true);
          try {
               await authClient.updateUser({
                    name: tempName,
                    image: tempAvatar || undefined,
               });

               toast.success("Profile updated successfully!", {
                    style: { background: '#0c0c0e', color: '#fff', border: '1px solid #27272a' }
               });
               setIsModalOpen(false);
          } catch (error) {
               console.error("Failed updating profile data:", error);
               toast.error("Failed to update profile. Try again.");
          } finally {
               setIsSubmitting(false);
          }
     };

     if (isPending) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm font-mono text-neutral-500 animate-pulse">Loading Profile...</span>
               </div>
          );
     }

     if (!user) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm font-mono text-danger">Access Denied. Please log in first.</span>
               </div>
          );
     }

     return (
          <div className="space-y-2 max-w-5xl mx-auto relative z-10 p-4">

               {/* Glow Ambient Design */}
               <div className="absolute left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

               {/* Profile Card */}
               <Card className="border border-neutral-800/80 bg-[#0c0c0e]/80 overflow-hidden backdrop-blur-md rounded-md ">
                    <div className="h-32 w-full bg-gradient-to-r from-indigo-950 via-purple-950 to-neutral-900 border-b border-neutral-800/50" />

                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 relative">
                         <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-12 mb-6">
                              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                                   <Image
                                        height={300}
                                        width={300}
                                        alt={user?.name || "User Banner"}
                                        src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"}
                                        className="w-24 h-24 rounded-md sm:w-28 sm:h-28 text-large border-4 border-[#0c0c0e] shadow-xl object-cover"
                                   />
                                   <div className="space-y-1.5 pb-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                                             <h2 className="text-2xl font-black text-white">{user.name}</h2>
                                             {isPremium && (
                                                  <Chip color="warning" variant="flat" size="sm" className="font-bold border border-amber-500/20 bg-amber-500/10 text-amber-400">
                                                       Premium ⭐
                                                  </Chip>
                                             )}
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-400 font-light">{user.email}</p>
                                   </div>
                              </div>

                              <button
                                   onClick={() => setIsModalOpen(true)}
                                   className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-800 text-neutral-300 hover:bg-neutral-900/80 hover:text-white transition-all active:scale-95 shadow-md"
                              >
                                   <Pencil className="w-4 h-4" />
                                   Edit Profile
                              </button>
                         </div>

                         {/* 📊 Counters */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
                              {stats.map((stat, i) => (
                                   <div key={i} className="bg-neutral-900/30 border border-neutral-800/40 p-4 rounded-xl flex items-center justify-between">
                                        <div className="space-y-1">
                                             <span className="text-xs text-neutral-400 font-medium">{stat.label}</span>
                                             <p className="text-2xl font-black text-white tracking-tight">{stat.count}</p>
                                        </div>
                                        <div className="p-3 bg-neutral-900/80 border border-neutral-800/60 rounded-xl">
                                             {stat.icon}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </Card>

               {/* Lessons Section */}
               <div className="space-y-6 pt-6">
                    <div className="flex items-center gap-2 border-b border-neutral-800/60 pb-3">
                         <Sparkles className="w-4 h-4 text-purple-400" />
                         <h3 className="text-lg font-bold text-neutral-200 tracking-tight">Your Published Lessons</h3>
                         <span className="text-xs font-mono bg-neutral-900 text-neutral-500 px-2 py-0.5 rounded-md">
                              ({userLessons.length})
                         </span>
                    </div>

                    {isLessonsLoading ? (
                         <div className="text-sm font-mono text-neutral-500 animate-pulse py-4">Loading your lessons...</div>
                    ) : userLessons.length === 0 ? (
                         <div className="text-sm text-neutral-500 py-4">You haven't published any lessons yet.</div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {userLessons.map((lesson) => (
                                   <Card key={lesson._id || lesson.id} className="border border-neutral-800/80 bg-[#0c0c0e]/50 p-5 flex flex-col justify-between" shadow="none">
                                        <div className="space-y-3">
                                             <div className="flex items-center justify-between">
                                                  <Chip size="sm" variant="flat" color="secondary" className="bg-purple-500/10 text-purple-400 font-mono text-[10px]">
                                                       {lesson.category}
                                                  </Chip>
                                                  <span className="text-xs text-neutral-500 font-mono">
                                                       {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "Recent"}
                                                  </span>
                                             </div>
                                             <h4 className="text-base font-bold text-white tracking-tight line-clamp-2">{lesson.title}</h4>
                                        </div>
                                        <div className="flex items-center justify-between pt-5 mt-4 border-t border-neutral-900">
                                             <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                                                  <Heart className="w-3.5 h-3.5 text-pink-500" /> {lesson.likesCount || 0} favorites
                                             </span>
                                                  <button className="p-1.5 rounded-lg text-neutral-500 hover:text-white transition-colors"><Sparkles className="w-4 h-4" /></button>
                                                  
                                        </div>
                                   </Card>
                              ))}
                         </div>
                    )}
               </div>

               {/* Modal Popup Component */}
               {isModalOpen && (
                                   <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
               
                                        {/* Backdrop Matte Blur click out */}
                                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => !isSubmitting && setIsModalOpen(false)} />
               
                                        {/* Core Sheet Container */}
                                        <div className="bg-[#0c0c0e] border border-neutral-800 text-white rounded-2xl w-full max-w-md overflow-hidden relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
               
                                             {/* Header */}
                                             <div className="pt-6 px-6 pb-2">
                                                  <h3 className="text-xl font-bold tracking-tight text-white">Edit Profile</h3>
                                             </div>
               
                                             {/* Content Body */}
                                             <div className="py-4 px-6 space-y-5">
               
                                                  {/* Name Block */}
                                                  <div className="space-y-1.5">
                                                       <label className="text-xs font-semibold text-neutral-400">Display Name</label>
                                                       <input
                                                            type="text"
                                                            placeholder="Enter your name"
                                                            value={tempName}
                                                            disabled={isSubmitting}
                                                            onChange={(e) => setTempName(e.target.value)}
                                                            className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                                                       />
                                                  </div>
               
                                                  {/* Avatar URL Block */}
                                                  <div className="space-y-1.5">
                                                       <label className="text-xs font-semibold text-neutral-400">Profile Photo URL</label>
                                                       <div className="relative flex items-center">
                                                            <input
                                                                 type="text"
                                                                 placeholder="Paste image URL"
                                                                 value={tempAvatar}
                                                                 disabled={isSubmitting}
                                                                 onChange={(e) => setTempAvatar(e.target.value)}
                                                                 className="w-full bg-[#121214] border border-neutral-800 rounded-xl pl-3 pr-10 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                                                            />
                                                            <CloudArrowUpIn className="w-4 h-4 text-neutral-500 absolute right-3 pointer-events-none" />
                                                       </div>
                                                  </div>
               
                                                  {/* Strict Locked Email Segment */}
                                                  <div className="space-y-1.5">
                                                       <label className="text-xs font-semibold text-neutral-500">Email Address (Locked)</label>
                                                       <input
                                                            type="text"
                                                            readOnly
                                                            value={user.email || ""}
                                                            className="w-full bg-[#121214]/40 border border-neutral-800/60 rounded-xl px-3 py-2.5 text-sm text-neutral-500 cursor-not-allowed select-none outline-none"
                                                       />
                                                  </div>
               
                                             </div>
               
                                             {/* Footer Action Bar */}
                                             <div className="border-t border-neutral-900 p-6 flex items-center justify-end gap-3">
                                                  <button
                                                       onClick={() => setIsModalOpen(false)}
                                                       disabled={isSubmitting}
                                                       className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 transition-colors cursor-pointer disabled:opacity-50"
                                                  >
                                                       Cancel
                                                  </button>
                                                  <button
                                                       onClick={handleSaveChanges}
                                                       disabled={isSubmitting}
                                                       className="px-5 py-2 text-sm font-semibold bg-gradient-to-l from-indigo-500 to-purple-500 text-white rounded-xl shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-70"
                                                  >
                                                       {isSubmitting ? "Saving..." : "Save Changes"}
                                                  </button>
                                             </div>
               
                                        </div>
                                   </div>
                              )}
          </div>
     );
}