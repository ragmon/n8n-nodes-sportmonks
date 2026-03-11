import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IHttpRequestOptions,
} from "n8n-workflow";
import { NodeConnectionTypes, NodeOperationError } from "n8n-workflow";

const BASE_URL = "https://api.sportmonks.com/v3/football";

// ─── Shared include options per resource ────────────────────────────────────

const LIVESCORE_INCLUDES = [
  { name: "Participants (Teams)", value: "participants" },
  { name: "Scores", value: "scores" },
  { name: "Events (Goals, Cards, Subs)", value: "events" },
  { name: "Periods (Halves)", value: "periods" },
  { name: "League", value: "league" },
  { name: "League + Country", value: "league.country" },
  { name: "Round", value: "round" },
  { name: "State", value: "state" },
  { name: "Venue", value: "venue" },
];

const FIXTURE_INCLUDES = [
  { name: "Participants (Teams)", value: "participants" },
  { name: "Scores", value: "scores" },
  { name: "Events (Goals, Cards, Subs)", value: "events" },
  { name: "Periods (Halves)", value: "periods" },
  { name: "League", value: "league" },
  { name: "League + Country", value: "league.country" },
  { name: "Round", value: "round" },
  { name: "State", value: "state" },
  { name: "Venue", value: "venue" },
  { name: "Statistics", value: "statistics" },
  { name: "Lineups", value: "lineups" },
  { name: "Commentaries", value: "comments" },
];

const TEAM_INCLUDES = [
  { name: "Players / Squad", value: "squad" },
  { name: "Venue", value: "venue" },
  { name: "Upcoming Fixtures", value: "upcoming" },
  { name: "Latest Fixtures", value: "latest" },
  { name: "Statistics", value: "statistics" },
  { name: "Coaches", value: "coaches" },
  { name: "Country", value: "country" },
];

const PLAYER_INCLUDES = [
  { name: "Statistics", value: "statistics" },
  { name: "Teams", value: "teams" },
  { name: "Nationality", value: "nationality" },
  { name: "Position", value: "position" },
  { name: "Transfers", value: "transfers" },
];

const LEAGUE_INCLUDES = [
  { name: "Country", value: "country" },
  { name: "Current Season", value: "currentSeason" },
  { name: "Seasons", value: "seasons" },
  { name: "Standings", value: "standings" },
];

// ─── Shared field: includes multiselect ─────────────────────────────────────

function includeField(
  resource: string,
  includeOptions: Array<{ name: string; value: string }>
) {
  return {
    displayName: "Include",
    name: "include",
    type: "multiOptions" as const,
    options: includeOptions,
    default: [],
    description: "Related data to include in the response",
    displayOptions: { show: { resource: [resource] } },
  };
}

// ─── Node definition ─────────────────────────────────────────────────────────

export class SportMonks implements INodeType {
  description: INodeTypeDescription = {
    displayName: "SportMonks Football",
    name: "sportMonks",
    icon: "file:sportmonks.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{ $parameter["resource"] + ": " + $parameter["operation"] }}',
    description:
      "Access live scores, fixtures, teams, players and standings via the SportMonks Football API v3",
    defaults: { name: "SportMonks Football" },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: "sportMonksApi",
        required: true,
      },
    ],
    properties: [
      // ── Resource ──────────────────────────────────────────────────────────
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "Livescores", value: "livescores" },
          { name: "Fixture", value: "fixture" },
          { name: "Team", value: "team" },
          { name: "Player", value: "player" },
          { name: "League", value: "league" },
          { name: "Standing", value: "standing" },
          { name: "Season", value: "season" },
        ],
        default: "livescores",
      },

      // ── Livescores operations ─────────────────────────────────────────────
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["livescores"] } },
        options: [
          {
            name: "Get Inplay",
            value: "inplay",
            description: "Matches currently in progress",
            action: "Get inplay livescores",
          },
          {
            name: "Get All Today",
            value: "all",
            description: "All livescores for today",
            action: "Get all livescores",
          },
          {
            name: "Get Latest Updated",
            value: "latest",
            description: "Recently updated matches",
            action: "Get latest updated livescores",
          },
        ],
        default: "inplay",
      },
      includeField("livescores", LIVESCORE_INCLUDES),

      // ── Fixture operations ────────────────────────────────────────────────
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["fixture"] } },
        options: [
          {
            name: "Get by ID",
            value: "getById",
            description: "Retrieve a specific fixture by its ID",
            action: "Get fixture by ID",
          },
          {
            name: "Get by Date",
            value: "getByDate",
            description: "All fixtures on a specific date (YYYY-MM-DD)",
            action: "Get fixtures by date",
          },
          {
            name: "Get by Date Range",
            value: "getByDateRange",
            description: "Fixtures between two dates",
            action: "Get fixtures by date range",
          },
          {
            name: "Get by Date Range for Team",
            value: "getByDateRangeForTeam",
            description: "Fixtures for a team in a date range",
            action: "Get fixtures by date range for team",
          },
          {
            name: "Get Head to Head",
            value: "getH2H",
            description: "Head-to-head history between two teams",
            action: "Get head to head fixtures",
          },
          {
            name: "Get Latest Updated",
            value: "getLatest",
            description: "Recently updated fixtures",
            action: "Get latest updated fixtures",
          },
          {
            name: "Search by Name",
            value: "searchByName",
            description: "Search fixtures by name (team names)",
            action: "Search fixtures by name",
          },
        ],
        default: "getById",
      },
      // Fixture: ID
      {
        displayName: "Fixture ID",
        name: "fixtureId",
        type: "number",
        default: 0,
        required: true,
        description: "The unique fixture ID",
        displayOptions: { show: { resource: ["fixture"], operation: ["getById"] } },
      },
      // Fixture: Date
      {
        displayName: "Date",
        name: "date",
        type: "string",
        default: "",
        placeholder: "2025-09-27",
        required: true,
        description: "Date in YYYY-MM-DD format",
        displayOptions: {
          show: { resource: ["fixture"], operation: ["getByDate"] },
        },
      },
      // Fixture: Date Range
      {
        displayName: "Start Date",
        name: "startDate",
        type: "string",
        default: "",
        placeholder: "2025-09-01",
        required: true,
        description: "Start date in YYYY-MM-DD format",
        displayOptions: {
          show: {
            resource: ["fixture"],
            operation: ["getByDateRange", "getByDateRangeForTeam"],
          },
        },
      },
      {
        displayName: "End Date",
        name: "endDate",
        type: "string",
        default: "",
        placeholder: "2025-09-30",
        required: true,
        description: "End date in YYYY-MM-DD format",
        displayOptions: {
          show: {
            resource: ["fixture"],
            operation: ["getByDateRange", "getByDateRangeForTeam"],
          },
        },
      },
      // Fixture: Team ID (date range for team)
      {
        displayName: "Team ID",
        name: "teamIdFixture",
        type: "number",
        default: 0,
        required: true,
        description: "The unique team ID",
        displayOptions: {
          show: { resource: ["fixture"], operation: ["getByDateRangeForTeam"] },
        },
      },
      // Fixture: H2H team IDs
      {
        displayName: "Home Team ID",
        name: "homeTeamId",
        type: "number",
        default: 0,
        required: true,
        description: "ID of the first / home team",
        displayOptions: { show: { resource: ["fixture"], operation: ["getH2H"] } },
      },
      {
        displayName: "Away Team ID",
        name: "awayTeamId",
        type: "number",
        default: 0,
        required: true,
        description: "ID of the second / away team",
        displayOptions: { show: { resource: ["fixture"], operation: ["getH2H"] } },
      },
      // Fixture: search
      {
        displayName: "Search Query",
        name: "fixtureSearchQuery",
        type: "string",
        default: "",
        placeholder: "Ajax",
        required: true,
        description: "Team or fixture name to search for",
        displayOptions: {
          show: { resource: ["fixture"], operation: ["searchByName"] },
        },
      },
      includeField("fixture", FIXTURE_INCLUDES),

      // ── Team operations ───────────────────────────────────────────────────
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["team"] } },
        options: [
          {
            name: "Get by ID",
            value: "getById",
            description: "Retrieve a team by its ID",
            action: "Get team by ID",
          },
          {
            name: "Get by Season ID",
            value: "getBySeason",
            description: "All teams in a season",
            action: "Get teams by season ID",
          },
          {
            name: "Get by Country ID",
            value: "getByCountry",
            description: "All teams from a country",
            action: "Get teams by country ID",
          },
          {
            name: "Search by Name",
            value: "searchByName",
            description: "Search teams by name",
            action: "Search teams by name",
          },
        ],
        default: "getById",
      },
      {
        displayName: "Team ID",
        name: "teamId",
        type: "number",
        default: 0,
        required: true,
        description: "The unique team ID",
        displayOptions: { show: { resource: ["team"], operation: ["getById"] } },
      },
      {
        displayName: "Season ID",
        name: "seasonIdTeam",
        type: "number",
        default: 0,
        required: true,
        description: "The unique season ID",
        displayOptions: {
          show: { resource: ["team"], operation: ["getBySeason"] },
        },
      },
      {
        displayName: "Country ID",
        name: "countryIdTeam",
        type: "number",
        default: 0,
        required: true,
        description: "The unique country ID",
        displayOptions: {
          show: { resource: ["team"], operation: ["getByCountry"] },
        },
      },
      {
        displayName: "Search Query",
        name: "teamSearchQuery",
        type: "string",
        default: "",
        placeholder: "Ajax",
        required: true,
        description: "Team name to search for",
        displayOptions: {
          show: { resource: ["team"], operation: ["searchByName"] },
        },
      },
      includeField("team", TEAM_INCLUDES),

      // ── Player operations ─────────────────────────────────────────────────
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["player"] } },
        options: [
          {
            name: "Get by ID",
            value: "getById",
            description: "Retrieve a player by their ID",
            action: "Get player by ID",
          },
          {
            name: "Get by Country ID",
            value: "getByCountry",
            description: "All players from a country",
            action: "Get players by country ID",
          },
          {
            name: "Search by Name",
            value: "searchByName",
            description: "Search players by name",
            action: "Search players by name",
          },
        ],
        default: "getById",
      },
      {
        displayName: "Player ID",
        name: "playerId",
        type: "number",
        default: 0,
        required: true,
        description: "The unique player ID",
        displayOptions: { show: { resource: ["player"], operation: ["getById"] } },
      },
      {
        displayName: "Country ID",
        name: "countryIdPlayer",
        type: "number",
        default: 0,
        required: true,
        description: "The unique country ID",
        displayOptions: {
          show: { resource: ["player"], operation: ["getByCountry"] },
        },
      },
      {
        displayName: "Search Query",
        name: "playerSearchQuery",
        type: "string",
        default: "",
        placeholder: "Messi",
        required: true,
        description: "Player name to search for",
        displayOptions: {
          show: { resource: ["player"], operation: ["searchByName"] },
        },
      },
      includeField("player", PLAYER_INCLUDES),

      // ── League operations ─────────────────────────────────────────────────
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["league"] } },
        options: [
          {
            name: "Get All",
            value: "getAll",
            description: "Retrieve all available leagues",
            action: "Get all leagues",
          },
          {
            name: "Get by ID",
            value: "getById",
            description: "Retrieve a league by its ID",
            action: "Get league by ID",
          },
          {
            name: "Get by Country ID",
            value: "getByCountry",
            description: "All leagues from a country",
            action: "Get leagues by country ID",
          },
          {
            name: "Get Live",
            value: "getLive",
            description: "Leagues with matches currently in play",
            action: "Get live leagues",
          },
          {
            name: "Search by Name",
            value: "searchByName",
            description: "Search leagues by name",
            action: "Search leagues by name",
          },
        ],
        default: "getAll",
      },
      {
        displayName: "League ID",
        name: "leagueId",
        type: "number",
        default: 0,
        required: true,
        description: "The unique league ID",
        displayOptions: { show: { resource: ["league"], operation: ["getById"] } },
      },
      {
        displayName: "Country ID",
        name: "countryIdLeague",
        type: "number",
        default: 0,
        required: true,
        description: "The unique country ID",
        displayOptions: {
          show: { resource: ["league"], operation: ["getByCountry"] },
        },
      },
      {
        displayName: "Search Query",
        name: "leagueSearchQuery",
        type: "string",
        default: "",
        placeholder: "Premier League",
        required: true,
        description: "League name to search for",
        displayOptions: {
          show: { resource: ["league"], operation: ["searchByName"] },
        },
      },
      includeField("league", LEAGUE_INCLUDES),

      // ── Standing operations ───────────────────────────────────────────────
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["standing"] } },
        options: [
          {
            name: "Get by Season ID",
            value: "getBySeason",
            description: "League standings for a season",
            action: "Get standings by season ID",
          },
          {
            name: "Get Live by League ID",
            value: "getLiveByLeague",
            description: "Real-time standings for an active league",
            action: "Get live standings by league ID",
          },
        ],
        default: "getBySeason",
      },
      {
        displayName: "Season ID",
        name: "seasonIdStanding",
        type: "number",
        default: 0,
        required: true,
        description: "The unique season ID",
        displayOptions: {
          show: { resource: ["standing"], operation: ["getBySeason"] },
        },
      },
      {
        displayName: "League ID",
        name: "leagueIdStanding",
        type: "number",
        default: 0,
        required: true,
        description: "The unique league ID",
        displayOptions: {
          show: { resource: ["standing"], operation: ["getLiveByLeague"] },
        },
      },

      // ── Season operations ─────────────────────────────────────────────────
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["season"] } },
        options: [
          {
            name: "Get All",
            value: "getAll",
            description: "Retrieve all seasons",
            action: "Get all seasons",
          },
          {
            name: "Get by ID",
            value: "getById",
            description: "Retrieve a season by its ID",
            action: "Get season by ID",
          },
          {
            name: "Get by Team ID",
            value: "getByTeam",
            description: "All seasons a team participated in",
            action: "Get seasons by team ID",
          },
          {
            name: "Search by Name",
            value: "searchByName",
            description: "Search seasons by name",
            action: "Search seasons by name",
          },
        ],
        default: "getAll",
      },
      {
        displayName: "Season ID",
        name: "seasonId",
        type: "number",
        default: 0,
        required: true,
        description: "The unique season ID",
        displayOptions: {
          show: { resource: ["season"], operation: ["getById"] },
        },
      },
      {
        displayName: "Team ID",
        name: "teamIdSeason",
        type: "number",
        default: 0,
        required: true,
        description: "The unique team ID",
        displayOptions: {
          show: { resource: ["season"], operation: ["getByTeam"] },
        },
      },
      {
        displayName: "Search Query",
        name: "seasonSearchQuery",
        type: "string",
        default: "",
        placeholder: "2025/2026",
        required: true,
        description: "Season name to search for",
        displayOptions: {
          show: { resource: ["season"], operation: ["searchByName"] },
        },
      },

      // ── Shared: pagination ────────────────────────────────────────────────
      {
        displayName: "Page",
        name: "page",
        type: "number",
        default: 1,
        description: "Page number for paginated results (starts at 1)",
        displayOptions: {
          show: {
            resource: [
              "livescores",
              "fixture",
              "team",
              "player",
              "league",
              "standing",
              "season",
            ],
          },
        },
      },
    ],
  };

  // ─── Execute ──────────────────────────────────────────────────────────────

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const results: INodeExecutionData[] = [];
    const credentials = await this.getCredentials("sportMonksApi");
    const apiToken = credentials.apiToken as string;

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter("resource", i) as string;
      const operation = this.getNodeParameter("operation", i) as string;
      const page = this.getNodeParameter("page", i, 1) as number;

      const includeRaw = this.getNodeParameter("include", i, []) as string[];
      const includeStr = includeRaw.join(";");

      let endpoint = "";

      // ── Build endpoint URL ───────────────────────────────────────────────
      switch (resource) {
        case "livescores": {
          const paths: Record<string, string> = {
            inplay: "/livescores/inplay",
            all: "/livescores",
            latest: "/livescores/latest",
          };
          endpoint = paths[operation];
          break;
        }

        case "fixture": {
          switch (operation) {
            case "getById": {
              const id = this.getNodeParameter("fixtureId", i) as number;
              endpoint = `/fixtures/${id}`;
              break;
            }
            case "getByDate": {
              const date = this.getNodeParameter("date", i) as string;
              endpoint = `/fixtures/date/${date}`;
              break;
            }
            case "getByDateRange": {
              const start = this.getNodeParameter("startDate", i) as string;
              const end = this.getNodeParameter("endDate", i) as string;
              endpoint = `/fixtures/between/${start}/${end}`;
              break;
            }
            case "getByDateRangeForTeam": {
              const start = this.getNodeParameter("startDate", i) as string;
              const end = this.getNodeParameter("endDate", i) as string;
              const teamId = this.getNodeParameter("teamIdFixture", i) as number;
              endpoint = `/fixtures/between/${start}/${end}/${teamId}`;
              break;
            }
            case "getH2H": {
              const home = this.getNodeParameter("homeTeamId", i) as number;
              const away = this.getNodeParameter("awayTeamId", i) as number;
              endpoint = `/fixtures/head-to-head/${home}/${away}`;
              break;
            }
            case "getLatest":
              endpoint = "/fixtures/latest";
              break;
            case "searchByName": {
              const q = this.getNodeParameter("fixtureSearchQuery", i) as string;
              endpoint = `/fixtures/search/${encodeURIComponent(q)}`;
              break;
            }
          }
          break;
        }

        case "team": {
          switch (operation) {
            case "getById": {
              const id = this.getNodeParameter("teamId", i) as number;
              endpoint = `/teams/${id}`;
              break;
            }
            case "getBySeason": {
              const sid = this.getNodeParameter("seasonIdTeam", i) as number;
              endpoint = `/teams/seasons/${sid}`;
              break;
            }
            case "getByCountry": {
              const cid = this.getNodeParameter("countryIdTeam", i) as number;
              endpoint = `/teams/countries/${cid}`;
              break;
            }
            case "searchByName": {
              const q = this.getNodeParameter("teamSearchQuery", i) as string;
              endpoint = `/teams/search/${encodeURIComponent(q)}`;
              break;
            }
          }
          break;
        }

        case "player": {
          switch (operation) {
            case "getById": {
              const id = this.getNodeParameter("playerId", i) as number;
              endpoint = `/players/${id}`;
              break;
            }
            case "getByCountry": {
              const cid = this.getNodeParameter("countryIdPlayer", i) as number;
              endpoint = `/players/countries/${cid}`;
              break;
            }
            case "searchByName": {
              const q = this.getNodeParameter("playerSearchQuery", i) as string;
              endpoint = `/players/search/${encodeURIComponent(q)}`;
              break;
            }
          }
          break;
        }

        case "league": {
          switch (operation) {
            case "getAll":
              endpoint = "/leagues";
              break;
            case "getById": {
              const id = this.getNodeParameter("leagueId", i) as number;
              endpoint = `/leagues/${id}`;
              break;
            }
            case "getByCountry": {
              const cid = this.getNodeParameter("countryIdLeague", i) as number;
              endpoint = `/leagues/countries/${cid}`;
              break;
            }
            case "getLive":
              endpoint = "/leagues/live";
              break;
            case "searchByName": {
              const q = this.getNodeParameter("leagueSearchQuery", i) as string;
              endpoint = `/leagues/search/${encodeURIComponent(q)}`;
              break;
            }
          }
          break;
        }

        case "standing": {
          switch (operation) {
            case "getBySeason": {
              const sid = this.getNodeParameter("seasonIdStanding", i) as number;
              endpoint = `/standings/seasons/${sid}`;
              break;
            }
            case "getLiveByLeague": {
              const lid = this.getNodeParameter("leagueIdStanding", i) as number;
              endpoint = `/standings/live/leagues/${lid}`;
              break;
            }
          }
          break;
        }

        case "season": {
          switch (operation) {
            case "getAll":
              endpoint = "/seasons";
              break;
            case "getById": {
              const id = this.getNodeParameter("seasonId", i) as number;
              endpoint = `/seasons/${id}`;
              break;
            }
            case "getByTeam": {
              const tid = this.getNodeParameter("teamIdSeason", i) as number;
              endpoint = `/seasons/teams/${tid}`;
              break;
            }
            case "searchByName": {
              const q = this.getNodeParameter("seasonSearchQuery", i) as string;
              endpoint = `/seasons/search/${encodeURIComponent(q)}`;
              break;
            }
          }
          break;
        }
      }

      if (!endpoint) {
        throw new NodeOperationError(
          this.getNode(),
          `Unsupported operation "${operation}" for resource "${resource}"`,
          { itemIndex: i }
        );
      }

      // ── Build query params ───────────────────────────────────────────────
      const qs: Record<string, string | number> = {
        api_token: apiToken,
      };
      if (includeStr) qs.include = includeStr;
      if (page > 1) qs.page = page;

      const url = `${BASE_URL}${endpoint}`;

      // ── Make HTTP request ────────────────────────────────────────────────
      try {
        const options: IHttpRequestOptions = {
          method: "GET",
          url,
          qs,
          json: true,
        };

        const response = await this.helpers.httpRequest(options);

        // Sportmonks wraps data in { data: [...], subscription: [...], ... }
        // We surface the data array when present, else the full response
        const payload = response?.data !== undefined ? response.data : response;

        // Attach rate limit meta as node metadata when available
        const rateLimitMeta = response?.rate_limit ?? null;

        if (Array.isArray(payload)) {
          for (const item of payload) {
            results.push({
              json: item,
              pairedItem: { item: i },
              ...(rateLimitMeta ? { binary: undefined } : {}),
            });
          }
          if (payload.length === 0) {
            // Pass through an empty marker so downstream nodes know the call succeeded
            results.push({
              json: {
                _empty: true,
                _message: "No results found for this query",
                _rateLimitRemaining: rateLimitMeta?.remaining ?? null,
              },
              pairedItem: { item: i },
            });
          }
        } else {
          results.push({
            json: payload,
            pairedItem: { item: i },
          });
        }
      } catch (error) {
        const err = error as {
          message?: string;
          response?: { status?: number; data?: unknown };
        };

        const status = err?.response?.status;
        const body = err?.response?.data as Record<string, unknown> | undefined;

        let friendlyMessage = err.message ?? "Unknown error";

        if (status === 401) {
          friendlyMessage =
            "Unauthorized (401): Invalid or missing API token. Check your SportMonks credentials.";
        } else if (status === 403) {
          friendlyMessage =
            "Forbidden (403): Your current subscription plan does not include access to this endpoint. Upgrade at https://my.sportmonks.com";
        } else if (status === 429) {
          friendlyMessage =
            "Too Many Requests (429): Hourly rate limit reached. Check the rate_limit meta in previous responses.";
        } else if (status === 500) {
          friendlyMessage =
            "Internal Server Error (500): SportMonks experienced a server-side error. Check https://status.sportmonks.com for outages.";
        } else if (body?.message) {
          friendlyMessage = `SportMonks API error: ${body.message}`;
        }

        if (this.continueOnFail()) {
          results.push({
            json: {
              error: friendlyMessage,
              statusCode: status ?? null,
              details: body ?? null,
            },
            pairedItem: { item: i },
          });
        } else {
          throw new NodeOperationError(this.getNode(), friendlyMessage, {
            itemIndex: i,
          });
        }
      }
    }

    return [results];
  }
}
