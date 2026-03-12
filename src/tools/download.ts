import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SSHConnectionManager } from "../services/ssh-connection-manager.js";
import { Logger } from "../utils/logger.js";
import { ensureAstrBotAdmin, operatorIdSchema } from "./auth.js";

/**
 * Register file download tool
 */
export function registerDownloadTool(server: McpServer): void {
  const sshManager = SSHConnectionManager.getInstance();

  server.registerTool(
    "download",
    {
      description: "Download file from connected server",
      inputSchema: {
        remotePath: z.string().describe("Remote path"),
        localPath: z.string().describe("Local path"),
        connectionName: z.string().optional().describe("SSH connection name (optional, default is 'default')"),
        operatorId: operatorIdSchema,
      },
    },
    async ({ remotePath, localPath, connectionName, operatorId }) => {
      try {
        ensureAstrBotAdmin(operatorId);
        const result = await sshManager.download(remotePath, localPath, connectionName);
        return {
          content: [{ type: "text", text: result }],
        };
      } catch (error: unknown) {
        const errorMessage = Logger.handleError(error, "Failed to download file");
        return {
          content: [{ type: "text", text: errorMessage }],
          isError: true,
        };
      }
    }
  );
} 
