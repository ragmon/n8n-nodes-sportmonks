# Contributing

Thank you for your interest in contributing to `n8n-nodes-sportmonks`!

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/n8n-nodes-sportmonks.git
   cd n8n-nodes-sportmonks
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your change:
   ```bash
   git checkout -b feat/my-feature
   ```

## Development

```bash
npm run dev    # TypeScript watch mode
npm run lint   # type check
npm run build  # full build
```

## Submitting a Pull Request

- Keep PRs focused — one feature or fix per PR.
- Include a clear description of what changed and why.
- Update `CHANGELOG.md` under `[Unreleased]`.
- Ensure `npm run lint` passes with no errors.

## Reporting Issues

Please open an issue on GitHub with:
- Your n8n version
- Node version
- Steps to reproduce
- Expected vs actual behaviour

## Code Style

- TypeScript strict mode is enabled.
- Format with Prettier (`npm run format`).
- Follow the existing patterns in `src/nodes/SportMonks/SportMonks.node.ts`.
