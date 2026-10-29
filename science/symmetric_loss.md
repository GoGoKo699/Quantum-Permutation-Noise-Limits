# Symmetric loss: Choi geometry, EB comparison, and simulation

The symmetric-space ingredients here are **inherited mathematical tools**, specialized to qubits and reconstructed for clarity. The sector loss comparison and sector teleportation simulation appear in Pirandola, [arXiv:2610.06832v3](https://arxiv.org/abs/2610.06832), Appendices B and G. The contribution of this project is their use after the [all-sector physical-channel reduction](schur_reduction.md).

## Conditional symmetric partial trace

Let $H_m=\operatorname{Sym}^m(\mathbb C^2)$, $d_m=m+1$. For $0\le k\le m$, define the channel

```math
\mathcal L_{m,k}:\mathcal B(H_m)\longrightarrow\mathcal B(H_k)
```
by tracing out any $m-k$ tensor factors. A symmetric input guarantees that the remaining state is supported on $H_k$. Put $\ell=m-k$.

The symmetric split isometry $V_{m,k}:H_m\to H_k\otimes H_\ell$ takes $|u\rangle^{\otimes m}$ to $|u\rangle^{\otimes k}|u\rangle^{\otimes\ell}$. Let $|\Phi_m\rangle$ be normalized maximally entangled between a reference copy of $H_m$ and the input, and set

```math
|\Omega\rangle_{RBE}=(I_R\otimes V_{m,k})|\Phi_m\rangle.
```
By irreducible $\mathrm{SU}(2)$ symmetry, the environment marginal is $I_{H_\ell}/d_\ell$. The normalized Choi state $J_{m,k}=\operatorname{Tr}_E|\Omega\rangle\langle\Omega|$ therefore has rank $d_\ell$ and equal nonzero eigenvalues $1/d_\ell$. Writing $P_{m,k}$ for its support projector,

**Equation (2).**

```math
J_{m,k}=\frac{P_{m,k}}{d_\ell},\qquad
S(R)=\log_2d_m,\quad S(RB)=\log_2d_\ell.
```
These identities include $k=0$ and $k=m$.

## A trace-preserving EB comparator

Integrate over normalized pure qubit states with Haar probability measure $du$. Define

```math
\mathcal T_{m,k}(\rho)
=d_m\int du\,
\langle u^{\otimes m}|\rho|u^{\otimes m}\rangle
|u^{\otimes k}\rangle\langle u^{\otimes k}|.
```
The identity $\int du\,|u^{\otimes m}\rangle\langle u^{\otimes m}|=I_{H_m}/d_m$ proves trace preservation. The channel is entanglement breaking (EB), since it measures and prepares.

Its normalized Choi state is the separable state

```math
\Sigma_{m,k}=\int du\,
|\overline u^{\otimes m}\rangle\langle\overline u^{\otimes m}|_R
\otimes|u^{\otimes k}\rangle\langle u^{\otimes k}|_B.
```
The Bell contraction gives

```math
(\langle\overline u^{\otimes m}|_R\otimes
\langle u^{\otimes k}|_B\otimes I_E)|\Omega\rangle
=\frac{|u^{\otimes\ell}\rangle_E}{\sqrt{d_m}}.
```
Using the coherent-state identity resolution once more yields $(\Sigma_{m,k}\otimes I_E)|\Omega\rangle=|\Omega\rangle/d_m$. The purification has full Schmidt support $P_{m,k}$ on $RB$, hence

```math
\Sigma_{m,k}P_{m,k}=P_{m,k}/d_m.
```
The support is an invariant subspace of $\Sigma_{m,k}$, and positivity on its orthogonal complement implies

```math
J_{m,k}\preceq
\frac{d_m}{d_\ell}\Sigma_{m,k}.
```
By the Choi criterion this is the **reference-stable CP-order inequality**

**Equation (3).**

```math
\boxed{\quad
\mathcal L_{m,k}
\preceq_{\rm CP}
\frac{m+1}{m-k+1}\mathcal T_{m,k}.
\quad}
```
It is stronger than a bound on an unreferenced output norm. The factor cannot be reduced for this specific comparator because equality holds on $P_{m,k}$.

## Exact entanglement of the sector resource

For the Choi state, reverse coherent information from Bob to Alice equals

```math
S(R)-S(RB)=\log_2\frac{d_m}{d_\ell}.
```
Reverse hashing attains this many ebits per copy asymptotically. The separable comparator gives an upper bound on relative entropy of entanglement:

```math
E_R(J_{m,k})\le D(J_{m,k}\Vert\Sigma_{m,k})
=\log_2\frac{d_m}{d_\ell}.
```
Since distillable entanglement is bounded by regularized relative entropy of entanglement, the two inequalities meet:

**Equation (4).**

```math
E_D(J_{m,k})=E_R^\infty(J_{m,k})=E_R(J_{m,k})
=\log_2\frac{m+1}{\ell+1}.
```
The Choi-state entanglement and hashing ingredients are inherited; Eq. (4) is not presented as a new symmetric-loss theorem.

## Exact covariant simulation of a symmetric erasure channel

The input $H_m$ carries an irreducible $\mathrm{SU}(2)$ representation $U_m(g)$. Independent erasure restricted to $H_m$ is covariant: its output transforms by the corresponding qubit rotations on surviving factors, leaving erasure flags fixed.

For a covariant channel $\mathcal S_m$ with this irreducible input representation, let $J_{\mathcal S_m}$ be its normalized Choi state. The Bell orbit $|\Phi_g\rangle=(U_m(g)\otimes I)|\Phi_m\rangle$ obeys

```math
d_m^2\int dg\,|\Phi_g\rangle\langle\Phi_g|=I_{H_m\otimes H_m}.
```
Alice measures this POVM on her input and her half of $J_{\mathcal S_m}$, sends the group outcome $g$ to Bob, and Bob applies the output covariance correction. The corrected channel is exactly $\mathcal S_m$ on every input, including reference-entangled inputs. A finite exact first-moment ensemble can replace the Haar integral.

This simulation supplies the operational link between the sector resource in Eq. (4) and an arbitrary adaptive communication protocol. It is the irreducible-sector simulation principle credited to Pirandola; no uncharged preshared resource is assumed in the physical channel.
