import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keyInsights } from "../data/projectData";

const colorMap: Record<string, { border: string; bg: string; text: string; badgeBg: string }> = {
  violet: { border: "border-violet-500/40", bg: "from-violet-500/10 to-transparent", text: "text-violet-400", badgeBg: "bg-violet-500/20" },
  cyan: { border: "border-cyan-500/40", bg: "from-cyan-500/10 to-transparent", text: "text-cyan-400", badgeBg: "bg-cyan-500/20" },
  emerald: { border: "border-emerald-500/40", bg: "from-emerald-500/10 to-transparent", text: "text-emerald-400", badgeBg: "bg-emerald-500/20" },
  amber: { border: "border-amber-500/40", bg: "from-amber-500/10 to-transparent", text: "text-amber-400", badgeBg: "bg-amber-500/20" },
  rose: { border: "border-rose-500/40", bg: "from-rose-500/10 to-transparent", text: "text-rose-400", badgeBg: "bg-rose-500/20" },
  blue: { border: "border-blue-500/40", bg: "from-blue-500/10 to-transparent", text: "text-blue-400", badgeBg: "bg-blue-500/20" },
};

export default function InsightsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-mono mb-4">
            KEY LEARNINGS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Technical Insights
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What we learned scaling from a single GPU to 8 A100s with 1B parameters.
            Click each card to expand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {keyInsights.map((insight, i) => {
            const colors = colorMap[insight.color];
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className={`rounded-2xl border bg-gradient-to-br ${colors.border} ${colors.bg} p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${isExpanded ? "ring-2 ring-offset-2 ring-offset-gray-900" : ""}`}

                whileHover={{ y: -3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`text-3xl ${colors.badgeBg} rounded-xl w-12 h-12 flex items-center justify-center`}>
                    {insight.icon}
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-600"
                  >
                    ▼
                  </motion.div>
                </div>

                <h3 className={`text-lg font-bold ${colors.text} mb-2`}>{insight.title}</h3>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-400 text-sm leading-relaxed overflow-hidden"
                    >
                      {insight.detail}
                    </motion.p>
                  )}
                </AnimatePresence>

                {!isExpanded && (
                  <p className="text-gray-600 text-sm line-clamp-2">{insight.detail}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Overfitting explanation callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-8"
        >
          <div className="flex items-start gap-5">
            <div className="text-4xl flex-shrink-0">🎯</div>
            <div>
              <h3 className="text-2xl font-black text-white mb-3">
                Why Overfitting Was{" "}
                <span className="text-rose-400">Expected & Accepted</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400 text-sm leading-relaxed">
                <div>
                  <div className="text-white font-bold mb-2">The Problem</div>
                  A 1B parameter model trained on Tiny Shakespeare (~1MB) will memorize the dataset.
                  The model has far more capacity than required to represent the training data,
                  so it achieves near-zero training loss by memorization, not generalization.
                </div>
                <div>
                  <div className="text-white font-bold mb-2">The Goal</div>
                  The objective was to learn <span className="text-violet-400">how to scale</span> a GPT 
                  to 1B parameters, implement DDP, debug memory leaks on real hardware, and 
                  validate that the training pipeline works at scale. Overfitting on Shakespeare 
                  is expected — the same pipeline on FineWeb/OpenWebText would generalize.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
