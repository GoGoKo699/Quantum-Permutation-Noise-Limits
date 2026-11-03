# Physical erasure after finite real-deformation projection

The ordinary permutation theorem has a substantive sister extension. Replacing
the permutation twirl by the full finite real-deformation symmetry projection
changes the physical loss maps and achievable finite-block rates. Nevertheless,
every fixed positive erasure probability still imposes a size-independent ceiling
on two-way quantum capacity. This page defines the physical channel, works out
small sectors, and gives the operational proof route.

The shared all-sector theorem and its full probability proof have their
authoritative home in **Quantum Group Memory Laws**:
[first-mismatch theorem](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws/blob/06ff5a0621ccb9b57c89f7a895bc497c8305fb12/science/first_mismatch.md)
and [capacity consequence](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws/blob/06ff5a0621ccb9b57c89f7a895bc497c8305fb12/science/capacity.md).
The present repository owns the ordinary Schur/symmetric-loss benchmark and this
operational comparison. The two accounts retain their own definitions and
essential arguments; they describe one shared finite-deformation result.

## 1. The supplied stationary channel

Use finite $`r>1`$ for deformation and $`0\lt p\lt1`$ for erasure probability.
The earlier ordinary-permutation chapters use $`q`$ for noise probability;
here their undeformed benchmark is evaluated at $`q=p`$.
On the physical open chain $`\mathcal H_n=(\mathbb C^2)^{\otimes n}`$, put

```math
\begin{aligned}
E_n&=\sum_{i=1}^n
 \left(\prod_{a\lt i}r^{-Z_a/2}\right)s_i^+
 \left(\prod_{a>i}r^{Z_a/2}\right),\\
F_n&=E_n^\dagger,\qquad K_n=r^{\sum_iZ_i/2},\qquad
s_i^+=(X_i+iY_i)/2.
\end{aligned}
```

Let $`\mathcal A_r`$ be their full unital star algebra, including products.
The ordinary physical-trace Hilbert–Schmidt conditional expectation onto it is
$`\Pi_r`$. At $`r=1`$, take the usual collective spin algebra; then
$`\Pi_1=\mathcal P_n`$ is ordinary permutation twirling. No quantum-dimension
weighted trace is used.

In the actual physical Clebsch–Gordan decomposition,

```math
\begin{aligned}
\mathcal H_n&=\bigoplus_j V_j\otimes M_j,\qquad d_j=2j+1,\quad m_j=\dim M_j,\\
\mathcal X_j(X)&=\mathrm{Tr}_{M_j}(P_jXP_j),\\
\Pi_r(X)&=\bigoplus_j\mathcal X_j(X)\otimes I_{M_j}/m_j.
\end{aligned}
```

The direct sum is embedded by the $`r`$-dependent physical intertwiners.
The sector dimensions and multiplicities equal their undeformed values, but
the embedding into physical sites changes. Sector probabilities can depend on
the input and its reference correlations.

The communication channel is

```math
\mathcal N_{n,r,p}=\mathcal E_p^{\otimes n}\circ\Pi_r,\qquad
\mathcal E_p(\rho)=(1-p)\rho\oplus p\,\mathrm{Tr}(\rho)|e\rangle\langle e|.
```

Each call supplies the **complete stationary projection**, followed by fresh
independent local erasures with receiver-visible flags. Capacities count qubits
per entire block, with independent calls and unlimited inter-call LOCC for
$`Q_2`$. There is no initially shared entanglement or free quantum bypass.

## 2. Exact conditional physical loss maps

Choose orthonormal multiplicity intertwiners
$`W_{j,a}:V_j\to\mathcal H_n`$, $`a=1,\ldots,m_j`$.
Conditional on a specified erased set $`T`$, define

```math
\begin{aligned}
\mathcal L_{j,T}(X)&=\frac1{m_j}\sum_{a=1}^{m_j}\sum_b
 K_{a,b}XK_{a,b}^\dagger,\\
K_{a,b}&=(\langle b|_T\otimes I_{T^c})W_{j,a}.
\end{aligned}
```

Here $`b`$ runs over the physical computational basis on the erased sites.
Multiply by $`p^{\lvert T\rvert}(1-p)^{n-\lvert T\rvert}`$ and append the
pattern flag to restore the unconditioned channel. The Kraus identity holds
on every logical matrix unit and hence on arbitrary identity extensions.
Selecting one pure multiplicity path alone would give a different encoding
from the actual mixed-multiplicity projection.

### Two spins: a nonflat one-erasure resource

Write $`D=1+r^2`$ and use $`\vert 0\rangle=\vert \mathrm{up}\rangle`$.
The spin-one embedding has ordered columns

```math
T_r=\left[\ |00\rangle,\quad
\frac{|01\rangle+r|10\rangle}{\sqrt D},\quad |11\rangle\ \right].
```

The spin-zero vector is $`(r\vert 01\rangle-\vert 10\rangle)/\sqrt D`$.
Erasing the right spin gives the exact qutrit-to-qubit Kraus matrices

```math
K_0=\begin{pmatrix}1&0&0\\0&r/\sqrt D&0\end{pmatrix},\qquad
K_1=\begin{pmatrix}0&1/\sqrt D&0\\0&0&1\end{pmatrix}.
```

Left erasure exchanges the middle coefficients $`r/\sqrt D`$ and
$`1/\sqrt D`$. Both normalized Choi states have spectrum

```math
\left\{\lambda_r,1-\lambda_r\right\},\qquad
\lambda_r=\frac{1+2r^2}{3(1+r^2)}.
```

It is flat only at $`r=1`$. Choi eigenvalues are invariant under unitary input
and output changes, so even this conditional channel is not the undeformed
symmetric-loss channel in another unitary basis.

This difference has an operational consequence for the **full independently
erased two-spin block**. Send half of a maximally entangled qutrit through
$`T_r`$. Bob announces the erasure pattern and the parties reverse-hash each
branch. With $`h_2`$ denoting binary entropy, the achievable rate is

```math
\begin{aligned}
R_2(r,p)&=(1-p^2)\log_2 3-2p(1-p)h_2(\lambda_r),\\
Q_2(\mathcal N_{2,r,p})&\ge R_2(r,p)>f_2(p)\qquad(r>1,\ 0\lt p\lt1).
\end{aligned}
```

No erasure contributes $`\log_2 3`$, each one-erasure branch contributes
$`\log_2 3-h_2(\lambda_r)`$, and complete erasure contributes zero.
At $`r=1`$ this equals the [exact undeformed value](erasure_capacities.md)
$`f_2(p)`$. The strict improvement follows from $`h_2(\lambda_r)\lt1`$.
It is an achievable deformed rate, not an exact deformed capacity formula.

### Three spins: averaging multiplicities retains positional dependence

For spin $`1/2`$, let $`S=1+r^2+r^4`$ and choose the two intertwiners
$`A=[A_+,A_-]`$, $`B=[B_+,B_-]`$:

```math
\begin{aligned}
A_+&=(r|010\rangle-|100\rangle)/\sqrt D,&
A_-&=(r|011\rangle-|101\rangle)/\sqrt D,\\
B_+&=(rD|001\rangle-|010\rangle-r|100\rangle)/\sqrt{DS},&
B_-&=(r^2|011\rangle+r^3|101\rangle-D|110\rangle)/\sqrt{DS}.
\end{aligned}
```

Their four columns are orthonormal, with $`F_nA_+=A_-`$ and
$`F_nB_+=B_-`$ and the corresponding spin-half raising relations.
The stationary sector encoding is exactly
$`X\mapsto(AXA^\dagger+BXB^\dagger)/2`$.
For erased site $`i`$, the preceding conditional formula gives four Kraus
operators $`(\langle b\vert _i\otimes I)V/\sqrt2`$, with
$`V\in\{A,B\}`$ and $`b\in\{0,1\}`$. It retains the whole two-qubit survivor
output without an additional sector trace.

For end erasure the four nonzero normalized Choi eigenvalues are

```math
\frac14,\quad\frac14,\quad\frac{r^2+2}{4S},\quad
\frac{r^2(1+2r^2)}{4S}.
```

For middle erasure they are

```math
\frac{1+(r^2-1)/\sqrt S}{4}\quad\text{twice},\qquad
\frac{1-(r^2-1)/\sqrt S}{4}\quad\text{twice}.
```

At $`r=1`$ all are $`1/4`$; at every $`r>1`$ the end and middle spectra
differ. Thus physical loss is not restored to permutation covariance by
multiplicity averaging. A global isomorphism of the conserved algebras does
not identify their physical local-loss channels.

## 3. A uniform all-sector ceiling

For every fixed finite $`r>1`$ and fixed $`0\lt p\lt1`$, there is a finite
constant $`C(r,p)`$, independent of $`n`$, such that

```math
1-h_2(p/2)\le Q_2(\mathcal N_{n,r,p})
\le\min\{C(r,p),\log_2(n+1),(1-p)n\}.
```

Consequently the two-way quantum capacity per complete block is of order one
at fixed parameters. The sharp ceiling and exact deformed capacities are not
identified. The following argument explains the new upper bound without
transferring the undeformed symmetric-loss equivalence.

### A classical estimate from the actual lost spins

Fix any doubled-spin CG path $`k_0=0,k_1,\ldots,k_n=k`$, with nonnegative
heights and edges $`\epsilon_t=k_t-k_{t-1}\in\{-1,+1\}`$.
Its logical weight $`h=0,\ldots,k`$ has total physical up-spin count
$`(n-k)/2+h`$. Generate its computational-basis probabilities backwards along
the exact CG recursion and put $`z=r^{-2}`$.
A mismatch occurs when the emitted physical $`Z`$ spin differs from the path
edge. If its current weight and height are $`h_t,k_t`$, the mismatch probability
is

```math
q_t=\begin{cases}
z^{h_t}\dfrac{1-z^{k_t-h_t}}{1-z^{k_t}},&\epsilon_t=+1,\\[4pt]
z^{h_t+1}\dfrac{1-z^{k_t+1-h_t}}{1-z^{k_t+2}},&\epsilon_t=-1.
\end{cases}
```

Let $`\delta=k-h`$. A mismatch changes the signed mismatch count by the
corresponding edge sign; its final net count is exactly $`\delta`$.
There are therefore at least $`\delta`$ mismatches. Observe each with independent
probability $`p`$ by measuring the erased physical spins. The number $`G`$ of
hidden mismatches before the first observed one obeys
$`\Pr(G\ge g)\le(1-p)^g`$, and no observed mismatch has probability at most
$`(1-p)^\delta`$.

The deterministic exposure, accumulated backwards up to the first erased
mismatch $`\tau`$, is $`A_\tau=\sum_{s=n}^{\tau}z^{k_s}`$.
Use $`\widehat\delta=\mathrm{clip}(\log_zA_\tau,0,k)`$ and set it to zero
if there is no observed mismatch. Before more than $`g`$ hidden mismatches,
the exact observed hazard lies between fixed multiples of
$`p z^{k_t-\delta+g}`$ and $`p z^{k_t-\delta-g}`$; the lower bound is used
only for the underestimation event with $`\delta>g`$. Stop the process at the
$`(g+1)`$st hidden mismatch; this controls survival without conditioning on a
future outcome. The exposure increment at
$`\tau`$ controls its endpoint overshoot, and the no-event bound handles
censoring at the finite path length.

For one explicit constant, define for integers $`t\ge3`$

```math
\begin{aligned}
g_t&=\lfloor t/3\rfloor,\\
B_t&=2(1-p)^{g_t}+\frac{p}{1-z}z^{t-g_t}
 +\exp[-pz(1-z)^2z^{g_t-t}]+(1-p)^t,\\
M(r,p)&=3+\sum_{t=3}^\infty\min\{1,B_t\},\\
g_{\rm b}(x)&=(x+1)\log_2(x+1)-x\log_2x,\\
C(r,p)&=1+g_{\rm b}(M(r,p)+1).
\end{aligned}
```

The first, second and fourth terms of $`B_t`$ decay exponentially and the
third faster than exponentially. The full probability proof establishes
$`\Pr(\lvert\widehat\delta-\delta\rvert\ge t)\le B_t`$ uniformly in path,
weight and chain length. Thus the mean absolute error is at most $`M(r,p)`$.
After integer rounding, the mean absolute residual is at most $`M+1`$.
The entropy of an integer residual is bounded by one sign bit plus the
geometric-distribution maximum at that mean. For **every logical prior**,

```math
H(h\mid\text{path, erasure pattern, lost physical }Z\text{ values})\le C(r,p).
```

These deliberately loose constants need not stay bounded as $`r\to1`$ or
$`p\to0`$. The ordinary $`r=1`$ exact theorem uses its own Schur/symmetric-loss
proof, not a limit of this bound.

### From posterior entropy to arbitrary-reference communication

A Stinespring dilation of $`\Pi_r`$ records sector $`j`$, input multiplicity
$`\beta`$, and output multiplicity $`\alpha`$. Its sector Kraus operators are
$`W_{j,\alpha}(I\otimes\langle\beta\vert )P_j/\sqrt{m_j}`$.
Squash that environment by measuring these labels, the erasure pattern, and
all erased physical $`Z`$ spins. Each conditional reference-survivor state is
pure. It is a sum over logical weights with arbitrary pure reference vectors;
orthogonality of those reference vectors is unnecessary.

Fixing the erased $`Z`$ values makes distinct input weights have distinct
surviving up-spin counts. Their survivor vectors are orthogonal. The reference
entropy of each conditional pure state is therefore at most the classical
posterior entropy bounded above. In the definition of squashed entanglement,
half the conditional mutual information is precisely this average reference
entropy. Hence the **actual full channel**, including arbitrary sector and
multiplicity correlations, satisfies $`E_{\rm sq}(\mathcal N_{n,r,p})\le C(r,p)`$.
The [Takeoka–Guha–Wilde theorem](https://arxiv.org/abs/1310.0129v3), Theorem 9,
then gives $`Q_2\le E_{\rm sq}\le C(r,p)`$ under arbitrary adaptive LOCC.
This environment measurement is a converse construction; it supplies no
environment access to the receiver.

### A positive rate for every block size

Encode a qubit into the all-up state and its normalized one-excitation
maximal-spin vector, whose excitation probabilities are $`w_i`$.
For erased set $`T`$, the survivor vacuum/excitation support is an
amplitude-damping qubit channel with survival
$`\eta_T=\sum_{i\notin T}w_i`$; when $`\eta_T=0`$, Bob prepares the vacuum.
Reverse hashing a maximally entangled input gives

```math
\begin{aligned}
Q_2(\mathcal N_{n,r,p})
&\ge\mathbb E_T\left[1-h_2\!\left(\frac{1-\eta_T}{2}\right)\right]\\
&\ge1-h_2(p/2)>0,
\end{aligned}
```

because $`\mathbb E\eta_T=1-p`$ and binary entropy is concave.
The other upper bounds follow by data processing from the largest retained
matrix block of $`\Pi_r`$ and the physical erasure channel. Neither bound
equates the changed embedding with undeformed local loss.

## 4. Stationarity, limits and attribution

The theorem concerns the supplied stationary channel. The local realization
in the sister project has a positive fixed-size dissipative gap $`\Delta_n`$,
whose scaling with $`n`$ is not established. For its Schrödinger state semigroup
$`\Phi_t`$ and noise strength $`\varepsilon>0`$, the finite-size
Hilbert–Schmidt contraction gives the conservative conversion

```math
\|\Phi_t-\Pi_r\|_\diamond
\le2^n e^{-\varepsilon\Delta_n t},\qquad
t\ge\frac{n\ln2+\ln(1/\eta)}{\varepsilon\Delta_n}
\ \Longrightarrow\ \|\Phi_t-\Pi_r\|_\diamond\le\eta.
```

Erasure cannot increase that distance. A hybrid estimate for multiple adaptive
calls must charge their total implementation error. No finite-time or
wall-clock communication rate follows without a separate mixing-time account.
The result fixes finite $`r`$ and positive $`p`$ before varying $`n`$; it does
not substitute an infinite-deformation generator limit or a local
autocorrelation law for the channel theorem.

The full physical projection, multiplicities and stationary realization come
from **Quantum Group Memory Laws** and its credited commutant predecessors.
The ordinary [Schur reduction](schur_reduction.md),
[exact erasure capacities](erasure_capacities.md), and inherited
[symmetric-loss tools](symmetric_loss.md) retain their original scope and
attribution to Pirandola and earlier symmetric-state work.
Raveh–Nepomechie, [arXiv:2308.08392v2](https://arxiv.org/abs/2308.08392v2),
establishes $`q`$-Dicke weighted amplitudes and contiguous-bipartition tools;
these do not already prove the arbitrary-path erased-subset converse.
Takeoka–Guha–Wilde supplies the channel squashed-entanglement/adaptive-capacity
framework. The new shared step is the finite-deformation first-mismatch
posterior bound and its physical full-channel application.

The [finite checks](../verification/README.md) verify the small-sector maps,
rate improvement and positive-rate construction. The sister proof's exhaustive
path/word/flag checks support its analytical identities; finite computations
are not substitutes for the uniform proof or independent expert scrutiny.
