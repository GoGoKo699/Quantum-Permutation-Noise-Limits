# Related work and attribution

The comparison concerns the **operational model and theorem**, not whether another work uses the words permutation, loss, or symmetry. This review identifies the closest inspected sources for the ordinary result as of 29 October 2026 and the finite-deformation extension as of 3 November 2026; it is not an exhaustive priority certificate.

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

## Finite real-deformation sister theorem

**[Quantum Group Memory Laws](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws)** supplies the full ordinary-physical-trace conditional expectation onto the real-deformation symmetry algebra and its local stationary realization. Its spatial autocorrelation laws concern overlap with conserved operators; they are not quantum-capacity estimates. The shared [finite-deformation account](../science/finite_deformation_erasure.md) uses that physical projection as a channel, computes reference-stable local-loss maps, and establishes a size-independent two-way ceiling by a first-erased-CG-mismatch posterior bound. The sister owns the [full probability proof](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws/blob/6b592787b784214bec25214c72aee2c5d43991af/science/first_mismatch.md) and [direct full-channel consequence](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws/blob/6b592787b784214bec25214c72aee2c5d43991af/science/capacity.md); this repository retains the ordinary exact theorem and operational comparison. The new theorem is counted once across those accounts.

**David Raveh and Rafael I. Nepomechie, [q-analog qudit Dicke states](https://arxiv.org/abs/2308.08392v2), arXiv:2308.08392v2; Journal of Physics A 57, 065302 (2024).** Sections 3–4 and Appendix B provide weighted-inversion amplitudes, recursion and contiguous-bipartition Schmidt geometry. These are established finite-deformation state tools. They do not bound arbitrary erased subsets and every multiplicity path in the full physical projection.

**Masahiro Takeoka, Saikat Guha and Mark M. Wilde, [The squashed entanglement of a quantum channel](https://arxiv.org/abs/1310.0129v3), IEEE Transactions on Information Theory 60, 4987–4998 (2014).** Definition 1, Theorem 7 and Theorem 9 supply channel squashed entanglement, its operational properties and the upper bound on two-way quantum capacity under adaptive LOCC. The new model-specific ingredient is a uniform posterior-entropy bound from the lost physical spins, followed by an explicit squashing map for the complete sector/multiplicity environment. The general entanglement-measure/capacity theorem is inherited.

The ordinary symmetric-loss formula is not carried over by changing notation: already at two spins its conditional Choi spectrum changes and an achievable deformed full-block rate exceeds the exact ordinary rate. Equal global algebra dimensions, a different inner product, or an infinite-deformation generator limit do not establish a physical local-loss equivalence. The finite-deformation theorem gives bounded scaling and a positive lower bound, not the sharp ceiling or exact deformed capacities.

## What survives the comparison

The new physical-channel contribution is the reference-stable reduction of every qubit spin sector to a symmetric input plus locally generated singlet padding, followed by (i) exact finite-$`n`$ flagged-erasure capacities for arbitrary encoders, (ii) a size-independent quantum ceiling and adaptive fidelity bound for general independent replacement-component noise, and (iii) a constructive classical-growth contrast.

The symmetric-loss Choi spectra, sector entanglement, reverse hashing, covariant simulation, and local replacement decompositions are explicitly credited. The sister extension adds a different all-sector physical-erasure converse for fixed finite deformation, while preserving those original ownership boundaries. Priority, correctness and significance remain subject to independent expert evaluation.

See [bibliographic records](references.bib) and [proof routes](../science/README.md).
