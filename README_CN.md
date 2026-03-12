# ssh-mcp-server

基于 SSH 的 MCP（Model Context Protocol）服务器，用于远程执行命令和上传、
下载文件。

这个分支额外加入了 AstrBot 管理员鉴权能力，可以让 MCP 工具只允许指定
`sender_id` 对应的管理员调用。

[English Document](README.md)

## 链接

- GitHub：<https://github.com/Xiyueyy/ssh-mcp>
- npm：<https://www.npmjs.com/package/@ruawd/ssh-mcp>

## 功能

- 通过 MCP 执行 SSH 命令
- 上传文件到远程服务器
- 从远程服务器下载文件
- 列出已配置的 SSH 服务器
- 支持密码、私钥、`~/.ssh/config`
- 支持命令白名单和黑名单
- 支持按 AstrBot 管理员 ID 做工具级鉴权

## 内置工具

- `execute-command`
- `upload`
- `download`
- `list-servers`

## 安装

### AstrBot 场景推荐

如果是给 AstrBot 挂 stdio MCP，建议优先全局安装，比每次启动都临时跑
`npx` 更稳。

```bash
npm install -g @ruawd/ssh-mcp@1.3.4
```

安装后在 AstrBot 里把 `command` 配成 `ssh-mcp` 即可。

### 临时使用

```bash
npx -y @ruawd/ssh-mcp@1.3.4 --host 192.168.1.1 --port 22 --username root --password pwd123456
```

## AstrBot MCP 配置示例

### 全局安装方式

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

### 使用 `npx`

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

### 私钥登录示例

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

### 使用 `~/.ssh/config`

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

如果你的 `~/.ssh/config` 里有：

```text
Host myserver
    HostName 192.168.1.1
    Port 22
    User root
    IdentityFile ~/.ssh/id_rsa
```

那么服务会自动读取这些默认值。

## 命令行参数

```text
--config-file             JSON 配置文件路径
--ssh-config-file         SSH 配置文件路径
--ssh                     SSH 连接配置，可用 JSON 或旧格式
-h, --host                SSH 主机或 ssh config 里的别名
-p, --port                SSH 端口
-u, --username            SSH 用户名
-w, --password            SSH 密码
-k, --privateKey          SSH 私钥路径
-P, --passphrase          私钥口令
-W, --whitelist           命令白名单，逗号分隔的正则
-B, --blacklist           命令黑名单，逗号分隔的正则
-s, --socksProxy          SOCKS 代理地址
--pty                     为命令分配伪终端
--pre-connect             启动时预连接 SSH 服务器
--require-astrbot-admin   开启 AstrBot 管理员鉴权
--admin-ids               直接填写管理员 ID，逗号分隔
--astrbot-config-file     AstrBot 的 cmd_config.json 路径
```

## AstrBot 管理员鉴权

这个分支可以限制所有 MCP 工具只能由指定的 AstrBot 管理员调用。

启用后，每次工具调用都必须带上 `operatorId`。

管理员来源有两种：

1. 直接通过 `--admin-ids` 指定
2. 从 AstrBot 的 `cmd_config.json` 读取 `admins_id`

如果同时配置了两者，`--admin-ids` 优先。

### 直接指定管理员 ID

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

### 读取 AstrBot 配置文件

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

### 工具调用示例

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

## 重要限制

AstrBot 原生的 stdio MCP 集成不会自动把当前会话的 `sender_id` 传给 MCP
服务端。

所以这套鉴权需要两部分同时存在：

- 这个 MCP 服务负责校验 `operatorId`
- 上游负责把真实 `sender_id` 注入到 `operatorId`

如果你在 AstrBot 里使用，建议同时启用
`astrbot_plugin_mcp_id_injector`。

## 安全建议

- 生产环境优先使用 SSH 私钥
- 强烈建议配置命令白名单
- 不要把这个服务暴露给不可信调用方
- 上传和下载时注意目标路径安全
