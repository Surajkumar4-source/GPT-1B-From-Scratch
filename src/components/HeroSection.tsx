import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GLITCH_CHARS = "01アイウエオカキクケコABCDEF<>/[]{}";

function GlitchText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterations) return text[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
      iterations += 0.5;
      if (iterations >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono">{displayed}</span>;
}

function FloatingOrb({
  size,
  color,
  delay,
  x,
  y,
}: {
  size: number;
  color: string;
  delay: number;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20 blur-3xl pointer-events-none"
      style={{ width: size, height: size, background: color, left: x, top: y }}
      animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <>{count.toLocaleString()}</>;
}

const HeroStats = [
  { value: 1011, suffix: "M", label: "Parameters" },
  { value: 8, suffix: "×", label: "A100 GPUs" },
  { value: 15000, suffix: "", label: "Train Steps" },
  { value: 320, suffix: "GB", label: "Total VRAM" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-950">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb size={600} color="#7c3aed" delay={0} x="-10%" y="-20%" />
      <FloatingOrb size={500} color="#0891b2" delay={2} x="70%" y="60%" />
      <FloatingOrb size={400} color="#be185d" delay={1} x="50%" y="-10%" />
      <FloatingOrb size={350} color="#059669" delay={3} x="10%" y="70%" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Module 9 · Deep Learning · HPC Infrastructure
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white mb-4 leading-none tracking-tight"
        >
          <GlitchText text="1B Parameter" />
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            GPT
          </span>
          <span className="text-white"> From Scratch</span>
        </motion.h1>

        {/* Sub-title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-xl md:text-2xl font-light mb-6 max-w-3xl mx-auto"
        >
          PyTorch · DDP · Gradient Checkpointing · 8× NVIDIA A100 SXM4-40GB
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-500 text-base md:text-lg mb-16 max-w-2xl mx-auto"
        >
          A complete, hand-crafted Transformer trained from scratch — tokenizer to multi-GPU
          DistributedDataParallel — demonstrating real-world 1B parameter scaling.
        </motion.p>

        {/* Stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {HeroStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
                <div className="text-4xl font-black text-white font-mono">
                  <CountUp end={s.value} duration={2000 + i * 200} />
                  {s.suffix}
                </div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA arrows */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-600 text-4xl"
        >
          ↓
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}
