"use client";

import { useState } from "react";
import { Eye, EyeSlash, Sparkles } from "@gravity-ui/icons";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [photoUrl, setPhotoUrl] = useState("");
     const [password, setPassword] = useState("");
     const [role, setRole] = useState("user");

     const router = useRouter();
     const searchParams = useSearchParams();
     const redirectTo = searchParams.get("redirect") || "/auth/login";

     const [isVisible, setIsVisible] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState("");
     const [success, setSuccess] = useState("");
     const [passwordFocused, setPasswordFocused] = useState(false);

     const toggleVisibility = () => setIsVisible(!isVisible);

     const passwordRules = [
          { label: "At least 6 characters", test: (p) => p.length >= 6 },
          { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
          { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
     ];

     const allRulesPassed = passwordRules.every((r) => r.test(password));

     const handleSignup = async (e) => {
          e.preventDefault();
          setError("");
          setSuccess("");

          if (!name || !email || !password) {
               setError("Please fill in all required fields.");
               return;
          }

          if (!allRulesPassed) {
               setError("Please make sure your password meets all requirements.");
               return;
          }

          setIsLoading(true);

          try {
               const { data, error: authError } = await signUp.email({
                    email,
                    password,
                    name,
                    image: photoUrl || undefined,
                    role,
                    isPremium: false,
               });

               if (authError) {
                    setError(authError.message || "Something went wrong during signup.");
               } else {
                    setSuccess("Account created successfully! Welcome.");
                    setName(""); setEmail(""); setPhotoUrl(""); setPassword("");
                    setTimeout(() => router.push(redirectTo), 1500);
               }
          } catch (err) {
               setError("An unexpected network error occurred.");
          } finally {
               setIsLoading(false);
          }
     };

     const handleGoogleSignup = async () => {
          setError(""); setSuccess("");
          try {
               await signIn.social({ provider: "google", callbackURL: '/' });
          } catch (err) {
               setError("Google Authentication failed.");
          }
     };

     return (
          <main className="relative min-h-screen bg-[#030305] flex items-center justify-center p-4 sm:p-6 overflow-hidden">

               <div className="absolute top-[-15%] left-[-15%] w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
               <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

               <div className="relative w-full max-w-2xl">
                    <div className="absolute top-0 inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent rounded-full" />

                    <div className="bg-gradient-to-b from-zinc-900/60 to-[#06070b]/95 border border-zinc-800/60 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl">

                         {/* Header */}
                         <div className="text-center mb-8">
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
                                   <span className="text-2xl"><Sparkles className="w-6 h-6 text-purple-500" /></span>
                              </div>
                              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
                                   Create an account
                              </h1>
                              <p className="text-xs text-zinc-500 mt-1.5">Fill in the fields below to get started</p>
                         </div>

                         {/* Alerts */}
                         {error && (
                              <div className="mb-5 p-3.5 text-xs font-medium rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                   {error}
                              </div>
                         )}
                         {success && (
                              <div className="mb-5 p-3.5 text-xs font-medium rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                   {success}
                              </div>
                         )}

                         <form onSubmit={handleSignup} className="flex flex-col gap-4">

                              {/* Name */}
                              <div className="flex flex-col gap-1.5">
                                   <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                                   <input
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200"
                                   />
                              </div>

                              {/* Email */}
                              <div className="flex flex-col gap-1.5">
                                   <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                                   <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200"
                                   />
                              </div>

                              {/* Photo URL */}
                              <div className="flex flex-col gap-1.5">
                                   <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                        Photo URL <span className="text-zinc-700 font-normal normal-case">(optional)</span>
                                   </label>
                                   <input
                                        type="url"
                                        placeholder="https://example.com/photo.jpg"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200"
                                   />
                              </div>

                              {/* Password */}
                              <div className="flex flex-col gap-1.5">
                                   <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                                   <div className="relative">
                                        <input
                                             type={isVisible ? "text" : "password"}
                                             required
                                             placeholder="••••••••"
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                             onFocus={() => setPasswordFocused(true)}
                                             onBlur={() => setPasswordFocused(false)}
                                             className={`w-full bg-zinc-900/80 border hover:border-zinc-700 focus:ring-2 focus:ring-indigo-500/15 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200 ${password.length > 0
                                                       ? allRulesPassed
                                                            ? 'border-emerald-500/50 focus:border-emerald-500'
                                                            : 'border-red-500/40 focus:border-red-500/60'
                                                       : 'border-zinc-800 focus:border-indigo-500'
                                                  }`}
                                        />
                                        <button
                                             type="button"
                                             onClick={toggleVisibility}
                                             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-indigo-400 transition-colors"
                                        >
                                             {isVisible ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                   </div>

                                   {/* Password Rules */}
                                   {(passwordFocused || password.length > 0) && (
                                        <div className="mt-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-2">
                                             {passwordRules.map((rule, i) => {
                                                  const passed = rule.test(password);
                                                  return (
                                                       <div key={i} className="flex items-center gap-2">
                                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${passed
                                                                      ? 'bg-emerald-500/20 border border-emerald-500/40'
                                                                      : 'bg-zinc-800 border border-zinc-700'
                                                                 }`}>
                                                                 {passed ? (
                                                                      <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                      </svg>
                                                                 ) : (
                                                                      <svg className="w-2.5 h-2.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                      </svg>
                                                                 )}
                                                            </div>
                                                            <span className={`text-[11px] font-medium transition-colors duration-200 ${passed ? 'text-emerald-400' : 'text-zinc-500'
                                                                 }`}>
                                                                 {rule.label}
                                                            </span>
                                                       </div>
                                                  );
                                             })}
                                        </div>
                                   )}
                              </div>

                              {/* Submit */}
                              <button
                                   type="submit"
                                   disabled={isLoading}
                                   className="w-full mt-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                   {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                             <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                             </svg>
                                             Creating account...
                                        </span>
                                   ) : "Sign Up"}
                              </button>

                              {/* Divider */}
                              <div className="relative flex items-center py-1">
                                   <div className="flex-grow border-t border-zinc-800/60" />
                                   <span className="mx-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">or continue with</span>
                                   <div className="flex-grow border-t border-zinc-800/60" />
                              </div>

                              {/* Google */}
                              <button
                                   type="button"
                                   onClick={handleGoogleSignup}
                                   className="w-full flex items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-200 active:scale-[0.99]"
                              >
                                   <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                                   </svg>
                                   Continue with Google
                              </button>

                              {/* Footer */}
                              <p className="text-center text-xs text-zinc-500 pt-1">
                                   Already have an account?{" "}
                                   <Link
                                        href={`/auth/login?redirect=${redirectTo}`}
                                        className="font-bold text-indigo-400 hover:text-purple-400 transition-colors underline underline-offset-4 decoration-indigo-500/30"
                                   >
                                        Sign in instead
                                   </Link>
                              </p>

                         </form>
                    </div>
               </div>
          </main>
     );
}