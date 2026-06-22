"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
     // Form fields
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [photoUrl, setPhotoUrl] = useState("");
     const [password, setPassword] = useState("");
     const [role, setRole] = useState("user");

     const router = useRouter();
     const searchParams = useSearchParams();
     const redirectTo = searchParams.get("redirect") || "/";

     // UI States (সব এরর ও সাকসেস মেসেজ হ্যান্ডেল করার জন্য)
     const [isVisible, setIsVisible] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState("");
     const [success, setSuccess] = useState("");

     const toggleVisibility = () => setIsVisible(!isVisible);

     // 🔐 আপনার দেওয়া নির্দিষ্ট পাসওয়ার্ড রুলস ভ্যালিডেশন
     const validatePassword = (pass) => {
          if (pass.length < 6) {
               return "Password length must be at least 6 characters.";
          }
          if (!/[A-Z]/.test(pass)) {
               return "Password must have at least one uppercase letter.";
          }
          if (!/[a-z]/.test(pass)) {
               return "Password must have at least one lowercase letter.";
          }
          return null;
     };

     const handleSignup = async (e) => {
          e.preventDefault();
          setError("");
          setSuccess("");

          if (!name || !email || !password) {
               setError("Please fill in all required fields.");
               return;
          }

          // পাসওয়ার্ড রুলস চেক
          const passwordError = validatePassword(password);
          if (passwordError) {
               setError(passwordError);
               return;
          }

          setIsLoading(true);
          const isPremium = false;

          try {
               const { data, error: authError } = await signUp.email({
                    email,
                    password,
                    name,
                    image: photoUrl || undefined,
                    role,
                    isPremium
               });

               if (authError) {
                    setError(authError.message || "Something went wrong during signup.");
               } else {
                    setSuccess("Account created successfully! Welcome.");
                    setName("");
                    setEmail("");
                    setPhotoUrl("");
                    setPassword("");

                    setTimeout(() => {
                         router.push(redirectTo);
                    }, 1500);
               }
          } catch (err) {
               setError("An unexpected network error occurred.");
          } finally {
               setIsLoading(false);
          }
     };

     const handleGoogleSignup = async () => {
          setError("");
          setSuccess("");
          try {
               await signIn.social({
                    provider: "google",
                    callbackURL: redirectTo
               });
          } catch (err) {
               setError("Google Authentication failed.");
          }
     };

     return (
          <main className="relative min-h-screen bg-[#030305] flex items-center justify-center p-4 sm:p-6 font-sans text-zinc-300 select-none overflow-hidden">

               {/* 🌌 সাইবার গ্লো ব্যাকগ্রাউন্ড */}
               <div className="absolute top-[-15%] left-[-15%] w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
               <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

               <Card className="relative w-full max-w-md bg-gradient-to-b from-zinc-900/40 via-[#0e0f17]/70 to-[#06070b]/95 border border-indigo-500/20 rounded-[32px] p-8 shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] backdrop-blur-3xl">

                    <div className="absolute top-0 inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                    {/* Header */}
                    <div className="flex flex-col items-center justify-center gap-1.5 pb-6 border-b border-zinc-800/60 mb-6 text-center">
                         <h1 className="text-3xl font-black bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
                              Create an account
                         </h1>
                         <p className="text-xs text-zinc-400 font-medium tracking-wide">
                              Fill in the fields below to get started
                         </p>
                    </div>

                    {/* ⚠️ লাইভ এরর ও সাকসেস মেসেজ ডিসপ্লে জোন */}
                    <div className="flex flex-col gap-3 mb-2">
                         {error && (
                              <div className="p-3.5 text-xs font-semibold rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 transition-all">
                                   ⚠️ {error}
                              </div>
                         )}
                         {success && (
                              <div className="p-3.5 text-xs font-semibold rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 transition-all">
                                   ✅ {success}
                              </div>
                         )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="flex flex-col gap-4">

                         {/* Name Field (বাম পাশের আইকন ছাড়া) */}
                         <TextField isRequired name="name" className="flex flex-col gap-1.5">
                              <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Name</Label>
                              <InputGroup className="flex items-center border border-zinc-800 bg-[#0b0c10]/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl px-4 transition-all duration-300">
                                   <Input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-transparent py-3.5 text-sm outline-none border-none text-white placeholder-zinc-600"
                                   />
                              </InputGroup>
                         </TextField>

                         {/* Email Field (বাম পাশের আইকন ছাড়া) */}
                         <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                              <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Email Address</Label>
                              <InputGroup className="flex items-center border border-zinc-800 bg-[#0b0c10]/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl px-4 transition-all duration-300">
                                   <Input
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent py-3.5 text-sm outline-none border-none text-white placeholder-zinc-600"
                                   />
                              </InputGroup>
                         </TextField>

                         {/* Photo URL Field (বাম পাশের আইকন ছাড়া) */}
                         <TextField name="photoUrl" type="url" className="flex flex-col gap-1.5">
                              <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Photo URL <span className="text-zinc-600 font-normal lowercase">(optional)</span></Label>
                              <InputGroup className="flex items-center border border-zinc-800 bg-[#0b0c10]/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl px-4 transition-all duration-300">
                                   <Input
                                        placeholder="https://example.com/profile.jpg"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="w-full bg-transparent py-3.5 text-sm outline-none border-none text-white placeholder-zinc-600"
                                   />
                              </InputGroup>
                         </TextField>

                         {/* Password Field (বাম পাশের আইকন ছাড়া, ডান পাশের Eye আইকন আছে) */}
                         <TextField isRequired name="password" className="flex flex-col gap-1.5">
                              <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Password</Label>
                              <InputGroup className="flex items-center justify-between border border-zinc-800 bg-[#0b0c10]/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl px-4 transition-all duration-300">
                                   <Input
                                        type={isVisible ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent py-3.5 text-sm outline-none border-none text-white placeholder-zinc-600"
                                   />
                                   <button
                                        className="focus:outline-none text-zinc-500 hover:text-indigo-400 transition ml-2"
                                        type="button"
                                        onClick={toggleVisibility}
                                   >
                                        {isVisible ? <EyeSlash size={16} /> : <Eye size={16} />}
                                   </button>
                              </InputGroup>
                         </TextField>

                         {/* Sign Up Button */}
                         <Button
                              type="submit"
                              isLoading={isLoading}
                              isDisabled={isLoading}
                              className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4 text-sm font-bold shadow-[0_4px_25px_rgba(99,102,241,0.25)] transition-all duration-300 active:scale-[0.98]"
                         >
                              Sign Up
                         </Button>

                         {/* ─────────────── OR ─────────────── */}
                         <div className="relative flex py-1 items-center">
                              <div className="flex-grow border-t border-zinc-800/60"></div>
                              <span className="mx-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Or sign up with</span>
                              <div className="flex-grow border-t border-zinc-800/60"></div>
                         </div>

                         {/* Google Login Button */}
                         <button
                              onClick={handleGoogleSignup}
                              type="button"
                              className="w-full flex items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-[#0c0d12]/40 hover:bg-zinc-900/80 px-4 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-300 active:scale-[0.99]"
                         >
                              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                   <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                   <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                   <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                   <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                              </svg>
                              Continue with Google
                         </button>

                         {/* Link that redirects to the Login page */}
                         <div className="text-center pt-2 text-xs font-medium text-zinc-500">
                              Already have an account?{" "}
                              <Link href={`/auth/login?redirect=${redirectTo}`} className="font-bold cursor-pointer text-xs text-indigo-400 hover:text-purple-400 transition-colors underline underline-offset-4 decoration-indigo-500/30">
                                   Sign in instead
                              </Link>
                         </div>

                    </form>
               </Card>
          </main>
     );
}