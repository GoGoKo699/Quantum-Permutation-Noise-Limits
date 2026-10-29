# Classical messages survive fixed local noise

The bounded coherent quantum capacity does **not** imply that an unordered noisy ensemble stores only finitely many classical messages. This page gives a concrete growing-rate code and a simple upper bound for the same physically scrambled channel.

## A three-parameter product-state code

Take the depolarizing local channel $`\mathcal D_q(\rho)=(1-q)\rho+qI_2/2`$ with fixed $`0\le q<1`$. Let

```math
\rho_{\mathbf r}=\frac12(I+\mathbf r\cdot\boldsymbol\sigma),
\qquad \|\mathbf r\|\le r_0\lt 1.
```
Alice encodes a classical message by choosing a Bloch vector $`\mathbf r`$ from a three-dimensional grid inside a fixed small cube and preparing $`\rho_{\mathbf r}^{\otimes n}`$. This product state is already permutation invariant, so the inaccessible twirl has **no effect**. Bob receives

```math
\mathcal D_q(\rho_{\mathbf r})^{\otimes n}
=\rho_{(1-q)\mathbf r}^{\otimes n}.
```
He measures the three Pauli observables on three disjoint groups of approximately $`n/3`$ output qubits. Each sample is a bounded $`\pm1`$ random variable with mean $`(1-q)r_i`$. The three empirical means therefore estimate $`\mathbf r`$ with coordinate errors of order $`1/((1-q)\sqrt n)`$.

Choose grid spacing

```math
\Delta_n=\frac{A}{1-q}\sqrt{\frac{\log n}{n}}
```
with a sufficiently large constant $`A`$. Hoeffding's inequality and a union bound make nearest-grid decoding error vanish as a negative power of $`n`$. The fixed cube contains $`\Omega_q((n/\log n)^{3/2})`$ grid points, so a **single block** reliably carries

**Equation (17).**

```math
\begin{aligned}
\log_2 M_n &\ge\frac32\log_2 n\\
&\quad-\frac32\log_2\log n-O_q(1).
\end{aligned}
```
classical bits as $`n\to\infty`$. Repeating the block code or using the one-shot messages gives the same lower bound on unassisted classical capacity per block. This is an achievable lower bound, not a proof of the optimal classical exponent.

The argument also works for any local channel whose output retains three independently measurable Bloch-vector directions with a fixed nonsingular linear response; depolarization is the explicit case treated here. At $`q=1`$, all outputs are identical and this construction carries no information.

## Effective-dimension upper bound

The permutation twirl outputs operators in the algebra

```math
\bigoplus_j\mathcal B(V_j)\otimes I_{M_j}.
```
Because the multiplicity factors are fixed maximally mixed states, every output can be reversibly compressed into the direct sum $`\bigoplus_jV_j`$ without losing distinguishability. Identical local noise commutes with the permutation action, so it preserves this algebra. Its effective output Hilbert-space dimension is

```math
D_{\rm eff}(n)=\sum_j(2j+1)
=\left\lfloor\frac{(n+2)^2}{4}\right\rfloor.
```
For $`t`$ independent blocks the compressed output dimension is at most $`D_{\rm eff}(n)^t`$. The Holevo bound then gives

**Equation (18).**

```math
\begin{aligned}
C(\mathcal A^{\otimes n}\circ\mathcal P_n)
&\le\log_2D_{\rm eff}(n)\\
&=2\log_2n+O(1).
\end{aligned}
```
for any identical local CPTP map $`\mathcal A`$, with no preshared entanglement. This upper bound concerns classical communication **without a free classical side channel**.

Together, (17) and (18) show that for every fixed $`0<q<1`$, classical information grows logarithmically with block size while coherent quantum capacity stays bounded by [Eq. (16)](replacement_noise.md#arbitrary-adaptive-protocols). The precise classical exponent between these bounds is not needed for the physical quantum/classical separation.

## Different communication questions

Zero-error **classical messages encoded into quantum states**, coherent quantum information measured in logical qubits, and entanglement-assisted dense coding are distinct tasks. The positional-uncertainty results of Diebra and coauthors concern zero-error message counts and are credited in [related work](../references/RELATED_WORK.md); those counts cannot be substituted for a quantum-capacity theorem.
