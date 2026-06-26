"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Next.js Image Component

export default function TopContributors() {
     const [contributors, setContributors] = useState([]);

     useEffect(() => {
          fetch("http://localhost:5000/api/top-contributors")
               .then((res) => res.json())
               .then((data) => {
                    if (data.success) {
                         setContributors(data.data);
                    }
               });
     }, []);

     const getBadge = (index) => {
          if (index === 0) return "🥇 Gold Contributor";
          if (index === 1) return "🥈 Silver Contributor";
          if (index === 2) return "🥉 Bronze Contributor";
          return `👤 Rank #${index + 1}`;
     };

     const getBadgeStyle = (index) => {
          if (index === 0) return "bg-amber-950/40 text-amber-400 border-amber-900/50";
          if (index === 1) return "bg-zinc-800 text-zinc-300 border-zinc-700";
          if (index === 2) return "bg-orange-950/40 text-orange-400 border-orange-900/50";
          return "bg-zinc-900 text-zinc-500 border-zinc-800";
     };

     return (
          <div className="w-full max-w-7xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
               <h2 className="text-xl font-black text-white tracking-tight mb-5 flex items-center gap-2">
                    🏆 Platform Top Contributors
               </h2>

               <div className="space-y-3">
                    {contributors.map((user, index) => (
                         <div
                              key={user.creatorId}
                              className="flex justify-between items-center p-3.5 bg-zinc-900/50 border border-zinc-800/60 rounded-xl hover:border-zinc-700 transition"
                         >
                              <div className="flex items-center gap-3">
                                   <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
                                        <Image
                                             src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} 
                                             alt={user.name || "User"}
                                             fill
                                             className="object-cover"
                                        />
                                   </div>

                                   <div className="space-y-1">
                                        <p className="text-sm font-bold text-zinc-200">
                                             {user.name || "Anonymous Contributor"}
                                        </p>

                                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeStyle(index)}`}>
                                             {getBadge(index)}
                                        </span>
                                   </div>
                              </div>

                              <div className="text-right flex items-center gap-2 shrink-0 bg-gray-900/10 border border-gray-900/30 px-2 py-1">
                                   <span className="text-[10px] font-black text-emerald-400 block">
                                        {user.totalLessons}
                                   </span>
                                   <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                                        Lessons
                                   </span>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
}