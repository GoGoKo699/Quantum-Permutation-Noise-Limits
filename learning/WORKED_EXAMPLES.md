# Worked examples: from an unlabelled pair to the noise ceiling

These examples illustrate the exact channel definitions and bounds, not independent proofs of their general validity.

## Example 1 — two qubits with unknown ordering

The two-qubit Hilbert space decomposes into a three-dimensional symmetric triplet and a one-dimensional antisymmetric singlet. The uniform twirl removes coherence between them, while the triplet is untouched. Thus a sender who deliberately encodes a coherent qutrit in the triplet achieves $\log_2 3$ qubits per **two-carrier block** when there is no local noise. A single coherent qubit plus a classical singlet/triplet label is **not** the same resource: the two sectors are not coherently connected after twirling.

## Example 2 — flagged erasure at $n=2$, $q=1/2$

The erased-particle count $L$ is binomial:

| Lost qubits $\ell$ | Probability | Conditional assisted ebits |
|---:|---:|---:|
| 0 | $1/4$ | $\log_2 3$ |
| 1 | $1/2$ | $\log_2(3/2)$ |
| 2 | $1/4$ | $0$ |

The exact two-way rate is

$$
Q_2=\log_2 3-\frac12\log_2 2-\frac14\log_2 3
=\frac34\log_2 3-\frac12\approx0.68872
$$

qubits per two-carrier block. The unassisted rate is $Q=0$ because the erasure probability is $1/2$. This contrast concerns the availability of free classical feedback, not the number of qubits physically sent.

## Example 3 — the EB CP-order ceiling

For $n=2$ and replacement probability $q=1/2$,

$$
K_2(q)=1+(1-q)+(1-q)^2=1+\frac12+\frac14=\frac74.
$$

For $t$ independent blocks, even an adaptive two-way LOCC protocol attempting to share a maximally entangled state of rank $D$ obeys

$$
F\le\min\{1,(7/4)^t/D\}.
$$

The rate threshold from this **fidelity** bound is $\log_2(7/4)\approx0.80735$ qubits per block, larger than the exact flagged-erasure capacity $0.68872$ in Example 2. The difference illustrates why one must not claim the strong converse is already sharp at $f_n$.

## Example 4 — two different limits

With fixed $q=1/2$, the exact two-way erasure capacity approaches $-\log_2(1/2)=1$ qubit per block as $n\to\infty$. With $q_n=1/n$, the mean loss count remains one and the capacity instead grows like $\log_2 n-O(1)$. There is no contradiction: the physical noise model changes with $n$ in the second limit.

## Example 5 — classical information survives

Alice prepares $n$ copies of a qubit state with a chosen Bloch vector $\mathbf r$. Every copy is identical, so scrambling does nothing. Depolarization shrinks the vector but leaves three independently estimable components whenever $q<1$. By measuring Pauli observables on separate groups and choosing a sufficiently separated grid, Bob can distinguish on the order of $(n/\log n)^{3/2}$ messages with vanishing error. The corresponding classical bits grow like $(3/2)\log_2n$, even though coherent quantum communication is bounded for fixed $q>0$.

Read the [exact proofs](../science/README.md) and [verification](../verification/README.md) for the hypotheses and derivations.
