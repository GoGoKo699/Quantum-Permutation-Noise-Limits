# Model, capacities, and resource conventions

## A block without positional labels

The carrier is a block of $n\ge1$ qubits, with input Hilbert space $\mathcal H_n=(\mathbb C^2)^{\otimes n}$. For $\pi\in S_n$, let $U_\pi$ permute the tensor factors. The physical loss of positional identity is the channel

$$
\mathcal P_n(X)=\frac1{n!}\sum_{\pi\in S_n}U_\pi XU_\pi^\dagger.
$$

The permutation is **fresh, uniformly random, and not revealed** on each independent channel use. It acts on the transmitted register, not on the external reference held by the sender. Thus the operational channel on a reference-entangled input is $\mathrm{id}_R\otimes\mathcal P_n$.

The single-qubit erasure channel with erasure probability $q\in[0,1]$ is

$$
\mathcal E_q(\rho)=(1-q)\rho\oplus q\,\operatorname{Tr}(\rho)|e\rangle\langle e|,
$$

where $|e\rangle$ is orthogonal to the qubit space and is visible to the receiver. The erasure block is

$$
\mathcal B_{n,q}^{\rm era}
=\mathcal E_q^{\otimes n}\circ\mathcal P_n.
$$

Erasure patterns, and therefore the total number $L$ of erased positions, are available at the receiver. For identical independent local noise, permutation covariance makes the ordering of twirl and noise equivalent after the natural permutation of output factors.

For unflagged noise we study a qubit CPTP map

$$
\mathcal A=(1-q)\mathcal M+q\mathcal R_\sigma,\qquad
\mathcal R_\sigma(X)=\operatorname{Tr}(X)\sigma,
$$

where $\mathcal M$ is CPTP, $\sigma$ is a fixed density matrix and $q>0$. The corresponding block is $\mathcal B_{n,\mathcal A}=\mathcal A^{\otimes n}\circ\mathcal P_n$. A transparent case is depolarization,

$$
\mathcal D_q(\rho)=(1-q)\rho+qI_2/2.
$$

Here $q$ is the probability of complete replacement, not the total nonidentity Pauli-error probability $3q/4$. A full-Choi-rank qubit channel has at least one decomposition with $q>0$; the largest admissible $q$ can give the strongest bounds. Rank-deficient noise need not admit one.

## What a communication rate means

One **use** transmits the entire $n$-qubit block. The integer $n$ describes the physical ensemble size; $t$ denotes independent block uses in a communication protocol. A rate of $r$ qubits per block means asymptotic transmission of approximately $tr$ logical qubits using $t$ blocks, with vanishing error as $t\to\infty$ at fixed $n$.

- $Q(\mathcal B)$ is the ordinary, unassisted quantum capacity. Local ancillas are allowed, but there is no free classical feedback, preshared entanglement, or extra quantum channel.
- $Q_2(\mathcal B)$ is the two-way-classical-communication-assisted quantum capacity, equivalently the achievable entanglement-distribution rate with unlimited LOCC between calls and initially separable laboratories.
- $C(\mathcal B)$ is the unassisted classical-message capacity. Unlimited free classical communication is not permitted when defining this quantity.
- All quantities are **per block**, not per physical qubit. Divide by $n$ for a per-carrier rate.

For the adaptive converse, take $t$ fixed calls, finite LOCC processing between them, and a final normalized bipartite output $\rho_{AB}$. For a rank-$D$ maximally entangled state $\Phi_D$, define the unconditional overlap fidelity

$$
F=\operatorname{Tr}(\Phi_D\rho_{AB}).
$$

For a heralded protocol with success probability $p_{\rm suc}$, the success-weighted fidelity is $p_{\rm suc}F_{\rm cond}$. A bound on that product must not be misreported as a bound on $F_{\rm cond}$ alone.

The model excludes an uncharged noiseless quantum bypass, initially shared ebits, protected carrier labels, a permutation reused across calls, and position-dependent or correlated noise. The channel is finite dimensional for each $n$; limits in $n$ are taken only after the fixed-$n$ capacity is defined.

## A simple example

For $n=2$, positional twirling preserves the three-dimensional triplet sector and the one-dimensional singlet sector, but removes coherence between them. A receiver can transmit one coherent qutrit through the triplet when $q=0$, hence $Q_2=Q=\log_2 3$ qubits per two-carrier block. For general $n$, the largest noiseless spin sector has dimension $n+1$, giving $Q(\mathcal P_n)=Q_2(\mathcal P_n)=\log_2(n+1)$. The subsequent pages show how any fixed $q>0$ changes this growth.
