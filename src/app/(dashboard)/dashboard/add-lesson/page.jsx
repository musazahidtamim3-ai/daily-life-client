"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { CloudArrowUpIn, BookOpen, ChevronDown, Plus } from "@gravity-ui/icons";
import { submitLessons } from "@/lib/actions/submit/lessons";

export default function AddLessonPage() {
     const { data: sessionData, isPending } = authClient.useSession();
     const user = sessionData?.user;
     const isPremium = user?.plan === "premium";

     // Core Form States
     const [title, setTitle] = useState("");
     const [description, setDescription] = useState("");
     const [imageUrl, setImageUrl] = useState("");

     // Custom Dropdown Active Selection States
     const [category, setCategory] = useState("Personal Growth");
     const [emotionalTone, setEmotionalTone] = useState("Realization");
     const [accessLevel, setAccessLevel] = useState("Free");

     // Dropdown Open/Close Toggles
     const [isCatOpen, setIsCatOpen] = useState(false);
     const [isToneOpen, setIsToneOpen] = useState(false);
     const [isAccessOpen, setIsAccessOpen] = useState(false);

     // Submission Statuses
     const [loading, setLoading] = useState(false);
     const [toast, setToast] = useState({ show: false, message: "", type: "" });

     // Dropdown Static Configurations
     const categories = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
     const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

     const triggerToast = (message, type = "success") => {
          setToast({ show: true, message, type });
          setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!title.trim() || !description.trim()) {
               triggerToast("Please fill out the Title and Description fields!", "error");
               return;
          }

          setLoading(true);

          // Deep Payload Assembly Matching DB Schema Requirements
          const payload = {
               title: title.trim(),
               description: description.trim(),
               category,
               emotionalTone,
               imageUrl: imageUrl.trim() || null,
               visibility: "public",                     
               accessLevel: isPremium ? accessLevel : "Free", 
               likes: [],                             
               likesCount: 0,
               isFeatured: false,
               isReviewed: false,
               creatorId: user?.id || "anonymous",
          };

          try {
               const response = await submitLessons(payload);

               if (response && (response.success || response.acknowledged)) {
                    triggerToast("🎉 Content published successfully to the global library!");

                    setTitle("");
                    setDescription("");
                    setImageUrl("");
                    setCategory("Personal Growth");
                    setEmotionalTone("Realization");
                    setAccessLevel("Free");
               } else {
                    triggerToast("Failed to safe-keep into core Database engine.", "error");
               }
          } catch (error) {
               console.error(error);
               triggerToast("An unexpected breakdown occurred during broadcast.", "error");
          } finally {
               setLoading(false);
          }
     };

     if (isPending) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm font-mono text-neutral-500 animate-pulse">Initializing Lesson Architect...</span>
               </div>
          );
     }

     if (!user) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm font-mono text-danger">Identity missing. Please authorize access.</span>
               </div>
          );
     }

     return (
          <div className="max-w-3xl mx-auto space-y-8 relative z-10 pb-20">

               {/* Interactive Feedback Toast Engine */}
               {toast.show && (
                    <div className={`fixed top-5 right-5 z-[99999] px-5 py-3 rounded-xl border font-medium text-sm shadow-2xl animate-in fade-in slide-in-from-top-4 ${toast.type === "error"
                         ? "bg-danger-500/10 border-danger-500/20 text-danger-400"
                         : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                         }`}>
                         {toast.message}
                    </div>
               )}

               {/*  Header Element */}
               <div className="space-y-1.5 border-b border-neutral-900 pb-5">
                    <div className="flex items-center gap-2">
                         <BookOpen className="w-5 h-5 text-purple-400" />
                         <h2 className="text-2xl font-black text-white tracking-tight">Draft a Life Lesson</h2>
                    </div>
                    <p className="text-sm text-neutral-400 font-light">
                         Translate raw experiences, metrics, and vulnerabilities into structured wisdom.
                    </p>
               </div>

               {/*  Main Grid Workstation */}
               <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title Input */}
                    <div className="space-y-1.5">
                         <label className="text-xs font-semibold text-neutral-400">Lesson Title</label>
                         <input
                              type="text"
                              required
                              placeholder="e.g., Why Chasing Perfection Will Ruin Your First Project"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                         />
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-1.5">
                         <label className="text-xs font-semibold text-neutral-400">Full Description / Story / Insight</label>
                         <textarea
                              required
                              rows={8}
                              placeholder="Unveil the narrative. What happened? What was the psychological cost? What is the core takeaway for others?"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors resize-none leading-relaxed"
                         />
                    </div>

                    {/* Dual Column Metadata Selection Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                         {/* Category Dropdown Selection */}
                         <div className="space-y-1.5 relative">
                              <label className="text-xs font-semibold text-neutral-400">Category</label>
                              <button
                                   type="button"
                                   onClick={() => { setIsCatOpen(!isCatOpen); setIsToneOpen(false); setIsAccessOpen(false); }}
                                   className="w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between hover:border-neutral-700 transition-colors"
                              >
                                   <span>{category}</span>
                                   <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${isCatOpen ? "rotate-180" : ""}`} />
                              </button>

                              {isCatOpen && (
                                   <div className="absolute top-[105%] left-0 w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                                        {categories.map((cat) => (
                                             <button
                                                  key={cat}
                                                  type="button"
                                                  onClick={() => { setCategory(cat); setIsCatOpen(false); }}
                                                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${category === cat ? "bg-purple-600/20 text-purple-400 font-bold" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                                             >
                                                  {cat}
                                             </button>
                                        ))}
                                   </div>
                              )}
                         </div>

                         {/* Emotional Tone Dropdown Selection */}
                         <div className="space-y-1.5 relative">
                              <label className="text-xs font-semibold text-neutral-400">Emotional Tone</label>
                              <button
                                   type="button"
                                   onClick={() => { setIsToneOpen(!isToneOpen); setIsCatOpen(false); setIsAccessOpen(false); }}
                                   className="w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between hover:border-neutral-700 transition-colors"
                              >
                                   <span>{emotionalTone}</span>
                                   <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${isToneOpen ? "rotate-180" : ""}`} />
                              </button>

                              {isToneOpen && (
                                   <div className="absolute top-[105%] left-0 w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                                        {tones.map((tone) => (
                                             <button
                                                  key={tone}
                                                  type="button"
                                                  onClick={() => { setEmotionalTone(tone); setIsToneOpen(false); }}
                                                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${emotionalTone === tone ? "bg-purple-600/20 text-purple-400 font-bold" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                                             >
                                                  {tone}
                                             </button>
                                        ))}
                                   </div>
                              )}
                         </div>

                    </div>

                    {/* Optional Image URL Integration */}
                    <div className="space-y-1.5">
                         <label className="text-xs font-semibold text-neutral-400">Cover Image URL <span className="text-neutral-600 font-light">(Optional)</span></label>
                         <div className="relative flex items-center">
                              <input
                                   type="url"
                                   placeholder="https://images.unsplash.com/..."
                                   value={imageUrl}
                                   onChange={(e) => setImageUrl(e.target.value)}
                                   className="w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                              />
                              <CloudArrowUpIn className="w-4 h-4 text-neutral-500 absolute right-3 pointer-events-none" />
                         </div>
                    </div>

                    {/* Protected Access Level Dropdown Gate */}
                    <div className="space-y-1.5 relative">
                         <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-neutral-400">Access Level</label>
                              {!isPremium && (
                                   <span className="text-[10px] font-mono text-amber-500/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">
                                        Upgrade to Premium to create paid lessons.
                                   </span>
                              )}
                         </div>

                         <button
                              type="button"
                              disabled={!isPremium}
                              onClick={() => { setIsAccessOpen(!isAccessOpen); setIsCatOpen(false); setIsToneOpen(false); }}
                              className={`w-full border rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between transition-colors ${isPremium
                                   ? "bg-[#0c0c0e] border-neutral-800 hover:border-neutral-700 cursor-pointer"
                                   : "bg-[#0c0c0e]/40 border-neutral-900 text-neutral-500 cursor-not-allowed select-none"
                                   }`}
                         >
                              <div className="flex items-center gap-2">
                                   <span>{isPremium ? accessLevel : "Free"}</span>
                                   {!isPremium && <span className="text-xs text-neutral-600 font-light">(Locked)</span>}
                              </div>
                              {isPremium && <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${isAccessOpen ? "rotate-180" : ""}`} />}
                         </button>

                         {/* Conditional Dropdown list for premium entities only */}
                         {isPremium && isAccessOpen && (
                              <div className="absolute top-[105%] left-0 w-full bg-[#0c0c0e] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 py-1.5">
                                   {["Free", "Premium"].map((level) => (
                                        <button
                                             key={level}
                                             type="button"
                                             onClick={() => { setAccessLevel(level); setIsAccessOpen(false); }}
                                             className={`w-full text-left px-4 py-2 text-xs transition-colors ${accessLevel === level ? "bg-purple-600/20 text-purple-400 font-bold" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                                        >
                                             {level}
                                        </button>
                                   ))}
                              </div>
                         )}
                    </div>

                    {/* Action Controls Trigger */}
                    <div className="pt-4 flex justify-end">
                         <button
                              type="submit"
                              disabled={loading}
                              className="w-full sm:w-auto font-bold px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xl transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                         >
                              {loading ? (
                                   <>
                                        <Plus className="w-4 h-4 animate-spin" />
                                        <span>Publishing to Network...</span>
                                   </>
                              ) : (
                                   <>
                                        <Plus className="w-4 h-4" />
                                        <span>Publish Lesson</span>
                                   </>
                              )}
                         </button>
                    </div>

               </form>
          </div>
     );
}