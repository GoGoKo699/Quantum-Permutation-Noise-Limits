# Exact finite-block capacities for flagged erasure

The physical channel is $`\mathcal B_{n,q}^{\rm era}=\mathcal E_q^{\otimes n}\circ\mathcal P_n`$, with independent, receiver-flagged erasures of probability $`q`$ after a fresh, inaccessible uniform permutation. The capacity formulas below allow arbitrary input encodings; only their **achieving codes** use the fully symmetric sector.

## The two-way capacity

For $`L\sim\mathrm{Bin}(n,q)`$, define

```math
f_n(q):=\log_2(n+1)-\sum_{\ell=0}^n
{n\choose\ell}q^\ell(1-q)^{n-\ell}\log_2(\ell+1).
```
**Theorem 1 (exact two-way-assisted quantum capacity).** For every integer $`n\ge1`$ and $`0\le q\le1`$,

**Equation (5).**

```math
\boxed{Q_2(\mathcal B_{n,q}^{\rm era})=f_n(q).}
```
The rate is qubits per complete $`n`$-qubit block. Unlimited two-way classical communication is permitted, but the laboratories initially share no entanglement.

**Achievability.** Encode half of a normalized maximally entangled state of dimension $`n+1`$ into $`\mathrm{Sym}^n(\mathbb C^2)`$. Positional twirling acts trivially. Each erased-position pattern is announced to Bob, and its count $`\ell`$ has the input-independent binomial law. Conditional on that count, the surviving reference–receiver state is the normalized Choi state $`J_{n,n-\ell}`$ of symmetric partial trace. By [Eq. (4)](symmetric_loss.md#exact-entanglement-of-the-sector-resource), its reverse hashing rate is

```math
S(R)-S(RB)=\log_2\frac{n+1}{\ell+1}.
```
Over many independent blocks, Bob announces the erasure counts, the parties sort by count, and perform reverse hashing on each class. Averaging gives $`f_n(q)`$. It is important to condition on Bob's announced flag: evaluating a reverse coherent information with the unannounced flag only on Bob's side would introduce an avoidable $`H(L)`$ term.

**All-encoder converse.** For an arbitrary adaptive protocol, use the exact [Schur reduction](schur_reduction.md) at each physical call. Alice performs the local spin-sector instrument $`\{\mathcal X_j\}`$, obtains $`j`$ with probability $`p_j`$, and uses the exact [covariant LOCC simulation](symmetric_loss.md#exact-covariant-simulation-of-a-symmetric-erasure-channel) of the symmetric erasure channel on $`m=2j`$ input qubits. The simulation consumes the resource $`J_{m,q}`$, which has orthogonal, receiver-local erasure-count flags. The flags property and [Eq. (4)](symmetric_loss.md#exact-entanglement-of-the-sector-resource) give

```math
\begin{aligned}
E_R(J_{m,q})
&=\sum_{\ell=0}^m p_\ell\log_2\frac{m+1}{\ell+1}\\
&=f_m(q).
\end{aligned}
```
Let $`\rho`$ be the laboratories' state just before a call and $`\rho_j`$ the conditional state after Alice's local sector instrument. Strong monotonicity of relative entropy of entanglement under local instruments, subadditivity under tensor products, and monotonicity under LOCC give

**Equation (6).**

```math
\begin{aligned}
E_R(\rho_{\rm after})
&\le\sum_j p_j
\bigl[E_R(\rho_j)+f_{2j}(q)\bigr]\\
&\le E_R(\rho)+\max_j f_{2j}(q).
\end{aligned}
```
The fixed receiver-side singlet postprocessing cannot increase this entanglement. Iterating (6) over $`t`$ adaptive calls starting from separable laboratories bounds the final entanglement by $`t\max_j f_{2j}(q)`$. A state with fidelity approaching one to $`\Phi_D`$ must have $`E_R\ge(1-o(1))\log_2D-o(1)`$, by testing against $`\Phi_D`$ and the separable overlap bound $`1/D`$. Thus

```math
Q_2(\mathcal B_{n,q}^{\rm era})\le\max_j f_{2j}(q).
```
No common resource that generates every spin sector is assumed: the sector-dependent Choi state is introduced **after Alice's local instrument**.

**The largest sector is optimal.** For $`L_m\sim\mathrm{Bin}(m,q)`$, let $`h(0)=0`$ and $`h(x)=x\log_2(1+1/x)`$ for $`x>0`$. A binomial size-bias identity yields

```math
\begin{aligned}
f_{m+1}(q)-f_m(q)
&=\log_2\frac{m+2}{m+1}\\
&\quad-\frac1{m+1}
\mathbb E_{K\sim\mathrm{Bin}(m+1,q)}h(K).
\end{aligned}
```
The function $`h`$ is increasing; since $`K\le m+1`$, the difference is nonnegative. Therefore $`\max_j f_{2j}(q)=f_n(q)`$, proving (5).

## Ordinary quantum capacity

Define

```math
g_n(q):=\mathbb E_{L\sim\mathrm{Bin}(n,q)}
\log_2\frac{n-L+1}{L+1}.
```
**Theorem 2 (exact unassisted quantum capacity).**

**Equation (7).**

```math
Q(\mathcal B_{n,q}^{\rm era})=
\begin{cases}
g_n(q), &0\le q\le\tfrac12,\\
0, &\tfrac12\le q\le1.
\end{cases}
```
At $`q=1/2`$, $`g_n(1/2)=0`$, so the branches agree.

**Converse for $`q\le1/2`$.** Ordinary single-qubit erasure is degradable for $`q\le1/2`$. Tensor powers and restriction to the symmetric input via an isometry preserve degradability. Let $`\mathcal S_{m,q}`$ denote this restricted channel.

For the converse, introduce a **separate enhanced channel** $`\mathcal D_n`$ whose input is the direct sum $`\bigoplus_jV_j`$ (the multiplicity registers have already been discarded) and whose output has an explicit orthogonal label $`j`$ followed by $`\mathcal S_{2j,q}`$. This is a direct sum of degradable channels, with $`j`$ also available to its complement, hence is degradable. The physical channel factors as a CPTP preprocessing that extracts the spin blocks, followed by $`\mathcal D_n`$, followed by receiver-side postprocessing. Therefore $`Q(\mathcal B_{n,q}^{\rm era})\le Q(\mathcal D_n)`$.

For each branch, coherent information is concave in the input and invariant under irreducible $`\mathrm{SU}(2)`$ rotations. The maximally mixed symmetric input $`I_{H_m}/(m+1)`$ maximizes it. Its output and complementary entropies, conditioned on the common erasure pattern, give $`g_m(q)`$. The direct-sum channel's coherent information is the probability-weighted average of branch coherent informations; degradability and additivity therefore yield

```math
Q(\mathcal D_n)=\max_j g_{2j}(q).
```
This construction deliberately avoids calling the **original channel with discarded multiplicity** degradable: its complementary environment retains multiplicity information, and that stronger claim would be unjustified.

To maximize $`g_m`$, put

```math
\begin{aligned}
F_m(p)
&=p\,\mathbb E_{B\sim\mathrm{Bin}(m,p)}
\log_2\!\left(1+\frac1{B+1}\right)\\
&=\frac1{m+1}
\mathbb E_{K\sim\mathrm{Bin}(m+1,p)}h(K).
\end{aligned}
```
Binomial stochastic ordering and monotonicity of $`h`$ make $`F_m(p)`$ increasing. Direct subtraction gives

```math
g_{m+1}(q)-g_m(q)=F_m(1-q)-F_m(q)\ge0
\quad (q\le\tfrac12).
```
Thus $`\max_j g_{2j}=g_n`$. Encoding in the symmetric $`n`$-qubit sector achieves $`g_n`$ by the degradable-channel coding theorem, proving (7) in this regime.

For $`q\ge1/2`$, single-qubit erasure is antidegradable. Tensor products remain antidegradable, and precomposition by the permutation twirl cannot increase quantum capacity; the physical block is antidegradable and has $`Q=0`$.

## Limits and crossover

For fixed $`0<q<1`$, binomial concentration gives

**Equation (8).**

```math
\begin{aligned}
\lim_{n\to\infty}f_n(q)&=-\log_2q,\\
\lim_{n\to\infty}Q(\mathcal B_{n,q}^{\rm era})
&=\max\biggl\{0,\log_2\frac{1-q}{q}\biggr\}.
\end{aligned}
```
At $`q=0`$, both capacities equal $`\log_2(n+1)`$; at $`q=1`$, both vanish. The order of limits matters. If $`q_n=c/n`$ with fixed $`c>0`$, the binomial loss count converges to a Poisson variable $`Z_c`$ and

**Equation (9).**

```math
f_n(c/n)=\log_2 n-\mathbb E\log_2(Z_c+1)+o(1).
```
Thus the transition between a growing coherent register and a constant ceiling occurs at the natural scale $`nq\asymp1`$. The fixed-$`n`$ formulas are exact; the asymptotic formulas do not assert a uniform one-shot coding theorem when $`n`$ also grows.

The symmetric-sector entanglement, reverse hashing, and covariant simulation are inherited from the cited bosonic-loss work. The new step for the **physically permuted qubit channel** is the all-sector reduction and its use in (6) and in the degradable direct-sum converse.
