import fs from "node:fs";
import path from "node:path";
import { AstrBotAdminAuthConfig } from "../models/types.js";
import { Logger } from "../utils/logger.js";

const DEFAULT_ASTRBOT_CONFIG_RELATIVE_PATH = path.join(
  "data",
  "config",
  "cmd_config.json",
);

export class AstrBotAdminAuth {
  private static instance: AstrBotAdminAuth | null = null;

  private config: AstrBotAdminAuthConfig = {
    requireAstrBotAdmin: false,
  };

  private cachedConfigPath = "";
  private cachedConfigMtimeMs = -1;
  private cachedAdmins = new Set<string>();

  public static getInstance(): AstrBotAdminAuth {
    if (!this.instance) {
      this.instance = new AstrBotAdminAuth();
    }
    return this.instance;
  }

  public configure(config: AstrBotAdminAuthConfig): void {
    const nextPath = config.astrBotConfigPath || "";
    const nextAdminIds = this.normalizeAdminIds(config.adminIds);
    const pathChanged = nextPath !== this.config.astrBotConfigPath;
    const authChanged =
      config.requireAstrBotAdmin !== this.config.requireAstrBotAdmin;
    const idsChanged =
      nextAdminIds.join(",") !==
      this.normalizeAdminIds(this.config.adminIds).join(",");

    this.config = {
      requireAstrBotAdmin: Boolean(config.requireAstrBotAdmin),
      astrBotConfigPath: nextPath || undefined,
      adminIds: nextAdminIds,
    };

    if (pathChanged || authChanged || idsChanged) {
      this.cachedConfigPath = "";
      this.cachedConfigMtimeMs = -1;
      this.cachedAdmins.clear();
    }
  }

  public isEnabled(): boolean {
    return this.config.requireAstrBotAdmin;
  }

  public getEffectiveConfigPath(): string {
    if (this.config.astrBotConfigPath) {
      return path.resolve(this.config.astrBotConfigPath);
    }

    if (process.env.SSH_MCP_ASTRBOT_CONFIG_PATH) {
      return path.resolve(process.env.SSH_MCP_ASTRBOT_CONFIG_PATH);
    }

    if (process.env.ASTRBOT_CONFIG_PATH) {
      return path.resolve(process.env.ASTRBOT_CONFIG_PATH);
    }

    if (process.env.ASTRBOT_ROOT) {
      return path.resolve(
        process.env.ASTRBOT_ROOT,
        DEFAULT_ASTRBOT_CONFIG_RELATIVE_PATH,
      );
    }

    return path.resolve(process.cwd(), DEFAULT_ASTRBOT_CONFIG_RELATIVE_PATH);
  }

  public authorize(operatorId?: string | number): void {
    if (!this.isEnabled()) {
      return;
    }

    const normalizedOperatorId = String(operatorId ?? "").trim();
    if (!normalizedOperatorId) {
      throw new Error(
        "Permission denied: operatorId is required when AstrBot admin auth is enabled.",
      );
    }

    const admins = this.loadAdminIds();
    if (!admins.has(normalizedOperatorId)) {
      throw new Error(
        `Permission denied: operatorId '${normalizedOperatorId}' is not in the allowed admin ID list.`,
      );
    }
  }

  private loadAdminIds(): Set<string> {
    const directAdminIds = this.normalizeAdminIds(this.config.adminIds);
    if (directAdminIds.length > 0) {
      return new Set(directAdminIds);
    }

    const configPath = this.getEffectiveConfigPath();

    if (!fs.existsSync(configPath)) {
      throw new Error(
        `Permission denied: AstrBot config file not found: ${configPath}`,
      );
    }

    const stats = fs.statSync(configPath);
    if (
      this.cachedConfigPath === configPath &&
      this.cachedConfigMtimeMs === stats.mtimeMs
    ) {
      return this.cachedAdmins;
    }

    const rawText = fs.readFileSync(configPath, "utf-8").replace(/^\uFEFF/, "");
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawText) as Record<string, unknown>;
    } catch (error) {
      throw new Error(
        `Permission denied: failed to parse AstrBot config JSON: ${(error as Error).message}`,
      );
    }

    const adminIds = parsed["admins_id"];
    if (!Array.isArray(adminIds)) {
      throw new Error(
        "Permission denied: AstrBot config does not contain a valid admins_id array.",
      );
    }

    const normalizedAdmins = new Set(
      adminIds
        .map((id) => String(id ?? "").trim())
        .filter((id) => id.length > 0),
    );

    if (normalizedAdmins.size === 0) {
      throw new Error(
        "Permission denied: AstrBot admins_id is empty; no operators are authorized.",
      );
    }

    this.cachedConfigPath = configPath;
    this.cachedConfigMtimeMs = stats.mtimeMs;
    this.cachedAdmins = normalizedAdmins;

    return this.cachedAdmins;
  }

  public logStatus(): void {
    if (!this.isEnabled()) {
      return;
    }

    const directAdminIds = this.normalizeAdminIds(this.config.adminIds);
    if (directAdminIds.length > 0) {
      Logger.log(
        `AstrBot admin auth enabled, using configured admin IDs (${directAdminIds.length})`,
        "info",
      );
      return;
    }

    Logger.log(
      `AstrBot admin auth enabled, using config: ${this.getEffectiveConfigPath()}`,
      "info",
    );
  }

  private normalizeAdminIds(adminIds: string[] | undefined): string[] {
    if (!Array.isArray(adminIds)) {
      return [];
    }

    return adminIds
      .map((id) => String(id ?? "").trim())
      .filter((id) => id.length > 0);
  }
}
