# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-03-12

### Added
- **League & Season demo workflow** (`workflows/demo-league-season.json`) — free-tier demo for League and Season resources
- **Screenshots** in `docs/screenshots/` and Screenshots section in README (workflow canvases, node config, node details)

### Changed
- README: Example Workflows table includes `demo-league-season.json` and new Screenshots subsection
- `docs/screenshots/README.md` updated to describe current screenshots and optional future ones

## [0.1.0] - 2026-03-11

### Added
- Initial release
- **Livescores** resource: Get Inplay, Get All Today, Get Latest Updated
- **Fixture** resource: Get by ID, Get by Date, Get by Date Range, Get by Date Range for Team, Head to Head, Latest Updated, Search by Name
- **Team** resource: Get by ID, Get by Season, Get by Country, Search by Name
- **Player** resource: Get by ID, Get by Country, Search by Name
- **League** resource: Get All, Get by ID, Get by Country, Get Live, Search by Name
- **Standing** resource: Get by Season ID, Get Live by League ID
- **Season** resource: Get All, Get by ID, Get by Team, Search by Name
- Include selector for all resources (participants, scores, events, periods, league, round, venue, statistics…)
- Pagination support
- Friendly error messages for HTTP 401, 403, 429, 500
- Continue On Fail support
- MIT License
