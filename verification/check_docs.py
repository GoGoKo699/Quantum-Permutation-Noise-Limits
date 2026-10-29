"""Check the shared learning map, source routes and GitHub math delimiters.

Run from the repository root: python verification/check_docs.py
This is a source-integrity check, not a substitute for inspecting hosted rendering.
"""
from __future__ import annotations

import re
import subprocess
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
milestones = (ROOT / "learning/MILESTONES.md").read_text(encoding="utf-8")
bridge = (ROOT / "learning/WATROUS_BRIDGE.md").read_text(encoding="utf-8")
readme = (ROOT / "README.md").read_text(encoding="utf-8")
llms = (ROOT / "llms.txt").read_text(encoding="utf-8")
ids = re.findall(r"^### (M\d{2}) — ", milestones, flags=re.M)
assert ids == [f"M{i:02d}" for i in range(1, 31)], f"Milestone IDs: {ids}"
bg = milestones.split("## Background/preliminaries", 1)[1].split("## Narrative/innovation", 1)[0]
nv = milestones.split("## Narrative/innovation", 1)[1].split("## Completion boundary", 1)[0]
assert len(re.findall(r"^### M\d{2} — ", bg, flags=re.M)) == 12
assert len(re.findall(r"^### M\d{2} — ", nv, flags=re.M)) == 18
for part in re.split(r"(?=^### M\d{2} — )", milestones, flags=re.M)[1:]:
    for field in ("Central question", "Understanding target", "Dependencies",
                  "Story role and conceptual connection", "Anchor source",
                  "Canonical scientific account", "Phase"):
        assert f"**{field}:**" in part, (part[:20], field)
assert "John Watrous" in bridge and "2018" in bridge
assert "John Watrous" in readme and "learning/MILESTONES.md" in readme
assert "learning/WATROUS_BRIDGE.md" in llms
assert "Coaching guide" not in milestones and "Revise → Learn → Test" not in milestones
md_files = [ROOT / name for name in subprocess.check_output(
    ["git", "ls-files", "*.md"], cwd=ROOT, text=True
).splitlines()]
count = 0
for file in md_files:
    body = file.read_text(encoding="utf-8")
    for raw in re.findall(r"\[[^\]]+\]\(([^)]+)\)", body):
        if raw.startswith(("https://", "http://", "mailto:")) or raw.startswith("#"):
            continue
        dest = unquote(raw.split("#", 1)[0])
        if not dest:
            continue
        target = (file.parent / dest).resolve()
        assert target.is_relative_to(ROOT), (file, dest)
        assert target.is_file(), (file.relative_to(ROOT), dest)
        count += 1
    # Render multiline equations as math fences (GitHub's documented syntax).
    assert not re.search(r"(?m)^\s*\$\$\s*$", body), f"Obsolete double-dollar block: {file}"
    assert not re.search(r"\\tag\s*\{", body), f"Raw TeX equation tag: {file}"
    assert not re.search(r"(?m)^\s*\$\s*$", body), f"Single-dollar display delimiter: {file}"
    assert len(re.findall(r"(?m)^```math$", body)) == len(re.findall(r"(?m)^```$", body)), f"Unpaired math fence: {file}"

print(f"PASS: 30 milestones (12+18), Watrous bridge, {count} internal Markdown links, MathJax-compatible fenced displays")
