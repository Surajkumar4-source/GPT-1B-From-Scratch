import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { lossData } from "../data/projectData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl">
        <p className="text-gray-400 text-xs font-mono mb-2">Step {label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-gray-300 capitalize">{p.name}:</span>
            <span className="font-mono font-bold" style={{ color: p.color }}>
              {p.value.toFixed(4)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function LossChart() {
  const [showAnnotations, setShowAnnotations] = useState(true);

  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono mb-4">
            LOSS CURVES
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Training vs Validation Loss
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Classic overfitting signature: train loss → 0, val loss diverges after step ~1000.
            Expected for a 1B param model trained on 1MB of data.
          </p>
        </motion.div>

        {/* Legend toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className="px-4 py-2 rounded-full border border-gray-700 text-gray-400 text-sm hover:border-cyan-500 hover:text-cyan-400 transition-all font-mono"
          >
            {showAnnotations ? "Hide" : "Show"} Annotations
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-950/80 border border-gray-800 rounded-2xl p-6 md:p-10"
        >
          <ResponsiveContainer width="100%" height={440}>
            <LineChart data={lossData} margin={{ top: 20, right: 40, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="step"
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 12, fontFamily: "monospace" }}
                tickFormatter={(v) => `${v.toLocaleString()}`}
                label={{ value: "Training Step", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 12, fontFamily: "monospace" }}
                label={{ value: "Loss", angle: -90, position: "insideLeft", offset: 20, fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: "#9ca3af", fontSize: "14px", paddingTop: "20px" }}
              />

              {/* Best val loss annotation */}
              {showAnnotations && (
                <ReferenceLine
                  x={1000}
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  label={{ value: "Best Val: 1.4704", position: "top", fill: "#10b981", fontSize: 11 }}
                />
              )}

              {showAnnotations && (
                <ReferenceLine
                  y={1.4704}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  strokeOpacity={0.4}
                />
              )}

              <Line
                type="monotone"
                dataKey="trainLoss"
                name="Train Loss"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
              />
              <Line
                type="monotone"
                dataKey="valLoss"
                name="Val Loss"
                stroke="#06b6d4"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, fill: "#06b6d4" }}
                strokeDasharray="6 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Summary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { label: "Final Train Loss", value: "0.0069", color: "text-violet-400", note: "Near-zero → memorization" },
            { label: "Best Val Loss", value: "1.4704", color: "text-emerald-400", note: "Achieved at step ~1000" },
            { label: "Final Val Loss", value: "6.5691", color: "text-rose-400", note: "Overfitting divergence" },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-800 bg-gray-950 p-5"
            >
              <div className={`text-3xl font-black font-mono ${item.color} mb-1`}>{item.value}</div>
              <div className="text-white font-semibold">{item.label}</div>
              <div className="text-gray-500 text-sm mt-1">{item.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
