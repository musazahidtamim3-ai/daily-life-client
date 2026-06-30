"use client"
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Check, Xmark, CrownDiamond, ShieldCheck, Star, CirclePlus } from '@gravity-ui/icons';

const PricingPage = () => {
     const [loading, setLoading] = useState(false);
     const handleCheckout = async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
               const response = await fetch("/api/checkout_sessions", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ planId: "premium" }),
                    credentials: "include",
               });

               const data = await response.json();

               if (data.url) {
                    window.location.href = data.url;
               } else {
                    alert(data.error || "Something went wrong during checkout.");
               }

          } catch (err) {
               console.error(err);
               alert("Failed to initiate payment.");
          } finally {
               setLoading(false);
          }
     };

     const comparisonFeatures = [
          { name: 'Number of lessons that can be created', free: 'Up to 5 Lessons', premium: 'Unlimited Lessons', highlight: true },
          { name: 'Premium lesson creation access', free: false, premium: true },
          { name: 'Ad-free experience', free: false, premium: true },
          { name: 'Priority listing in public lessons', free: false, premium: true },
          { name: 'Access to premium content from other users', free: false, premium: true },
          { name: 'Community badge / verified status', free: false, premium: true },
          { name: 'Advanced analytics & insights', free: false, premium: true },
          { name: '24/7 Dedicated Support', free: false, premium: true },
     ];

     return (
          <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden dark">
               {/* Background Ambient Glows */}
               <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
               <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />

               <div className="max-w-6xl mx-auto space-y-16">

                    {/* Header Section */}
                    <div className="text-center space-y-4">
                         <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-sm font-medium backdrop-blur-md">
                              <Star size={14} /> Level Up Your Teaching & Learning
                         </div>
                         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                              Choose the Perfect Plan
                         </h1>
                         <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
                              Get lifetime access to premium features with a simple one-time investment. No subscriptions, no hidden fees.
                         </p>
                    </div>

                    {/* Upper Layout: Balanced Price Card & Perks Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                         {/* Left Side: Premium Checkout Block */}
                         <div className="lg:col-span-5 flex flex-col justify-between bg-linear-to-b from-slate-900 via-[#131926] to-[#131926] border border-indigo-500/30 rounded-3xl p-8 relative shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)] backdrop-blur-xl">
                              <div className="absolute top-0 transform -translate-y-1/2 translate-x-2/3  bg-linear-to-r from-indigo-500 to-purple-500 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full text-white shadow-lg flex items-center gap-1.5">
                                   <CrownDiamond size={12} /> Lifetime Value
                              </div>

                              <div>
                                   <div className="flex items-center justify-between mb-4">
                                        <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">Premium Access</span>
                                        <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md font-medium">One-Time Pay</span>
                                   </div>

                                   <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-5xl font-black tracking-tight text-white">৳1,500</span>
                                        <span className="text-slate-400 text-sm">/ forever</span>
                                   </div>
                                   <p className="text-slate-300 text-sm leading-relaxed mb-8">
                                        Unlock full access to the entire platform suite. Empower your creation workflow without boundaries.
                                   </p>
                              </div>

                              {/* HeroUI Button Integration */}
                              <form onSubmit={handleCheckout} className="mb-6">
                                   <Button
                                        type="submit"
                                        isLoading={loading}
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold h-14 rounded-2xl shadow-[0_4px_20px_rgba(99,102,241,0.4)] transition-all disabled:opacity-70"
                                        endContent={!loading && <CirclePlus size={18} />}
                                   >
                                        {loading ? "Processing..." : "Upgrade to Premium"}
                                   </Button>
                              </form>
                         </div>

                         {/* Right Side: Extra balancing section layout */}
                         <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-center backdrop-blur-md">
                              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                                   <ShieldCheck className="text-indigo-400" /> Why go Premium?
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {[
                                        "Unlimited lesson structures",
                                        "Priority cloud rendering",
                                        "Advanced creator dashboard",
                                        "Verified profile checkmark",
                                        "Zero third-party popups",
                                        "Exclusive community server",
                                   ].map((perk, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                             <div className="mt-1 p-0.5 bg-indigo-500/10 border border-indigo-500/30 rounded-md text-indigo-400">
                                                  <Check size={14} />
                                             </div>
                                             <span className="text-slate-300 text-sm font-medium">{perk}</span>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>

                    {/* Lower Layout: Structured Comparison Table */}
                    <div className="space-y-6">
                         <div className="text-center lg:text-left">
                              <h2 className="text-2xl font-bold text-white tracking-tight">Compare Plans Side-by-Side</h2>
                              <p className="text-slate-400 text-sm mt-1">See exactly what you unlock with your premium upgrade.</p>
                         </div>

                         <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#111622]/60 backdrop-blur-md shadow-2xl">
                              <table className="w-full text-left border-collapse">
                                   <thead>
                                        <tr className="border-b border-slate-800 bg-slate-900/60">
                                             <th className="p-5 text-sm font-semibold text-slate-300 w-[50%]">Features</th>
                                             <th className="p-5 text-sm font-semibold text-slate-400 text-center w-[25%]">Free</th>
                                             <th className="p-5 text-sm font-semibold text-indigo-400 text-center w-[25%] bg-indigo-500/5">
                                                  <span className="flex items-center justify-center gap-1.5">
                                                       <CrownDiamond size={14} /> Premium
                                                  </span>
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-slate-800/60">
                                        {comparisonFeatures.map((row, index) => (
                                             <tr key={index} className="hover:bg-slate-900/30 transition-colors">
                                                  <td className="p-5 text-sm font-medium text-slate-300">
                                                       {row.name}
                                                  </td>
                                                  <td className="p-5 text-center text-sm text-slate-400">
                                                       {typeof row.free === 'string' ? (
                                                            <span className="font-medium text-slate-400">{row.free}</span>
                                                       ) : row.free ? (
                                                            <Check size={18} className="mx-auto text-emerald-400" />
                                                       ) : (
                                                            <Xmark size={18} className="mx-auto text-slate-600" />
                                                       )}
                                                  </td>
                                                  <td className={`p-5 text-center text-sm font-medium bg-indigo-500/[0.02] ${row.highlight ? 'text-indigo-300' : 'text-slate-200'}`}>
                                                       {typeof row.premium === 'string' ? (
                                                            <span className="font-semibold text-indigo-400">{row.premium}</span>
                                                       ) : row.premium ? (
                                                            <Check size={18} className="mx-auto text-indigo-400" />
                                                       ) : (
                                                            <Xmark size={18} className="mx-auto text-slate-600" />
                                                       )}
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default PricingPage;