# Quantum Permutation Noise Limits

**How much quantum information survives when the identities of the particles in a noisy ensemble are lost?** A uniformly shuffled block of $`n`$ qubits still carries $`\log_2(n+1)`$ coherent qubits without local noise. But any fixed positive amount of independent replacement noise places a **size-independent ceiling** on quantum communication through the entire block.

The result applies to **arbitrary encodings and reference-entangled inputs**, not only to symmetric-state codes. For flagged particle erasure it gives exact finite-block capacities, with a sharp asymptotic ceiling. Unflagged noise obeys an all-encoder bound and an adaptive fidelity inequality, even with unlimited classical feedback.

## Sister result: the physical embedding changes, the ceiling survives

**[Quantum Group Memory Laws](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws)** supplies the full finite real-deformation symmetry projection $`\Pi_r`$ on the same physical spin chain. At $`r=1`$ it is ordinary permutation twirling. For every fixed finite $`r>1`$ and erasure probability $`0\lt p\lt1`$, the shared result gives

```math
1-h_2(p/2)\le Q_2(\mathcal E_p^{\otimes n}\circ\Pi_r)
\le C(r,p)\lt\infty,
```

uniformly in block size. The deformed physical loss maps are different: an explicit two-spin achievable rate strictly exceeds the ordinary exact value. The [operational sister account](science/finite_deformation_erasure.md) derives those maps, explains the full-channel entropy converse and positive lower bound, and separates stationarity from finite-time mixing. Quantum Group Memory Laws owns the [full first-mismatch proof](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws/blob/6b592787b784214bec25214c72aee2c5d43991af/science/first_mismatch.md); this repository owns the ordinary Schur/symmetric-loss benchmark and operational comparison. Both use Watrous (2018) as their common educational anchor.

## Main results

Write $`\mathcal P_n`$ for a fresh unrecorded uniform permutation twirl and $`\mathcal E_q`$ for independent, receiver-flagged erasure with probability $`q`$. Let $`L\sim\mathrm{Bin}(n,q)`$.

| Communication task | Result, in bits or qubits per complete $`n`$-qubit block |
|---|---|
| Two-way-assisted quantum communication under flagged erasure | **Exact:** $`Q_2=\log_2(n+1)-\mathbb E\log_2(L+1)`$ |
| Unassisted quantum communication under flagged erasure | **Exact:** $`Q=\mathbb E\log_2[(n-L+1)/(L+1)]`$ for $`q\le1/2`$; $`Q=0`$ for $`q\ge1/2`$ |
| Any identical local qubit noise with replacer component $`q>0`$ | **Bound:** $`Q_2\le f_n(q)\le\log_2K_n(q)\le-\log_2q`$ |
| Any $`t`$-call adaptive LOCC protocol, target rank $`D`$ | **Fidelity:** $`F\le\min\{1,K_n(q)^t/D\}`$ |
| Classical communication under fixed depolarization $`0\lt q\lt1`$ | **Achievable:** at least $`\frac32\log_2n-\frac32\log_2\log n-O_q(1)`$ bits per block |

Here

```math
K_n(q)=\sum_{a=0}^n(1-q)^a
=\frac{1-(1-q)^{n+1}}q.
```
For every fixed $`0\lt q\lt1`$, the flagged-erasure result is asymptotically sharp:

```math
\begin{aligned}
\lim_{n\to\infty} Q_2 &= -\log_2 q,\\
\lim_{n\to\infty} Q &= \max\biggl\{0,\log_2\frac{1-q}{q}\biggr\}.
\end{aligned}
```
The strong-converse threshold supplied by the fidelity inequality is $`\log_2K_n`$, which can exceed the tighter finite-$`n`$ capacity bound $`f_n`$. The exact depolarizing quantum capacity is **not** claimed.

## Why the bound covers every encoding

Permutation twirling removes multiplicity registers but preserves spin representations. Every spin-$`j`$ sector of an $`n`$-qubit block can be represented as a symmetric $`2j`$-qubit state padded with singlet pairs. This is an exact reference-stable channel reduction, not an assumption about the encoder.

The symmetric partial-trace resource and coherent-state comparison are established prior work. Combining them with the all-sector reduction yields the physical noisy-permutation law. The erasure benchmark uses an exact covariant channel simulation and reverse hashing; unflagged noise is bounded by an entanglement-breaking CP-order comparator.

## Read the science

Start with the [model and operational conventions](science/model.md), then the [all-spin-sector reduction](science/schur_reduction.md) and [symmetric-loss tools](science/symmetric_loss.md).

| Question | Authoritative route |
|---|---|
| Exact finite-$`n`$ assisted and unassisted erasure capacities | [Erasure capacity proofs](science/erasure_capacities.md) |
| Uniform bound for depolarization and other replacer-containing channels | [Replacement-noise theorem](science/replacement_noise.md) |
| Classical messages despite bounded quantum capacity | [Classical contrast](science/classical_contrast.md) |
| Scaling, feedback, crossover, and limitations | [Physical interpretation](science/interpretation.md) |
| What is inherited and what differs from prior work | [Related work](references/RELATED_WORK.md) and [bibliography](references/references.bib) |
| Physical erasure after finite real-deformation projection | [Sister channel, exact small sectors and uniform ceiling](science/finite_deformation_erasure.md) |
| Reproduce finite Choi and rate checks | [Verification](verification/README.md) |

The [science index](science/README.md) provides a connected reading route.

## Learn the project

The single educational anchor is **John Watrous, *The Theory of Quantum Information* (2018)**, shared with the sister project. The [Watrous bridge](learning/WATROUS_BRIDGE.md) maps exact sections and notation to the proof dependencies and makes clear which results go beyond the textbook. The [30-milestone map](learning/MILESTONES.md) has **12 background** and **18 narrative/innovation** understanding targets, independent of any learner's progress. The [worked examples](learning/WORKED_EXAMPLES.md) connect ordinary erasure capacities, adaptive fidelity and classical contrast to the changed finite-deformation loss maps and their bounded capacity.

This common map is not a personalized coaching guide or a record of tutorial attempts.

## Reproduce

Install Python and NumPy as in [verification](verification/README.md), then run **python verification/checks.py** from the repository root. The checks cover 152 conditional-loss Choi cases through symmetric input size 16, 35 binomial identities, and 700 finite-rate comparisons. They support the analytical derivations but do not replace them.

Run **python verification/check_deformed_erasure.py** for the exact deformed small-sector maps, the two-spin rate improvement, and the all-size positive-rate construction. The uniform all-path theorem has its proof and detailed estimator checks in the sister project.

## Scope

Each use is one complete $`n`$-qubit block. Different ordinary uses have fresh independent permutations and independent identical local noise. No protected position labels, initially shared entanglement, or free quantum bypass is supplied. The ordinary all-sector reduction is qubit-specific. Its exact capacities concern **flagged erasure**; general replacer-containing noise has upper bounds, not asserted equality. The finite-deformation extension supplies a stationary projection and a uniform two-way ceiling, with no exact deformed capacity or uncharged mixing-time assertion. A single hidden permutation reused over time, correlated noise, and arbitrary qudit carriers require different analysis.

## Purpose and contact

This repository serves as a record of the work and a guide for the author’s self-directed learning. For discussion or potential collaboration, please contact Ruge Lin at [gogoko699@gmail.com](mailto:gogoko699@gmail.com).
