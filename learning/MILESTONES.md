# Thirty-milestone understanding map

**Single educational anchor:** John Watrous, *The Theory of Quantum Information* (2018), [source bridge](WATROUS_BRIDGE.md). **Allocation:** 12 background/preliminaries and 18 narrative/innovation milestones. These are fixed, learner-independent understanding targets, not personalized assessments or coaching instructions. Watrous supplies foundations; local project proofs supply the novel and specialized statements.

The background moves from individual channels and reference systems to the complete noisy-permutation resource model. The narrative builds the all-sector reduction, symmetric-loss comparison, exact capacities, strong converse and classical contrast, then tests what changes under the sister project's finite real-deformation physical projection. Both phases progress from local ingredients to global synthesis. The selected Watrous source is shared with [Quantum Group Memory Laws](https://github.com/GoGoKo699/Quantum-Group-Memory-Laws); the two project maps remain distinct.

## Background/preliminaries (M01–M12)

### M01 — One use and its cost

- **Central question:** What counts as one channel use and one communication rate?
- **Understanding target:** Differentiate n carriers, one block and t independent uses.
- **Dependencies:** —.
- **Story role and conceptual connection:** Define the complete resource ledger.
- **Anchor source:** Watrous §§2.1, 8.2.1 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/model.md](../science/model.md).
- **Phase:** Background/preliminaries.

### M02 — Reference-entangled channel inputs

- **Central question:** Why must the channel model retain arbitrary reference entanglement?
- **Understanding target:** Explain CPTP maps under arbitrary identity extensions.
- **Dependencies:** M01.
- **Story role and conceptual connection:** Treat a channel, not only an unreferenced state.
- **Anchor source:** Watrous §§2.1.3, 2.2.1–2.2.2 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/model.md](../science/model.md).
- **Phase:** Background/preliminaries.

### M03 — Hidden positional permutations

- **Central question:** What information does an unrecorded permutation remove?
- **Understanding target:** Define uniform twirling and contrast it with known relabeling.
- **Dependencies:** M02.
- **Story role and conceptual connection:** Identify physical loss of labels.
- **Anchor source:** Watrous §§4.1.1, 7.1 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/model.md](../science/model.md).
- **Phase:** Background/preliminaries.

### M04 — Spin and multiplicity registers

- **Central question:** Which coherent spin register survives when multiplicity is discarded?
- **Understanding target:** Separate surviving Vj from discarded Mj and sector coherences.
- **Dependencies:** M03.
- **Story role and conceptual connection:** Locate the coherent degrees of freedom.
- **Anchor source:** Watrous §7.1.2; local Schur–Weyl derivation ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/schur_reduction.md](../science/schur_reduction.md).
- **Phase:** Background/preliminaries.

### M05 — The symmetric register

- **Central question:** Why does the symmetric n-qubit register have dimension n+1?
- **Understanding target:** Count the n+1 Dicke basis states and explain encoding.
- **Dependencies:** M04.
- **Story role and conceptual connection:** Identify the largest noiseless spin sector.
- **Anchor source:** Watrous §7.1.1 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/schur_reduction.md](../science/schur_reduction.md).
- **Phase:** Background/preliminaries.

### M06 — Singlets and spin padding

- **Central question:** Why can spin-zero singlets pad an ordinary spin sector?
- **Understanding target:** Explain why total-spin-zero singlets do not change j.
- **Dependencies:** M04–M05.
- **Story role and conceptual connection:** Prepare an all-sector argument.
- **Anchor source:** Watrous §7.1; local spin-coupling derivation ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/schur_reduction.md](../science/schur_reduction.md).
- **Phase:** Background/preliminaries.

### M07 — Flagged erasure versus depolarization

- **Central question:** How do receiver-visible erasure flags change the noise task?
- **Understanding target:** Describe erasure flags and binomial loss counts.
- **Dependencies:** M01–M03.
- **Story role and conceptual connection:** Separate an informational enhancement from unflagged noise.
- **Anchor source:** Watrous §§2.2.3, 8.2.1 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/model.md](../science/model.md).
- **Phase:** Background/preliminaries.

### M08 — Choi states and purification

- **Central question:** How do Choi states make complete positivity and lost-system entropy visible?
- **Understanding target:** Relate normalized Choi states to complete positivity.
- **Dependencies:** M02,M07.
- **Story role and conceptual connection:** Make the proof reference-sensitive.
- **Anchor source:** Watrous §§2.1.3, 2.2.2 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Background/preliminaries.

### M09 — Completely positive order

- **Central question:** What does CP order guarantee under an arbitrary reference extension?
- **Understanding target:** Interpret A≼cB on arbitrary reference extensions.
- **Dependencies:** M02,M08.
- **Story role and conceptual connection:** Identify the strong-converse comparison.
- **Anchor source:** Watrous §§1.2.3, 2.2.2 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Background/preliminaries.

### M10 — Entanglement-breaking maps

- **Central question:** Why can a measure-and-prepare channel not distribute entanglement?
- **Understanding target:** Explain measure-and-prepare and separable outputs.
- **Dependencies:** M08–M09.
- **Story role and conceptual connection:** Prepare a separable comparator.
- **Anchor source:** Watrous §§6.1.1–6.1.2 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Background/preliminaries.

### M11 — Entanglement distillation and capacities

- **Central question:** Which communication and distillation resources define Q and Q2?
- **Understanding target:** Distinguish Q, Q2, LOCC and reverse hashing.
- **Dependencies:** M01,M07,M10.
- **Story role and conceptual connection:** Define operational tasks before proving rates.
- **Anchor source:** Watrous §§6.1.2, 6.2.2, 8.2.1; research extension ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/erasure_capacities.md](../science/erasure_capacities.md).
- **Phase:** Background/preliminaries.

### M12 — Synthesis of the resource model

- **Central question:** How do references, spin sectors, loss flags and block costs fit one physical model?
- **Understanding target:** Combine twirling, spin, flags, references and capacities.
- **Dependencies:** M01–M11.
- **Story role and conceptual connection:** Close background from local objects to the full task.
- **Anchor source:** Watrous §§2.2, 6.1–6.2, 7.1, 8.2 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/README.md](../science/README.md).
- **Phase:** Background/preliminaries.

## Narrative/innovation (M13–M30)

### M13 — Symmetric-spin representation of every sector

- **Central question:** How can every ordinary spin sector be represented by symmetric spins and singlets?
- **Understanding target:** Explain Vj≅Sym^(2j) and singlet padding.
- **Dependencies:** M04–M06,M12.
- **Story role and conceptual connection:** Build the all-encoder reduction.
- **Anchor source:** Watrous §7.1.2; local derivation ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/schur_reduction.md](../science/schur_reduction.md).
- **Phase:** Narrative/innovation.

### M14 — Reference-stable all-sector channel identity

- **Central question:** Why is the all-sector reduction a channel identity rather than an input promise?
- **Understanding target:** Explain CP sector instruments and fixed receiver postprocessing.
- **Dependencies:** M02,M09,M13.
- **Story role and conceptual connection:** Avoid assuming symmetric encoders.
- **Anchor source:** Watrous §§2.2.2, 7.1.2; local proof ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/schur_reduction.md](../science/schur_reduction.md).
- **Phase:** Narrative/innovation.

### M15 — Symmetric partial trace

- **Central question:** What physical channel is conditional symmetric partial trace?
- **Understanding target:** Identify L(m,k) and its environment dimension.
- **Dependencies:** M05,M07,M08.
- **Story role and conceptual connection:** Connect erasure to small representation channels.
- **Anchor source:** Watrous §§2.1.3, 7.1.1; local construction ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Narrative/innovation.

### M16 — Flat conditional Choi spectrum

- **Central question:** Why is the conditional symmetric-loss Choi spectrum flat?
- **Understanding target:** Relate the split purification to rank m−k+1 and its eigenvalues.
- **Dependencies:** M08,M15.
- **Story role and conceptual connection:** Extract the entropy of lost particles.
- **Anchor source:** Watrous §§2.1.3, 5.2; inherited symmetric-loss input ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Narrative/innovation.

### M17 — Coherent-state EB comparison

- **Central question:** How do coherent states produce a trace-preserving EB comparator?
- **Understanding target:** Construct a trace-preserving measure-and-prepare comparator.
- **Dependencies:** M09–M10,M16.
- **Story role and conceptual connection:** Build the separable benchmark.
- **Anchor source:** Watrous §§2.2.2, 6.1.2, 7.2.1 ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Narrative/innovation.

### M18 — Exact CP-order coefficient

- **Central question:** Why is the CP-order coefficient (m+1)/(lost+1)?
- **Understanding target:** Explain the support argument for (m+1)/(ℓ+1).
- **Dependencies:** M16–M17.
- **Story role and conceptual connection:** Quantify the noisy-block ceiling.
- **Anchor source:** Watrous §§1.2.3, 2.2.2; inherited inequality ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Narrative/innovation.

### M19 — Entanglement in the conditional resource

- **Central question:** Why do reverse hashing and relative entropy meet for the conditional resource?
- **Understanding target:** Connect reverse hashing and relative entropy bounds.
- **Dependencies:** M10–M11,M16–M18.
- **Story role and conceptual connection:** Match achievable and converse entanglement rates.
- **Anchor source:** Watrous §§5.2, 6.2.2; research extensions ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Narrative/innovation.

### M20 — Covariant channel simulation

- **Central question:** How does covariance turn a Choi resource into an exact channel simulation?
- **Understanding target:** Describe Bell-orbit POVMs and Choi-resource LOCC simulation.
- **Dependencies:** M08,M11,M19.
- **Story role and conceptual connection:** Handle adaptive channel uses.
- **Anchor source:** Watrous §§6.1.2, 6.3.1, 7.2.1; inherited simulation ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/symmetric_loss.md](../science/symmetric_loss.md).
- **Phase:** Narrative/innovation.

### M21 — Conditioning on the erasure flag

- **Central question:** Why can the receiver announce the loss flag without a spurious entropy cost?
- **Understanding target:** Explain why Bob can announce the loss count before distillation.
- **Dependencies:** M07,M19–M20.
- **Story role and conceptual connection:** Avoid a spurious flag entropy penalty.
- **Anchor source:** Watrous §§6.1.2, 6.2.2; local conditional protocol ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/erasure_capacities.md](../science/erasure_capacities.md).
- **Phase:** Narrative/innovation.

### M22 — Exact assisted erasure rate

- **Central question:** How does averaging the conditional resource give the exact assisted erasure rate?
- **Understanding target:** Average log2[(n+1)/(L+1)] over binomial losses.
- **Dependencies:** M19–M21.
- **Story role and conceptual connection:** Construct the symmetric-sector achievable rate.
- **Anchor source:** Watrous §§6.2.2, 8.2.1; local proof ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/erasure_capacities.md](../science/erasure_capacities.md).
- **Phase:** Narrative/innovation.

### M23 — All-encoder assisted converse

- **Central question:** Why can no other ordinary spin sector improve the assisted rate?
- **Understanding target:** Use sector instruments, REE increments and monotone f_m.
- **Dependencies:** M13–M14,M20–M22.
- **Story role and conceptual connection:** Show no other sector improves the rate.
- **Anchor source:** Watrous §§6.1–6.2, 7.1, 8.2; local proof ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/erasure_capacities.md](../science/erasure_capacities.md).
- **Phase:** Narrative/innovation.

### M24 — Unassisted capacity and degradability

- **Central question:** How does a degradable enhancement give the unassisted capacity?
- **Understanding target:** Explain direct-sum enhancement and the q=1/2 threshold.
- **Dependencies:** M11,M22–M23.
- **Story role and conceptual connection:** Derive Q without falsely asserting physical twirl degradability.
- **Anchor source:** Watrous §§5.2, 8.2.1–8.2.2; research extension ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/erasure_capacities.md](../science/erasure_capacities.md).
- **Phase:** Narrative/innovation.

### M25 — Replacement noise and its normalized EB comparator

- **Central question:** How do erasure flags and a tilted mixture bound unflagged noise?
- **Understanding target:** Explain the erasure enhancement, derive K_m, and keep the EB comparator trace preserving.
- **Dependencies:** M07,M23–M24.
- **Story role and conceptual connection:** Combine the local replacer component and conditional CP coefficients into a complete-block comparison, without claiming equality.
- **Anchor source:** Watrous §§2.2.1–2.2.3, 6.1.2, 8.2.1; local proof ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/replacement_noise.md](../science/replacement_noise.md).
- **Phase:** Narrative/innovation.

### M26 — Adaptive fidelity strong converse

- **Central question:** Why does one CP comparison remain useful through arbitrary adaptive calls?
- **Understanding target:** Combine t CP-order replacements with separable fidelity at most 1/D; distinguish the strong-converse threshold log2 K_n from the tighter capacity f_n.
- **Dependencies:** M09–M10,M20,M25.
- **Story role and conceptual connection:** Lift the single-block comparator to a statement covering feedback and unconditional success-weighted fidelity.
- **Anchor source:** Watrous §§2.2.2, 3.2, 6.1; local theorem ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [science/replacement_noise.md](../science/replacement_noise.md).
- **Phase:** Narrative/innovation.

### M27 — Scaling, crossover and classical communication

- **Central question:** Which physical limits allow growth, and why can classical bits grow while coherent qubits saturate?
- **Understanding target:** Contrast fixed noise and p=c/n, explain the Poisson crossover, and connect Bloch-grid tomography and effective-dimension compression to classical growth.
- **Dependencies:** M03,M05,M22–M26.
- **Story role and conceptual connection:** Interpret the ordinary theorems as different communication tasks and different orders of limits.
- **Anchor source:** Watrous §§3.1, 5.3.3, 7.1, 8.1–8.2; local asymptotics and code ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [Erasure crossover](../science/erasure_capacities.md), [classical contrast](../science/classical_contrast.md).
- **Phase:** Narrative/innovation.

### M28 — The physical embedding changes local loss

- **Central question:** Why does an unchanged global algebra dimension fail to determine physical loss?
- **Understanding target:** Write the mixed-multiplicity finite-r conditional Kraus map, explain the two-spin Choi-spectrum change and R2>f2, and recognize the three-spin end/middle difference.
- **Dependencies:** M02,M04,M08,M14,M19,M22.
- **Story role and conceptual connection:** Test the ordinary reduction at the sister project's changed physical embedding rather than transferring it by an abstract algebra isomorphism.
- **Anchor source:** Watrous §§2.2.2, 5.2, 7.1.2; supplied CG maps and reverse hashing ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [Exact deformed loss maps and rates](../science/finite_deformation_erasure.md#2-exact-conditional-physical-loss-maps).
- **Phase:** Narrative/innovation.

### M29 — A bounded posterior yields an all-sector ceiling

- **Central question:** How do lost physical spins constrain every reference-entangled input?
- **Understanding target:** Explain the net CG mismatch identity, first-observed-event exposure estimate, prior-uniform posterior entropy, and rank-one squashing of the full sector/multiplicity environment.
- **Dependencies:** M02,M04,M07–M08,M11,M28.
- **Story role and conceptual connection:** Connect a classical observation bound to a reference-stable channel squashed-entanglement ceiling through the inherited adaptive-capacity theorem.
- **Anchor source:** Watrous §§2.1.3, 2.2.2, 5.1–5.2, 6.1–6.2; research-level squashed-entanglement input ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [Uniform all-sector ceiling](../science/finite_deformation_erasure.md#3-a-uniform-all-sector-ceiling), with the pinned sister proof linked there.
- **Phase:** Narrative/innovation.

### M30 — Final synthesis and scientific boundaries

- **Central question:** What survives deformation, and what must still be supplied for an implementation?
- **Understanding target:** Combine the positive amplitude-damping/reverse-hashing lower bound and finite-r ceiling; distinguish unchanged bounded scaling, changed finite-block rates, undetermined sharp capacities and the separate finite-time mixing account.
- **Dependencies:** M13–M29.
- **Story role and conceptual connection:** Close the ordinary and deformed communication story without treating local autocorrelation, global algebra dimension or a singular generator limit as a capacity theorem.
- **Anchor source:** Watrous §§6–8; local proofs and literature ([bridge](WATROUS_BRIDGE.md)).
- **Canonical scientific account:** [Ordinary interpretation](../science/interpretation.md), [deformed lower bound and limits](../science/finite_deformation_erasure.md).
- **Phase:** Narrative/innovation.

## Completion boundary

The map covers the conceptual story, not every technical lemma. Formal statements, assumptions, proof dependencies and verification remain in [science](../science/README.md). Personal teaching/assessment instructions and learner records do not belong in this repository.
