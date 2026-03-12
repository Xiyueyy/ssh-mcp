import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SSHConnectionManager } from "../services/ssh-connection-manager.js";
import { Logger } from "../utils/logger.js";
import { ensureAstrBotAdmin, operatorIdSchema } from "./auth.js";

/**
 * Register file upload tool
 */
export function registerUploadTool(server: McpServer): void {
  const sshManager = SSHConnectionManager.getInstance();

  server.registerTool(
    "upload",
    {
      description: "Upload file to connected server",
      inputSchema: {
        localPath: z.string().describe("Local path"),
        remotePath: z.string().describe("Remote path"),
        connectionName: z.string().optional().describe("SSH connection name (optional, default is 'default')"),
        operatorId: operatorIdSchema,
      },
    },
    async ({ localPath, remotePath, connectionName, operatorId }) => {
      try {
        ensureAstrBotAdmin(operatorId);
        const result = await sshManager.upload(localPath, remotePath, connectionName);
        return {
          content: [{ type: "text", text: result }],
        };
      } catch (error: unknown) {
        const errorMessage = Logger.handleError(error, "Failed to upload file");
        return {
          content: [{ type: "text", text: errorMessage }],
          isError: true,
        };
      }
    }
  );
}
