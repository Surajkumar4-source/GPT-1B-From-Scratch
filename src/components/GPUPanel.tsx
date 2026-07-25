import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gpuStats } from "../data/projectData";

function MemBar({ used, max, peak, animate }: { used: number; max: number; peak: number; animate: boolean }) {
  const usedPct = (used / max) * 100;
  const peakPct = (peak / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-mono text-gray-500">
        <span>{(used / 1024).toFixed(1)} GB</span>
        <span className="text-gray-700">{(max / 1024).toFixed(0)} GB total</span>
      </div>
      <div className="h-2 rounded-full bg-gray-800 relative overflow-hidden">
        {/* Idle mem */}
        <motion.div
          className="absolute h-full rounded-full bg-emerald-500/60"
          initial={{ width: 0 }}
          animate={{ width: animate ? `${usedPct}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Peak marker */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400"
          initial={{ left: 0 }}
          animate={{ left: animate ? `${peakPct}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-xs font-mono text-gray-600">
        <span className="text-emerald-500">▌ idle</span>
        <span className="text-amber-400">▌ peak train: {(peak / 1024).toFixed(2)} GB</span>
      </div>
    </div>
  );
}

function TempRing({ temp, size = 60 }: { temp: number; size?: number }) {
  const maxTemp = 80;
  const pct = Math.min(temp / maxTemp, 1);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const color = temp < 40 ? "#10b981" : temp < 65 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={6} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - pct) }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold font-mono" style={{ color }}>
          {temp}°
        </span>
      </div>
    </div>
  );
}

export default function GPUPanel() {
  const [animated, setAnimated] = useState(false);
  const [showPeak, setShowPeak] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-24 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono mb-4">
            GPU CLUSTER
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            8× A100 SXM4-40GB
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            320 GB total VRAM. Each GPU running at 27.66 GB peak during training.
            Connected via NVLink for high-bandwidth gradient communication.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-full border border-gray-800 p-1 bg-gray-900">
            <button
              onClick={() => setShowPeak(false)}
              className={`px-5 py-2 rounded-full text-sm font-mono transition-all ${
                !showPeak ? "bg-emerald-500 text-white" : "text-gray-500"
              }`}
            >
              Idle State
            </button>
            <button
              onClick={() => setShowPeak(true)}
              className={`px-5 py-2 rounded-full text-sm font-mono transition-all ${
                showPeak ? "bg-amber-500 text-gray-900" : "text-gray-500"
              }`}
            >
              Peak Training
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gpuStats.map((gpu, i) => (
            <motion.div
              key={gpu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5 backdrop-blur"
            >
              {/* GPU header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono text-gray-500 mb-0.5">GPU [{gpu.id}]</div>
                  <div className="text-white font-bold text-sm">A100-SXM4-40GB</div>
                </div>
                <TempRing temp={showPeak ? gpu.temp + 35 : gpu.temp} size={52} />
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`w-2 h-2 rounded-full ${
                    showPeak ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                  }`}
                />
                <span className={`text-xs font-mono ${showPeak ? "text-amber-400" : "text-emerald-400"}`}>
                  {showPeak ? "Training (DDP)" : "Idle"}
                </span>
              </div>

              {/* Memory bar */}
              <MemBar
                used={showPeak ? gpu.peakTrainMem : gpu.mem}
                max={gpu.maxMem}
                peak={gpu.peakTrainMem}
                animate={animated}
              />

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="rounded-lg bg-gray-950 p-2 text-center">
                  <div className="text-xs text-gray-600 font-mono">UTIL</div>
                  <div className={`text-sm font-bold font-mono ${showPeak ? "text-amber-400" : "text-gray-500"}`}>
                    {showPeak ? "~99%" : `${gpu.util}%`}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-950 p-2 text-center">
                  <div className="text-xs text-gray-600 font-mono">NVLink</div>
                  <div className="text-sm font-bold font-mono text-cyan-400">✓</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NVLink topology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔗</div>
            <div>
              <div className="text-cyan-400 font-bold text-lg mb-2">DDP + NCCL + NVLink Topology</div>
              <div className="text-gray-400 text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-white font-semibold mb-1">Communication</div>
                  All-Reduce gradient synchronization via NCCL backend across all 8 GPUs after each backward pass.
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Data Sharding</div>
                  DistributedSampler ensures non-overlapping batches per GPU. Epoch seed set per step for proper shuffling.
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">LR Scaling</div>
                  <code className="text-amber-300 text-xs">lr_eff = lr × √(world_size)</code> — scales learning rate linearly with sqrt of GPU count.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
