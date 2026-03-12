import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSHConnectionManager } from "../services/ssh-connection-manager.js";
import { ensureAstrBotAdmin, operatorIdSchema } from "./auth.js";

/**
 * Register list-servers tool
 */
export function registerListServersTool(server: McpServer): void {
  server.registerTool(
    "list-servers",
    {
      description: "List all available SSH server configurations",
      inputSchema: {
        operatorId: operatorIdSchema,
      },
    },
    async ({ operatorId }) => {
      ensureAstrBotAdmin(operatorId);
      const sshManager = SSHConnectionManager.getInstance();
      const servers = sshManager.getAllServerInfos();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(servers)
          }
        ]
      };
    }
  );
} 
