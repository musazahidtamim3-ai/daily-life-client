"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
     const currentYear = new Date().getFullYear();

     return (
          <footer className="w-full bg-[#09090b] border-t border-neutral-800 text-neutral-400 mt-auto">
               {/* Upper Section: Glow Effect and Main Grid */}
               <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">

                    {/* Decorative Background Ambient Glow (Matching the Hero Tree Glow) */}
                    <div className="absolute top-0 left-1/4 -translate-y-1/2 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute top-0 right-1/4 -translate-y-1/2 w-72 h-72 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-neutral-800/60">

                         {/* Column 1: Brand & Identity (Spans 4 columns) */}
                         <div className="md:col-span-4 flex flex-col space-y-5">
                              <Link href="/" className="flex items-center gap-2 group">
                                                                 {/* Glowing Custom Lightbulb Icon */}
                                                                 <h1 className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-xl font-bold">Daily Life Lessons</h1>
                                                            </Link>

                              <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
                                   Capture today's insights to inspire tomorrow's journeys. A community curated network sharing core real-world knowledge, wisdom, and life reflections.
                              </p>

                              {/* Social Media Links with new X logo */}
                              <div className="flex items-center gap-4 pt-2">
                                   {/* X Logo (formerly Twitter) */}
                                   <a
                                        href="https://x.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200"
                                        aria-label="Follow us on X"
                                   >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                   </a>

                                   {/* GitHub */}
                                   <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200"
                                        aria-label="GitHub Repository"
                                   >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                             <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                   </a>

                                   {/* LinkedIn */}
                                   <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200"
                                        aria-label="Connect on LinkedIn"
                                   >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                             <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                   </a>
                              </div>
                         </div>

                         {/* Right Links Panels (Spans 8 columns) */}
                         <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">

                              {/* Column 2: Navigation Links */}
                              <div className="flex flex-col space-y-4">
                                   <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Explore</h3>
                                   <ul className="space-y-2.5 text-sm">
                                        <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                                        <li><Link href="/public-lessons" className="hover:text-purple-400 transition-colors">Public Lessons</Link></li>
                                        <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Plans & Pricing</Link></li>
                                   </ul>
                              </div>

                              {/* Column 3: Legal & Safety */}
                              <div className="flex flex-col space-y-4">
                                   <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal & Safety</h3>
                                   <ul className="space-y-2.5 text-sm">
                                        <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms & Conditions</Link></li>
                                        <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                                        <li><Link href="/cookies" className="hover:text-purple-400 transition-colors">Cookie Preferences</Link></li>
                                   </ul>
                              </div>

                              {/* Column 4: Contact Info (Spans full width on ultra-small breakpoints) */}
                              <div className="flex flex-col space-y-4 col-span-2 sm:col-span-1">
                                   <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Info</h3>
                                   <ul className="space-y-3 text-sm">
                                        <li className="flex items-start gap-2.5">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                             </svg>
                                             <a href="mailto:support@digitallifelessons.com" className="hover:text-white transition-colors truncate">
                                                  support@digitallifelessons.com
                                             </a>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                             </svg>
                                             <span className="text-neutral-400">
                                                  Dhaka, Bangladesh
                                             </span>
                                        </li>
                                   </ul>
                              </div>

                         </div>
                    </div>

                    {/* Lower Section: Copyright Notice */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-500">
                         <p>&copy; {currentYear} Digital Life Lessons. All rights reserved.</p>
                         <div className="flex items-center gap-2">
                              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                              <p className="text-neutral-400">All Systems Operational</p>
                         </div>
                    </div>

               </div>
          </footer>
     );
}