const os = require('os');
const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');
const { execSync } = require('child_process');

function ensureModule(name) {
    try {
        require.resolve(name);
    } catch (e) {
        console.log(`Module '${name}' not found. Installing...`);
        execSync(`npm install ${name}`, { stdio: 'inherit' });
    }
}
ensureModule('ws');
const { WebSocket, createWebSocketStream } = require('ws');

const NAME = process.env.NAME || os.hostname();

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("甬哥Github项目  ：github.com/Hubdarkweb");
console.log("甬哥Blogger博客 ：darkwebforums.topnet7hackers.space");
console.log("甬哥YouTube频道 ：www.youtube.com/@topnet7hackersspace");
console.log("Nodejs自动化无交互Vless代理脚本");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

function getVariableValue(variableName, defaultValue) {
    return process.env[variableName] || defaultValue;
}

async function main() {
    const UUID = getVariableValue('UUID', 'aaaaaaa7-bbbb-7ccc-accc-eeeeeeeeeee7');
    console.log('你的UUID:', UUID);

    const PORT = getVariableValue('PORT', '8080');
    console.log('监听端口:', PORT);

    const PATH_NAME = 'raen_xlx'; 
    const URL_PATH = encodeURIComponent(`/${PATH_NAME}`); 

    // Custom spoofing settings
    const CUSTOM_HOST = 'firebase-settings.crashlytics.com';
    const CUSTOM_SNI = 'cares.paymaya.com';

    const CONFIG_DOMAIN = process.env.DOMAIN;
    if (CONFIG_DOMAIN) {
        console.log('静态配置域名:', CONFIG_DOMAIN);
    } else {
        console.log('未配置DOMAIN变量，将通过控制台输出默认格式，或在运行时通过请求头动态匹配。');
    }

    const httpServer = http.createServer((req, res) => {
        const currentDomain = CONFIG_DOMAIN || req.headers.host || 'your-cloudrun-url.run.app';

        if (req.url === `/${UUID}`) {
            let vlessURL;
            if (NAME.includes('server') || NAME.includes('hostypanel')) {
                vlessURL = `vless://{UUID}@${currentDomain}:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.16.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.17.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.18.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.19.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.20.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.21.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.22.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.24.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.25.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.26.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@104.27.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@[2606:4700::]:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
vless://${UUID}@[2400:cb00:2049::]:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}
`;
            } else {
                vlessURL = `vless://${UUID}@${currentDomain}:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}`;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(vlessURL + '\n');
        } else if (req.url === `/${PATH_NAME}`) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('WebSocket Endpoint Operational\n');
        } else {
            res.writeHead(502, { 'Content-Type': 'text/plain' });
            res.end('Hello, World-topnet7hackersspace\n');
        }
    });

    httpServer.listen(PORT, () => {
        console.log(`HTTP Server is running on port ${PORT}`);
    });

    const wss = new WebSocket.Server({ 
        server: httpServer,
        path: `/${PATH_NAME}` 
    });
    
    const uuid = UUID.replace(/-/g, "");
    wss.on('connection', ws => {
        ws.once('message', msg => {
            const [VERSION] = msg;
            const id = msg.slice(1, 17);
            if (!id.every((v, i) => v == parseInt(uuid.substr(i * 2, 2), 16))) return;
            let i = msg.slice(17, 18).readUInt8() + 19;
            const port = msg.slice(i, i += 2).readUInt16BE(0);
            const ATYP = msg.slice(i, i += 1).readUInt8();
            const host = ATYP == 1 ? msg.slice(i, i += 4).join('.') :
                (ATYP == 2 ? new TextDecoder().decode(msg.slice(i + 1, i += 1 + msg.slice(i, i + 1).readUInt8())) :
                    (ATYP == 3 ? msg.slice(i, i += 16).reduce((s, b, i, a) => (i % 2 ? s.concat(a.slice(i - 1, i + 1)) : s), []).map(b => b.readUInt16BE(0).toString(16)).join(':') : ''));
            ws.send(new Uint8Array([VERSION, 0]));
            const duplex = createWebSocketStream(ws);
            net.connect({ host, port }, function () {
                this.write(msg.slice(i));
                duplex.on('error', () => { }).pipe(this).on('error', () => { }).pipe(duplex);
            }).on('error', () => { });
        }).on('error', () => { });
    });

    const logDomain = CONFIG_DOMAIN || 'your-cloudrun-url.run.app';
    console.log(`vless-ws-tls节点分享 (基本配置): vless://${UUID}@${logDomain}:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${CUSTOM_HOST}&path=${URL_PATH}#Vl-ws-tls-${NAME}`);
}
main();
