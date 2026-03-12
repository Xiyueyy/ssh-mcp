# 馃攼 ssh-mcp-server

![NPM Version](https://img.shields.io/npm/v/%40xiyueyy%2Fssh-mcp?label=%40xiyueyy%2Fssh-mcp)
![GitHub forks](https://img.shields.io/github/forks/Xiyueyy/ssh-mcp)
![GitHub Repo stars](https://img.shields.io/github/stars/Xiyueyy/ssh-mcp)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/Xiyueyy/ssh-mcp)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-closed/Xiyueyy/ssh-mcp)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr/Xiyueyy/ssh-mcp)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr-closed/Xiyueyy/ssh-mcp)

SSH-based MCP (Model Context Protocol) server that allows remote execution of SSH commands via the MCP protocol.

English Document | [涓枃鏂囨。](README_CN.md)

## 馃摑 Project Overview

ssh-mcp-server is a bridging tool that enables AI assistants and other applications supporting the MCP protocol to execute remote SSH commands through a standardized interface. This allows AI assistants to safely operate remote servers, execute commands, and retrieve results without directly exposing SSH credentials to AI models.

Wechat MCP Technical Exchange Group:

![wx_1.png](images/wx_1.png)

## 鉁?Key Features

- **馃敀 Secure Connections**: Supports multiple secure SSH connection methods, including password authentication and private key authentication (with passphrase support)
- **馃洝锔?Command Security Control**: Precisely control the range of allowed commands through flexible blacklist and whitelist mechanisms to prevent dangerous operations
- **馃攧 Standardized Interface**: Complies with MCP protocol specifications for seamless integration with AI assistants supporting the protocol
- **馃搨 File Transfer**: Supports bidirectional file transfers, uploading local files to servers or downloading files from servers
- **馃攽 Credential Isolation**: SSH credentials are managed entirely locally and never exposed to AI models, enhancing security
- **馃殌 Ready to Use**: Can be run directly using NPX without global installation, making it convenient and quick to deploy

## 馃摝 Open Source Repository

GitHub: [https://github.com/Xiyueyy/ssh-mcp](https://github.com/Xiyueyy/ssh-mcp)

NPM: [https://www.npmjs.com/package/@xiyueyy/ssh-mcp](https://www.npmjs.com/package/@xiyueyy/ssh-mcp)

## 馃洜锔?Tools List

| Tool | Name | Description |
|---------|-----------|----------|
| execute-command | Command Execution Tool | Execute SSH commands on remote servers and get results |
| upload | File Upload Tool | Upload local files to specified locations on remote servers |
| download | File Download Tool | Download files from remote servers to local specified locations |
| list-servers | List Servers Tool | List all available SSH server configurations |

## 馃摎 Usage

### 馃敡 MCP Configuration Examples

> **鈿狅笍 Important**: In MCP configuration files, each command line argument and its value must be separate elements in the `args` array. Do NOT combine them with spaces. For example, use `"--host", "192.168.1.1"` instead of `"--host 192.168.1.1"`.

#### 鈿欙笍 Command Line Options

```text
Options:
  --config-file       JSON configuration file path (recommended for multiple servers)
  --ssh-config-file   SSH config file path (default: ~/.ssh/config)
  --ssh               SSH connection configuration (can be JSON string or legacy format)
  -h, --host          SSH server host address or alias from SSH config
  -p, --port          SSH server port
  -u, --username      SSH username
  -w, --password      SSH password
  -k, --privateKey    SSH private key file path
  -P, --passphrase    Private key passphrase (if any)
  -W, --whitelist     Command whitelist, comma-separated regular expressions
  -B, --blacklist     Command blacklist, comma-separated regular expressions
  -s, --socksProxy    SOCKS proxy server address (e.g., socks://user:password@host:port)
  --pty               Allocate pseudo-tty for command execution (default: true)
  --pre-connect       Pre-connect to all configured SSH servers on startup

```

#### 馃攽 Using Password

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "192.168.1.1",
        "--port", "22",
        "--username", "root",
        "--password", "pwd123456"
      ]
    }
  }
}
```

#### 馃攼 Using Private Key

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "192.168.1.1",
        "--port", "22",
        "--username", "root",
        "--privateKey", "~/.ssh/id_rsa"
      ]
    }
  }
}
```

#### 馃攺 Using Private Key with Passphrase

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "192.168.1.1",
        "--port", "22",
        "--username", "root",
        "--privateKey", "~/.ssh/id_rsa",
        "--passphrase", "pwd123456"
      ]
    }
  }
}
```

#### 馃搵 Using ~/.ssh/config

You can use host aliases defined in your `~/.ssh/config` file. The server will automatically read connection parameters from the SSH config:

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "myserver"
      ]
    }
  }
}
```

Assuming your `~/.ssh/config` contains:

```
Host myserver
    HostName 192.168.1.1
    Port 22
    User root
    IdentityFile ~/.ssh/id_rsa
```

You can also specify a custom SSH config file path:

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "myserver",
        "--ssh-config-file", "/path/to/custom/ssh_config"
      ]
    }
  }
}
```

**Note**: Command-line parameters take precedence over SSH config values. For example, if you specify `--port 2222`, it will override the port from SSH config.

#### 馃寪 Using SOCKS Proxy

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "192.168.1.1",
        "--port", "22",
        "--username", "root",
        "--password", "pwd123456",
        "--socksProxy", "socks://username:password@proxy-host:proxy-port"
      ]
    }
  }
}

```

#### 馃摑 Using Command Whitelist and Blacklist

Use the `--whitelist` and `--blacklist` parameters to restrict the range of executable commands. Multiple patterns are separated by commas. Each pattern is a regular expression used to match commands.

Example: Using Command Whitelist

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "192.168.1.1",
        "--port", "22",
        "--username", "root",
        "--password", "pwd123456",
        "--whitelist", "^ls( .*)?,^cat .*,^df.*"
      ]
    }
  }
}
```

Example: Using Command Blacklist

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--host", "192.168.1.1",
        "--port", "22",
        "--username", "root",
        "--password", "pwd123456",
        "--blacklist", "^rm .*,^shutdown.*,^reboot.*"
      ]
    }
  }
}
```

> Note: If both whitelist and blacklist are specified, the system will first check whether the command is in the whitelist, and then check whether it is in the blacklist. The command must pass both checks to be executed.

### 馃З Multi-SSH Connection Example

There are three ways to configure multiple SSH connections:

#### 馃搫 Method 1: Using Config File (Recommended)

Create a JSON configuration file (e.g., `ssh-config.json`):

**Array Format:**
```json
[
  {
    "name": "dev",
    "host": "1.2.3.4",
    "port": 22,
    "username": "alice",
    "password": "{abc=P100s0}",
    "socksProxy": "socks://127.0.0.1:10808"
  },
  {
    "name": "prod",
    "host": "5.6.7.8",
    "port": 22,
    "username": "bob",
    "password": "yyy",
    "socksProxy": "socks://127.0.0.1:10808"
  }
]
```

**Object Format:**
```json
{
  "dev": {
    "host": "1.2.3.4",
    "port": 22,
    "username": "alice",
    "password": "{abc=P100s0}",
    "socksProxy": "socks://127.0.0.1:10808"
  },
  "prod": {
    "host": "5.6.7.8",
    "port": 22,
    "username": "bob",
    "password": "yyy",
    "socksProxy": "socks://127.0.0.1:10808"
  }
}
```

Then use the `--config-file` parameter:

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--config-file", "ssh-config.json"
      ]
    }
  }
}
```

#### 馃敡 Method 2: Using JSON Format with --ssh Parameter

You can pass JSON-formatted configuration strings directly:

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
        "--ssh", "{\"name\":\"dev\",\"host\":\"1.2.3.4\",\"port\":22,\"username\":\"alice\",\"password\":\"{abc=P100s0}\",\"socksProxy\":\"socks://127.0.0.1:10808\"}",
        "--ssh", "{\"name\":\"prod\",\"host\":\"5.6.7.8\",\"port\":22,\"username\":\"bob\",\"password\":\"yyy\",\"socksProxy\":\"socks://127.0.0.1:10808\"}"
      ]
    }
  }
}
```

#### 馃摑 Method 3: Legacy Comma-Separated Format (Backward Compatible)

For simple cases without special characters in passwords, you can still use the legacy format:

```bash
npx @xiyueyy/ssh-mcp \
  --ssh "name=dev,host=1.2.3.4,port=22,user=alice,password=xxx" \
  --ssh "name=prod,host=5.6.7.8,port=22,user=bob,password=yyy"
```

> **鈿狅笍 Note**: The legacy format may have issues with passwords containing special characters like `=`, `,`, `{`, `}`. Use Method 1 or Method 2 for passwords with special characters.

In MCP tool calls, specify the connection name via the `connectionName` parameter. If omitted, the default connection is used.

Example (execute command on 'prod' connection):

```json
{
  "tool": "execute-command",
  "params": {
    "cmdString": "ls -al",
    "connectionName": "prod"
  }
}
```

Example (execute command with timeout options):

```json
{
  "tool": "execute-command",
  "params": {
    "cmdString": "ping -c 10 127.0.0.1",
    "connectionName": "prod",
    "timeout": 5000
  }
}
```

### 鈴憋笍 Command Execution Timeout

The `execute-command` tool supports timeout options to prevent commands from hanging indefinitely:

- **timeout**: Command execution timeout in milliseconds (optional, default is 30000ms)

This is particularly useful for commands like `ping`, `tail -f`, or other long-running processes that might block execution.

### 馃梻锔?List All SSH Servers

You can use the MCP tool `list-servers` to get all available SSH server configurations:

Example call:

```json
{
  "tool": "list-servers",
  "params": {}
}
```

Example response:

```json
[
  { "name": "dev", "host": "1.2.3.4", "port": 22, "username": "alice" },
  { "name": "prod", "host": "5.6.7.8", "port": 22, "username": "bob" }
]
```

## 馃洝锔?Security Considerations

This server provides powerful capabilities to execute commands and transfer files on remote servers. To ensure it is used securely, please consider the following:

- **Command Whitelisting**: It is *strongly recommended* to use the `--whitelist` option to restrict the set of commands that can be executed. Without a whitelist, any command can be executed on the remote server, which can be a significant security risk.
- **Private Key Security**: The server reads the SSH private key into memory. Ensure that the machine running the `ssh-mcp-server` is secure. Do not expose the server to untrusted networks.
- **Denial of Service (DoS)**: The server does not have built-in rate limiting. An attacker could potentially launch a DoS attack by flooding the server with connection requests or large file transfers. It is recommended to run the server behind a firewall or reverse proxy with rate-limiting capabilities.
- **Path Traversal**: The server has built-in protection against path traversal attacks on the local filesystem. However, it is still important to be mindful of the paths used in `upload` and `download` commands.

## 馃専 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Xiyueyy/ssh-mcp&type=date&legend=top-left)](https://www.star-history.com/#Xiyueyy/ssh-mcp&type=date&legend=top-left)

## AstrBot Admin Auth

This fork adds optional AstrBot admin authorization for all MCP tools:

- `execute-command`
- `upload`
- `download`
- `list-servers`

When enabled, each tool call must provide an `operatorId`. The server reads AstrBot's `admins_id` list from `cmd_config.json` and rejects operators that are not in that list.

### New CLI options

```text
--require-astrbot-admin   Require operatorId to match AstrBot admins_id
--admin-ids               Comma-separated admin IDs, e.g. 10001,10002
--astrbot-config-file     Path to AstrBot data/config/cmd_config.json
```

If `--admin-ids` is provided, it takes priority over `--astrbot-config-file`.

### Supported environment variables

```text
SSH_MCP_REQUIRE_ASTRBOT_ADMIN=1
SSH_MCP_ADMIN_IDS=10001,10002
SSH_MCP_ASTRBOT_CONFIG_PATH=/path/to/AstrBot/data/config/cmd_config.json

# also supported
REQUIRE_ASTRBOT_ADMIN=1
ADMIN_IDS=10001,10002
ASTRBOT_CONFIG_PATH=/path/to/AstrBot/data/config/cmd_config.json
ASTRBOT_ROOT=/path/to/AstrBot
```

### AstrBot MCP example

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "node",
      "args": [
        "/path/to/ssh-mcp-server/build/index.js",
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

### Simpler setup without reading AstrBot config

If you already know which sender IDs are administrators, you can configure them
directly and skip `cmd_config.json` entirely:

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@xiyueyy/ssh-mcp",
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

### Important limitation

AstrBot's native MCP integration does not automatically pass the current sender/admin ID into a stdio MCP server. Because of that, this fork can enforce AstrBot's admin list only when the caller explicitly passes `operatorId`.


