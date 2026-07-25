import { motion } from "framer-motion";
import { comparisonData } from "../data/projectData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const barData = [
  { name: "1× A100\n10M params", params: 10, throughput: 15 },
  { name: "8× A100\n1B params", params: 1011, throughput: 58 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-3">
        <p className="text-gray-300 text-sm mb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="text-sm font-mono" style={{ color: p.fill }}>
            {p.name}: {p.value.toLocaleString()}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ComparisonTable() {
  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-mono mb-4">
            SCALING ANALYSIS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            1-GPU vs 8-GPU Comparison
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From 10M parameters on a single A100 to 1B parameters across 8 GPUs.
            100× model size, 8× context length.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden"
          >
            <div className="grid grid-cols-3 px-6 py-3 bg-gray-900 border-b border-gray-800">
              <div className="text-gray-500 text-xs font-mono uppercase">Metric</div>
              <div className="text-blue-400 text-xs font-mono uppercase text-center">1× A100</div>
              <div className="text-violet-400 text-xs font-mono uppercase text-center">8× A100</div>
            </div>
            {comparisonData.map((row, i) => (
              <motion.div
                key={row.metric}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="grid grid-cols-3 px-6 py-4 border-b border-gray-800/50 hover:bg-gray-900/40 transition-colors"
              >
                <div className="text-gray-400 text-sm font-medium">{row.metric}</div>
                <div className="text-blue-300 text-sm font-mono text-center">{row.singleGpu}</div>
                <div className="text-violet-300 text-sm font-mono text-center font-bold">{row.multiGpu}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Params chart */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-4">
                Parameter Count (Millions)
              </h3>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis type="number" stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "monospace" }} />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="params" name="Params (M)" radius={[0, 6, 6, 0]}>
                    <Cell fill="#3b82f6" />
                    <Cell fill="#8b5cf6" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Throughput chart */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-4">
                Throughput (k tok/s)
              </h3>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis type="number" stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "monospace" }} />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="throughput" name="tok/s (k)" radius={[0, 6, 6, 0]}>
                    <Cell fill="#06b6d4" />
                    <Cell fill="#10b981" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Improvement badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Larger Model", value: "100×", color: "violet" },
            { label: "More Context", value: "8×", color: "cyan" },
            { label: "Higher Throughput", value: "3.9×", color: "emerald" },
            { label: "More Tokens/Step", value: "8×", color: "amber" },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl border p-6 text-center ${
                item.color === "violet"
                  ? "border-violet-500/30 bg-violet-500/5"
                  : item.color === "cyan"
                  ? "border-cyan-500/30 bg-cyan-500/5"
                  : item.color === "emerald"
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              <div
                className={`text-5xl font-black font-mono mb-2 ${
                  item.color === "violet"
                    ? "text-violet-400"
                    : item.color === "cyan"
                    ? "text-cyan-400"
                    : item.color === "emerald"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {item.value}
              </div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
