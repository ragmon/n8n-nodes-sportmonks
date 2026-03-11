# Adding this node to the n8n community

## 1. Publish to npm (required first)

Your package must be on the npm registry before n8n can list or verify it.

### Option A — Publish via GitHub Actions (recommended)

1. Create a **GitHub Release** with a tag that matches `package.json` version:
   - Current version: `0.1.0` → tag **`v0.1.0`** (with or without the `v`).
2. In the repo: **Releases → Create a new release**.
3. Choose tag **v0.1.0**, publish the release.
4. The **Publish to npm** workflow will run and publish `n8n-nodes-sportmonks@0.1.0` to npm (using the `NPM_TOKEN` secret).

### Option B — Publish manually

```bash
cd /path/to/n8n-nodes-sportmonks
npm login
npm publish --access public
```

---

## 2. Community discovery (automatic)

Once the package is on npm with:

- **Name** starting with `n8n-nodes-` (e.g. `n8n-nodes-sportmonks`) ✓  
- **Keywords** including `n8n-community-node-package` ✓  
- **package.json** `n8n` block with `credentials` and `nodes` ✓  

users can already install it in n8n:

- **Settings → Community Nodes → Install** → enter `n8n-nodes-sportmonks`.

No extra “registration” is needed for this. The node is part of the community as soon as it’s on npm.

---

## 3. Submit for verification (optional, “verified” badge)

Verified nodes appear in the **Nodes** panel in n8n and get a verified badge.

1. **Publish to npm** (step 1 above).
2. **n8n Creator Portal**: sign up or log in at  
   **https://creators.n8n.io/nodes**
3. **Submit your node** there (npm package name: `n8n-nodes-sportmonks`).
4. n8n will review it against:
   - [Verification guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/)
   - [UX guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/ux-guidelines/)
   - No runtime dependencies (only `n8n-workflow` as peer)
   - Documentation (README on npm/GitHub)
   - From **May 1, 2026**: publish via GitHub Action with [provenance](https://docs.npmjs.com/generating-provenance-statements) (your `publish.yml` already uses `--provenance`).

If approved, the node will be listed as verified and discoverable in the Nodes panel.

---

## References

- [Submit community nodes (n8n docs)](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/)
- [Verification guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/)
- [n8n Creator Portal](https://creators.n8n.io/nodes)
