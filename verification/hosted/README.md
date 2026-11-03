# Actual GitHub mathematics

The read-only collector visits commit-pinned public GitHub pages at widths 1440 and 760. It compares every recognized source expression with actual hosted MathML, preserves structural child positions, checks display geometry, and saves HTML and screenshots for separate visual review.

Install `playwright@1.56.1` and `mathjax-full@3.2.1` outside the source tree, install Chromium, then run:

```sh
node verification/hosted/capture_hosted_math.cjs --root . --repository GoGoKo699/Quantum-Permutation-Noise-Limits --revision FULL_COMMIT_SHA --output hosted-math-audit --page README.md
```

Repeat `--page` to cover all active science, learning, reference and verification pages. The workflow records its full page inventory. Use a new empty output directory for every attempt.

The report binds source hashes, actual hosted expressions, both viewports and capture artifacts. Automated comparison does not establish the scientific proof or replace reading the screenshots. Browser access is anonymous; the workflow requests only `contents: read` and uses no credentials in the checked-out source.
