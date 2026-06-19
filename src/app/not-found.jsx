"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
     const router = useRouter();

     return (
          <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-white overflow-hidden px-4">

               {/* 🔮 Background Ambient Glows */}
               <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
               <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

               {/* 🌌 Grid Overlay for techy look */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

               {/* 📦 Main Content */}
               <div className="relative z-10 text-center max-w-md mx-auto">

                    {/* Big 404 with Neon Effect */}
                    <h1 className="text-[120px] sm:text-[160px] font-black tracking-tighter leading-none bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent select-none animate-pulse">
                         404
                    </h1>

                    {/* Glitchy/Neon horizontal line separator */}
                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                    {/* Error Message */}
                    <h2 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-neutral-200">
                         Lost in the Abyss?
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                         The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    {/* 🎮 Action Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                         {/* Go Back Button */}
                         <button
                              onClick={() => router.back()}
                              className="w-full sm:w-auto rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-300 hover:text-white border-neutral-700/60 transition-all active:scale-95"
                         >
                              ← Go Back
                         </button>

                         {/* Take Me Home Button */}
                         <Link
                              href="/"
                              className="w-full sm:w-auto text-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                         >
                              Take Me Home
                         </Link>

                    </div>

               </div>

               {/* 🚀 Tiny Interactive Footer */}
               <p className="absolute bottom-6 text-xs text-neutral-600 font-mono tracking-widest select-none">
                    ERROR_CODE: PAGE_NOT_FOUND
               </p>
          </main>
     );
}