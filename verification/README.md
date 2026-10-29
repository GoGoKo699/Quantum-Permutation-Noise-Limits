# Verification and reproduction

The central claims are **analytical channel statements**. Finite computations here check vulnerable identities and boundary cases; they do not establish a universal CP inequality or an operational capacity theorem by themselves.

## Run

With Python 3.12 or later and NumPy:

1. Install the pinned dependency with **python -m pip install -r verification/requirements.txt**.
2. From the repository root, run **python verification/checks.py**.
3. For a quicker check, use **python verification/checks.py --max-spin 10**. The default tests all $`(m,k)`$ with $`1\le m\le16`$, $`0\le k\le m`$.
4. To retain machine-readable output, add **--output verification/local-results.json**. That output is generated locally; do not mistake a prior stored result for a fresh run.

## What is tested

| Check | Meaning | Scope |
|---|---|---|
| Conditional-loss Choi CP order | Smallest eigenvalue of $`cJ_{\mathcal T}-J_{\mathcal L}`$ is nonnegative to numerical precision | 152 cases through $`m=16`$ |
| EB comparator normalization | Partial trace of unnormalized Choi is input identity | Same 152 cases |
| Conditional-loss Choi spectrum | Normalized Choi rank $`\ell+1`$ and eigenvalue $`1/(\ell+1)`$ | Same 152 cases |
| Binomial identity | $`\mathbb E[(m+1)/(L+1)]=K_m(q)`$ | 35 pairs |
| Erasure formulas | Monotonicity in $`n`$, Jensen upper bound, boundary values, fixed-$`q`$ limit | 700 finite rate cases plus boundary/limit tests |

The CP matrices use the Dicke basis, analytic binomial coefficients, and the coherent-state beta integral. The program also prints finite-$`n`$ examples of $`Q_2`$, $`Q`$, and $`\log_2K_n`$ for erasure.

## Actual local result, 29 October 2026

The default run with Python and NumPy 2.3.5 completed successfully:

- 152 Choi CP comparisons; minimum residual eigenvalue approximately $`-9.50\times10^{-14}`$ (floating-point roundoff).
- Maximum EB trace-preservation error $`1.49\times10^{-14}`$; maximum Choi-spectrum error $`4.38\times10^{-16}`$.
- 35 binomial checks; maximum absolute identity error $`1.63\times10^{-11}`$.
- 700 finite-rate checks; no monotonicity or Jensen violations.

These values refer to a local execution of the preserved script, not a claim about hosted CI. The finite eigenvalue residuals are compatible with the exact positive-semidefinite statement but are not a proof of it.

## Analytical dependencies

The [symmetric-loss derivation](../science/symmetric_loss.md) establishes the all-size CP comparison. The [Schur reduction](../science/schur_reduction.md) establishes reference-stable all-sector coverage. The [erasure capacity proof](../science/erasure_capacities.md) uses inherited covariant simulation, reverse hashing, degradability, and relative entropy of entanglement. The [replacement-noise proof](../science/replacement_noise.md) establishes the adaptive fidelity inequality. The [classical code](../science/classical_contrast.md) uses Hoeffding concentration and output-algebra compression.

A numerical check of these ingredients is not a substitute for independent scrutiny of the exact simulation and resource accounting.

## Mathematical presentation checks

Run **python verification/check_docs.py** for the learning map, tracked-file links and display fences. Install the pinned JavaScript dependencies with **npm install --no-save --no-package-lock mathjax-full@3.2.1 playwright@1.56.1**, then run **node verification/check_math_render.cjs**. The source check requires all 67 display equations and 402 protected inline expressions, rejects the known GitHub-incompatible operator macro and literal inline bars, and includes negative regression cases.

For actual hosted verification, install the browser with **npx playwright install chromium** and run **node verification/hosted_math_audit.cjs** from a committed checkout whose revision is accessible on GitHub. This read-only audit visits all 14 Markdown pages at that exact commit, checks both 1440-pixel and 760-pixel viewports, and compares the complete rendered MathML symbol and script structure with the source. It also checks native equation coverage, GitHub error banners, unrendered formulas, table-column loss and display overflow. Screenshots, hosted HTML and a JSON observation report are written under **hosted-math-audit/**; the GitHub workflow retains them as run artifacts for seven days.

Spacing-only MathML wrappers and empty alignment cells are normalized for comparison; symbols, relations, subscripts, superscripts, fractions and meaningful structure are retained. A standalone TeX parser pass is not a substitute for this hosted check or for visual inspection of its screenshots. Rendering integrity is separate from scientific proof validity.
