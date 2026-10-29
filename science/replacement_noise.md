# A size-independent ceiling for unflagged local noise

The [erasure benchmark](erasure_capacities.md) is exact because the receiver sees the loss flags. This page transfers its consequences to local noise that has **no flags at all**, and gives a finite-protocol strong-converse inequality.

## The local replacement component

Let $\mathcal A$ be a qubit CPTP map admitting

**Equation (10).**

```math
\begin{aligned}
\mathcal A&=(1-q)\mathcal M+q\mathcal R_\sigma,\\
\mathcal R_\sigma(X)&=\operatorname{Tr}(X)\sigma,\quad 0<q\le1.
\end{aligned}
```
with $\mathcal M$ CPTP and $\sigma$ a fixed output density matrix. This is a CP decomposition, not a decomposition of a particular input state. Identical independent copies of $\mathcal A$ act on all $n$ positions after the inaccessible permutation twirl.

The erasure channel $\mathcal E_q$ is an **informational enhancement** of $\mathcal A$: Bob could apply $\mathcal M$ to each unerased qubit and prepare $\sigma$ on each erasure flag, thereby realizing $\mathcal A$. Consequently, with $f_n$ and $g_n$ as in the [exact erasure formulas](erasure_capacities.md),

**Equation (11).**

```math
\begin{aligned}
Q_2(\mathcal A^{\otimes n}\circ\mathcal P_n)
&\le f_n(q),\\
Q(\mathcal A^{\otimes n}\circ\mathcal P_n)
&\le\begin{cases}
g_n(q),&q\le1/2,\\
0,&q\ge1/2.
\end{cases}
\end{aligned}
```
These are bounds, not assertions that unflagged replacement has the erasure channel's capacity.

## An EB CP-order comparison with a geometric coefficient

Define

**Equation (12).**

```math
K_m(q)=\sum_{a=0}^m(1-q)^a
=\frac{1-(1-q)^{m+1}}q
\quad(q>0).
```
**Theorem 3 (uniform entanglement-breaking domination).** For every $n\ge1$ and every $\mathcal A$ satisfying (10), there is a trace-preserving entanglement-breaking channel $\mathcal F_{n,\mathcal A}$ such that

**Equation (13).**

```math
\boxed{\quad
\mathcal A^{\otimes n}\circ\mathcal P_n
\preceq_{\rm CP}K_n(q)\mathcal F_{n,\mathcal A}.
\quad}
```
**Proof.** First work on $H_m=\operatorname{Sym}^m(\mathbb C^2)$ and replace each qubit independently with probability $q$. Conditional on losing $\ell$ qubits, the retained state passes through $\mathcal L_{m,m-\ell}$; a fixed CPTP map $\mathcal V_{m,\ell}$ then restores the missing output positions, applies $\mathcal M$ on survivors, and prepares $\sigma$ on replacements. The probability $p_\ell={m\choose\ell}q^\ell(1-q)^{m-\ell}$ is input independent, so

```math
\mathcal S_{m,\mathcal A}
=\sum_{\ell=0}^m p_\ell\,
\mathcal V_{m,\ell}\circ\mathcal L_{m,m-\ell}.
```
Apply the inherited [symmetric-loss CP inequality](symmetric_loss.md#a-trace-preserving-eb-comparator) with $c_\ell=(m+1)/(\ell+1)$. Each $\mathcal V_{m,\ell}\circ\mathcal T_{m,m-\ell}$ is EB and TP. Therefore

```math
\mathcal S_{m,\mathcal A}
\preceq_{\rm CP}
K_m(q)\,\mathcal F_{m,\mathcal A},
```
where the comparator is the **normalized tilted mixture**

**Equation (14).**

```math
\begin{aligned}
\mathcal F_{m,\mathcal A}
&=\sum_{\ell=0}^m
\underbrace{\frac{p_\ell c_\ell}{K_m(q)}}_{w_\ell}\\
&\quad\cdot
\mathcal V_{m,\ell}\circ\mathcal T_{m,m-\ell}.
\end{aligned}
```
The weights $w_\ell$ sum to one because

```math
\begin{aligned}
\sum_\ell p_\ell c_\ell
&=(m+1)\mathbb E\frac1{L+1}\\
&=\sum_{a=0}^m(1-q)^a=K_m(q).
\end{aligned}
```
The middle equality follows from $1/(\ell+1)=\int_0^1x^\ell dx$ and the binomial theorem. **Using the original binomial weights in the EB comparator would be incorrect**; the tilting in (14) is essential.

Now insert this CP inequality into the [all-spin-sector channel identity](schur_reduction.md). Since $K_{2j}(q)\le K_n(q)$ and each $\mathcal X_j$ is trace-nonincreasing CP, we obtain (13) with

```math
\mathcal F_{n,\mathcal A}
=\sum_j\mathcal B_{j,\mathcal A}\circ
\mathcal F_{2j,\mathcal A}\circ\mathcal X_j.
```
The sum is TP because $\sum_j\operatorname{Tr}\mathcal X_j=\operatorname{Tr}$, and it is EB because each branch measures and prepares before receiver-side processing. All inequalities are **completely positive**, so they remain valid with arbitrary external references. $\square$

## Arbitrary adaptive protocols

Consider $t$ independent uses of the same block channel, with unrestricted two-way classical messages, local quantum memories, and no initial shared entanglement. Replace the actual channel at each call by the EB comparator in (13). CP order is preserved under reference extensions and CP pre- and postprocessing, so the final output operators obey

```math
\rho_{\rm actual}\preceq K_n(q)^t\rho_{\rm EB}.
```
The all-EB protocol is LOCC and ends in a separable state. Every separable state has overlap at most $1/D$ with $\Phi_D$. Hence

**Equation (15).**

```math
\boxed{F\le\min\biggl\{1,\frac{K_n(q)^t}{D}\biggr\}.}
```
For a heralded protocol the valid form is $p_{\rm suc}F_{\rm cond}\le K_n(q)^t/D$. If $\log_2D/t>\log_2K_n(q)$, fidelity decays exponentially. Thus the bound is a **strong converse above $\log_2K_n$**, not automatically above the tighter $f_n$ bound in (11).

Jensen's inequality and the binomial identity give

**Equation (16).**

```math
\begin{aligned}
f_n(q)
&=\mathbb E\log_2\frac{n+1}{L+1}\\
&\le\log_2\mathbb E\frac{n+1}{L+1}\\
&=\log_2K_n(q)\le-\log_2q.
\end{aligned}
```
The final inequality holds at every fixed $q>0$ and every $n$. For nonidentical known block sizes or replacement parameters across fixed calls, (15) generalizes with $\prod_iK_{n_i}(q_i)$ in place of $K_n^t$.

## Examples and limits

For depolarization $\mathcal D_q(\rho)=(1-q)\rho+qI_2/2$, the ceiling is independent of $n$ for every fixed $q>0$. For $q\ge2/3$, the **single-qubit depolarizing channel is already EB**, so its true quantum capacities vanish; (11)–(16) remain valid but need not be tight. More generally, a positive replacer fraction is sufficient, not necessary, for zero or bounded capacity.

A full-Choi-rank qubit channel admits some positive $q$ in (10), since a sufficiently small positive multiple of the full-rank Choi matrix of a replacer can be subtracted while preserving positivity. This observation is related to existing quantum Doeblin coefficients; see [related work](../references/RELATED_WORK.md). A rank-deficient amplitude-damping channel does not automatically satisfy (10).

The flagged erasure family **attains the asymptotic constant** $-\log_2q$ in (16). No equality is claimed for unflagged depolarization, for arbitrary correlated noise, or for a fixed hidden permutation reused across calls.
