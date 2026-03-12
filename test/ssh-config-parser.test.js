import { before, describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lookupSshConfig } from "../build/utils/ssh-config-parser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, "fixtures");

describe("lookupSshConfig", () => {
  const baseConfigPath = path.join(fixturesDir, "ssh-config");
  const includeConfigPath = path.join(fixturesDir, "ssh-config-include");
  const nestedConfigPath = path.join(fixturesDir, "ssh-config-nested");

  before(() => {
    fs.mkdirSync(fixturesDir, { recursive: true });

    fs.writeFileSync(
      nestedConfigPath,
      [
        "Host included-host",
        "    HostName 172.16.0.1",
        "    Port 3333",
        "    User includeduser",
      ].join("\n"),
    );

    fs.writeFileSync(
      includeConfigPath,
      [
        `Include ${nestedConfigPath}`,
        "Host main-host",
        "    HostName 192.168.1.1",
        "    User mainuser",
        "Host *",
        "    Port 22",
      ].join("\n"),
    );

    fs.writeFileSync(
      baseConfigPath,
      [
        "Host dev staging",
        "    HostName 192.168.1.100",
        "    Port 2222",
        "    User devuser",
        "    IdentityFile ~/.ssh/dev_key",
        "Host prod",
        "    HostName 10.0.0.50",
        "    User produser",
        "Host *.example.com",
        "    User wildcarduser",
        "    Port 2200",
        "Host *",
        "    Port 22",
        "    User defaultuser",
      ].join("\n"),
    );
  });

  it("resolves a direct host entry", () => {
    const result = lookupSshConfig("prod", baseConfigPath);

    assert.ok(result);
    assert.strictEqual(result.hostName, "10.0.0.50");
    assert.strictEqual(result.user, "produser");
    assert.strictEqual(result.port, 22);
  });

  it("supports multiple aliases in one host block", () => {
    const result = lookupSshConfig("staging", baseConfigPath);

    assert.ok(result);
    assert.strictEqual(result.hostName, "192.168.1.100");
    assert.strictEqual(result.port, 2222);
    assert.strictEqual(result.user, "devuser");
    assert.strictEqual(
      result.identityFile,
      path.join(os.homedir(), ".ssh", "dev_key"),
    );
  });

  it("supports wildcard matches", () => {
    const result = lookupSshConfig("api.example.com", baseConfigPath);

    assert.ok(result);
    assert.strictEqual(result.user, "wildcarduser");
    assert.strictEqual(result.port, 2200);
  });

  it("supports Include directives", () => {
    const result = lookupSshConfig("included-host", includeConfigPath);

    assert.ok(result);
    assert.strictEqual(result.hostName, "172.16.0.1");
    assert.strictEqual(result.user, "includeduser");
    assert.strictEqual(result.port, 3333);
  });

  it("throws when an explicit config path does not exist", () => {
    assert.throws(() => {
      lookupSshConfig("missing", path.join(fixturesDir, "missing-config"));
    }, /SSH config file not found/);
  });
});
