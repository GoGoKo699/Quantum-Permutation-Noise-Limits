# All-spin-sector reduction: no symmetric-input promise

The principal physical-channel step is to treat **every** input, including arbitrary reference entanglement, rather than assume that the sender used the fully symmetric subspace.

## Twirling discards multiplicity, not spin information

Schur–Weyl duality for qubits gives

```math
\mathcal H_n=\bigoplus_{j=j_{\min}}^{n/2}V_j\otimes M_j,
\qquad d_j:=\dim V_j=2j+1,
```
where $`j_{\min}=0`$ for even $`n`$ and $`j_{\min}=1/2`$ for odd $`n`$. The permutation group acts irreducibly on $`M_j`$ and trivially on $`V_j`$; the collective $`\mathrm{SU}(2)`$ action is irreducible on $`V_j`$.

Let $`\Pi_j`$ be the corresponding projector and define the trace-nonincreasing CP map

```math
\mathcal X_j(X)=\mathrm{Tr}_{M_j}(\Pi_j X\Pi_j).
```
Schur's lemma gives the **channel identity**

```math
\begin{aligned}
\mathcal P_n(X)
&=\bigoplus_j\mathcal X_j(X)\otimes\frac{I_{M_j}}{\dim M_j},\\
\sum_j\mathrm{Tr}\mathcal X_j(X)&=\mathrm{Tr}X.
\end{aligned}
```
The same identity holds after tensoring an arbitrary identity map on a reference system. It removes inter-sector coherences and multiplicity information, but retains the unnormalized reference-correlated matrix in $`V_j`$. The sector probability is a channel outcome, not a number assumed independent of the input.

## Symmetric spins plus singlet padding

For each $`j`$, put $`m=2j`$. The representation $`V_j`$ is unitarily equivalent to $`\mathrm{Sym}^m(\mathbb C^2)`$, of dimension $`m+1`$. Because $`n-m`$ is even, one can append $`(n-m)/2`$ two-qubit singlets,

```math
|s\rangle=(|01\rangle-|10\rangle)/\sqrt2,
```
to a state in $`\mathrm{Sym}^m(\mathbb C^2)`$. This is an $`\mathrm{SU}(2)`$ intertwiner into total spin $`j`$: the singlets carry total spin zero. In a fixed Schur basis, the embedding selects one unit vector in $`M_j`$. Twirling the padded state replaces that vector by $`I_{M_j}/\dim M_j`$, reproducing the $`j`$ block exactly.

For a **single identical local CPTP channel** $`\mathcal A`$, the tensor-power map $`\mathcal A^{\otimes n}`$ is permutation covariant, even if $`\mathcal A`$ itself is not $`\mathrm{SU}(2)`$ covariant. Let $`\mathcal S_{m,\mathcal A}`$ denote $`\mathcal A^{\otimes m}`$ restricted to the symmetric $`m`$-qubit input. Define a fixed receiver-side CPTP postprocessing $`\mathcal B_{j,\mathcal A}`$ that appends $`(\mathcal A^{\otimes2}(\vert s\rangle\langle s\vert ))^{\otimes(n-m)/2}`$ and uniformly twirls all $`n`$ output factors. It follows that

**Equation (1).**

```math
\mathcal A^{\otimes n}\circ\mathcal P_n
=\sum_j\mathcal B_{j,\mathcal A}\circ
\mathcal S_{2j,\mathcal A}\circ\mathcal X_j.
```
The input/output identifications of $`V_j`$ with the symmetric space are understood. Equation (1) holds as a CP-map identity, including arbitrary references. The singlet-pair output is created entirely at the receiver and cannot supply entanglement across the sender–receiver cut.

This reduction is specific to **qubits**. For local dimension $`d>2`$, an arbitrary Schur sector is not in general obtained by padding one symmetric block with two-body singlets. No unrestricted qudit claim follows from (1).

## Operational uses of the reduction

For converses, Alice can locally measure $`j`$, discard the multiplicity register, announce $`j`$ if desired, and simulate the corresponding symmetric channel; Bob applies $`\mathcal B_{j,\mathcal A}`$. This enhanced protocol can only make communication easier. It also allows the sector input to be correlated with all earlier adaptive memories: the maps $`\mathcal X_j`$ act locally and remain CP on reference extensions.

For achievability, Alice simply encodes into the **largest sector** $`j=n/2`$, which is $`\mathrm{Sym}^n(\mathbb C^2)`$ and has no singlet padding. Twirling is the identity on this sector. The all-sector upper bounds and this explicit lower-bound code coincide for flagged erasure.

The key point is the equality of the **physical channel** with a sum of fixed CP maps in (1). A calculation performed only on symmetric inputs would not, by itself, establish a converse for arbitrary encoders.
