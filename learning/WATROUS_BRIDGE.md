# Watrous bridge — from quantum channels to noisy permutation limits

**Single educational anchor:** John Watrous, *The Theory of Quantum Information* (Cambridge University Press, 2018). [Author's freely accessible prepublication copy](https://cs.uwaterloo.ca/~watrous/TQI/TQI.pdf) (personal use; do not redistribute). This bridge follows the book's actual 2018 chapter and section headings; it is not a claim that Watrous already proves this project's results.

The common [30-milestone map](MILESTONES.md) points here for foundations and to the [scientific account](../science/README.md) for research-specific proofs. The reader may start with the [worked examples](WORKED_EXAMPLES.md).

## Route through the selected book

| Watrous 2018 | What it supplies | Where it enters this project |
|---|---|---|
| §1.1 and §1.2.3, linear operators and semidefinite programming | Tensor products, positivity and operator order | [CP-order comparisons](../science/symmetric_loss.md) |
| §§2.1.1–2.1.3, registers, states and purifications | Reference systems, reduced states, entangled test states | [Model](../science/model.md), [conditional Choi purification](../science/symmetric_loss.md) |
| §§2.2.1–2.2.3, quantum channels and their representations | CPTP maps, Choi representation, composition | [Physical twirl](../science/model.md), [replacer comparison](../science/replacement_noise.md) |
| §3.2, fidelity | Distinguish an overlap from a success-conditioned claim | [Adaptive fidelity inequality](../science/replacement_noise.md) |
| §§5.1–5.2, entropy | Conditional entropy, relative entropy and information inequalities | [Conditional-loss resource](../science/symmetric_loss.md), [erasure rates](../science/erasure_capacities.md) |
| §§6.1.1–6.1.2, separability and LOCC | Separable states and operations that cannot generate entanglement | [EB comparator and adaptive converse](../science/replacement_noise.md) |
| §6.2.2, distillable entanglement and cost | Operational entanglement distillation | [Reverse hashing/REE rate comparison](../science/symmetric_loss.md) |
| §6.3.1, teleportation and dense coding | Entanglement as a resource for quantum communication | [Covariant simulation](../science/symmetric_loss.md) |
| §§7.1.1–7.1.2, permutation-invariant vectors/operators | Symmetric tensors and invariant operator algebras | [Schur-sector reduction](../science/schur_reduction.md) |
| §§7.2.1–7.2.2, Haar measures and applications | Group averages and invariant coherent-state integrals | [Measure-and-prepare comparison](../science/symmetric_loss.md) |
| §§8.1.1–8.1.2, classical channel capacities and HSW | Classical messages and Holevo dimension bounds | [Classical contrast](../science/classical_contrast.md) |
| §§8.2.1–8.2.2, quantum capacities | Asymptotic coding and coherent information | [Erasure capacity theorem](../science/erasure_capacities.md) |

Watrous's §§7.1–7.2 are particularly useful because **permutation invariance is a physical map here**, not merely a convenient assumption on the input. His treatment is a foundation; the exact spin-sector/singlet-padding identity is supplied in this project's [Schur reduction](../science/schur_reduction.md).

## Translate the notation before reading the proof

Watrous typically denotes registers by calligraphic spaces such as $\mathcal X,\mathcal Y,\mathcal Z$, uses $\mathrm D(\mathcal X)$ for density operators, and writes a channel as a linear map $\Phi:\mathrm L(\mathcal X)\to\mathrm L(\mathcal Y)$. Our $\mathcal P_n,\mathcal E_q,\mathcal A$ are such channels; $\mathcal H_n=(\mathbb C^2)^{\otimes n}$ is the $n$-qubit input space.

| This project | Meaning and translation |
|---|---|
| $R$ | An untouched reference register; Watrous's auxiliary register in complete positivity and purification arguments |
| $B$ | Receiver's quantum output; may contain a classical erasure-pattern flag |
| $E$ | Channel environment or lost-particle register, not a free resource at Bob |
| $J_{\mathcal N}$ | **Normalized** Choi state $(\mathrm{id}_R\otimes\mathcal N)(|\Phi_d\rangle\langle\Phi_d|)$ with $|\Phi_d\rangle=d^{-1/2}\sum_i|i,i\rangle$ |
| $\mathcal N\preceq_{\rm CP}c\mathcal T$ | $c\mathcal T-\mathcal N$ is completely positive, equivalently its Choi operator is positive |
| $V_j,M_j$ | Spin-$j$ representation and its permutation multiplicity, respectively; distinct from physical carrier labels |
| $Q,Q_2,C$ | Unassisted quantum, two-way-classically-assisted quantum, and unassisted classical capacities **per entire block** |

**Choi normalization matters.** The numerical verifier uses **unnormalized** Choi matrices with $\operatorname{Tr}J=d_{\rm in}$, whereas the entropy and resource formulas use **normalized** Choi states with trace one. Multiply/divide by $d_{\rm in}$ when comparing them. This is not a change in the CP-order inequality.

**Fidelity convention matters.** The final adaptive bound uses the overlap $F=\langle\Phi_D|\rho|\Phi_D\rangle$. If a text calls the square root of this quantity “fidelity,” the corresponding inequality must be square-rooted. For a heralded branch, only $p_{\rm suc}F_{\rm cond}$ is bounded by the unconditional inequality.

## The steps Watrous does not give for free

1. **Physical Schur reduction.** Watrous's invariant-operator algebra does not directly assert that every spin sector is the output of a symmetric $2j$-qubit input padded with $(n-2j)/2$ singlets. The [channel identity](../science/schur_reduction.md) proves this qubit-specific intertwiner and keeps arbitrary references.
2. **Symmetric-loss Choi spectra and CP comparator.** The conditional partial-trace spectrum and coherent-state measure/prepare inequality are reconstructed in [symmetric loss](../science/symmetric_loss.md) and attributed to [Pirandola, arXiv:2610.06832v3](https://arxiv.org/abs/2610.06832). They are not textbook theorems being claimed as original here.
3. **Reverse hashing, relative entropy of entanglement and covariant simulation.** Watrous introduces the operational language, but the precise reverse-hashing achievability and REE/covariant-simulation equality used in the [erasure converse](../science/erasure_capacities.md) require the cited research-level inputs and the local reconstruction. Do not infer these statements from the book's contents alone.
4. **Direct-sum degradable enhancement.** The [unassisted converse](../science/erasure_capacities.md) builds a separately enhanced channel with a spin label. It does **not** claim that the original physical twirl is degradable.
5. **Uniform EB domination.** The [replacer theorem](../science/replacement_noise.md) tilts the conditional erasure weights to make a **trace-preserving** EB comparator; omitting that normalization would invalidate the adaptive fidelity proof.
6. **Classical comparison.** The [Bloch-grid code](../science/classical_contrast.md) is a direct concentration argument. It demonstrates classical growth without claiming an optimal classical exponent.

## A proof itinerary, not a prerequisite marathon

First read Watrous §§2.2 and 7.1 to understand the physical twirl, then [the spin reduction](../science/schur_reduction.md). Read §§5.2, 6.1–6.2 and 7.2 alongside the [symmetric-loss resource](../science/symmetric_loss.md). Use §8.2 to interpret the two capacity formulas in [erasure capacities](../science/erasure_capacities.md). Finally return to the [replacer strong converse](../science/replacement_noise.md) and [classical contrast](../science/classical_contrast.md). At each stage, consult only the relevant textbook section and the linked proof; the entire book is not an entrance requirement.

**Scientific boundary:** a positive replacer component is a sufficient hypothesis for the universal noise ceiling. The exact formulas are for flagged erasure; the unflagged depolarizing capacity is not solved. The finite-block strong-converse threshold $\log_2K_n$ may exceed the tighter capacity bound $f_n$.
