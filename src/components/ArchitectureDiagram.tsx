import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { architectureLayers } from "../data/projectData";

const layerColors: Record<number, { bg: string; border: string; dot: string }> = {
  0: { bg: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/40", dot: "bg-violet-400" },
  1: { bg: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/40", dot: "bg-blue-400" },
  2: { bg: "from-gray-500/10 to-gray-500/5", border: "border-gray-600/40", dot: "bg-gray-400" },
  3: { bg: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/40", dot: "bg-cyan-400" },
  4: { bg: "from-teal-500/15 to-teal-500/5", border: "border-teal-500/30", dot: "bg-teal-400" },
  5: { bg: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/40", dot: "bg-purple-400" },
  6: { bg: "from-teal-500/15 to-teal-500/5", border: "border-teal-500/30", dot: "bg-teal-400" },
  7: { bg: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/40", dot: "bg-emerald-400" },
  8: { bg: "from-amber-500/15 to-amber-500/5", border: "border-amber-500/30", dot: "bg-amber-400" },
  9: { bg: "from-rose-500/20 to-rose-500/5", border: "border-rose-500/40", dot: "bg-rose-400" },
};

function FlowArrow() {
  return (
    <div className="flex justify-center my-1">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-gray-600 text-xl"
      >
        ↓
      </motion.div>
    </div>
  );
}

export default function ArchitectureDiagram() {
  const [hovered, setHovered] = useState<number | null>(null);

  const configItems = [
    { key: "d_model", value: "2048", label: "Hidden Dim" },
    { key: "n_heads", value: "16", label: "Attn Heads" },
    { key: "n_layers", value: "20", label: "Layers" },
    { key: "max_seq_len", value: "2048", label: "Context" },
    { key: "d_head", value: "128", label: "Head Dim" },
    { key: "ffn_dim", value: "8192", label: "FFN Dim" },
    { key: "dropout", value: "0.1", label: "Dropout" },
    { key: "vocab_size", value: "65", label: "Vocab Size" },
  ];

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
            MODEL ARCHITECTURE
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            GPT Architecture Breakdown
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pre-LN Transformer Decoder. 20 identical blocks, each containing Multi-Head Attention and Feed-Forward Network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Architecture flow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-1"
          >
            <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-6 text-center">
              Forward Pass Flow
            </h3>
            {architectureLayers.map((layer, i) => {
              const colorIdx = i <= 9 ? i : i % 10;
              const colors = layerColors[colorIdx] || layerColors[0];
              const isSubLayer = layer.name.startsWith("  ");
              return (
                <div key={i}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`
                      relative rounded-xl border bg-gradient-to-r p-3 cursor-pointer transition-all duration-300
                      ${colors.bg} ${colors.border}
                      ${isSubLayer ? "ml-8 scale-[0.97]" : ""}
                      ${hovered === i ? "scale-[1.02] shadow-lg" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${colors.dot}`} />
                        <span className={`font-mono text-sm text-white ${isSubLayer ? "text-xs text-gray-300" : ""}`}>
                          {layer.name.trim()}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-mono text-gray-500">{layer.shape}</div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {hovered === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pt-2 border-t border-white/10"
                        >
                          <span className="text-xs text-amber-300 font-mono">
                            params: {layer.params}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {i < architectureLayers.length - 1 && !architectureLayers[i + 1].name.startsWith("  └") && (
                    <FlowArrow />
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Config panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
              <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-6">
                GPTConfig (1B Setup)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {configItems.map((item) => (
                  <motion.div
                    key={item.key}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl bg-gray-800/50 border border-gray-700/50 p-4"
                  >
                    <div className="text-2xl font-black font-mono text-white">{item.value}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">{item.key}</div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Block diagram visual */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
              <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-6">
                Transformer Block (Pre-LN)
              </h3>
              <div className="space-y-2 font-mono text-sm">
                {[
                  { code: "x = x + Attn(LN(x))", color: "text-violet-400", label: "Residual + Attention" },
                  { code: "x = x + FFN(LN(x))", color: "text-cyan-400", label: "Residual + FFN" },
                ].map((line) => (
                  <div key={line.code} className="rounded-lg bg-gray-950 border border-gray-800 p-3">
                    <code className={`${line.color}`}>{line.code}</code>
                    <div className="text-gray-600 text-xs mt-1"># {line.label}</div>
                  </div>
                ))}
                <div className="pt-2 text-gray-500 text-xs">
                  × 20 identical blocks = ~1.01B parameters total
                </div>
              </div>
            </div>

            {/* Gradient checkpointing callout */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💾</span>
                <div>
                  <div className="text-amber-400 font-bold mb-1">Gradient Checkpointing Enabled</div>
                  <div className="text-gray-400 text-sm">
                    <code className="text-amber-300 text-xs">torch.utils.checkpoint.checkpoint(block, x)</code>
                    <br />
                    Recomputes activations during backward pass instead of storing them for all 20 layers.
                    Saves ~60–70% activation memory — essential for 2048-token sequences.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
