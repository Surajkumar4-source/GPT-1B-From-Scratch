# GPT-1B From Scratch 

> A complete **1 Billion parameter GPT** implementation built from scratch using **PyTorch**, **DistributedDataParallel (DDP)**, **Gradient Checkpointing**, and trained across **8× NVIDIA A100 SXM4-40GB GPUs**.



## Overview

This project demonstrates how to build and train a **GPT-style Transformer** from scratch at the **1B parameter scale**.

The implementation covers the complete training pipeline—from tokenization and Transformer architecture to multi-GPU distributed training using **PyTorch DDP**, **NCCL**, **Gradient Checkpointing**, mixed precision, and large-scale optimization.

The objective was to understand the engineering challenges involved in training large language models on real HPC infrastructure rather than achieving state-of-the-art performance.

---

## Highlights

* ✅ 1.01 Billion parameter GPT model
* ✅ Built completely from scratch in PyTorch
* ✅ Multi-GPU training using DistributedDataParallel (DDP)
* ✅ Gradient Checkpointing for memory optimization
* ✅ Mixed Precision (bfloat16)
* ✅ Weight Tying
* ✅ Pre-LayerNorm Transformer
* ✅ Cosine Learning Rate Scheduler + Warmup
* ✅ TensorBoard Logging
* ✅ Trained on 8× NVIDIA A100 SXM4-40GB GPUs

---

# Training Metrics

| Metric              | Value                        |
| ------------------- | ---------------------------- |
| Parameters          | **1,011,224,385**            |
| GPUs                | **8× NVIDIA A100 SXM4-40GB** |
| Total VRAM          | **320 GB**                   |
| Peak VRAM / GPU     | **27.66 GB**                 |
| Sequence Length     | **2048**                     |
| Training Steps      | **15,000**                   |
| Tokens / Step       | **131,072**                  |
| Throughput          | **~58,000 tokens/sec**       |
| Average Step Time   | **2360.94 ms**               |
| Total Training Time | **~9.84 hours**              |

---

# Model Architecture

The model follows the standard **decoder-only GPT architecture** with a **Pre-LayerNorm Transformer**.

### Configuration

| Parameter        |  Value |
| ---------------- | -----: |
| Parameters       | 1.011B |
| Layers           |     20 |
| Hidden Dimension |   2048 |
| Attention Heads  |     16 |
| Head Dimension   |    128 |
| FFN Dimension    |   8192 |
| Context Length   |   2048 |
| Vocabulary Size  |     65 |
| Dropout          |    0.1 |

### Forward Pass

```text
Input Tokens
      │
Token Embedding
      │
Positional Embedding
      │
Dropout
      │
20 × Transformer Blocks
      │
 ├── LayerNorm
 ├── Multi-Head Attention
 ├── Residual Connection
 ├── LayerNorm
 ├── Feed Forward Network
 └── Residual Connection
      │
Final LayerNorm
      │
LM Head (Weight Tied)
      │
Next Token Prediction
```

---

# Memory Optimizations

Large models quickly become activation-memory bound.

This implementation uses **Gradient Checkpointing**, reducing activation memory by approximately **60–70%**.

```python
torch.utils.checkpoint.checkpoint(block, x)
```

Instead of storing every intermediate activation during the forward pass, activations are recomputed during backpropagation, enabling training with **2048-token sequences** within the **40 GB VRAM** limit of each GPU.

---

# Multi-GPU Training

Training is distributed across **8 NVIDIA A100 GPUs** using PyTorch DistributedDataParallel.

### Communication

* NCCL Backend
* All-Reduce Gradient Synchronization
* NVLink High-Speed Interconnect

### Data Loading

* DistributedSampler
* Non-overlapping batches
* Proper epoch seeding

### Learning Rate Scaling

Effective learning rate follows

```text
lr_eff = lr × √(world_size)
```

combined with

* Linear Warmup
* Cosine Decay Scheduler

---

# Performance

## Single GPU vs Multi-GPU

| Metric         |    1× A100 |      8× A100 |
| -------------- | ---------: | -----------: |
| Model Size     |       ~10M |       1.011B |
| Context Length |        256 |         2048 |
| Tokens / Step  |     16,384 |      131,072 |
| Peak Memory    |      ~5 GB | 27.66 GB/GPU |
| Throughput     | ~15k tok/s |   ~58k tok/s |

Scaling enabled approximately

* **100× larger model**
* **8× longer context**
* **8× more tokens per step**
* **3.9× higher throughput**

---

# Training Results

| Metric                |      Value |
| --------------------- | ---------: |
| Final Train Loss      | **0.0069** |
| Best Validation Loss  | **1.4704** |
| Final Validation Loss | **6.5691** |

The model intentionally overfits because it is trained on **Tiny Shakespeare (~1 MB)**.

This behavior is expected for a **1B parameter model** with significantly more capacity than the dataset requires.

The purpose of the project was to validate the large-scale training pipeline rather than maximize generalization.

---

# Technical Learnings

During development the project explored:

* DistributedDataParallel (DDP)
* NCCL communication
* Gradient Checkpointing
* Activation memory optimization
* Weight tying
* Mixed precision training
* Large model debugging
* Multi-GPU synchronization
* Transformer scaling
* HPC training workflows

One notable debugging challenge involved identifying and fixing a multi-GPU memory leak caused by retaining attention weights during forward passes. The issue was resolved by introducing a configurable `save_attention` flag that stores attention maps only when visualization is required.

---

# Tech Stack

* Python 3.11
* PyTorch
* CUDA 12
* NVIDIA NCCL
* DistributedDataParallel (DDP)
* Gradient Checkpointing
* bfloat16 Mixed Precision
* AdamW
* TensorBoard
* torchrun

---


# Future Improvements

* FineWeb/OpenWebText pretraining
* Flash Attention
* FSDP / ZeRO
* Tensor Parallelism
* Pipeline Parallelism
* Rotary Positional Embeddings (RoPE)
* SwiGLU Feed-Forward Networks
* KV Cache for inference
* Larger tokenizer vocabulary
* Model checkpoint sharding

---

# Acknowledgements

This project was built as part of my Deep Learning learning journey to better understand how modern GPT models are trained and scaled on real multi-GPU infrastructure.

---



