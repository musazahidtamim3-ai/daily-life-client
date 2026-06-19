"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
     const router = useRouter();
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          photoUrl: "",
          password: "",
     });
     const [isLoading, setIsLoading] = useState(false);
     const [isSuccess, setIsSuccess] = useState(false);
     const [showPassword, setShowPassword] = useState(false); // পাসওয়ার্ড টগলের জন্য স্টেট

     const isPasswordValid = formData.password.length >= 8;

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const { name, email, photoUrl, password } = formData;

          if (!name || !email || !password) {
               toast.error("Please fill in all required fields.");
               return;
          }

          if (!isPasswordValid) {
               toast.error("Password must be at least 8 characters long.");
               return;
          }

          setIsLoading(true);

          try {
               // 💡 সরাসরি রেসপন্স অবজেক্ট ডি-স্ট্রাকচার করা হলো
               const res = await authClient.signUp.email({
                    email,
                    password,
                    name,
                    image: photoUrl || undefined,
                    callbackURL: "/auth/login",
               });

               // ⚠️ কোনো এরর (যেমন ৪২২ বা ডুপ্লিকেট ইমেইল) আসলে তা এখানে ধরা পড়বে
               if (res?.error) {
                    setIsLoading(false);
                    // better-auth এর সুনির্দিষ্ট এরর মেসেজ সরাসরি টোস্টে যাবে
                    const errorMsg = res.error.message || res.error.statusText || "Registration failed. Please check your data.";
                    toast.error(errorMsg);
                    return;
               }

               // 🟢 যদি কোনো এরর না থাকে এবং সফল হয়
               setIsLoading(false);
               setIsSuccess(true);
               toast.success("Account created successfully!");

               setTimeout(() => {
                    router.push("/auth/login");
               }, 1500);

          } catch (err) {
               setIsLoading(false);
               // ক্যাচ ব্লকের যেকোনো অজানা এরর টোস্টে দেখানোর ব্যবস্থা
               const catchMsg = err?.message || "An unexpected network error occurred.";
               toast.error(catchMsg);
          }
     };

     const handleGoogleLogin = async () => {
          try {
               const res = await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
                    onRequest: () => toast.loading("Connecting with Google...", { id: "google-auth" }),
               });

               if (res?.error) {
                    toast.dismiss("google-auth");
                    toast.error(res.error.message || "Google sign-in failed.");
                    return;
               }

               toast.dismiss("google-auth");
               toast.success("Signed in with Google!");
          } catch (err) {
               toast.dismiss("google-auth");
               toast.error("Google Authentication failed.");
          }
     };

     const inputClassName = "w-full bg-neutral-900/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/60 focus:bg-neutral-900 transition-all duration-300";

     return (
          <main className="relative min-h-screen bg-[#040406] flex items-center justify-center p-4 font-sans text-neutral-200">
               <Toaster position="top-right" />

               <div className="relative w-full max-w-2xl bg-neutral-950/40 border rounded-3xl p-8 border-neutral-700 shadow-xl">

                    {/* Header */}
                    <div className="text-center space-y-2 mb-8">
                         <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
                         <p className="text-xs text-neutral-400">Join Digital Life Lessons and start preserving your wisdom</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-neutral-400 uppercase">Full Name</label>
                              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ariyan Khan" className={inputClassName} required />
                         </div>

                         <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-neutral-400 uppercase">Email Address</label>
                              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ariyan@gmail.com" className={inputClassName} required />
                         </div>

                         <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-neutral-400 uppercase">Photo URL (Optional)</label>
                              <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://unsplash.com" className={inputClassName} />
                         </div>

                         <div className="space-y-1.5 relative">
                              <label className="text-xs font-semibold text-neutral-400 uppercase">Password</label>
                              <div className="relative">
                                   <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`${inputClassName} pr-12`} // ডানপাশে চোখের জন্য জায়গা রাখা হলো
                                        required
                                   />
                                   {/* 👁️ পাসওয়ার্ড দেখানোর টগল বাটন */}
                                   <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors text-xs"
                                   >
                                        {showPassword ? "Hide" : "Show"}
                                   </button>
                              </div>

                              <div className="pt-1 text-[11px]">
                                   <span className={isPasswordValid ? "text-emerald-400" : "text-neutral-500"}>
                                        {isPasswordValid ? "✓" : "○"} Password must be at least 8 characters long
                                   </span>
                              </div>
                         </div>

                         {isSuccess ? (
                              <div className="w-full mt-4 rounded-xl bg-emerald-600/20 border border-emerald-500/50 py-3 text-sm font-semibold text-emerald-400 text-center">
                                   Registration Successful! Redirecting...
                              </div>
                         ) : (
                              <button type="submit" disabled={isLoading} className="w-full mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all disabled:opacity-50">
                                   {isLoading ? "Creating Account..." : "Register"}
                              </button>
                         )}
                    </form>

                    <div className="relative flex py-5 items-center">
                         <div className="flex-grow border-t border-neutral-900"></div>
                         <span className="mx-4 text-xs font-semibold text-neutral-600 uppercase">Or</span>
                         <div className="flex-grow border-t border-neutral-900"></div>
                    </div>

                    <button onClick={handleGoogleLogin} type="button" className="w-full flex items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white transition-all">
                         Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-neutral-500">
                         Already have an account?{" "}
                         <Link href="/auth/login" className="font-semibold text-purple-400 hover:text-purple-300">
                              Login here
                         </Link>
                    </p>
               </div>
          </main>
     );
}