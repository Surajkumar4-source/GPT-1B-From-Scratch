

export default function FooterSection() {
  return (
    <footer className="py-16 px-6 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-black font-mono">
                1B
              </div>
              <div>
                <div className="text-white font-bold">GPT-1B From Scratch</div>
                <div className="text-gray-600 text-xs font-mono">Module 9 · July 2026</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              A complete implementation of a 1 Billion parameter GPT model trained
              across 8 A100 GPUs using PyTorch DDP and Gradient Checkpointing.
            </p>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-4">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "PyTorch",
                "DDP / NCCL",
                "bfloat16",
                "Gradient Checkpointing",
                "AdamW",
                "TensorBoard",
                "Python 3.11",
                "CUDA 12",
                "NVLink",
                "torchrun",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-lg bg-gray-900 border border-gray-800 text-gray-500 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick metrics */}
          <div>
            <h4 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-4">
              Quick Stats
            </h4>
            <div className="space-y-2">
              {[
                ["Parameters", "1,011,224,385"],
                ["Training Steps", "15,000"],
                ["Final Train Loss", "0.0069"],
                ["Best Val Loss", "1.4704"],
                ["Avg Step Time", "2360.94 ms"],
                ["Throughput", "~58,000 tok/s"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-gray-600">{k}</span>
                  <span className="text-gray-400 font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-700 text-sm font-mono">
            Built with ❤️ by Suraj Kumar · Module 9 — Scaling to 1B Parameters
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500/50" />
            Trained on 8× NVIDIA A100 SXM4-40GB · 320 GB Total VRAM
          </div>
        </div>
      </div>
    </footer>
  );
}
