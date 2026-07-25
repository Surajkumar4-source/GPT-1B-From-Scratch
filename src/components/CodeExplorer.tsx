import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fileStructure, codeSnippets } from "../data/projectData";
import { Copy, Check, FileCode } from "lucide-react";

const roleColors: Record<string, { badge: string; dot: string }> = {
  Data: {
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    dot: "bg-blue-400",
  },
  Model: {
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    dot: "bg-violet-400",
  },
  Training: {
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400",
  },
  Infra: {
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  Analysis: {
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    dot: "bg-rose-400",
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-mono transition-all"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}


// Fixed syntax highlighter
function CodeBlock({ code }: { code: string }) {
  const lines = code.split("\n");

  return (
    <pre className="font-mono text-sm leading-5 whitespace-pre">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-gray-700 select-none w-10 text-right pr-4">
            {i + 1}
          </span>

          <code className="text-gray-300">
            {line}
          </code>
        </div>
      ))}
    </pre>
  );
}


export default function CodeExplorer() {
  const [selected, setSelected] = useState(fileStructure[6]);
  const roles = Array.from(new Set(fileStructure.map((f) => f.role)));
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const filtered = activeRole
    ? fileStructure.filter((f) => f.role === activeRole)
    : fileStructure;

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
            CODE EXPLORER
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Explore the Codebase
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every file hand-crafted from scratch. Click any file to view its key snippet.
          </p>
        </motion.div>


        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveRole(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-mono border ${
              activeRole === null
                ? "bg-white text-gray-900 border-white"
                : "border-gray-700 text-gray-400"
            }`}
          >
            All
          </button>

          {roles.map((role) => {
            const colors = roleColors[role];

            return (
              <button
                key={role}
                onClick={() =>
                  setActiveRole(role === activeRole ? null : role)
                }
                className={`px-4 py-1.5 rounded-full text-sm font-mono border ${
                  activeRole === role
                    ? colors.badge
                    : "border-gray-700 text-gray-400"
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          <div className="lg:col-span-2 space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filtered.map((file) => {
              const colors = roleColors[file.role];
              const isSelected = selected.name === file.name;

              return (
                <motion.button
                  key={file.name}
                  onClick={() => setSelected(file)}
                  className={`w-full text-left rounded-xl border p-4 ${
                    isSelected
                      ? "border-violet-500/60 bg-violet-500/10"
                      : "border-gray-800 bg-gray-950/60"
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileCode size={14} />
                      <span className="font-mono text-sm">
                        {file.name}
                      </span>
                    </div>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${colors.badge}`}
                    >
                      {file.role}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs">
                    {file.description}
                  </p>

                  <div className="text-gray-700 text-xs font-mono mt-2">
                    {file.lines} lines
                  </div>
                </motion.button>
              );
            })}
          </div>


          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden">

                <div className="flex justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
                  <span className="text-gray-400 text-sm font-mono">
                    {selected.name}
                  </span>

                  <CopyButton
                    text={codeSnippets[selected.name] || ""}
                  />
                </div>


                <div className="p-6 overflow-x-auto">
                  <CodeBlock
                    code={codeSnippets[selected.name] || ""}
                  />
                </div>


                <div className="px-6 py-3 border-t border-gray-800 bg-gray-900/50 flex justify-between">
                  <span className="text-gray-600 text-xs font-mono">
                    {selected.lines} total lines
                  </span>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${roleColors[selected.role].badge}`}
                  >
                    {selected.role}
                  </span>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}