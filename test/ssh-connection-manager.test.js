import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import { SSHConnectionManager } from "../build/services/ssh-connection-manager.js";

describe("SSHConnectionManager", () => {
  let manager;

  beforeEach(() => {
    manager = SSHConnectionManager.getInstance();
    manager.disconnect();
    manager.setConfig({});
  });

  it("stores and retrieves named configs", () => {
    manager.setConfig({
      dev: {
        name: "dev",
        host: "192.168.1.100",
        port: 22,
        username: "devuser",
        password: "secret",
      },
    });

    const config = manager.getConfig("dev");
    assert.strictEqual(config.host, "192.168.1.100");
    assert.strictEqual(config.username, "devuser");
  });

  it("uses the first config as the default connection", () => {
    manager.setConfig({
      first: {
        name: "first",
        host: "1.1.1.1",
        port: 22,
        username: "user1",
        password: "pass1",
      },
      second: {
        name: "second",
        host: "2.2.2.2",
        port: 22,
        username: "user2",
        password: "pass2",
      },
    });

    const config = manager.getConfig();
    assert.strictEqual(config.name, "first");
    assert.strictEqual(config.host, "1.1.1.1");
  });

  it("respects an explicit default connection name", () => {
    manager.setConfig(
      {
        first: {
          name: "first",
          host: "1.1.1.1",
          port: 22,
          username: "user1",
          password: "pass1",
        },
        second: {
          name: "second",
          host: "2.2.2.2",
          port: 22,
          username: "user2",
          password: "pass2",
        },
      },
      "second",
    );

    const config = manager.getConfig();
    assert.strictEqual(config.name, "second");
    assert.strictEqual(config.host, "2.2.2.2");
  });

  it("reports configured server metadata", () => {
    manager.setConfig({
      dev: {
        name: "dev",
        host: "192.168.1.100",
        port: 22,
        username: "devuser",
        password: "secret",
      },
      prod: {
        name: "prod",
        host: "10.0.0.50",
        port: 2222,
        username: "produser",
        password: "secret",
      },
    });

    const infos = manager.getAllServerInfos();
    assert.strictEqual(infos.length, 2);
    assert.deepStrictEqual(infos.map((item) => item.name), ["dev", "prod"]);
    assert.strictEqual(infos[0].connected, false);
    assert.strictEqual(infos[1].port, 2222);
  });

  it("throws when a config is missing", () => {
    assert.throws(() => {
      manager.getConfig("missing");
    }, /not set/);
  });
});
