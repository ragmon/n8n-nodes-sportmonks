# LinkedIn Post

---

🚀 Excited to share my latest open-source project!

I just published **`n8n-nodes-sportmonks`** — a community node for [n8n](https://n8n.io) that connects directly to the **SportMonks Football API v3**.

⚽ What it does:
→ Fetch live in-play scores with real-time goals, cards, substitutions
→ Query fixtures by date, date range, or head-to-head
→ Retrieve team & player data, league standings, and season schedules
→ Supports nested includes (participants, scores, events, league + country, rounds) in a single API call
→ Built-in error handling for API limits and subscription restrictions
→ Works on any self-hosted n8n instance — no code required

🔧 Tech stack: TypeScript · n8n Workflow Automation · SportMonks REST API v3

📦 Install directly from npm in n8n Settings → Community Nodes:
`n8n-nodes-sportmonks`

📖 GitHub: https://github.com/ragmon/n8n-nodes-sportmonks

This was a self-chosen assignment to explore building n8n community nodes end-to-end — from design to TypeScript implementation, packaging, CI/CD with GitHub Actions, and public npm publishing.

If you're building sports analytics, fantasy football automation, or betting platform workflows on n8n — give it a try and let me know what you think!

#n8n #WorkflowAutomation #OpenSource #Football #TypeScript #SportMonks #NodeDevelopment #BackendDevelopment

---

# Email to SportMonks

**Subject:** Community n8n Node for SportMonks API v3 — Published on npm

Hi SportMonks Team,

My name is Arthur Rahimov, a backend and AI developer based in the Netherlands.

I recently built and published an open-source **n8n community node** that integrates your Football API v3 directly into the n8n workflow automation platform:

📦 **npm:** https://www.npmjs.com/package/n8n-nodes-sportmonks
💻 **GitHub:** https://github.com/ragmon/n8n-nodes-sportmonks

**What the node covers:**
- Live scores (inplay, all today, latest updated)
- Fixtures (by ID, date, date range, H2H, search)
- Teams, Players, Leagues, Standings, Seasons
- Full Include selector (participants, scores, events, periods, league, round…)
- Proper error handling for 401/403/429/500 with user-friendly messages

**Why this matters for SportMonks:**
n8n has hundreds of thousands of users building automation workflows. A native community node makes it trivially easy for non-developers to use your API without writing a line of code — expanding your potential user base significantly.

I built this as a technical self-assignment to test the depth of your API and explore what's possible with your data. The free plan is enough to explore fixtures, teams, and standings; the live scores and odds really showcase the premium value.

A few ideas for potential collaboration:
1. Listing the node in your documentation / developer resources
2. Featuring it in a blog post about no-code / low-code integrations
3. Feedback on the API developer experience from a community node builder's perspective

I'd be happy to extend the node with additional endpoints (odds, predictions, xG) if there's interest.

Looking forward to hearing your thoughts!

Best regards,
Arthur Rahimov
https://ragmon.nl | https://github.com/ragmon
