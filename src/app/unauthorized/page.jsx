"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
     const router = useRouter();

     return (
          <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-white overflow-hidden px-4">

               {/* 🚨 Background Ambient Glows (Red/Purple theme for warning) */}
               <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-red-600/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
               <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

               {/* 🌌 Grid Overlay */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

               {/* 📦 Main Content */}
               <div className="relative z-10 text-center max-w-md mx-auto flex flex-col items-center">

                    {/* Animated Shield/Lock Icon */}
                    <div className="mb-6 relative flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)] animate-bounce duration-1000">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                         </svg>
                         {/* Little pulsing dot */}
                         <span className="absolute top-0 right-0 flex h-3 w-3 translate-x-1/2 -translate-y-1/2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                         </span>
                    </div>

                    {/* Big 401 Title */}
                    <h1 className="text-[100px] sm:text-[130px] font-black tracking-tighter leading-none bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent select-none">
                         401
                    </h1>

                    {/* Warning Separator Line */}
                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto shadow-[0_0_12px_rgba(239,68,68,0.8)]" />

                    {/* Error Message */}
                    <h2 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-neutral-200">
                         Halt! Restricted Area
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                         You do not have permission to view this resource. Please sign in with an authorized account or return to safety.
                    </p>

                    {/* 🎮 Action Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">

                         {/* Go Back Button */}
                         <button
                              onClick={() => router.back()}
                              className="w-full sm:w-auto rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-300 hover:text-white border-neutral-700/60 transition-all active:scale-95"
                         >
                              ← Go Back
                         </button>

                         {/* Login Button (Primary Action) */}
                         <Link
                              href="/auth/login"
                              className="w-full sm:w-auto text-center rounded-full bg-gradient-to-r from-red-600 to-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                         >
                              Sign In Now
                         </Link>

                    </div>

               </div>

               {/* 🚀 Tech Footer */}
               <p className="absolute bottom-6 text-xs text-neutral-600 font-mono tracking-widest select-none">
                    ERROR_CODE: HTTP_401_UNAUTHORIZED
               </p>
          </main>
     );
}