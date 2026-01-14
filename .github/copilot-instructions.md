<!-- GitHub Copilot instructions for AI coding agents in this repository -->
# Copilot instructions — Alaska Batteries Website

Purpose
- Help an AI coding agent become immediately productive in this repository.

What I found
- The repository currently only contains a short project README at [README.md](README.md).
- No source files, build scripts, package manifests, or CI workflows were detected.

How to proceed (high-value first steps)
- Ask the user before adding or assuming a framework (React/Next/Vue/static HTML). Example: "Do you want a static HTML site, a React app, or a Next.js site for `alaska-batteries-website`?"
- If the user approves scaffolding, create a minimal scaffold and include a `README.md` section describing how to build/run it.
- When editing, prefer small, reversible changes (add new files rather than refactor existing ones) and explain choices in the PR description.

Repository-specific cues
- Repo name is `alaska-batteries-website` (see [README.md](README.md)). Expect this to be a website project; do not assume a build tool without confirmation.

Files and places to check next
- Root: [README.md](README.md) — project title present only.
- Look for common web project files before changing architecture: `package.json`, `pyproject.toml`, `requirements.txt`, `src/`, `public/`, `.github/workflows/`.

Conventions and constraints
- No project conventions are discoverable in code (no lint, style, or test configs). Ask the user for preferred tooling (formatters, linters, test runner) before adding them.
- Use kebab-case for file and folder names to match the repo name style (e.g., `alaska-batteries-website`).

When to open questions instead of acting
- If any non-trivial architecture choice is required (framework, hosting, state management, backend language), prompt the user.
- If scaffolding is requested, provide a short checklist of created files and simple commands to run locally.

Example scaffolding prompt (use before generating):
"I can scaffold a minimal static site (HTML/CSS), a React app (`create-react-app`), or a Next.js site. Which do you prefer? Also list any preferred package manager (`npm`/`yarn`/`pnpm`)."

What to include in PRs
- Short summary of what was added and why.
- How to build/run locally (copyable commands).
- Any follow-up tasks or questions for the maintainer.

If you need more repository context
- Ask the maintainer for missing files or deployment targets (Netlify/Vercel/Azure/other). Don’t assume CI or hosting.

Feedback
- After creating or changing scaffolding, request explicit feedback and iterate.
