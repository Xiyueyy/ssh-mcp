# ssh-mcp-server

SSH-based MCP (Model Context Protocol) server for remote command execution and
file transfer.

This fork adds optional AstrBot admin validation for all exposed MCP tools.

[Chinese README](README_CN.md)

## Links

- GitHub: <https://github.com/Xiyueyy/ssh-mcp>
- npm: <https://www.npmjs.com/package/@ruawd/ssh-mcp>

## Features

- Execute SSH commands through MCP
- Upload files to remote hosts
- Download files from remote hosts
- List configured SSH servers
- Support password, private key, and `~/.ssh/config`
- Support command whitelist and blacklist
- Optional AstrBot admin validation via `operatorId`

## Tools

- `execute-command`
- `upload`
- `download`
- `list-servers`

## Install

### Recommended for AstrBot

For long-running stdio MCP servers, global install is more stable than letting
AstrBot invoke `npx` every time.

```bash
npm install -g @ruawd/ssh-mcp@1.3.4
```

Then use `ssh-mcp` as the command in AstrBot.

### One-shot usage

```bash
npx -y @ruawd/ssh-mcp@1.3.4 --host 192.168.1.1 --port 22 --username root --password pwd123456
```

## AstrBot MCP Examples

### Global install

```json
{
  "mcpServers": {
    "sshmcp": {
      "command": "ssh-mcp",
      "args": [
        "--host",
        "192.168.1.1",
        "--port",
        "22",
        "--username",
        "root",
        "--password",
        "pwd123456"
      ]
    }
  }
}
```

### Use `npx`

```json
{
  "mcpServers": {
    "sshmcp": {
      "command": "npx",
      "args": [
        "-y",
        "@ruawd/ssh-mcp@1.3.4",
        "--host",
        "192.168.1.1",
        "--port",
        "22",
        "--username",
        "root",
        "--password",
        "pwd123456"
      ]
    }
  }
}
```

### Private key example

```json
{
  "mcpServers": {
    "sshmcp": {
      "command": "ssh-mcp",
      "args": [
        "--host",
        "192.168.1.1",
        "--port",
        "22",
        "--username",
        "root",
        "--privateKey",
        "~/.ssh/id_rsa"
      ]
    }
  }
}
```

### Use `~/.ssh/config`

```json
{
  "mcpServers": {
    "sshmcp": {
      "command": "ssh-mcp",
      "args": [
        "--host",
        "myserver"
      ]
    }
  }
}
```

If `~/.ssh/config` contains:

```text
Host myserver
    HostName 192.168.1.1
    Port 22
    User root
    IdentityFile ~/.ssh/id_rsa
```

the server will load those defaults automatically.

## CLI Options

```text
--config-file             JSON configuration file path
--ssh-config-file         SSH config file path
--ssh                     SSH connection config in JSON or legacy format
-h, --host                SSH host or host alias from ssh config
-p, --port                SSH port
-u, --username            SSH username
-w, --password            SSH password
-k, --privateKey          SSH private key path
-P, --passphrase          Private key passphrase
-W, --whitelist           Command whitelist (comma-separated regex)
-B, --blacklist           Command blacklist (comma-separated regex)
-s, --socksProxy          SOCKS proxy URL
--pty                     Allocate pseudo-tty for command execution
--pre-connect             Pre-connect configured SSH servers on startup
--require-astrbot-admin   Require operatorId to match allowed admin IDs
--admin-ids               Comma-separated admin IDs, e.g. 10001,10002
--astrbot-config-file     Path to AstrBot data/config/cmd_config.json
```

## AstrBot Admin Validation

This fork can restrict all MCP tools to specific AstrBot administrator IDs.

When enabled, each tool call must include an `operatorId`.

Two ways to configure administrators:

1. Directly provide `--admin-ids`
2. Read `admins_id` from AstrBot `cmd_config.json`

If `--admin-ids` is present, it takes priority over `--astrbot-config-file`.

### Example with direct admin IDs

```json
{
  "mcpServers": {
    "sshmcp": {
      "command": "ssh-mcp",
      "args": [
        "--host",
        "103.117.136.155",
        "--port",
        "22",
        "--username",
        "root",
        "--password",
        "your-password",
        "--require-astrbot-admin",
        "--admin-ids",
        "1738068535,2653839788"
      ]
    }
  }
}
```

### Example reading AstrBot config

```json
{
  "mcpServers": {
    "sshmcp": {
      "command": "ssh-mcp",
      "args": [
        "--config-file",
        "/path/to/ssh-config.json",
        "--require-astrbot-admin",
        "--astrbot-config-file",
        "/path/to/AstrBot/data/config/cmd_config.json"
      ]
    }
  }
}
```

### Tool call example

```json
{
  "tool": "execute-command",
  "params": {
    "cmdString": "ls -al",
    "connectionName": "prod",
    "operatorId": "1738068535"
  }
}
```

## Important Limitation

AstrBot native MCP integration does not automatically pass the current sender
ID to a stdio MCP server.

That means:

- this MCP server can validate `operatorId`
- but something upstream still needs to inject the real sender ID

If you are using AstrBot, pair this server with
`astrbot_plugin_mcp_id_injector`, or use your own proxy plugin.

## Security Notes

- Prefer SSH private keys over passwords
- Configure a whitelist for production use
- Do not expose the server to untrusted callers
- Be careful with upload/download target paths
