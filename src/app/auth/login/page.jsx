"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // আপনার প্রোজেক্টের পাথ অনুযায়ী ঠিক করে নিবেন

export default function LoginPage() {
     const router = useRouter();
     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });
     const [isLoading, setIsLoading] = useState(false);

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     // Better-Auth এর মাধ্যমে ইমেইল/পাসওয়ার্ড লগইন
     const handleSubmit = async (e) => {
          e.preventDefault();
          setIsLoading(true);

          const { email, password } = formData;

          if (!email || !password) {
               toast.error("Please fill in all fields.");
               setIsLoading(false);
               return;
          }

          await authClient.signIn.email({
               email: email,
               password: password,
               callbackURL: "/", // লগইন সফল হলে যেখানে রিডাইরেক্ট হবে
               onRequest: () => {
                    setIsLoading(true);
               },
               onSuccess: () => {
                    setIsLoading(false);
                    toast.success("Welcome back! Logged in successfully.");
                    router.push("/");
               },
               onError: (ctx) => {
                    setIsLoading(false);
                    toast.error(ctx.error.message || "Invalid email or password.");
               },
          });
     };

     // Better-Auth এর মাধ্যমে গুগল লগইন
     const handleGoogleLogin = async () => {
          await authClient.signIn.social({
               provider: "google",
               callbackURL: "/",
               onRequest: () => {
                    toast.loading("Connecting with Google...", { id: "google-auth" });
               },
               onSuccess: () => {
                    toast.dismiss("google-auth");
                    toast.success("Signed in with Google!");
               },
               onError: (ctx) => {
                    toast.dismiss("google-auth");
                    toast.error(ctx.error.message || "Google sign-in failed.");
               },
          });
     };

     // রেজিষ্ট্রেশন পেজের সাথে হুবহু মিল রাখা ইনপুট স্টাইল
     const inputClassName = "w-full bg-neutral-900/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/60 focus:bg-neutral-900 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300";

     return (
          <main className="relative min-h-screen bg-[#040406] flex items-center justify-center p-4 overflow-hidden font-sans text-neutral-200">

               <Toaster position="top-right" reverseOrder={false} />

               {/* ১. ব্যাকগ্রাউন্ড ম্যাসিভ গ্লো ইফেক্ট */}
               <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
               <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none" />

               {/* ২. গ্লাস-মরফিজম কার্ড ফ্রেম উইথ শার্প বর্ডার ও নিওন গ্লো */}
               <div className="relative w-full max-w-2xl bg-neutral-950/40 border border-neutral-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.06)] hover:border-neutral-700 hover:shadow-[0_0_60px_rgba(168,85,247,0.12)] transition-all duration-500">

                    {/* হেডার সেকশন ও গ্লোয়িং আইকন */}
                    <div className="text-center space-y-2 mb-8">
                         <div className="inline-flex p-3 bg-purple-950/40 rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-purple-400">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H8.25" />
                              </svg>
                         </div>
                         <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
                         <p className="text-xs text-neutral-400">Sign in to access your digital life lessons</p>
                    </div>

                    {/* লগইন ফর্ম */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                         {/* ইমেইল ফিল্ড */}
                         <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Email Address</label>
                              <input
                                   type="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   placeholder="name@example.com"
                                   className={inputClassName}
                                   required
                              />
                         </div>

                         {/* পাসওয়ার্ড ফিল্ড */}
                         <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Password</label>
                              <input
                                   type="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   placeholder="••••••••"
                                   className={inputClassName}
                                   required
                              />
                         </div>

                         {/* সাবমিট বাটন (পার্পল গ্রেডিয়েন্ট গ্লো) */}
                         <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:brightness-110 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                         >
                              {isLoading ? "Signing In..." : "Login"}
                         </button>
                    </form>

                    {/* ডিভাইডার */}
                    <div className="relative flex py-6 items-center">
                         <div className="flex-grow border-t border-neutral-900"></div>
                         <span className="flex-shrink mx-4 text-xs font-semibold text-neutral-600 uppercase tracking-widest">Or</span>
                         <div className="flex-grow border-t border-neutral-900"></div>
                    </div>

                    {/* গুগল লগইন বাটন */}
                    <button
                         onClick={handleGoogleLogin}
                         type="button"
                         className="w-full flex items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-700 px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white transition-all duration-200"
                    >
                         <svg className="h-4 w-4" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                         </svg>
                         Continue with Google
                    </button>

                    {/* রেজিষ্ট্রেশন পেজে রিডাইরেক্ট লিঙ্ক */}
                    <p className="mt-6 text-center text-sm text-neutral-500">
                         Don&apos;t have an account?{" "}
                         <Link href="/auth/register" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                              Register here
                         </Link>
                    </p>

               </div>
          </main>
     );
}