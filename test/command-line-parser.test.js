import { afterEach, before, describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CommandLineParser } from "../build/cli/command-line-parser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, "fixtures");

describe("CommandLineParser", () => {
  const originalArgv = [...process.argv];
  const originalEnv = { ...process.env };

  const configFilePath = path.join(fixturesDir, "parser-config.json");
  const sshConfigPath = path.join(fixturesDir, "parser-ssh-config");
  const astrBotConfigPath = path.join(fixturesDir, "cmd_config.json");

  before(() => {
    fs.mkdirSync(fixturesDir, { recursive: true });

    fs.writeFileSync(
      configFilePath,
      JSON.stringify({
        prod: {
          host: "10.0.0.50",
          port: 22,
          username: "produser",
          password: "secret",
        },
      }),
    );

    fs.writeFileSync(
      sshConfigPath,
      [
        "Host testhost",
        "    HostName 172.16.0.1",
        "    Port 2222",
        "    User testuser",
        "    IdentityFile ~/.ssh/test_key",
      ].join("\n"),
    );

    fs.writeFileSync(
      astrBotConfigPath,
      JSON.stringify({
        admins_id: ["10001", "10002"],
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
  });

  it("parses object config files", () => {
    process.argv = ["node", "test", "--config-file", configFilePath];
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(Object.keys(result.configs).length, 1);
    assert.strictEqual(result.configs.prod.host, "10.0.0.50");
    assert.strictEqual(result.configs.prod.username, "produser");
    assert.strictEqual(result.auth.requireAstrBotAdmin, false);
  });

  it("parses JSON ssh arguments", () => {
    process.argv = [
      "node",
      "test",
      "--ssh",
      JSON.stringify({
        name: "dev",
        host: "1.2.3.4",
        port: 22,
        username: "alice",
        password: "pass",
      }),
    ];
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(result.configs.dev.host, "1.2.3.4");
    assert.strictEqual(result.configs.dev.username, "alice");
  });

  it("parses single connection arguments", () => {
    process.argv = [
      "node",
      "test",
      "--host",
      "1.2.3.4",
      "--port",
      "22",
      "--username",
      "root",
      "--password",
      "pwd123",
      "--whitelist",
      "^ls,^cat",
      "--blacklist",
      "^rm",
      "--pty",
      "--pre-connect",
    ];
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(result.configs.default.host, "1.2.3.4");
    assert.strictEqual(result.configs.default.port, 22);
    assert.deepStrictEqual(result.configs.default.commandWhitelist, [
      "^ls",
      "^cat",
    ]);
    assert.deepStrictEqual(result.configs.default.commandBlacklist, ["^rm"]);
    assert.strictEqual(result.configs.default.pty, true);
    assert.strictEqual(result.preConnect, true);
  });

  it("loads host aliases from ssh config", () => {
    process.argv = [
      "node",
      "test",
      "--host",
      "testhost",
      "--ssh-config-file",
      sshConfigPath,
    ];
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(result.configs.default.host, "172.16.0.1");
    assert.strictEqual(result.configs.default.port, 2222);
    assert.strictEqual(result.configs.default.username, "testuser");
    assert.strictEqual(
      result.configs.default.privateKey,
      path.join(os.homedir(), ".ssh", "test_key"),
    );
  });

  it("enables AstrBot admin auth from cli flags", () => {
    process.argv = [
      "node",
      "test",
      "--host",
      "1.2.3.4",
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
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(result.auth.requireAstrBotAdmin, true);
    assert.strictEqual(
      result.auth.astrBotConfigPath,
      path.resolve(astrBotConfigPath),
    );
  });

  it("parses direct admin ids from cli args", () => {
    process.argv = [
      "node",
      "test",
      "--host",
      "1.2.3.4",
      "--port",
      "22",
      "--username",
      "root",
      "--password",
      "pwd123",
      "--admin-ids",
      "10001, 10002,10003",
    ];
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(result.auth.requireAstrBotAdmin, true);
    assert.deepStrictEqual(result.auth.adminIds, ["10001", "10002", "10003"]);
    assert.strictEqual(result.auth.astrBotConfigPath, undefined);
  });

  it("enables AstrBot admin auth from env variables", () => {
    process.env.SSH_MCP_REQUIRE_ASTRBOT_ADMIN = "true";
    process.env.SSH_MCP_ASTRBOT_CONFIG_PATH = astrBotConfigPath;
    process.argv = [
      "node",
      "test",
      "--host",
      "1.2.3.4",
      "--port",
      "22",
      "--username",
      "root",
      "--password",
      "pwd123",
    ];
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(result.auth.requireAstrBotAdmin, true);
    assert.strictEqual(
      result.auth.astrBotConfigPath,
      path.resolve(astrBotConfigPath),
    );
  });

  it("parses direct admin ids from env variables", () => {
    process.env.SSH_MCP_ADMIN_IDS = "20001,20002";
    process.argv = [
      "node",
      "test",
      "--host",
      "1.2.3.4",
      "--port",
      "22",
      "--username",
      "root",
      "--password",
      "pwd123",
    ];
    const result = CommandLineParser.parseArgs();

    assert.strictEqual(result.auth.requireAstrBotAdmin, true);
    assert.deepStrictEqual(result.auth.adminIds, ["20001", "20002"]);
  });

  it("throws on missing required single connection parameters", () => {
    process.argv = ["node", "test", "--host", "1.2.3.4"];

    assert.throws(() => {
      CommandLineParser.parseArgs();
    }, /Missing required parameters/);
  });

  it("throws when config file is missing", () => {
    process.argv = ["node", "test", "--config-file", "./missing.json"];

    assert.throws(() => {
      CommandLineParser.parseArgs();
    }, /Config file not found/);
  });
});
