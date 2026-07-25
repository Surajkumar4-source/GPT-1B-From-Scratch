import { motion } from "framer-motion";
import { statsCards } from "../data/projectData";
import {
  Cpu,
  Database,
  Gauge,
  Zap,
  Activity,
  Clock,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu,
  memory: Database,
  gauge: Gauge,
  zap: Zap,
  activity: Activity,
  clock: Clock,
};

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string; badge: string }> = {
  violet: {
    border: "border-violet-500/30",
    bg: "from-violet-500/10 to-purple-500/5",
    text: "text-violet-400",
    glow: "shadow-violet-500/20",
    badge: "bg-violet-500/20 text-violet-300",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "from-cyan-500/10 to-teal-500/5",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
    badge: "bg-cyan-500/20 text-cyan-300",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "from-emerald-500/10 to-green-500/5",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "from-amber-500/10 to-yellow-500/5",
    text: "text-amber-400",
    glow: "shadow-amber-500/20",
    badge: "bg-amber-500/20 text-amber-300",
  },
  rose: {
    border: "border-rose-500/30",
    bg: "from-rose-500/10 to-pink-500/5",
    text: "text-rose-400",
    glow: "shadow-rose-500/20",
    badge: "bg-rose-500/20 text-rose-300",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "from-blue-500/10 to-indigo-500/5",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
    badge: "bg-blue-500/20 text-blue-300",
  },
};

export default function StatsGrid() {
  return (
    <section className="py-24 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-mono mb-4">
            PERFORMANCE METRICS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Training at Scale
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real hardware numbers from a full 15,000-step training run across 8 A100 GPUs with 320 GB total VRAM.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((card, i) => {
            const Icon = iconMap[card.icon];
            const colors = colorMap[card.color];
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-6 backdrop-blur shadow-xl ${colors.glow} group cursor-default`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.badge}`}>
                    <Icon size={22} />
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded-full ${colors.badge}`}>
                    LIVE METRIC
                  </span>
                </div>

                {/* Value */}
                <div className={`text-4xl font-black font-mono ${colors.text} mb-1`}>
                  {card.value}
                </div>
                <div className="text-gray-500 text-sm font-mono mb-3">{card.unit}</div>

                {/* Label */}
                <div className="text-white font-semibold text-lg">{card.label}</div>

                {/* Animated bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
                  <motion.div
                    className={`h-full ${colors.text} opacity-60`}
                    style={{ background: "currentColor" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
