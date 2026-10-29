"""Finite checks for symmetric-loss CP comparison and permutation-noise rates.

Usage: python verification/checks.py [--max-spin 16] [--output path.json]
Requires numpy; see verification/requirements.txt. These checks do not prove
all-size inequalities or certify operational capacity theorems.
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import numpy as np


def choose(n: int, k: int) -> int:
    return math.comb(n, k) if 0 <= k <= n else 0


def loss_choi(m: int, k: int) -> np.ndarray:
    """Unnormalized Choi matrix of Sym^m -> Sym^k partial trace."""
    out = np.zeros(((m + 1) * (k + 1),) * 2, dtype=float)
    for lost_excitation in range(m - k + 1):
        kraus = np.zeros((k + 1, m + 1), dtype=float)
        for r in range(m + 1):
            s = r - lost_excitation
            if 0 <= s <= k:
                kraus[s, r] = math.sqrt(
                    choose(k, s) * choose(m - k, lost_excitation) / choose(m, r)
                )
        vector = kraus.T.reshape(-1)
        out += np.outer(vector, vector)
    return out


def eb_choi(m: int, k: int) -> np.ndarray:
    """Unnormalized Choi matrix of coherent-state measure/prepare map."""
    out = np.zeros(((m + 1) * (k + 1),) * 2, dtype=float)
    for r in range(m + 1):
        for s in range(k + 1):
            for rp in range(m + 1):
                sp = s - r + rp
                if 0 <= sp <= k:
                    t = (r + rp + s + sp) // 2
                    coeff = (m + 1) * math.sqrt(
                        choose(m, r) * choose(m, rp) * choose(k, s) * choose(k, sp)
                    )
                    coeff *= math.exp(
                        math.lgamma(t + 1)
                        + math.lgamma(m + k - t + 1)
                        - math.lgamma(m + k + 2)
                    )
                    out[r * (k + 1) + s, rp * (k + 1) + sp] = coeff
    return out


def binomial_probs(n: int, q: float) -> list[float]:
    if q == 0:
        return [1.0] + [0.0] * n
    if q == 1:
        return [0.0] * n + [1.0]
    a = math.log(q)
    b = math.log1p(-q)
    return [math.exp(math.lgamma(n + 1) - math.lgamma(l + 1)
                     - math.lgamma(n - l + 1) + l * a + (n - l) * b)
            for l in range(n + 1)]


def rates(n: int, q: float) -> tuple[float, float, float]:
    probs = binomial_probs(n, q)
    f = math.log2(n + 1) - sum(p * math.log2(l + 1) for l, p in enumerate(probs))
    g = sum(p * math.log2((n - l + 1) / (l + 1)) for l, p in enumerate(probs))
    k = n + 1.0 if q == 0 else -math.expm1((n + 1) * math.log1p(-q)) / q if q < 1 else 1.0
    return f, max(0.0, g) if q <= 0.5 else 0.0, math.log2(k)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--max-spin', type=int, default=16)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    if not 1 <= args.max_spin <= 24:
        raise SystemExit('--max-spin must lie between 1 and 24')

    min_residual = float('inf')
    max_tp_error = 0.0
    max_spectrum_error = 0.0
    cp_cases = 0
    for m in range(1, args.max_spin + 1):
        for k in range(m + 1):
            l = m - k
            loss = loss_choi(m, k)
            eb = eb_choi(m, k)
            factor = (m + 1) / (l + 1)
            min_residual = min(min_residual, float(np.linalg.eigvalsh(factor * eb - loss)[0]))
            eb_tp = np.trace(eb.reshape(m + 1, k + 1, m + 1, k + 1), axis1=1, axis2=3)
            max_tp_error = max(max_tp_error, float(np.max(np.abs(eb_tp - np.eye(m + 1)))))
            spectrum = np.linalg.eigvalsh(loss / (m + 1))
            expected = np.array([0.] * (len(spectrum) - l - 1) + [1. / (l + 1)] * (l + 1))
            max_spectrum_error = max(max_spectrum_error, float(np.max(np.abs(spectrum - expected))))
            cp_cases += 1
    assert min_residual >= -1e-10, min_residual
    assert max_tp_error <= 1e-10, max_tp_error
    assert max_spectrum_error <= 1e-10, max_spectrum_error

    max_binomial_error = 0.0
    for n in (1, 2, 5, 10, 50, 100, 500):
        for q in (0.001, 0.01, 0.1, 0.5, 1.0):
            p = binomial_probs(n, q)
            observed = sum(v * (n + 1) / (l + 1) for l, v in enumerate(p))
            target = 1.0 if q == 1 else -math.expm1((n + 1) * math.log1p(-q)) / q
            max_binomial_error = max(max_binomial_error, abs(observed - target))
    assert max_binomial_error <= 1e-8, max_binomial_error

    rate_cases = 0
    max_jensen_error = 0.0
    for q in (0.0, 0.01, 0.1, 0.2, 0.5, 0.8, 1.0):
        last_f = -1e-10
        last_g = -1e-10
        for n in range(1, 101):
            f, g, logk = rates(n, q)
            max_jensen_error = max(max_jensen_error, f - logk)
            assert f >= last_f - 1e-10, (n, q, f, last_f)
            if q <= 0.5:
                assert g >= last_g - 1e-10, (n, q, g, last_g)
            assert f <= logk + 1e-10, (n, q, f, logk)
            assert g <= f + 1e-10, (n, q, f, g)
            last_f, last_g = f, g
            rate_cases += 1
    assert abs(rates(1, 0.2)[1] - 0.6) < 1e-12
    assert abs(rates(8, 0)[0] - math.log2(9)) < 1e-12
    assert abs(rates(8, 1)[0]) < 1e-12
    for q in (0.05, 0.2, 0.5, 0.8):
        assert abs(rates(1000, q)[0] + math.log2(q)) < 0.08

    examples = []
    for n in (1, 10, 100, 1000):
        for q in (0.05, 0.2, 0.5):
            f, g, logk = rates(n, q)
            examples.append({'n': n, 'q': q, 'Q2_erasure': round(f, 8),
                             'Q_erasure': round(g, 8), 'log2_K': round(logk, 8)})
    result = {'scope': 'Finite numerical checks; not a proof of capacity or universal CP order.',
              'cp_cases': cp_cases, 'max_spin': args.max_spin,
              'min_cp_residual_eigenvalue': min_residual,
              'max_eb_trace_preservation_error': max_tp_error,
              'max_choi_spectrum_error': max_spectrum_error,
              'binomial_cases': 35, 'max_binomial_identity_error': max_binomial_error,
              'rate_cases': rate_cases, 'max_jensen_violation': max_jensen_error,
              'examples': examples}
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
