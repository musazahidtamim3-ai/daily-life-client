"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
     Table,
     TableHeader,
     TableColumn,
     TableBody,
     TableRow,
     TableCell,
     Button,
     Card,
     Badge,
     Chip
} from "@heroui/react";
import { Sparkles } from "@gravity-ui/icons/Sparkles";
import { Check } from "@gravity-ui/icons/Check";
import { Xmark } from "@gravity-ui/icons/Xmark";
import { CrownDiamond } from "@gravity-ui/icons/Crown";
import toast from "react-hot-toast";

export default function PricingPage() {
     const { data: sessionData, isPending } = authClient.useSession();
     const [loading, setLoading] = useState(false);

     const isLoggedIn = !!sessionData?.session;
     const isPremium = sessionData?.user?.plan === "premium";

     const handleUpgrade = async () => {
          if (!isLoggedIn) {
               toast.error("Please login first to upgrade!");
               return;
          }

          try {
               setLoading(true);
               const res = await fetch("/api/payment/create-checkout-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
               });

               const data = await res.json();

               if (data?.url) {
                    window.location.href = data.url;
               } else {
                    throw new Error("Failed to get checkout session URL");
               }
          } catch (error) {
               console.error("Stripe Checkout Error:", error);
               toast.error("Something went wrong with Stripe! Try again.");
          } finally {
               setLoading(false);
          }
     };

     const comparisonFeatures = [
          { key: "1", name: "Create Public Lessons", free: "Up to 5", premium: "Unlimited" },
          { key: "2", name: "Create Premium Lessons", free: false, premium: true },
          { key: "3", name: "Ad-free Experience", free: false, premium: true },
          { key: "4", name: "Priority Search Listing", free: false, premium: true },
          { key: "5", name: "Access to Others' Premium Content", free: false, premium: true },
          { key: "6", name: "Exclusive Profile Badge", free: "Standard", premium: "Premium ⭐" },
          { key: "7", name: "Advanced Insights & Analytics", free: false, premium: true },
          { key: "8", name: "24/7 Priority Support", free: false, premium: true },
     ];

     return (
          <main className="relative min-h-screen bg-[#09090b] text-white pt-28 pb-20 px-4 overflow-hidden">

               {/* 🔮 Cyber Ambient Glows */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
               <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

               <div className="max-w-4xl mx-auto relative z-10 space-y-16">

                    {/* 👑 Section Header */}
                    <div className="text-center space-y-4">
                         <Chip
                              variant="faded"
                              color="secondary"
                              className="border-purple-500/30 bg-purple-500/10 font-mono text-xs uppercase tracking-widest text-purple-300 px-3"
                         >
                              <span className="flex items-center gap-1.5">
                                   <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                   Pricing Plans
                              </span>
                         </Chip>
                         <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                              Upgrade Your <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">Wisdom Journey</span>
                         </h1>
                         <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base font-light">
                              Unlock unlimited potential, premium life lessons, and stand out in the community with lifetime access.
                         </p>
                    </div>

                    <div className="max-w-sm mx-auto">
                         <Badge content="LIFETIME" color="warning" size="sm" variant="flat" className="font-bold tracking-wider">
                              <Card
                                   className="border-1 border-purple-500/30 bg-[#0c0c0e]/70 backdrop-blur-md p-8 flex flex-col items-center text-center shadow-2xl shadow-purple-950/20 space-y-5"
                                   radius="lg"
                              >
                                   <div className="p-3 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-2xl border border-purple-500/30 text-purple-400">
                                        <CrownDiamond className="w-8 h-8 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                   </div>

                                   <div className="space-y-1">
                                        <h3 className="text-2xl font-extrabold text-white tracking-tight">Premium Plan</h3>
                                        <p className="text-xs text-neutral-400 font-light">One-time commitment. Infinite value.</p>
                                   </div>

                                   <div className="py-2">
                                        <span className="text-5xl font-black text-white tracking-tighter">৳1,500</span>
                                        <span className="text-neutral-500 text-xs font-mono block mt-1">/ permanent access</span>
                                   </div>

                                   {/* Action Button */}
                                   {isPending ? (
                                        <Button isLoading className="w-full font-bold" variant="flat" color="secondary" radius="md">Loading</Button>
                                   ) : isPremium ? (
                                        <Button
                                             disabled
                                             className="w-full font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-1 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                                             variant="bordered"
                                             radius="md"
                                        >
                                             Premium Member ⭐
                                        </Button>
                                   ) : (
                                        <Button
                                             isLoading={loading}
                                             onClick={handleUpgrade}
                                             className="w-full font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                                             radius="md"
                                             size="lg"
                                        >
                                             {loading ? "Processing..." : "Upgrade to Premium"}
                                        </Button>
                                   )}
                                   <p className="text-[10px] text-neutral-500 font-mono !mt-4">Secured by Stripe Test Mode</p>
                              </Card>
                         </Badge>
                    </div>

                    {/* 📊 HeroUI Table */}
                    <div className="space-y-6 pt-6">
                         <h2 className="text-xl sm:text-2xl font-extrabold text-center tracking-tight text-neutral-200">
                              Compare features at a glance
                         </h2>

                         <Table
                              aria-label="Plan comparison table"
                              className="border border-neutral-800/60 rounded-2xl"
                              removeWrapper
                              shadow="none"
                         >
                              <TableHeader>
                                   <TableColumn className="bg-neutral-900/60 text-neutral-400 font-mono text-xs uppercase p-4">FEATURES</TableColumn>
                                   <TableColumn className="bg-neutral-900/60 text-neutral-400 font-mono text-xs uppercase text-center p-4">FREE PLAN</TableColumn>
                                   <TableColumn className="bg-neutral-900/60 text-purple-400 font-mono text-xs uppercase text-center p-4">PREMIUM PLAN</TableColumn>
                              </TableHeader>
                              <TableBody className="divide-y divide-neutral-800/40">
                                   {comparisonFeatures.map((row) => (
                                        <TableRow key={row.key} className="border-b border-neutral-800/40 hover:bg-neutral-900/30 transition-colors">
                                             <TableCell className="p-4 font-medium text-neutral-300 text-sm">{row.name}</TableCell>

                                             <TableCell className="p-4 text-center text-neutral-400 text-sm">
                                                  {typeof row.free === "boolean" ? (
                                                       row.free ? <Check className="w-5 h-5 mx-auto text-emerald-500" /> : <Xmark className="w-5 h-5 mx-auto text-neutral-600" />
                                                  ) : (
                                                       <Chip size="sm" variant="flat" color="default" className="text-neutral-400 bg-neutral-900">{row.free}</Chip>
                                                  )}
                                             </TableCell>

                                             <TableCell className="p-4 text-center font-semibold text-purple-400 text-sm">
                                                  {typeof row.premium === "boolean" ? (
                                                       row.premium ? (
                                                            <Check className="w-5 h-5 mx-auto text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
                                                       ) : (
                                                            <Xmark className="w-5 h-5 mx-auto text-neutral-600" />
                                                       )
                                                  ) : (
                                                       <Chip size="sm" variant="dot" color="secondary" className="border-purple-500/30 text-purple-300 font-semibold">
                                                            {row.premium}
                                                       </Chip>
                                                  )}
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </div>

               </div>
          </main>
     );
}