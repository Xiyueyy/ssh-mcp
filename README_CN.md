# 馃攼 ssh-mcp-server

鍩轰簬 SSH 鐨?MCP (Model Context Protocol) 鏈嶅姟鍣紝鍏佽閫氳繃 MCP 鍗忚杩滅▼鎵ц SSH 鍛戒护銆?

[English Document](README.md) | 涓枃鏂囨。

## 馃摑 椤圭洰浠嬬粛

ssh-mcp-server 鏄竴涓ˉ鎺ュ伐鍏凤紝鍙互璁?AI 鍔╂墜绛夋敮鎸?MCP 鍗忚鐨勫簲鐢ㄩ€氳繃鏍囧噯鍖栨帴鍙ｆ墽琛岃繙绋?SSH 鍛戒护銆傝繖浣垮緱 AI 鍔╂墜鑳藉瀹夊叏鍦版搷浣滆繙绋嬫湇鍔″櫒锛屾墽琛屽懡浠ゅ苟鑾峰彇缁撴灉锛岃€屾棤闇€鐩存帴鏆撮湶 SSH 鍑嵁缁?AI 妯″瀷銆?

寰俊MCP鎶€鏈氦娴佺兢锛?

![wx_1.png](images/wx_1.png)

## 鉁?鍔熻兘浜偣

- **馃敀 瀹夊叏杩炴帴**锛氭敮鎸佸绉嶅畨鍏ㄧ殑 SSH 杩炴帴鏂瑰紡锛屽寘鎷瘑鐮佽璇佸拰绉侀挜璁よ瘉锛堟敮鎸佸甫瀵嗙爜鐨勭閽ワ級
- **馃洝锔?鍛戒护瀹夊叏鎺у埗**锛氶€氳繃鐏垫椿鐨勯粦鐧藉悕鍗曟満鍒讹紝绮剧‘鎺у埗鍏佽鎵ц鐨勫懡浠よ寖鍥达紝闃叉鍗遍櫓鎿嶄綔
- **馃攧 鏍囧噯鍖栨帴鍙?*锛氱鍚?MCP 鍗忚瑙勮寖锛屼笌鏀寔璇ュ崗璁殑 AI 鍔╂墜鏃犵紳闆嗘垚
- **馃搨 鏂囦欢浼犺緭**锛氭敮鎸佸弻鍚戞枃浠朵紶杈撳姛鑳斤紝鍙笂浼犳湰鍦版枃浠跺埌鏈嶅姟鍣ㄦ垨浠庢湇鍔″櫒涓嬭浇鏂囦欢
- **馃攽 鍑嵁闅旂**锛歋SH 鍑嵁瀹屽叏鍦ㄦ湰鍦扮鐞嗭紝涓嶄細鏆撮湶缁?AI 妯″瀷锛屽寮哄畨鍏ㄦ€?
- **馃殌 鍗崇敤鍗宠蛋**锛氫娇鐢?NPX 鍙洿鎺ヨ繍琛岋紝鏃犻渶鍏ㄥ眬瀹夎锛屾柟渚垮揩鎹?

## 馃摝 寮€婧愪粨搴?

GitHub锛歔https://github.com/Xiyueyy/ssh-mcp](https://github.com/Xiyueyy/ssh-mcp)

NPM: [https://www.npmjs.com/package/@xiyueyy/ssh-mcp](https://www.npmjs.com/package/@xiyueyy/ssh-mcp)

## 馃洜锔?宸ュ叿鍒楄〃

| 宸ュ叿 | 鍚嶇О | 鎻忚堪 |
|---------|-----------|----------|
| execute-command | 鍛戒护鎵ц宸ュ叿 | 鍦ㄨ繙绋嬫湇鍔″櫒涓婃墽琛?SSH 鍛戒护骞惰幏鍙栨墽琛岀粨鏋?|
| upload | 鏂囦欢涓婁紶宸ュ叿 | 灏嗘湰鍦版枃浠朵笂浼犲埌杩滅▼鏈嶅姟鍣ㄦ寚瀹氫綅缃?|
| download | 鏂囦欢涓嬭浇宸ュ叿 | 浠庤繙绋嬫湇鍔″櫒涓嬭浇鏂囦欢鍒版湰鍦版寚瀹氫綅缃?|
| list-servers | 鏈嶅姟鍣ㄥ垪琛ㄥ伐鍏?| 鍒楀嚭鎵€鏈夊彲鐢⊿SH鏈嶅姟鍣ㄩ厤缃?|

## 馃摎 浣跨敤鏂规硶

### 馃敡 MCP 閰嶇疆绀轰緥

> **鈿狅笍 閲嶈鎻愮ず**: 鍦?MCP 閰嶇疆鏂囦欢涓紝姣忎釜鍛戒护琛屽弬鏁板拰鍏跺€煎繀椤绘槸 `args` 鏁扮粍涓殑鐙珛鍏冪礌銆備笉瑕佺敤绌烘牸灏嗗畠浠繛鎺ュ湪涓€璧枫€備緥濡傦紝浣跨敤 `"--host", "192.168.1.1"` 鑰屼笉鏄?`"--host 192.168.1.1"`銆?

#### 鈿欙笍 鍛戒护琛岄€夐」

```text
閫夐」:
  --config-file       JSON 閰嶇疆鏂囦欢璺緞锛堟帹鑽愮敤浜庡鏈嶅姟鍣ㄩ厤缃級
  --ssh-config-file   SSH 閰嶇疆鏂囦欢璺緞锛堥粯璁? ~/.ssh/config锛?
  --ssh               SSH 杩炴帴閰嶇疆锛堝彲浠ユ槸 JSON 瀛楃涓叉垨鏃ф牸寮忥級
  -h, --host          SSH 鏈嶅姟鍣ㄤ富鏈哄湴鍧€鎴?SSH 閰嶇疆涓殑鍒悕
  -p, --port          SSH 鏈嶅姟鍣ㄧ鍙?
  -u, --username      SSH 鐢ㄦ埛鍚?
  -w, --password      SSH 瀵嗙爜
  -k, --privateKey    SSH 绉侀挜鏂囦欢璺緞
  -P, --passphrase    绉侀挜瀵嗙爜锛堝鏋滄湁鐨勮瘽锛?
  -W, --whitelist     鍛戒护鐧藉悕鍗曪紝浠ラ€楀彿鍒嗛殧鐨勬鍒欒〃杈惧紡
  -B, --blacklist     鍛戒护榛戝悕鍗?浠ラ€楀彿鍒嗛殧鐨勬鍒欒〃杈惧紡
  -s, --socksProxy    SOCKS 浠ｇ悊鍦板潃 (e.g., socks://user:password@host:port)
  --pty               涓哄懡浠ゆ墽琛屽垎閰嶄吉缁堢 (榛樿: true)
  --pre-connect       鍚姩鏃堕杩炴帴鎵€鏈夐厤缃殑 SSH 鏈嶅姟鍣?
```

#### 馃攽 浣跨敤瀵嗙爜

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

#### 馃攼 浣跨敤绉侀挜

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

#### 馃攺 浣跨敤甯﹀瘑鐮佺閽?

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

#### 馃搵 浣跨敤 ~/.ssh/config

浣犲彲浠ヤ娇鐢?`~/.ssh/config` 鏂囦欢涓畾涔夌殑涓绘満鍒悕銆傛湇鍔″櫒浼氳嚜鍔ㄤ粠 SSH 閰嶇疆涓鍙栬繛鎺ュ弬鏁帮細

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

鍋囪浣犵殑 `~/.ssh/config` 鍖呭惈锛?

```
Host myserver
    HostName 192.168.1.1
    Port 22
    User root
    IdentityFile ~/.ssh/id_rsa
```

浣犱篃鍙互鎸囧畾鑷畾涔夌殑 SSH 閰嶇疆鏂囦欢璺緞锛?

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

**娉ㄦ剰**锛氬懡浠よ鍙傛暟浼樺厛绾ч珮浜?SSH 閰嶇疆鍊笺€備緥濡傦紝濡傛灉浣犳寚瀹氫簡 `--port 2222`锛屽畠浼氳鐩?SSH 閰嶇疆涓殑绔彛銆?

#### 馃寪 浣跨敤 SOCKS 浠ｇ悊

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

#### 馃摑 浣跨敤鍛戒护鐧藉悕鍗曞拰榛戝悕鍗?

浣跨敤 `--whitelist` 鍜?`--blacklist` 鍙傛暟鍙互闄愬埗鍙墽琛岀殑鍛戒护鑼冨洿锛屽涓ā寮忎箣闂寸敤閫楀彿鍒嗛殧銆傛瘡涓ā寮忛兘鏄竴涓鍒欒〃杈惧紡锛岀敤浜庡尮閰嶅懡浠ゃ€?

绀轰緥锛氫娇鐢ㄥ懡浠ょ櫧鍚嶅崟

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

绀轰緥锛氫娇鐢ㄥ懡浠ら粦鍚嶅崟

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

> 娉ㄦ剰锛氬鏋滃悓鏃舵寚瀹氫簡鐧藉悕鍗曞拰榛戝悕鍗曪紝绯荤粺浼氬厛妫€鏌ュ懡浠ゆ槸鍚﹀湪鐧藉悕鍗曚腑锛岀劧鍚庡啀妫€鏌ユ槸鍚﹀湪榛戝悕鍗曚腑銆傚懡浠ゅ繀椤诲悓鏃堕€氳繃涓ら」妫€鏌ユ墠鑳借鎵ц銆?

### 馃З 澶歋SH杩炴帴鐢ㄦ硶绀轰緥

鏈変笁绉嶆柟寮忓彲浠ラ厤缃涓?SSH 杩炴帴锛?

#### 馃搫 鏂瑰紡涓€锛氫娇鐢ㄩ厤缃枃浠讹紙鎺ㄨ崘锛?

鍒涘缓 JSON 閰嶇疆鏂囦欢锛堜緥濡?`ssh-config.json`锛夛細

**鏁扮粍鏍煎紡锛?*

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

**瀵硅薄鏍煎紡锛?*

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

鐒跺悗浣跨敤 `--config-file` 鍙傛暟锛?

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

#### 馃敡 鏂瑰紡浜岋細浣跨敤 JSON 鏍煎紡鐨?--ssh 鍙傛暟

鍙互鐩存帴浼犻€?JSON 鏍煎紡鐨勯厤缃瓧绗︿覆锛?

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

#### 馃摑 鏂瑰紡涓夛細鏃ф牸寮忛€楀彿鍒嗛殧锛堝悜鍚庡吋瀹癸級

瀵逛簬瀵嗙爜涓笉鍖呭惈鐗规畩瀛楃鐨勭畝鍗曟儏鍐碉紝浠嶅彲浣跨敤鏃ф牸寮忥細

```bash
npx @xiyueyy/ssh-mcp \
  --ssh "name=dev,host=1.2.3.4,port=22,user=alice,password=xxx" \
  --ssh "name=prod,host=5.6.7.8,port=22,user=bob,password=yyy"
```

> **鈿狅笍 娉ㄦ剰**锛氭棫鏍煎紡鍦ㄥ鐞嗗寘鍚壒娈婂瓧绗︼紙濡?`=`銆乣,`銆乣{`銆乣}`锛夌殑瀵嗙爜鏃跺彲鑳戒細鏈夐棶棰樸€傚鏋滃瘑鐮佸寘鍚壒娈婂瓧绗︼紝璇蜂娇鐢ㄦ柟寮忎竴鎴栨柟寮忎簩銆?

鍦∕CP宸ュ叿璋冪敤鏃讹紝閫氳繃 `connectionName` 鍙傛暟鎸囧畾鐩爣杩炴帴鍚嶇О锛屾湭鎸囧畾鏃朵娇鐢ㄩ粯璁よ繛鎺ャ€?

绀轰緥锛堝湪prod杩炴帴涓婃墽琛屽懡浠わ級锛?

```json
{
  "tool": "execute-command",
  "params": {
    "cmdString": "ls -al",
    "connectionName": "prod"
  }
}
```

绀轰緥锛堝甫瓒呮椂閫夐」鐨勫懡浠ゆ墽琛岋級锛?

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

### 鈴憋笍 鍛戒护鎵ц瓒呮椂

`execute-command` 宸ュ叿鏀寔瓒呮椂閫夐」锛岄槻姝㈠懡浠ゆ棤闄愭湡鎸傝捣锛?

- **timeout**: 鍛戒护鎵ц瓒呮椂鏃堕棿锛堟绉掞紝鍙€夛紝榛樿涓?0000ms锛?

杩欏浜庡儚 `ping`銆乣tail -f` 鎴栧叾浠栧彲鑳介樆濉炴墽琛岀殑闀挎椂闂磋繍琛岃繘绋嬬壒鍒湁鐢ㄣ€?

### 馃梻锔?鍒楀嚭鎵€鏈塖SH鏈嶅姟鍣?

鍙互閫氳繃MCP宸ュ叿 `list-servers` 鑾峰彇鎵€鏈夊彲鐢ㄧ殑SSH鏈嶅姟鍣ㄩ厤缃細

璋冪敤绀轰緥锛?

```json
{
  "tool": "list-servers",
  "params": {}
}
```

杩斿洖绀轰緥锛?

```json
[
  { "name": "dev", "host": "1.2.3.4", "port": 22, "username": "alice" },
  { "name": "prod", "host": "5.6.7.8", "port": 22, "username": "bob" }
]
```

## 馃洝锔?瀹夊叏娉ㄦ剰浜嬮」

璇ユ湇鍔″櫒鎻愪緵浜嗗湪杩滅▼鏈嶅姟鍣ㄤ笂鎵ц鍛戒护鍜屼紶杈撴枃浠剁殑寮哄ぇ鍔熻兘銆備负纭繚瀹夊叏浣跨敤锛岃娉ㄦ剰浠ヤ笅鍑犵偣锛?

- **鍛戒护鐧藉悕鍗?*锛?寮虹儓寤鸿* 浣跨敤 `--whitelist` 閫夐」鏉ラ檺鍒跺彲鎵ц鐨勫懡浠ら泦鍚堛€傚鏋滄病鏈夌櫧鍚嶅崟锛屼换浣曞懡浠ら兘鍙互鍦ㄨ繙绋嬫湇鍔″櫒涓婃墽琛岋紝杩欏彲鑳藉甫鏉ラ噸澶х殑瀹夊叏椋庨櫓銆?
- **绉侀挜瀹夊叏**锛氭湇鍔″櫒浼氬皢 SSH 绉侀挜璇诲叆鍐呭瓨銆傝纭繚杩愯 `ssh-mcp-server` 鐨勬満鍣ㄦ槸瀹夊叏鐨勩€備笉瑕佸皢鏈嶅姟鍣ㄦ毚闇茬粰涓嶅彈淇′换鐨勭綉缁溿€?
- **鎷掔粷鏈嶅姟鏀诲嚮 (DoS)**锛氭湇鍔″櫒娌℃湁鍐呯疆鐨勯€熺巼闄愬埗銆傛敾鍑昏€呭彲鑳介€氳繃鍚戞湇鍔″櫒鍙戦€佸ぇ閲忚繛鎺ヨ姹傛垨澶ф枃浠朵紶杈撴潵鍙戣捣 DoS 鏀诲嚮銆傚缓璁湪鍏锋湁閫熺巼闄愬埗鍔熻兘鐨勯槻鐏鎴栧弽鍚戜唬鐞嗗悗闈㈣繍琛屾湇鍔″櫒銆?
- **璺緞閬嶅巻**锛氭湇鍔″櫒鍐呯疆浜嗗鏈湴鏂囦欢绯荤粺璺緞閬嶅巻鏀诲嚮鐨勪繚鎶ゃ€備絾鏄紝浠嶇劧闇€瑕佹敞鎰忓湪 `upload` 鍜?`download` 鍛戒护涓娇鐢ㄧ殑璺緞銆?

## 馃幃 婕旂ず

### 馃枼锔?Cursor 鎺ュ叆

![demo_1.png](images/demo_1.png)

![demo_2.png](images/demo_2.png)

## 馃専 Star 鍘嗗彶

[![Star History Chart](https://api.star-history.com/svg?repos=Xiyueyy/ssh-mcp&type=date&legend=top-left)](https://www.star-history.com/#Xiyueyy/ssh-mcp&type=date&legend=top-left)

## AstrBot 绠＄悊鍛橀壌鏉?
杩欎釜鍒嗘敮缁欏叏閮?MCP 宸ュ叿澧炲姞浜嗗彲閫夌殑 AstrBot 绠＄悊鍛樻牎楠岋細

- `execute-command`
- `upload`
- `download`
- `list-servers`

鍚敤鍚庯紝姣忔宸ュ叿璋冪敤閮介渶瑕佷紶鍏?`operatorId`銆傛湇鍔＄浼氳鍙?AstrBot 鐨?`cmd_config.json` 涓殑 `admins_id`锛屽彧鏈夊懡涓殑鐢ㄦ埛鎵嶈兘鎵ц宸ュ叿銆?
### 鏂板鍛戒护琛屽弬鏁?
```text
--require-astrbot-admin   鍚敤 AstrBot 绠＄悊鍛樻牎楠?--admin-ids               鐩存帴濉啓绠＄悊鍛?ID锛岄€楀彿鍒嗛殧锛屼緥濡?10001,10002
--astrbot-config-file     AstrBot data/config/cmd_config.json 璺緞
```

濡傛灉鍚屾椂閰嶇疆浜?`--admin-ids` 鍜?`--astrbot-config-file`锛屼細浼樺厛浣跨敤 `--admin-ids`銆?
### 鏀寔鐨勭幆澧冨彉閲?
```text
SSH_MCP_REQUIRE_ASTRBOT_ADMIN=1
SSH_MCP_ADMIN_IDS=10001,10002
SSH_MCP_ASTRBOT_CONFIG_PATH=/path/to/AstrBot/data/config/cmd_config.json

# 鍏煎鍒悕
REQUIRE_ASTRBOT_ADMIN=1
ADMIN_IDS=10001,10002
ASTRBOT_CONFIG_PATH=/path/to/AstrBot/data/config/cmd_config.json
ASTRBOT_ROOT=/path/to/AstrBot
```

### AstrBot MCP 閰嶇疆绀轰緥

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

### 宸ュ叿璋冪敤绀轰緥

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

### 涓嶈鍙?AstrBot 閰嶇疆鐨勬洿绠€鍗曞啓娉?
濡傛灉浣犲凡缁忕煡閬撳摢浜?sender_id 鏄鐞嗗憳锛屽彲浠ョ洿鎺ュ啓姝诲湪 MCP 閰嶇疆閲岋紝涓嶉渶瑕佸啀璇诲彇 `cmd_config.json`锛?
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

### 直接从 GitHub 使用

如果你不想发 npm，也可以直接在 AstrBot 的 MCP 配置里写 GitHub 仓库：

```json
{
  "mcpServers": {
    "ssh-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "github:Xiyueyy/ssh-mcp",
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

说明：

- 仓库里已经加了 `prepare`，从 GitHub 安装时会自动构建。
- 服务器上仍然需要有 `git`、`node`、`npm`。
- 真正稳定后，建议固定 tag 或 commit，而不是一直跟默认分支。

### 闇€瑕佹敞鎰忕殑闄愬埗

AstrBot 褰撳墠鐨勫師鐢?MCP 鎺ュ叆涓嶄細鑷姩鎶娾€滃綋鍓嶅彂娑堟伅鐨勪汉鈥濈殑 ID 浼犵粰 stdio MCP 鏈嶅姟銆傛墍浠ヨ繖鐗堣櫧鐒惰兘璇诲彇 AstrBot 鐨勭鐞嗗憳閰嶇疆锛屼絾浠嶇劧闇€瑕佽皟鐢ㄦ柟鏄惧紡浼犲叆 `operatorId`锛屾墠鑳藉畬鎴愮鐞嗗憳鏍￠獙銆?
