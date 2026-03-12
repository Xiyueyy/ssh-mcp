import { afterEach, before, describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CommandLineParser } from "../build/cli/command-line-parser.js";
import { SSHConnectionManager } from "../build/services/ssh-connection-manager.js";
import { AstrBotAdminAuth } from "../build/services/astrbot-admin-auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, "fixtures");

describe("integration", () => {
  const originalArgv = [...process.argv];
  const originalEnv = { ...process.env };
  const astrBotConfigPath = path.join(fixturesDir, "integration-cmd_config.json");

  before(() => {
    fs.mkdirSync(fixturesDir, { recursive: true });
    fs.writeFileSync(
      astrBotConfigPath,
      JSON.stringify({
        admins_id: ["1738068535", "2653839788"],
      }),
    );
  });

  afterEach(() => {
    process.argv = [...originalArgv];
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) {
        delete process.env[key];
      }
    }
    for (const [key, value] of Object.entries(originalEnv)) {
      process.env[key] = value;
    }
    SSHConnectionManager.getInstance().disconnect();
    AstrBotAdminAuth.getInstance().configure({ requireAstrBotAdmin: false });
  });

  it("flows parsed configs into the ssh manager", () => {
    process.argv = [
      "node",
      "test",
      "--host",
      "192.168.1.100",
      "--port",
      "22",
      "--username",
      "root",
      "--password",
      "pwd123",
    ];

    const parsedArgs = CommandLineParser.parseArgs();
    const manager = SSHConnectionManager.getInstance();
    manager.setConfig(parsedArgs.configs);

    const info = manager.getAllServerInfos();
    assert.strictEqual(info.length, 1);
    assert.strictEqual(info[0].host, "192.168.1.100");
    assert.strictEqual(info[0].connected, false);
  });

  it("authorizes AstrBot admins from the parsed config", () => {
    process.argv = [
      "node",
      "test",
      "--host",
      "192.168.1.100",
      "--port",
      "22",
      "--username",
      "root",
      "--password",
      "pwd123",
      "--require-astrbot-admin",
      "--astrbot-config-file",
      astrBotConfigPath,
    ];

    const parsedArgs = CommandLineParser.parseArgs();
    const auth = AstrBotAdminAuth.getInstance();
    auth.configure(parsedArgs.auth);

    assert.doesNotThrow(() => {
      auth.authorize("1738068535");
    });

    assert.throws(() => {
      auth.authorize("not-admin");
    }, /allowed admin ID list/);
  });

  it("authorizes configured admin ids without reading AstrBot config", () => {
    process.argv = [
      "node",
      "test",
      "--host",
      "192.168.1.100",
      "--port",
      "22",
      "--username",
      "root",
      "--password",
      "pwd123",
      "--admin-ids",
      "1738068535,2653839788",
    ];

    const parsedArgs = CommandLineParser.parseArgs();
    const auth = AstrBotAdminAuth.getInstance();
    auth.configure(parsedArgs.auth);

    assert.doesNotThrow(() => {
      auth.authorize("2653839788");
    });

    assert.throws(() => {
      auth.authorize("not-admin");
    }, /allowed admin ID list/);
  });
});
