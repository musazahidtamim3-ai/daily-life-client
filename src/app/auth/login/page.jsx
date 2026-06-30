"use client";

import { useState, Suspense } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

function LoginForm() {
     const router = useRouter();
     const searchParams = useSearchParams();
     const redirectTo = searchParams.get("redirect") || "/";

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [isVisible, setIsVisible] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [isGoogleLoading, setIsGoogleLoading] = useState(false);
     const [error, setError] = useState("");

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError("");

          if (!email || !password) {
               setError("Please fill in all fields.");
               return;
          }

          setIsLoading(true);

          try {
               const { data, error: authError } = await authClient.signIn.email({
                    email,
                    password,
                    callbackURL: redirectTo,
               });

               if (authError) {
                    setError(authError.message || "Invalid email or password.");
                    return;
               }

               toast.success("Welcome back!");
               router.push(redirectTo);
               router.refresh();

          } catch (err) {
               setError("Something went wrong. Please try again.");
          } finally {
               setIsLoading(false);
          }
     };

     const handleGoogleLogin = async () => {
          setError("");
          setIsGoogleLoading(true);
          try {
               await authClient.signIn.social({
                    provider: "google",
                    callbackURL: '/',
               });
          } catch (err) {
               setError("Google sign-in failed. Please try again.");
               setIsGoogleLoading(false);
          }
     };

     return (
          <main className="relative min-h-screen bg-[#030305] flex items-center justify-center p-4 sm:p-6 overflow-hidden">

               <div className="absolute top-[-15%] left-[-15%] w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
               <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

               <div className="relative w-full max-w-2xl">

                    <div className="absolute top-0 inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent rounded-full" />

                    <div className="bg-gradient-to-b from-zinc-900/60 to-[#06070b]/95 border border-zinc-800/60 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl">

                         <div className="text-center mb-8">
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H8.25" />
                                   </svg>
                              </div>
                              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
                                   Welcome back
                              </h1>
                              <p className="text-xs text-zinc-500 mt-1.5">Sign in to access your life lessons</p>
                         </div>

                         {error && (
                              <div className="mb-5 p-3.5 text-xs font-medium rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                   {error}
                              </div>
                         )}

                         <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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

                              <div className="flex flex-col gap-1.5">
                                   <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                                   </div>
                                   <div className="relative">
                                        <input
                                             type={isVisible ? "text" : "password"}
                                             required
                                             placeholder="••••••••"
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                             className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200"
                                        />
                                        <button
                                             type="button"
                                             onClick={() => setIsVisible(!isVisible)}
                                             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-indigo-400 transition-colors"
                                        >
                                             {isVisible ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                   </div>
                              </div>

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
                                             Signing in...
                                        </span>
                                   ) : "Login"}
                              </button>

                              <div className="relative flex items-center py-1">
                                   <div className="flex-grow border-t border-zinc-800/60" />
                                   <span className="mx-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">or continue with</span>
                                   <div className="flex-grow border-t border-zinc-800/60" />
                              </div>

                              <button
                                   type="button"
                                   onClick={handleGoogleLogin}
                                   disabled={isGoogleLoading}
                                   className="w-full flex items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                   {isGoogleLoading ? (
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                   ) : (
                                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                             <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                             <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                             <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                                        </svg>
                                   )}
                                   {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                              </button>

                              <p className="text-center text-xs text-zinc-500 pt-1">
                                   Don&apos;t have an account?{" "}
                                   <Link
                                        href={`/auth/register?redirect=${redirectTo}`}
                                        className="font-bold text-indigo-400 hover:text-purple-400 transition-colors underline underline-offset-4 decoration-indigo-500/30"
                                   >
                                        Create new account here
                                   </Link>
                              </p>

                         </form>
                    </div>
               </div>
          </main>
     );
}

export default function LoginPage() {
     return (
          <Suspense fallback={null}>
               <LoginForm />
          </Suspense>
     );
}