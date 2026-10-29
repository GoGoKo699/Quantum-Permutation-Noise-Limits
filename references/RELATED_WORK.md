# Related work and attribution

The comparison concerns the **operational model and theorem**, not whether another work uses the words permutation, loss, or symmetry. This review identifies the closest inspected sources as of 29 October 2026; it is not an exhaustive priority certificate.

## The most important inherited result

**Stefano Pirandola, [Energy-constrained two-way capacities of pure-loss and quantum-limited amplifier channels](https://arxiv.org/abs/2610.06832), arXiv:2610.06832v3 (14 October 2026).**

Appendix B.1 develops irreducible-sector teleportation simulation; Appendix B.2 gives exact relative entropy of entanglement and reverse hashing for symmetric photon-loss sectors; Appendix G.2 contains the conditional symmetric-loss CP-order comparison. These are substantial inherited ingredients, not new discoveries of this repository. The present account specializes their symmetric-sector geometry to qubits and reconstructs the needed identities in [symmetric loss](../science/symmetric_loss.md).

The paper's channel is a bosonic loss/amplifier channel with an energy constraint. It does not state the theorem for a **physically applied full permutation twirl on arbitrary $`n`$-qubit inputs**, followed by independent qubit noise. The additional step here is the exact all-spin-sector reduction with singlet padding and its operational use to bound arbitrary encoders and adaptive protocols. The large-$`n`$ erasure constant agrees with inherited pure-loss structure; it is not claimed as a new bosonic constant.

## Positional uncertainty and message counting

**A. Diebra, D. González-Lociga, M. Hillery, J. Calsamiglia, E. Bagan, [Quantum-Enhanced Zero-Error Communication and Storage under Positional Uncertainty](https://arxiv.org/abs/2605.28945), arXiv:2605.28945v1 (27 May 2026).**

This is the closest physical framing. It counts **zero-error classical messages encoded into quantum states** under permutation uncertainty, with variants for unaffected ancillas and dense coding. It does not compute the coherent quantum capacity under independent local noise. Its zero-error message count must not be identified with $`Q`$ or $`Q_2`$ in this repository.

## Symmetric depolarization and Gaussian limits

**R. G. Ahmed, S. Bhalerao, S. Lee, F. Leditzky, D. Leung, L. Schaeffer, G. Smith, [A depolarizing choir sings in Gaussian harmony](https://arxiv.org/abs/2609.39747), arXiv:2609.39747v2 (October 2026).**

This work studies depolarization on permutation-symmetric **input codes** and its fixed-excitation-cutoff Gaussian limit, with improved lower bounds for ordinary depolarizing-channel quantum capacity. Its restriction to a symmetric input code is different from physically scrambling every input and proving an all-encoder converse. Our replacement-noise theorem does not imply the exact depolarizing capacity or extend the Gaussian limit beyond its cutoff.

## Permutation-invariant input marginals

**Z. Baghali Khanian, D. Leung, G. Smith, [From Permutation Symmetry to Communication Bounds and Additivity](https://arxiv.org/abs/2610.02176), arXiv:2610.02176 (October 2026).**

This paper bounds coherent information and related quantities for permutation-invariant inputs to memoryless channels. An invariant input marginal and a **physical permutation twirl on the transmitted register alone** have different reference correlations and channel environments. The former does not immediately imply the all-encoding constant ceiling for the latter. Both works use symmetry but solve different operational tasks.

## Symmetric loss, cloning, and finite de Finetti bounds

**G. Chiribella, [On quantum estimation, quantum cloning and finite quantum de Finetti theorems](https://arxiv.org/abs/1010.1875), arXiv:1010.1875v4.**

Symmetric partial trace, coherent-state measure/prepare approximations, cloning, and finite de Finetti bounds predate this project. The CP-order inequality in our proof is attributed to the symmetric-sector literature rather than presented as a new de Finetti theorem. Approximation estimates for symmetric input families do not alone give the exact all-sector physical-channel capacity.

## Replacement fractions and contraction coefficients

**I. George, C. Hirche, T. Nuradha, M. M. Wilde, [Quantum Doeblin Coefficients: Interpretations and Applications](https://doi.org/10.22331/q-2026-05-22-2115), Quantum 10, 2115 (2026); [arXiv:2503.22823v3](https://arxiv.org/abs/2503.22823).**

Positive replacer components and their optimization are related to known quantum Doeblin coefficients. This project does not claim to invent the decomposition or its computability. The new bound combines that component with a physical positional twirl and an all-spin-sector CP comparison.

## What survives the comparison

The new physical-channel contribution is the reference-stable reduction of every qubit spin sector to a symmetric input plus locally generated singlet padding, followed by (i) exact finite-$`n`$ flagged-erasure capacities for arbitrary encoders, (ii) a size-independent quantum ceiling and adaptive fidelity bound for general independent replacement-component noise, and (iii) a constructive classical-growth contrast.

The symmetric-loss Choi spectra, sector entanglement, reverse hashing, covariant simulation, and local replacement decompositions are explicitly credited. A short proof after those ingredients are supplied is not itself evidence against a consequential physical result, but priority and significance remain subject to independent expert evaluation.

See [bibliographic records](references.bib) and [proof routes](../science/README.md).
