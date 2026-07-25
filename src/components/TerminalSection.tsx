// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { terminalLogs } from "../data/projectData";
// import { Play, Square, RotateCcw } from "lucide-react";

// function LogLine({ line, delay }: { line: string; delay: number }) {
//   const getColor = (l: string) => {
//     if (l.startsWith("$")) return "text-emerald-400";
//     if (l.includes("✓")) return "text-emerald-400";
//     if (l.includes("eval at")) return "text-cyan-400";
//     if (l.includes("── ")) return "text-violet-400";
//     if (l.includes("error") || l.includes("Error")) return "text-red-400";
//     if (l.includes("loss=")) {
//       const lossMatch = l.match(/loss=([\d.]+)/);
//       if (lossMatch) {
//         const lossVal = parseFloat(lossMatch[1]);
//         if (lossVal < 0.5) return "text-amber-300";
//         if (lossVal < 2.0) return "text-yellow-400";
//       }
//       return "text-gray-300";
//     }
//     if (l.includes("GPT initialized") || l.includes("params:")) return "text-violet-300";
//     if (l.includes("CharTokenizer")) return "text-blue-300";
//     if (l === "") return "text-transparent";
//     return "text-gray-400";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -5 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay }}
//       className={`font-mono text-xs leading-6 ${getColor(line)}`}
//     >
//       {line === "" ? "\u00a0" : line}
//     </motion.div>
//   );
// }

// export default function TerminalSection() {
//   const [running, setRunning] = useState(false);
//   const [visibleLines, setVisibleLines] = useState(0);
//   const [key, setKey] = useState(0);
//   const terminalRef = useRef<HTMLDivElement>(null);

//   const startSimulation = () => {
//     setRunning(true);
//     setVisibleLines(0);
//     setKey((k) => k + 1);
//   };

//   const stopSimulation = () => {
//     setRunning(false);
//     setVisibleLines(terminalLogs.length);
//   };

//   const resetSimulation = () => {
//     setRunning(false);
//     setVisibleLines(0);
//     setKey((k) => k + 1);
//   };

//   useEffect(() => {
//     if (!running) return;
//     if (visibleLines >= terminalLogs.length) {
//       setRunning(false);
//       return;
//     }
//     const delay = terminalLogs[visibleLines] === "" ? 80 : 60;
//     const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
//     return () => clearTimeout(t);
//   }, [running, visibleLines]);

//   useEffect(() => {
//     if (terminalRef.current) {
//       terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
//     }
//   }, [visibleLines]);

//   return (
//     <section className="py-24 px-6 bg-gray-950">
//       <div className="max-w-5xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono mb-4">
//             LIVE TERMINAL
//           </span>
//           <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
//             Training Log Replay
//           </h2>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Simulated replay of the actual training output from the 8-GPU run.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="rounded-2xl border border-gray-800 overflow-hidden shadow-2xl"
//         >
//           {/* Terminal title bar */}
//           <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
//             <div className="flex items-center gap-3">
//               <div className="flex gap-1.5">
//                 <div className="w-3 h-3 rounded-full bg-red-500" />
//                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
//                 <div className="w-3 h-3 rounded-full bg-green-500" />
//               </div>
//               <span className="text-gray-500 text-xs font-mono">
//                 scn35-mn — bash — 8× A100 DDP Training
//               </span>
//             </div>

//             {/* Controls */}
//             <div className="flex items-center gap-2">
//               {!running && visibleLines === 0 && (
//                 <button
//                   onClick={startSimulation}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono transition-all"
//                 >
//                   <Play size={11} /> Play
//                 </button>
//               )}
//               {running && (
//                 <button
//                   onClick={stopSimulation}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono transition-all"
//                 >
//                   <Square size={11} /> Stop
//                 </button>
//               )}
//               {!running && visibleLines > 0 && (
//                 <button
//                   onClick={resetSimulation}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xs font-mono transition-all"
//                 >
//                   <RotateCcw size={11} /> Reset
//                 </button>
//               )}
//               {!running && visibleLines > 0 && visibleLines < terminalLogs.length && (
//                 <button
//                   onClick={startSimulation}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono transition-all"
//                 >
//                   <Play size={11} /> Resume
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Terminal body */}
//           <div
//             ref={terminalRef}
//             className="bg-gray-950 p-6 h-96 overflow-y-auto"
//             style={{ scrollbarWidth: "thin", scrollbarColor: "#374151 #111827" }}
//           >
//             {visibleLines === 0 && !running && (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <div className="text-4xl mb-4">▶</div>
//                   <div className="text-gray-600 font-mono text-sm">
//                     Click Play to replay the training log
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div key={key}>
//               {terminalLogs.slice(0, visibleLines).map((line, i) => (
//                 <LogLine key={`${key}-${i}`} line={line} delay={0} />
//               ))}
//               {running && visibleLines < terminalLogs.length && (
//                 <motion.span
//                   animate={{ opacity: [1, 0, 1] }}
//                   transition={{ duration: 0.8, repeat: Infinity }}
//                   className="inline-block w-2 h-4 bg-emerald-400 ml-1"
//                 />
//               )}
//             </div>
//           </div>

//           {/* Status bar */}
//           <div className="px-4 py-2 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div
//                 className={`w-2 h-2 rounded-full ${
//                   running ? "bg-emerald-400 animate-pulse" : visibleLines >= terminalLogs.length ? "bg-blue-400" : "bg-gray-600"
//                 }`}
//               />
//               <span className="text-gray-600 text-xs font-mono">
//                 {running
//                   ? "Replaying..."
//                   : visibleLines >= terminalLogs.length
//                   ? "Complete"
//                   : "Ready"}
//               </span>
//             </div>
//             <span className="text-gray-700 text-xs font-mono">
//               {visibleLines}/{terminalLogs.length} lines
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
