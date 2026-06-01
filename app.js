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
    // Custom formatted binary ID structure
    const UUID = getVariableValue('UUID', '01110010011000010110010101101110');
    console.log('你的UUID:', UUID);

    const PORT = getVariableValue('PORT', '8080');
    console.log('监听端口:', PORT);

    const PATH_NAME = 'raen_xlx'; 
    const URL_PATH = encodeURIComponent(`/${PATH_NAME}`); 

    const CUSTOM_ADDRESS = 'firebase-settings.crashlytics.com';
    const CUSTOM_SNI = 'cares.paymaya.com';

    const CONFIG_DOMAIN = process.env.DOMAIN;

    const httpServer = http.createServer((req, res) => {
        const currentCloudrunHost = CONFIG_DOMAIN || req.headers.host || 'vless-930976547673.europe-west1.run.app';

        if (req.url === `/${UUID}`) {
            // Generating configs safely inside structured array parameters
            const singleNode = `vless://${UUID}@${CUSTOM_ADDRESS}:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}`;
            
            const multiNodes = `vless://${UUID}@${CUSTOM_ADDRESS}:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
vless://${UUID}@104.16.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
vless://${UUID}@104.17.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
vless://${UUID}@104.18.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
vless://${UUID}@104.19.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
vless://${UUID}@104.20.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
vless://${UUID}@104.21.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
vless://${UUID}@104.22.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}
`;

            const finalOutput = NAME.includes('server') || NAME.includes('hostypanel') ? multiNodes : singleNode;

            // HTML Dashboard design output replacing original raw flat text payload 
            const htmlPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAEN PRO VLESS DASHBOARD</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #0b0f19;
            color: #f3f4f6;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 16px;
            padding: 30px;
            max-width: 650px;
            width: 100%;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 2px solid #1f2937;
            padding-bottom: 15px;
        }
        .header h1 {
            color: #3b82f6;
            margin: 0;
            font-size: 24px;
            letter-spacing: 1px;
        }
        .header p {
            color: #9ca3af;
            margin: 5px 0 0 0;
            font-size: 14px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }
        .info-card {
            background: #1f2937;
            padding: 12px 15px;
            border-radius: 8px;
            border-left: 4px solid #10b981;
        }
        .info-card.sni { border-left-color: #8b5cf6; }
        .info-card.path { border-left-color: #f59e0b; }
        .info-card.uuid { border-left-color: #ef4444; }
        .label {
            font-size: 11px;
            text-transform: uppercase;
            color: #9ca3af;
            margin-bottom: 4px;
            font-weight: bold;
        }
        .value {
            font-size: 13px;
            font-family: monospace;
            word-break: break-all;
            color: #ffffff;
        }
        .config-box {
            position: relative;
            background: #030712;
            border: 1px dashed #4b5563;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        textarea {
            width: 100%;
            height: 140px;
            background: transparent;
            border: none;
            color: #10b981;
            font-family: monospace;
            font-size: 12px;
            resize: none;
            outline: none;
            padding: 0;
            box-sizing: border-box;
        }
        .btn-copy {
            width: 100%;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        .btn-copy:hover { background: #2563eb; }
        .btn-copy:active { background: #1d4ed8; }
        .footer {
            text-align: center;
            font-size: 11px;
            color: #4b5563;
            margin-top: 25px;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>RAEN PRO NODE CONTROL</h1>
        <p>Deployment Status: Online & Secure</p>
    </div>

    <div class="info-grid">
        <div class="info-card">
            <div class="label">Address target</div>
            <div class="value">${CUSTOM_ADDRESS}</div>
        </div>
        <div class="info-card sni">
            <div class="label">SNI Spoofing</div>
            <div class="value">${CUSTOM_SNI}</div>
        </div>
        <div class="info-card path">
            <div class="label">Path Filter</div>
            <div class="value">/${PATH_NAME}</div>
        </div>
        <div class="info-card uuid">
            <div class="label">Binary UUID</div>
            <div class="value">${UUID}</div>
        </div>
    </div>

    <div class="config-box">
        <div class="label" style="color: #10b981; margin-bottom: 10px;">Vless Node Configurations</div>
        <textarea id="configText" readonly>${finalOutput}</textarea>
    </div>

    <button class="btn-copy" onclick="copyConfig()">Copy Node Strings</button>

    <div class="footer">
        Powered by Node.js Running on Cloud Infrastructure Ecosystem
    </div>
</div>

<script>
    function copyConfig() {
        const textElement = document.getElementById("configText");
        textElement.select();
        textElement.setSelectionRange(0, 99999);
        document.execCommand("copy");
        
        const btn = document.querySelector(".btn-copy");
        btn.innerHTML = "Copied Success ✅";
        btn.style.background = "#10b981";
        
        setTimeout(() => {
            btn.innerHTML = "Copy Node Strings";
            btn.style.background = "#3b82f6";
        }, 2500);
    }
</script>

</body>
</html>`;

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(htmlPage);
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

    const logDomain = CONFIG_DOMAIN || 'vless-930976547673.europe-west1.run.app';
    console.log(`vless-ws-tls节点分享 (基本配置): vless://${UUID}@${CUSTOM_ADDRESS}:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${logDomain}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}`);
}
main();
