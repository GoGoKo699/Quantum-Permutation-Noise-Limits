# Scientific account

**Question.** How much coherent quantum information survives when an unlabelled block of qubits is uniformly scrambled and then subjected to independent local noise?

The answer separates positional twirling, loss of individual carriers, and unflagged replacement noise. The theorems apply to **the complete physical channel**, including arbitrary reference-entangled inputs. The symmetric subspace enters as a proof tool and an optimal erasure code, not as an assumption on all encoders.

## Reading route

1. [Channel model and operational resources](model.md): exactly what is scrambled, what is charged, and which capacities are compared.
2. [Every spin sector reduces to a symmetric block](schur_reduction.md): the all-encoder reduction without discarding reference correlations.
3. [Symmetric partial trace and its resources](symmetric_loss.md): Choi spectra, separable comparisons, and exact covariant simulation; the symmetric-loss ingredients are inherited.
4. [Exact erasure capacities](erasure_capacities.md): assisted and unassisted formulas at finite block size, converses, and asymptotics.
5. [Unflagged local noise](replacement_noise.md): the universal finite-block bound and the adaptive strong-converse inequality.
6. [Classical information survives](classical_contrast.md): a constructive tomography code and an effective-dimension upper bound.
7. [Physical interpretation and scope](interpretation.md): why fixed microscopic loss changes the scaling.

The [closest-work analysis](../references/RELATED_WORK.md) distinguishes the new physical-channel reduction from inherited results. [Verification](../verification/README.md) gives executable finite checks and their limits.

## Principal statements

Let $`\mathcal P_n`$ uniformly twirl the positions of $`n`$ qubits and let $`\mathcal E_q`$ erase each qubit independently, with an accessible orthogonal erasure flag. All rates are **per complete $`n`$-qubit block**. For $`L\sim\mathrm{Bin}(n,q)`$,

```math
Q_2(\mathcal E_q^{\otimes n}\circ\mathcal P_n)
=\log_2(n+1)-\mathbb E\log_2(L+1).
```
The unassisted quantum capacity is

```math
Q(\mathcal E_q^{\otimes n}\circ\mathcal P_n)
=\begin{cases}
\mathbb E\log_2\!\frac{n-L+1}{L+1}, & 0\le q\le\tfrac12,\\
0, & \tfrac12\le q\le1.
\end{cases}
```
If a local qubit channel has a positive replacement component $`\mathcal A=(1-q)\mathcal M+q\mathcal R_\sigma`$, the scrambled block obeys

```math
\begin{aligned}
Q_2(\mathcal A^{\otimes n}\circ\mathcal P_n)
&\le f_n(q)\le\log_2 K_n(q)\le-\log_2q,\\
K_n(q)&=\sum_{a=0}^n(1-q)^a.
\end{aligned}
```
For $`t`$ independent calls, an arbitrary two-way adaptive protocol targeting Schmidt rank $`D`$ has unconditional entanglement fidelity $`F\le K_n(q)^t/D`$. The exact erasure benchmark approaches $`-\log_2q`$ at fixed $`q>0`$, making the size-independent ceiling sharp as a statement about the family of replacer-containing channels.

These statements are distinct from a claim of exact depolarizing capacity or an optimal classical-message exponent.
