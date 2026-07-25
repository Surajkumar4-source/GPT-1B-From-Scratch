export const projectMeta = {
  title: "1B Parameter GPT",
  subtitle: "From Scratch · 8× A100 40GB · PyTorch DDP",
  description:
    "A fully hand-crafted 1 Billion parameter GPT model trained from scratch using PyTorch DistributedDataParallel across 8 NVIDIA A100 40GB GPUs — with Gradient Checkpointing, custom tokenization, and a complete multi-GPU training pipeline.",
  author: "Suraj Kumar",
  module: "Module 9 — 1B Parameter Scaling",
  date: "July 2026",
  github: "#",
  hardware: "8× NVIDIA A100 SXM4-40GB",
};

export const statsCards = [
  { label: "Model Parameters", value: "1.011B", unit: "params", icon: "cpu", color: "violet" },
  { label: "Total VRAM", value: "320", unit: "GB", icon: "memory", color: "cyan" },
  { label: "Peak VRAM / GPU", value: "27.66", unit: "GB", icon: "gauge", color: "emerald" },
  { label: "Tokens / Step", value: "131,072", unit: "tok/step", icon: "zap", color: "amber" },
  { label: "Throughput", value: "~58,000", unit: "tok/s", icon: "activity", color: "rose" },
  { label: "Training Time", value: "~9.84", unit: "hours", icon: "clock", color: "blue" },
];

export const modelConfig = {
  vocab_size: 65,
  max_seq_len: 2048,
  d_model: 2048,
  n_heads: 16,
  n_layers: 20,
  dropout: 0.1,
  use_checkpointing: true,
};

export const trainingConfig = {
  batch_size_per_gpu: 8,
  global_batch: 64,
  max_iters: 15000,
  lr: "4e-4",
  weight_decay: 0.1,
  beta1: 0.9,
  beta2: 0.95,
  grad_clip: 1.0,
  warmup_iters: 1000,
  dtype: "bfloat16",
  optimizer: "AdamW (fused)",
};

// Simulated loss curves based on report data
export const lossData = (() => {
  const data = [];
  const totalSteps = 15000;
  const evalInterval = 500;

  for (let step = 0; step <= totalSteps; step += evalInterval) {
    const t = step / totalSteps;
    // Training loss: starts ~4.2, drops sharply, then to near 0
    const trainLoss = step === 0
      ? 4.2
      : Math.max(0.0069, 4.2 * Math.exp(-6.5 * t) + 0.007 * (1 - t));

    // Val loss: starts high, dips to 1.47 around step 1000, then rises to 6.57
    let valLoss;
    if (step <= 1000) {
      valLoss = 4.2 - (4.2 - 1.4704) * (step / 1000) * 0.9;
    } else {
      const progress = (step - 1000) / (totalSteps - 1000);
      valLoss = 1.4704 + (6.5691 - 1.4704) * Math.pow(progress, 0.6);
    }

    data.push({
      step,
      trainLoss: parseFloat(trainLoss.toFixed(4)),
      valLoss: parseFloat(valLoss.toFixed(4)),
    });
  }
  return data;
})();

// GPU stats per GPU (simulated based on gpustat output style)
export const gpuStats = [
  { id: 0, temp: 28, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28314 },
  { id: 1, temp: 26, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28290 },
  { id: 2, temp: 27, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28312 },
  { id: 3, temp: 27, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28298 },
  { id: 4, temp: 33, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28340 },
  { id: 5, temp: 30, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28310 },
  { id: 6, temp: 32, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28325 },
  { id: 7, temp: 31, util: 0, mem: 633, maxMem: 40960, peakTrainMem: 28305 },
];

export const comparisonData = [
  {
    metric: "Model Size",
    singleGpu: "~10M",
    multiGpu: "1,011M (1B)",
    improvement: "100×",
  },
  {
    metric: "Sequence Length",
    singleGpu: "256",
    multiGpu: "2,048",
    improvement: "8×",
  },
  {
    metric: "Global Batch Size",
    singleGpu: "64",
    multiGpu: "64 (8×8 GPUs)",
    improvement: "Same",
  },
  {
    metric: "Tokens / Step",
    singleGpu: "16,384",
    multiGpu: "131,072",
    improvement: "8×",
  },
  {
    metric: "Peak Memory",
    singleGpu: "~5 GB",
    multiGpu: "27.66 GB/GPU",
    improvement: "5.5× used",
  },
  {
    metric: "Throughput",
    singleGpu: "~15,000 tok/s",
    multiGpu: "~58,000 tok/s",
    improvement: "3.9×",
  },
  {
    metric: "Training Time (15k steps)",
    singleGpu: "~2.5 hours",
    multiGpu: "~9.8 hours",
    improvement: "100× model",
  },
];

export const scalingBarData = [
  { name: "1× A100\n10M params", params: 10, tokens: 16384, throughput: 15000 },
  { name: "8× A100\n1B params", params: 1011, tokens: 131072, throughput: 58000 },
];

export const throughputData = [
  { step: 0, tokPerSec: 0 },
  { step: 500, tokPerSec: 42000 },
  { step: 1000, tokPerSec: 55000 },
  { step: 2000, tokPerSec: 57800 },
  { step: 3000, tokPerSec: 58100 },
  { step: 5000, tokPerSec: 58200 },
  { step: 8000, tokPerSec: 58150 },
  { step: 10000, tokPerSec: 58000 },
  { step: 12000, tokPerSec: 57900 },
  { step: 15000, tokPerSec: 58000 },
];

export const fileStructure = [
  {
    name: "tokenizer.py",
    description: "Character-level tokenizer. Builds vocab from dataset, encodes/decodes text.",
    lines: 30,
    color: "emerald",
    role: "Data",
  },
  {
    name: "download_data.py",
    description: "Downloads Tiny Shakespeare (~1MB) from Karpathy's char-rnn repo.",
    lines: 14,
    color: "blue",
    role: "Data",
  },
  {
    name: "attention.py",
    description: "Single-head causal self-attention from scratch. Demonstrates core mechanism.",
    lines: 62,
    color: "violet",
    role: "Model",
  },
  {
    name: "multihead_attention.py",
    description: "Multi-head attention: fused QKV projection, split heads, causal masking, optional weight saving.",
    lines: 80,
    color: "purple",
    role: "Model",
  },
  {
    name: "feedforward.py",
    description: "Position-wise FFN: d_model → 4×d_model → d_model with GELU activation.",
    lines: 38,
    color: "indigo",
    role: "Model",
  },
  {
    name: "transformer_block.py",
    description: "Pre-LN Transformer block: LN → Attention → Residual, LN → FFN → Residual.",
    lines: 42,
    color: "cyan",
    role: "Model",
  },
  {
    name: "gpt.py",
    description: "Full GPT model: token+positional embeddings, 20 transformer blocks, weight tying, gradient checkpointing, generation.",
    lines: 110,
    color: "rose",
    role: "Model",
  },
  {
    name: "train_gpt_ddp.py",
    description: "8-GPU DDP training loop: DistributedSampler, AdamW, cosine LR, bfloat16 autocast, checkpoint saving, TensorBoard.",
    lines: 200,
    color: "amber",
    role: "Training",
  },
  {
    name: "run_8gpu.sh",
    description: "torchrun launcher for 8-GPU DDP with log capture.",
    lines: 18,
    color: "orange",
    role: "Infra",
  },
  {
    name: "generate_report.py",
    description: "Parses training log with regex to auto-generate REPORT.md with all metrics.",
    lines: 90,
    color: "teal",
    role: "Analysis",
  },
];

export const codeSnippets: Record<string, string> = {
"tokenizer.py": `"""───────────────────────────────────────────────
Character-level tokenizer.
Simple, transparent, easy to debug.
"""───────────────────────────────────────────────
class CharTokenizer:
    def __init__(self, text: str):
        chars = sorted(set(text))
        self.vocab_size = len(chars)
        self.ch2id = {c: i for i, c in enumerate(chars)}
        self.id2ch = {i: c for i, c in enumerate(chars)}
        print(f"CharTokenizer: vocab_size={self.vocab_size}")
        print(f"  chars: {repr(''.join(chars[:20]))}...")

    def encode(self, text: str) -> list[int]:
        return [self.ch2id[c] for c in text]

    def decode(self, ids: list[int]) -> str:
        return ''.join(self.id2ch[i] for i in ids)


# ── Test ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    text = "Hello, World! This is a test of the tokenizer."
    tok = CharTokenizer(text)

    encoded = tok.encode("Hello")
    print(f"\nencode('Hello') → {encoded}")
    decoded = tok.decode(encoded)
    print(f"decode({encoded}) → '{decoded}'")

    # Round-trip test
    for test_str in ["Hello", "World", "test"]:
        assert tok.decode(tok.encode(test_str)) == test_str
    print("\nRound-trip test: PASSED")

`,

"download_data.py": `"""
Download tiny Shakespeare dataset (~1MB).
Classic benchmark for character-level language models.
"""

import os
import urllib.request

URL  = "https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt"
PATH = "shakespeare.txt"

if not os.path.exists(PATH):
    print("Downloading Shakespeare...")
    urllib.request.urlretrieve(URL, PATH)
    print("Done.")

text = open(PATH, 'r').read()

print(f"Dataset size: {len(text):,} characters")
print(f"Sample:\\n{text[:200]}")
`,










"attention.py": `"""
Single-head self-attention from scratch.
No nn.MultiheadAttention used.
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import math


class SingleHeadAttention(nn.Module):
    """
    Single causal self-attention head.
    Input:  [B, T, d_model]
    Output: [B, T, d_head]
    """

    def __init__(
        self,
        d_model: int,
        d_head: int,
        max_seq_len: int,
        dropout: float = 0.1
    ):
        super().__init__()
        self.d_head = d_head

        # Q, K, V projections (no bias, standard for transformers)
        self.W_q = nn.Linear(d_model, d_head, bias=False)
        self.W_k = nn.Linear(d_model, d_head, bias=False)
        self.W_v = nn.Linear(d_model, d_head, bias=False)

        self.dropout = nn.Dropout(dropout)

        # Causal mask: lower triangular matrix
        # Register as buffer so it moves with model.to(device)
        # and is saved in state_dict but not a parameter
        mask = torch.tril(torch.ones(max_seq_len, max_seq_len))
        self.register_buffer("mask", mask)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        B, T, d_model = x.shape

        Q = self.W_q(x)   # [B, T, d_head]
        K = self.W_k(x)   # [B, T, d_head]
        V = self.W_v(x)   # [B, T, d_head]

        # Attention scores
        scale = math.sqrt(self.d_head)
        scores = Q @ K.transpose(-2, -1) / scale

        # Apply causal mask
        scores = scores.masked_fill(
            self.mask[:T, :T] == 0,
            float("-inf")
        )

        # Softmax over key positions
        weights = F.softmax(scores, dim=-1)
        weights = self.dropout(weights)

        # Weighted sum of values
        out = weights @ V
        return out


# ── Test ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    torch.manual_seed(42)

    B, T, d_model, d_head = 2, 8, 64, 32
    x = torch.randn(B, T, d_model)

    attn = SingleHeadAttention(
        d_model=d_model,
        d_head=d_head,
        max_seq_len=T
    )

    out = attn(x)

    print(f"Input shape:  {x.shape}")
    print(f"Output shape: {out.shape}")

    assert out.shape == (B, T, d_head)

    print("SingleHeadAttention: PASSED")
`,

 "multihead_attention.py": `"""
Multi-head causal self-attention from scratch.
Input:  [B, T, d_model]
Output: [B, T, d_model]
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import math


class MultiHeadAttention(nn.Module):
    def __init__(
        self,
        d_model: int,
        n_heads: int,
        max_seq_len: int,
        dropout: float = 0.1
    ):
        super().__init__()

        assert d_model % n_heads == 0, \
            f"d_model={d_model} must be divisible by n_heads={n_heads}"

        self.d_model = d_model
        self.n_heads = n_heads
        self.d_head = d_model // n_heads

        # Fused QKV projection
        self.c_attn = nn.Linear(
            d_model,
            3 * d_model,
            bias=False
        )

        self.c_proj = nn.Linear(
            d_model,
            d_model,
            bias=False
        )

        self.attn_drop = nn.Dropout(dropout)
        self.proj_drop = nn.Dropout(dropout)

        # Causal mask
        mask = torch.tril(
            torch.ones(max_seq_len, max_seq_len)
        )

        self.register_buffer(
            "mask",
            mask
        )

        # Used only for visualization
        self.last_attn_weights = None
        self.save_attention = False


    def forward(self, x: torch.Tensor) -> torch.Tensor:
        B, T, C = x.shape

        # QKV projection
        qkv = self.c_attn(x)

        Q, K, V = qkv.split(
            self.d_model,
            dim=2
        )


        def split_heads(t):
            return (
                t.view(
                    B,
                    T,
                    self.n_heads,
                    self.d_head
                )
                .transpose(1, 2)
            )


        Q = split_heads(Q)
        K = split_heads(K)
        V = split_heads(V)


        # Attention scores
        scale = math.sqrt(self.d_head)

        scores = (
            Q @ K.transpose(-2, -1)
        ) / scale


        # Apply causal mask
        scores = scores.masked_fill(
            self.mask[:T, :T]
            .unsqueeze(0)
            .unsqueeze(0) == 0,
            float("-inf")
        )


        # Attention weights
        weights = F.softmax(
            scores,
            dim=-1
        )


        # Save only when visualization needs it
        if self.save_attention:
            self.last_attn_weights = (
                weights.detach()
            )


        weights = self.attn_drop(weights)


        # Weighted values
        out = weights @ V


        # Merge heads
        out = (
            out.transpose(1, 2)
            .contiguous()
            .view(B, T, C)
        )


        # Output projection
        out = self.proj_drop(
            self.c_proj(out)
        )
        return out
`,
  "gpt.py": `@dataclass
class GPTConfig:
    vocab_size: int   = 65
    max_seq_len: int  = 2048       # 8× context window
    d_model: int      = 2048       # 1B param config
    n_heads: int      = 16
    n_layers: int     = 20
    dropout: float    = 0.1
    use_checkpointing: bool = True  # Save VRAM by recomputing activations

class GPT(nn.Module):
    def forward(self, idx, targets=None):
        x = self.drop_emb(self.token_emb(idx) + self.pos_emb(pos))
        for block in self.blocks:
            if self.training and self.config.use_checkpointing:
                # Recomputes activations during backward — saves ~60-70% VRAM
                x = torch.utils.checkpoint.checkpoint(
                    block, x, use_reentrant=False
                )
            else:
                x = block(x)
        logits = self.lm_head(self.ln_final(x))
        loss   = F.cross_entropy(logits.view(-1, vocab_size), targets.view(-1))
        return logits, loss`,

  "train_gpt_ddp.py": `def main():
    local_rank, world_size = setup_distributed()
    device = f"cuda:{local_rank}"

    # Scale LR with world size
    base_lr = cfg.lr * math.sqrt(world_size)

    model = GPT(model_cfg).to(device)
    model = DDP(model, device_ids=[local_rank],
                find_unused_parameters=True)

    optimizer = torch.optim.AdamW(
        optim_groups, lr=base_lr,
        betas=(0.9, 0.95), fused=True
    )
    ctx = torch.amp.autocast(device_type="cuda", dtype=torch.bfloat16)

    for step in range(cfg.max_iters):
        train_sampler.set_epoch(step)      # Shuffle differently each epoch
        lr = get_lr(step, cfg, base_lr)   # Cosine decay with warmup
        with ctx:
            logits, loss = model(x, y)
        scaler.scale(loss).backward()
        nn.utils.clip_grad_norm_(raw_model.parameters(), 1.0)
        scaler.step(optimizer)`,

  "run_8gpu.sh": `#!/bin/bash
torchrun \\
    --nproc_per_node=8 \\
    --master_port=29500 \\
    train_gpt_ddp.py 2>&1 | tee logs/train_1B_$(date +%Y%m%d_%H%M%S).log`,
};

export const architectureLayers = [
  { name: "Token Embedding", shape: "[B, T] → [B, T, 2048]", params: "65 × 2048 = 133K" },
  { name: "Positional Embedding", shape: "[T] → [T, 2048]", params: "2048 × 2048 = 4.19M" },
  { name: "Dropout (emb)", shape: "[B, T, 2048]", params: "—" },
  { name: "TransformerBlock ×20", shape: "[B, T, 2048] → [B, T, 2048]", params: "~50.5M × 20 = ~1.01B" },
  { name: "  ├─ LayerNorm (pre-attn)", shape: "[B, T, 2048]", params: "2×2048 = 4K" },
  { name: "  ├─ MultiHeadAttention (16 heads)", shape: "d_head = 128", params: "4 × 2048² = 16.77M" },
  { name: "  ├─ LayerNorm (pre-ffn)", shape: "[B, T, 2048]", params: "4K" },
  { name: "  └─ FeedForward (4× expansion)", shape: "2048 → 8192 → 2048", params: "2 × 2048 × 8192 = 33.55M" },
  { name: "LayerNorm (final)", shape: "[B, T, 2048]", params: "4K" },
  { name: "LM Head (weight-tied)", shape: "[B, T, 2048] → [B, T, 65]", params: "Tied to Token Emb" },
];

export const keyInsights = [
  {
    title: "Gradient Checkpointing",
    icon: "💾",
    color: "violet",
    detail:
      "Recomputes activations during backward pass instead of storing them. Saves ~60–70% activation memory, enabling 2048-token sequences across 20 layers in 40GB VRAM.",
  },
  {
    title: "DDP Scaling",
    icon: "🔗",
    color: "cyan",
    detail:
      "PyTorch DistributedDataParallel with NCCL backend. Each GPU holds a full model replica; gradients are averaged via all-reduce after each backward pass.",
  },
  {
    title: "Pre-LN Architecture",
    icon: "⚡",
    color: "emerald",
    detail:
      "LayerNorm applied before attention and FFN (not after) for training stability. Prevents gradient vanishing in deep 20-layer networks.",
  },
  {
    title: "Weight Tying",
    icon: "🔀",
    color: "amber",
    detail:
      "Token embedding and LM head share weights. Reduces parameters by 133K and improves generalization — standard in GPT-class models.",
  },
  {
    title: "LR Scaling Rule",
    icon: "📈",
    color: "rose",
    detail:
      "Learning rate scaled as lr × √(world_size). Combined with cosine decay schedule and 1000-step linear warmup from 0 to peak LR.",
  },
  {
    title: "Memory Leak Fix",
    icon: "🐛",
    color: "blue",
    detail:
      "Fixed real-world multi-GPU memory leak caused by storing attention weights in all forward passes. Added save_attention flag — only saves when explicitly requested for visualization.",
  },
];

export const terminalLogs = [
  "$ torchrun --nproc_per_node=8 train_gpt_ddp.py",
  "CharTokenizer: vocab_size=65",
  "GPT initialized: 1011.22M parameters",
  "",

  "── Starting 1B 8-GPU training ─────────────────────────",
  "  params:       1.011B",
  "  global batch: 64",
  "  seq_len:      2048",
  "  tokens/step:  131,072",
  "──────────────────────────────────────────────────────────",
  "",

  "/nlsasfs/home/sysadmin/ksuraj/Module9/1B_parameter/train_gpt_ddp.py:185: FutureWarning: torch.cuda.amp.GradScaler(args...) is deprecated.",
  "[rank0]: Warning: find_unused_parameters=True was specified in DDP constructor.",
  "",

  "step=    0  loss=4.7569  lr=1.13e-06  grad=24.972  step_ms=65.7  tok/s=1994376  peak=20.13GB",
  "",
  "── eval at step 0 ── train: 4.4202 | val: 4.4297 ──",
  "  ✓ saved checkpoint (val_loss=4.4297)",
  "",

  "step=   50  loss=2.5797  lr=5.77e-05  grad=5.040  step_ms=3923.1  tok/s=33410  peak=27.66GB",
  "step=  100  loss=2.4863  lr=1.14e-04  grad=1.792  step_ms=2248.8  tok/s=58284  peak=27.66GB",
  "step=  150  loss=2.4978  lr=1.71e-04  grad=2.381  step_ms=2249.1  tok/s=58277  peak=27.66GB",
  "step=  200  loss=2.4342  lr=2.27e-04  grad=1.836  step_ms=2249.7  tok/s=58261  peak=27.66GB",
  "step=  250  loss=2.4290  lr=2.84e-04  grad=2.335  step_ms=2248.8  tok/s=58285  peak=27.66GB",
  "step=  300  loss=2.3443  lr=3.41e-04  grad=1.795  step_ms=2248.5  tok/s=58293  peak=27.66GB",
  "step=  350  loss=2.0903  lr=3.97e-04  grad=1.913  step_ms=2249.8  tok/s=58260  peak=27.66GB",
  "step=  400  loss=1.7682  lr=4.54e-04  grad=1.242  step_ms=2250.6  tok/s=58239  peak=27.66GB",
  "step=  450  loss=1.5807  lr=5.10e-04  grad=1.421  step_ms=2249.4  tok/s=58271  peak=27.66GB",
  "step=  500  loss=1.4271  lr=5.67e-04  grad=0.975  step_ms=2250.9  tok/s=58230  peak=27.66GB",
  "",

  "── eval at step 500 ── train: 1.3312 | val: 1.4704 ──",
  "  ✓ saved checkpoint (val_loss=1.4704)",
  "",

  "step=  550  loss=1.2198  lr=6.23e-04  grad=0.545  step_ms=3887.4  tok/s=33717  peak=27.66GB",
  "step=  600  loss=1.0188  lr=6.80e-04  grad=0.803  step_ms=2250.9  tok/s=58231  peak=27.66GB",
  "step=  650  loss=0.8779  lr=7.37e-04  grad=1.062  step_ms=2249.1  tok/s=58278  peak=27.66GB",
  "step=  700  loss=0.6134  lr=7.93e-04  grad=0.526  step_ms=2247.8  tok/s=58312  peak=27.66GB",
  "step=  750  loss=0.3359  lr=8.50e-04  grad=0.408  step_ms=2249.1  tok/s=58278  peak=27.66GB",
  "step=  800  loss=0.3142  lr=9.06e-04  grad=0.280  step_ms=2250.7  tok/s=58237  peak=27.66GB",
  "step=  850  loss=0.1914  lr=9.63e-04  grad=0.288  step_ms=2251.2  tok/s=58223  peak=27.66GB",
  "step=  900  loss=0.1674  lr=1.02e-03  grad=0.326  step_ms=2250.4  tok/s=58243  peak=27.66GB",
  "step=  950  loss=0.1496  lr=1.08e-03  grad=0.270  step_ms=2247.8  tok/s=58311  peak=27.66GB",
  "step= 1000  loss=0.1228  lr=1.13e-03  grad=0.205  step_ms=2247.9  tok/s=58307  peak=27.66GB",
  "",

  "── eval at step 1000 ── train: 0.0673 | val: 2.4703 ──",
  "── Generation at step 1000 ──",
  "",
  "More than Aufidius is him; for his knowledge, his knowledge",
  "Was not increase in this substance: the oracle were sentence of the",
  "crown buttering in his our assembly; for the not all his need his death",
  "And then strength against the rest that the",
  "Which he can practive the came of thought of the action?",
  "You fear to the deputy of an oy sense your children,",
  "You had not fair at depose them you.",
  "",
  "HERBERCK",
  "────────────────",
  "",

  "step= 1500  loss=0.0476  lr=1.13e-03  grad=0.087  step_ms=2249.8  tok/s=58260  peak=27.66GB",
  "",
  "── eval at step 1500 ── train: 0.0283 | val: 2.9786 ──",
  "",

  "step= 2000  loss=0.0335  lr=1.12e-03  grad=0.055  step_ms=2246.7  tok/s=58340  peak=27.66GB",
  "",
  "── eval at step 2000 ── train: 0.0207 | val: 3.3715 ──",
  "── Generation at step 2000 ──",
  "...",
  "",

  "step= 2500  loss=0.0244  lr=1.10e-03  grad=0.040  step_ms=2255.1  tok/s=58122  peak=27.66GB",
  "── eval at step 2500 ── train: 0.0167 | val: 3.5122 ──",
  "",

  "step= 3000  loss=0.0213  lr=1.08e-03  grad=0.028  step_ms=2248.8  tok/s=58284  peak=27.66GB",
  "── eval at step 3000 ── train: 0.0144 | val: 3.2422 ──",
  "",

  "step= 3500  loss=0.0196  lr=1.05e-03  grad=0.024  step_ms=2247.3  tok/s=58324  peak=27.66GB",
  "── eval at step 3500 ── train: 0.0133 | val: 3.4630 ──",
  "",

  "step=13550  loss=0.0069  lr=6.86e-05  grad=0.004  step_ms=3365.2  tok/s=38950  peak=27.66GB",
  "step=13600  loss=0.0066  lr=6.67e-05  grad=0.004  step_ms=2245.0  tok/s=58383  peak=27.66GB",
  "step=13700  loss=0.0075  lr=6.31e-05  grad=0.004  step_ms=2245.5  tok/s=58371  peak=27.66GB",
  "step=13800  loss=0.0070  lr=5.97e-05  grad=0.004  step_ms=2245.1  tok/s=58382  peak=27.66GB",
  "step=13900  loss=0.0063  lr=5.65e-05  grad=0.004  step_ms=2245.2  tok/s=58379  peak=27.66GB",
  "step=14000  loss=0.0070  lr=5.37e-05  grad=0.004  step_ms=2245.3  tok/s=58375  peak=27.66GB",
  "",

  "── eval at step 14000 ── train: 0.0063 | val: 6.4076 ──",
  "── Generation at step 14000 ──",
  "I hope the king made peace with all of us",
  "And the compact is firm and true in me.",
  "...",
  "",

  "step=14500  loss=0.0069  lr=4.34e-05  grad=0.004  step_ms=2249.5  tok/s=58268  peak=27.66GB",
  "",
  "── eval at step 14500 ── train: 0.0062 | val: 6.5140 ──",
  "",

  "step=14900  loss=0.0061  lr=4.01e-05  grad=0.004  step_ms=2245.8  tok/s=58363  peak=27.66GB",
  "step=14950  loss=0.0069  lr=4.00e-05  grad=0.004  step_ms=2245.8  tok/s=58363  peak=27.66GB",
  "",

  "── eval at step 14999 ── train: 0.0062 | val: 6.5691 ──",
  "",
  "Training complete.",
];            