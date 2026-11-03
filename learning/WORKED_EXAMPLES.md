# Worked examples: from an unlabelled pair to the noise ceiling

These examples illustrate the exact channel definitions and bounds, not independent proofs of their general validity.

## Example 1 — two qubits with unknown ordering

The two-qubit Hilbert space decomposes into a three-dimensional symmetric triplet and a one-dimensional antisymmetric singlet. The uniform twirl removes coherence between them, while the triplet is untouched. Thus a sender who deliberately encodes a coherent qutrit in the triplet achieves $`\log_2 3`$ qubits per **two-carrier block** when there is no local noise. A single coherent qubit plus a classical singlet/triplet label is **not** the same resource: the two sectors are not coherently connected after twirling.

## Example 2 — flagged erasure at $`n=2`$, $`q=1/2`$

The erased-particle count $`L`$ is binomial:

| Lost qubits $`\ell`$ | Probability | Conditional assisted ebits |
|---:|---:|---:|
| 0 | $`1/4`$ | $`\log_2 3`$ |
| 1 | $`1/2`$ | $`\log_2(3/2)`$ |
| 2 | $`1/4`$ | $`0`$ |

The exact two-way rate is

```math
\begin{aligned}
Q_2
&=\log_2 3-\frac12\log_2 2-\frac14\log_2 3\\
&=\frac34\log_2 3-\frac12
\approx0.68872.
\end{aligned}
```
qubits per two-carrier block. The unassisted rate is $`Q=0`$ because the erasure probability is $`1/2`$. This contrast concerns the availability of free classical feedback, not the number of qubits physically sent.

## Example 3 — the EB CP-order ceiling

For $`n=2`$ and replacement probability $`q=1/2`$,

```math
K_2(q)=1+(1-q)+(1-q)^2=1+\frac12+\frac14=\frac74.
```
For $`t`$ independent blocks, even an adaptive two-way LOCC protocol attempting to share a maximally entangled state of rank $`D`$ obeys

```math
F\le\min\{1,(7/4)^t/D\}.
```
The rate threshold from this **fidelity** bound is $`\log_2(7/4)\approx0.80735`$ qubits per block, larger than the exact flagged-erasure capacity $`0.68872`$ in Example 2. The difference illustrates why one must not claim the strong converse is already sharp at $`f_n`$.

## Example 4 — two different limits

With fixed $`q=1/2`$, the exact two-way erasure capacity approaches $`-\log_2(1/2)=1`$ qubit per block as $`n\to\infty`$. With $`q_n=1/n`$, the mean loss count remains one and the capacity instead grows like $`\log_2 n-O(1)`$. There is no contradiction: the physical noise model changes with $`n`$ in the second limit.

## Example 5 — classical information survives

Alice prepares $`n`$ copies of a qubit state with a chosen Bloch vector $`\mathbf r`$. Every copy is identical, so scrambling does nothing. Depolarization shrinks the vector but leaves three independently estimable components whenever $`q<1`$. By measuring Pauli observables on separate groups and choosing a sufficiently separated grid, Bob can distinguish on the order of $`(n/\log n)^{3/2}`$ messages with vanishing error. The corresponding classical bits grow like $`(3/2)\log_2n`$, even though coherent quantum communication is bounded for fixed $`q>0`$.

## Example 6 — deformation changes an achievable finite-block rate

Take finite deformation $`r=2`$ and erasure probability $`p=1/2`$. The physical spin-one qutrit has middle vector $`(\vert 01\rangle+2\vert 10\rangle)/\sqrt5`$. Its right-erasure Kraus operators are

```math
K_0=\begin{pmatrix}1&0&0\\0&2/\sqrt5&0\end{pmatrix},\qquad
K_1=\begin{pmatrix}0&1/\sqrt5&0\\0&0&1\end{pmatrix}.
```

Their normalized Choi eigenvalues are $`3/5,2/5`$, instead of the ordinary flat pair. Reverse hashing each announced erasure branch gives the full-block achievable rate

```math
R_2(2,1/2)=\frac34\log_2 3-\frac12h_2(3/5)
\approx0.7032466.
```

This strictly exceeds the exact ordinary value $`0.6887219`$ from Example 2. It disproves transfer of that exact formula to the changed physical channel. It does not determine the deformed capacity or its large-block scaling.

## Example 7 — a loss position remains relevant after multiplicity averaging

For three spins, deformation $`r=2`$ and the actual averaged spin-half sector, end erasure has normalized Choi spectrum

```math
\left\{\frac1{14},\frac14,\frac14,\frac37\right\}.
```

Middle erasure has $`(1-3/\sqrt{21})/4`$ twice and $`(1+3/\sqrt{21})/4`$ twice. The two spectra differ. The complete [conditional maps](../science/finite_deformation_erasure.md#2-exact-conditional-physical-loss-maps) average both physical multiplicities; this positional dependence is not an artifact of selecting just one copy.

## Example 8 — positive bounded capacity and a separately charged implementation

At erasure probability $`p=1/2`$, the vacuum/one-excitation code and reverse hashing give the uniform lower bound $`1-h_2(1/4)\approx0.1887219`$ qubits per block for every finite deformation and every block size. The [first-mismatch entropy argument](../science/finite_deformation_erasure.md#3-a-uniform-all-sector-ceiling) gives a finite upper constant at each fixed finite $`r>1`$. The rate can change with deformation while its growth with block size remains bounded.

These statements supply the stationary projection as one channel call. A local generator that approaches it has its own finite-size dissipative gap. A fixed-size convergence statement alone supplies no bound on the mixing time as the chain grows, so the communication theorem does not by itself give a wall-clock implementation rate.

Read the [exact proofs](../science/README.md) and [verification](../verification/README.md) for the hypotheses and derivations.
