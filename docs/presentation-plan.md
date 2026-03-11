# Presentation Plan — SportMonks n8n Node

## Audience
SportMonks team / developer relations / product management

## Goal
Demonstrate a working n8n integration that makes SportMonks API data accessible to non-developers, and position the node as a marketing asset for SportMonks.

---

## 1. The Problem (1 minute)

> "SportMonks has a powerful API. But most potential users — sports journalists, fantasy football managers, small betting tools — don't write code. They lose before they even start."

- API docs exist but require developer knowledge
- No native integration for the most popular low-code platforms
- Competitors may already have n8n nodes or Zapier integrations

---

## 2. The Solution (2 minutes)

**`n8n-nodes-sportmonks`** — a community node that puts the SportMonks API inside n8n's visual workflow builder.

> "Install one npm package. No code. Your users drag and drop football data into any workflow."

Show: searching for "SportMonks Football" in the n8n node panel → immediately usable.

---

## 3. Live Demo (5 minutes)

### Demo flow: Live Football Dashboard

1. **Schedule Trigger** fires every 30 seconds
2. **Get Inplay Livescores** node (with participants, scores, events, league.country, round included)
3. **Filter** node removes empty results (no games right now)
4. **Code** node formats into: `Ajax 2 - 1 NAC Breda | 63' | Eredivisie`
5. **Aggregate** + **Build Report** produces a grouped summary by league

**Show in the demo:**
- The Include selector — one request, rich nested data
- Error handling — what happens with a 403 (plan restriction) — friendly message
- Continue on Fail — workflow keeps running even if one node fails

---

## 4. What's Available (2 minutes)

| Resource | Example use case |
|---|---|
| Live scores | Real-time match tracker |
| Fixtures | Upcoming match schedule |
| Head-to-head | Pre-match comparison widget |
| Standings | League table dashboard |
| Teams + Players | Fantasy football player info |
| Leagues | Multi-league monitoring |

All with the **Include** selector — attach related data without extra API calls.

---

## 5. Technical Quality (1 minute)

- TypeScript, strict mode
- Published to **npm** — installable by any n8n user with one click
- **GitHub Actions CI/CD** — automatic npm publish on GitHub release tag
- MIT licence — community-friendly
- Full README, CONTRIBUTING, CHANGELOG

---

## 6. Potential Value for SportMonks (2 minutes)

1. **Lead generation** — Every n8n user who discovers this node is a potential SportMonks subscriber
2. **No-code market** — n8n has 100k+ active self-hosted instances; Zapier has millions of users
3. **Developer experience** — Shows your API is easy to integrate; reduces time-to-first-value for new customers
4. **Community credibility** — Open-source node is searchable on GitHub and npm; organic SEO

**Suggested follow-up actions for SportMonks:**
- Link to the node from developer documentation
- Feature it in a blog post: "Automate Football Data with n8n and SportMonks"
- Provide a test API key with expanded access for the community node developer
- Consider an official n8n integration (n8n has a partner program for this)

---

## 7. Roadmap / What Could Be Extended (1 minute)

With access to premium endpoints:
- Odds (pre-match + inplay)
- Predictions & Value Bets
- Expected Goals (xG)
- Transfer news
- Post-match news

---

## 8. Q&A

Potential questions to prepare for:
- "Why n8n and not Zapier?" → n8n is open-source, self-hosted, growing fast; no per-action pricing
- "How do we list it officially?" → n8n community node registry + docs link
- "Can we co-brand it?" → Yes, open to collaboration
- "What about the free plan limitations?" → Node handles 403 gracefully with an upgrade prompt

---

## Supporting Materials

- GitHub: https://github.com/ragmon/n8n-nodes-sportmonks
- npm: https://www.npmjs.com/package/n8n-nodes-sportmonks
- n8n community nodes docs: https://docs.n8n.io/integrations/community-nodes/
- SportMonks docs: https://docs.sportmonks.com/v3
