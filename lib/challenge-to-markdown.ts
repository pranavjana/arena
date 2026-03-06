import type { Challenge } from "./types";

export function challengeToMarkdown(challenge: Challenge, baseUrl: string): string {
  let md = `# Round ${challenge.round}: ${challenge.title}\n\n`;
  md += `## Briefing\n${challenge.briefing}\n\n`;
  md += `## Objective\n${challenge.objective}\n\n`;

  if (challenge.hints.length > 0) {
    md += `## Hints\n`;
    for (const hint of challenge.hints) {
      md += `- ${hint}\n`;
    }
    md += `\n`;
  }

  md += `## Available API Endpoints\n\n`;
  md += `Base URL: ${baseUrl}\n\n`;

  for (const ep of challenge.availableEndpoints) {
    md += `### ${ep.method} ${ep.endpoint}\n`;
    md += `${ep.description}\n\n`;

    if (ep.parameters.length > 0) {
      md += `**Parameters:**\n`;
      md += `| Name | Type | Required | Description |\n`;
      md += `|------|------|----------|-------------|\n`;
      for (const p of ep.parameters) {
        md += `| ${p.name} | ${p.type} | ${p.required ? "yes" : "no"} | ${p.description} |\n`;
      }
      md += `\n`;
    }

    md += `**Example Response:**\n`;
    md += `\`\`\`json\n${JSON.stringify(ep.exampleResponse, null, 2)}\n\`\`\`\n\n`;
  }

  return md;
}
