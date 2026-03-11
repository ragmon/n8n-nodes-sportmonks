import type { ICredentialType, INodeProperties } from "n8n-workflow";

export class SportMonksApi implements ICredentialType {
  name = "sportMonksApi";
  displayName = "SportMonks API";
  documentationUrl = "https://docs.sportmonks.com/v3/welcome/authentication";

  properties: INodeProperties[] = [
    {
      displayName: "API Token",
      name: "apiToken",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
      placeholder: "Your SportMonks API token",
      description:
        "API token from MySportMonks dashboard — https://my.sportmonks.com/api/tokens",
    },
  ];
}
