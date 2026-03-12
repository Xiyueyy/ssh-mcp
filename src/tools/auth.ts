import { z } from "zod";
import { AstrBotAdminAuth } from "../services/astrbot-admin-auth.js";

export const operatorIdSchema = z
  .union([z.string(), z.number()])
  .optional()
  .describe(
    "AstrBot operator/user ID. Required when AstrBot admin auth is enabled.",
  );

export function ensureAstrBotAdmin(operatorId?: string | number): void {
  AstrBotAdminAuth.getInstance().authorize(operatorId);
}
