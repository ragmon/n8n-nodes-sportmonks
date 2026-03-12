# Screenshots for SportMonks n8n Node

Screenshot files for the main [README.md](../../README.md), LinkedIn, and other docs.

## Current screenshots

| File | Description | Use in |
|------|-------------|--------|
| `01-workflow-league-season-demo.png` | League & Season demo workflow (free tier): Manual Trigger → League (Get All, Get by ID, Search) and Season (Get All, Search, Get by ID) with sticky notes | README, LinkedIn |
| `02-workflow-full-feature-demo.png` | Full feature demo workflow canvas: Livescores, Fixtures, Teams, Players, Leagues, Standings & Seasons, Error Demo → Output Summary | README, LinkedIn |
| `03-node-livescores-execution.png` | Get Inplay Livescores node: Parameters (Resource, Operation, Include, Page) and OUTPUT (e.g. subscription/rate limit or “No results” on free plan) | README, docs |
| `04-node-details-actions.png` | Node details view: SportMonks Football — description, Installed, Via npm / ragmon, Actions (28) list (Livescores, Fixture, Team, …) | README, LinkedIn |

These are the screenshots available for now. The main README references them in the **Example Workflows → Screenshots** section.

## Optional future screenshots

If you add more later, you can use names like:

| Filename | What to capture | Use in |
|----------|-----------------|--------|
| `05-credentials-sportmonks.png` | Credentials list or SportMonks API credential form (blur token if visible) | Docs only |
| `06-community-nodes-install.png` | Settings → Community Nodes with `n8n-nodes-sportmonks` in the install field or list | LinkedIn, email |

## Notes

- Use PNG or JPG. Keep file size reasonable (< 2 MB per image) for email and LinkedIn.
- If no live matches when testing, the livescore node may return “No results” — that’s fine; the screenshot still shows the node and workflow.
- For README: reference with  
  `![Description](docs/screenshots/01-workflow-league-season-demo.png)`
