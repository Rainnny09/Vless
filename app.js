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
vless://${UUID}@104.22.0.0:443?encryption=none&security=tls&sni=${CUSTOM_SNI}&fp=chrome&type=ws&host=${currentCloudrunHost}&path=${URL_PATH}#Vl-ws-tls-pro-${NAME}`;

            const finalOutput = NAME.includes('server') || NAME.includes('hostypanel') ? multiNodes : singleNode;

            const htmlPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAEN PRO VLESS DASHBOARD</title>
    <style>
        :root {
            --bg-main: #080c14;
            --panel-bg: rgba(17, 24, 39, 0.7);
            --panel-border: rgba(255, 255, 255, 0.08);
            --text-primary: #f3f4f6;
            --text-secondary: #9ca3af;
            --accent-blue: #3b82f6;
            --accent-blue-hover: #2563eb;
            --accent-green: #10b981;
            --accent-purple: #8b5cf6;
            --accent-orange: #f59e0b;
            --accent-red: #ef4444;
            --card-bg: rgba(31, 41, 55, 0.5);
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-main);
            background-image: 
                radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.08) 0px, transparent 50%);
            color: var(--text-primary);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            box-sizing: border-box;
        }

        .container {
            background: var(--panel-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--panel-border);
            border-radius: 24px;
            padding: 35px;
            max-width: 700px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            position: relative;
        }

        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
            background: linear-gradient(to right, #ffffff, #9ca3af);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            color: var(--accent-green);
            padding: 6px 14px;
            border-radius: 100px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background-color: var(--accent-green);
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 10px var(--accent-green);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 30px;
        }

        @media (max-width: 550px) {
            .info-grid { grid-template-columns: 1fr; }
        }

        .info-card {
            background: var(--card-bg);
            border: 1px solid rgba(255, 255, 255, 0.03);
            padding: 16px;
            border-radius: 14px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            transition: transform 0.2s, border-color 0.2s;
        }

        .info-card:hover {
            border-color: rgba(255, 255, 255, 0.08);
            transform: translateY(-2px);
        }

        .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(59, 130, 246, 0.1);
            color: var(--accent-blue);
            flex-shrink: 0;
        }
        .info-card.sni .icon-wrapper { background: rgba(139, 92, 246, 0.1); color: var(--accent-purple); }
        .info-card.path .icon-wrapper { background: rgba(245, 158, 135, 0.1); color: var(--accent-orange); }
        .info-card.uuid .icon-wrapper { background: rgba(239, 68, 68, 0.1); color: var(--accent-red); }

        .card-content {
            min-width: 0; /* allows word-break to function correctly */
        }

        .label {
            font-size: 11px;
            text-transform: uppercase;
            color: var(--text-secondary);
            margin-bottom: 4px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        .value {
            font-size: 13px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            word-break: break-all;
            color: #ffffff;
            font-weight: 500;
        }

        .config-box {
            background: #040710;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .config-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .config-title {
            font-size: 13px;
            font-weight: 600;
            color: var(--accent-green);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        textarea {
            width: 100%;
            height: 150px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.85);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12px;
            line-height: 1.6;
            resize: none;
            outline: none;
            padding: 0;
            box-sizing: border-box;
        }

        .btn-copy {
            width: 100%;
            background: var(--accent-blue);
            color: white;
            border: none;
            padding: 14px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }

        .btn-copy:hover { 
            background: var(--accent-blue-hover); 
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
        }
        
        .btn-copy:active { 
            transform: translateY(1px); 
        }

        .footer {
            text-align: center;
            font-size: 11px;
            color: #4b5563;
            margin-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.04);
            padding-top: 20px;
            letter-spacing: 0.3px;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>RAEN PRO NODE CONTROL</h1>
        <div class="status-badge">
            <span class="status-dot"></span>
            Node Secure & Active
        </div>
    </div>

    <div class="info-grid">
        <div class="info-card animate-card">
            <div class="icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            </div>
            <div class="card-content">
                <div class="label">Address Target</div>
                <div class="value">${CUSTOM_ADDRESS}</div>
            </div>
        </div>
        <div class="info-card sni">
            <div class="icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div class="card-content">
                <div class="label">SNI Spoofing</div>
                <div class="value">${CUSTOM_SNI}</div>
            </div>
        </div>
        <div class="info-card path">
            <div class="icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="6" y1="3" x2="10" y2="21"></line><line x1="14" y1="3" x2="18" y2="21"></line></svg>
            </div>
            <div class="card-content">
                <div class="label">Path Filter</div>
                <div class="value">/${PATH_NAME}</div>
            </div>
        </div>
        <div class="info-card uuid">
            <div class="icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="card-content">
                <div class="label">Binary UUID</div>
                <div class="value">${UUID}</div>
            </div>
        </div>
    </div>

    <div class="config-box">
        <div class="config-header">
            <div class="config-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                Vless Node Configuration
            </div>
        </div>
        <textarea id="configText" readonly>${finalOutput}</textarea>
    </div>

    <button class="btn-copy" onclick="copyConfig()">
        <svg id="btnIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <span id="btnText">Copy Configuration Strings</span>
    </button>

    <div class="footer">
        Powered by Node.js Infrastructure Engine Ecosystem
    </div>
</div>

<script>
    async function copyConfig() {
        const textElement = document.getElementById("configText");
        const btnText = document.getElementById("btnText");
        const btnIcon = document.getElementById("btnIcon");
        const btn = document.querySelector(".btn-copy");

        try {
            await navigator.clipboard.writeText(textElement.value);
            
            btnText.innerText = "Copied Configuration! ✅";
            btn.style.background = "var(--accent-green)";
            btn.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.25)";
            btnIcon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>'; // Checkmark icon
            
            setTimeout(() => {
                btnText.innerText = "Copy Configuration Strings";
                btn.style.background = "var(--accent-blue)";
                btn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";
                btnIcon.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            textElement.select();
            document.execCommand("copy");
        }
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
