let ADMIN_PASSWORD = window.LOGICODE_ADMIN_PASSWORD || localStorage.getItem("logicodeAdminPassword") || "LR1a2b3c4567@";

const nowText = () => new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
const uid = () => Date.now() + Math.floor(Math.random() * 1000);

const seed = {
  users: [
    { id: 1, name: "Administrador", login: "administrador", role: "Administrador", sector: "Administrador", class: "Gestao" },
    { id: 2, name: "Prof. Marina Lopes", login: "professor", role: "Professor", sector: "Professor", class: "3 Logistica" },
    { id: 3, name: "Ana Recebimento", login: "ana", role: "Aluno", sector: "Recebimento", class: "3 Logistica A", score: 92 },
    { id: 4, name: "Lucas Conferencia", login: "lucas", role: "Aluno", sector: "Conferencia", class: "3 Logistica A", score: 86 },
    { id: 5, name: "Bianca Estoque", login: "bianca", role: "Aluno", sector: "Estoque", class: "3 Logistica A", score: 81 },
    { id: 6, name: "Rafael Expedicao", login: "rafael", role: "Aluno", sector: "Expedicao", class: "3 Logistica A", score: 74 },
  ],
  products: [
    { id: 1, name: "Notebook Dell Inspiron", code: "NB001", qr: "NB001", lot: "LOTE123", qty: 25, unit: "un", category: "Eletronicos", supplier: "Tech Escola", origin: "Matriz", state: "Bom Estado", sector: "Estoque", location: "Rua A / Corredor 02 / Prateleira 04 / Nivel 03 / Posicao B", validity: "2026-08-15", min: 8, photo: "" },
    { id: 2, name: "Monitor 24 LG", code: "MON002", qr: "MON002", lot: "LOTE456", qty: 15, unit: "un", category: "Eletronicos", supplier: "Distribuidora Vale", origin: "Centro de Distribuicao", state: "Bom Estado", sector: "Conferencia", location: "Rua B / Corredor 01 / Prateleira 02 / Nivel 01 / Posicao A", validity: "2027-12-20", min: 5, photo: "" },
    { id: 3, name: "Teclado Logitech K120", code: "TEC003", qr: "TEC003", lot: "LOTE789", qty: 50, unit: "un", category: "Perifericos", supplier: "Fornecedor Externo", origin: "Porto de Santos", state: "Bom Estado", sector: "Separacao", location: "Rua A / Corredor 03 / Prateleira 05 / Nivel 02 / Posicao C", validity: "", min: 12, photo: "" },
    { id: 4, name: "Mouse Logitech M90", code: "MOU004", qr: "MOU004", lot: "LOTE321", qty: 30, unit: "un", category: "Perifericos", supplier: "Fornecedor Externo", origin: "Filial", state: "Avariado", sector: "Avaria", location: "Rua C / Corredor 02 / Prateleira 03 / Nivel 01 / Posicao A", validity: "", min: 10, photo: "" },
    { id: 5, name: "Impressora HP LaserJet", code: "IMP005", qr: "IMP005", lot: "LOTE654", qty: 5, unit: "un", category: "Impressao", supplier: "HP Educacional", origin: "Matriz", state: "Bom Estado", sector: "Estoque", location: "Rua B / Corredor 01 / Prateleira 01 / Nivel 01 / Posicao D", validity: "2026-11-10", min: 6, photo: "" },
  ],
  activities: [
    { student: "Ana Recebimento", class: "3 Logistica A", done: 8, points: 92, errors: 1, time: "42 min" },
    { student: "Lucas Conferencia", class: "3 Logistica A", done: 7, points: 86, errors: 2, time: "48 min" },
    { student: "Bianca Estoque", class: "3 Logistica A", done: 6, points: 81, errors: 2, time: "51 min" },
  ],
};

const defaultHistory = [
  { id: 1, productId: 1, product: "Notebook Dell Inspiron", code: "NB001", action: "Recebido", from: "Fornecedor", to: "Recebimento", qty: 25, user: "Ana Recebimento", profile: "Recebimento", date: "27/05/2026 10:00", obs: "Produto recebido para aula pratica.", photo: "" },
  { id: 2, productId: 1, product: "Notebook Dell Inspiron", code: "NB001", action: "Conferido", from: "Recebimento", to: "Conferencia", qty: 25, user: "Lucas Conferencia", profile: "Conferencia", date: "27/05/2026 10:10", obs: "Lote, validade e quantidade conferidos.", photo: "" },
  { id: 3, productId: 1, product: "Notebook Dell Inspiron", code: "NB001", action: "Armazenado", from: "Conferencia", to: "Estoque", qty: 25, user: "Bianca Estoque", profile: "Estoque", date: "27/05/2026 10:30", obs: "Endereco logistico definido.", photo: "" },
];

const store = {
  users: "logicodeUsers",
  products: "logicodeProducts",
  history: "logicodeHistory",
};

const state = {
  route: "home",
  user: null,
  users: JSON.parse(localStorage.getItem(store.users) || "null") || seed.users,
  products: JSON.parse(localStorage.getItem(store.products) || "null") || seed.products,
  history: JSON.parse(localStorage.getItem(store.history) || "null") || defaultHistory,
  activities: seed.activities,
  qrText: "Produto: Notebook Dell Inspiron | Codigo: NB001 | Rua A / Corredor 02 / Prateleira 04",
  activeTab: "",
};

state.products = state.products.map((p, index) => ({ min: 5, qr: p.code, photo: "", ...p, id: p.id || uid() + index }));
state.users = state.users.map((u, index) => ({ sector: u.role || "Aluno", class: "-", ...u, id: u.id || uid() + index }));

const icons = {
  dashboard: "[D]", codes: "[QR]", receiving: "[R]", conference: "[CF]", stock: "[E]", movement: "[M]", exit: "[S]",
  inventory: "[I]", orders: "[P]", transport: "[T]", history: "[H]", activities: "[A]", learn: "[?]", reports: "[G]",
  users: "[U]", settings: "[C]", certificate: "[CE]",
};

function persist() {
  localStorage.setItem(store.users, JSON.stringify(state.users));
  localStorage.setItem(store.products, JSON.stringify(state.products));
  localStorage.setItem(store.history, JSON.stringify(state.history));
}

function app(html) {
  document.getElementById("app").innerHTML = html;
  bindCommon();
}

function logo() {
  return `<div class="brand"><div class="brand-mark">LC</div><span>LOGICODE<small>ACADEMY</small></span></div>`;
}

function findProduct(value) {
  const q = String(value || "").trim().toLowerCase();
  return state.products.find(p => [p.code, p.qr, p.name, p.lot].some(v => String(v || "").toLowerCase() === q || String(v || "").toLowerCase().includes(q)));
}

function currentProfile() {
  return state.user?.sector || state.user?.role || "Administrador";
}

function canUseSector(sector) {
  if (!state.user) return true;
  if (["Administrador", "Professor"].includes(state.user.role)) return true;
  return state.user.sector === sector;
}

function sectorGuard(sector) {
  if (canUseSector(sector)) return "";
  return `<div class="card blocked"><h2>Acesso bloqueado para este perfil</h2><p>Seu setor liberado e <b>${state.user.sector}</b>. O professor ou administrador pode liberar outro setor na tela Usuarios.</p></div>`;
}

function recordHistory(product, action, from, to, qty, obs = "", photo = "") {
  const item = {
    id: uid(),
    productId: product.id,
    product: product.name,
    code: product.code,
    action,
    from,
    to,
    qty: Number(qty || 0),
    user: state.user?.name || "Administrador",
    profile: currentProfile(),
    date: nowText(),
    obs,
    photo,
  };
  state.history.unshift(item);
  persist();
  return item;
}

function home() {
  state.route = "home";
  app(`
    <main class="home">
      <section class="hero">
        <nav>${logo()}<div class="nav-links"><a href="#logistica">Logistica</a><a href="#modulos">Modulos</a><a href="#sobre">Escola</a><a href="#tcc">TCC</a><button class="btn" data-route="login">Entrar</button></div></nav>
        <div class="hero-copy">
          <h1>LogiCode Academy</h1>
          <h2>Plataforma Educacional de Logistica e Rastreabilidade</h2>
          <p>Simule uma empresa real com recebimento, conferencia, estoque, separacao, expedicao, avaria, leitura por camera, historico e painel do professor.</p>
          <div class="hero-actions"><button class="btn" data-route="login">Acessar Sistema</button><a class="btn secondary" href="#logistica">Saiba Mais</a></div>
        </div>
      </section>
      <div class="metric-row">
        <div class="metric"><span><strong>12</strong><small>Modulos Interativos</small></span></div>
        <div class="metric"><span><strong>+25</strong><small>Atividades Praticas</small></span></div>
        <div class="metric"><span><strong>100%</strong><small>Uso no Celular</small></span></div>
        <div class="metric"><span><strong>WMS</strong><small>Simulacao Real</small></span></div>
      </div>
      <section class="section" id="logistica">
        <div class="section-title"><h2>Aprenda logistica praticando</h2><p>Cada aluno trabalha em um setor, como em uma operacao real de deposito.</p></div>
        <div class="feature-grid" id="modulos">
          ${feature("[01]", "Recebimento", "Cadastro de mercadorias, origem, fornecedor, lote e documentos.")}
          ${feature("[02]", "Conferencia", "Validacao de quantidade, validade, estado e avarias.")}
          ${feature("[03]", "Estoque", "Leitura do QR Code e armazenagem no endereco logistico.")}
          ${feature("[04]", "Separacao", "Picking por pedido e leitura pela camera do celular.")}
          ${feature("[05]", "Expedicao", "Baixa por QR Code, comprovante e destino final.")}
          ${feature("[06]", "Historico", "Rastreabilidade completa por produto, aluno, setor e data.")}
        </div>
        <div class="wide-grid">
          <div class="dark-panel"><h2>Fluxo da simulacao</h2><div class="steps">${["Receber", "Conferir", "Armazenar", "Expedir"].map((t,i)=>`<div class="step"><b>${i+1}</b><h4>${t}</h4><p>${["Aluno cadastra o produto.", "Aluno valida lote e estado.", "Aluno le QR Code e endereca.", "Aluno separa e da saida."][i]}</p></div>`).join("")}</div></div>
          <div class="dark-panel"><h2>Diferenciais do TCC</h2><ul><li>Scanner por camera do celular</li><li>Perfis por setor logistico</li><li>Historico obrigatorio automatico</li><li>Relatorios e painel do professor</li><li>Dados prontos para demonstracao</li></ul></div>
        </div>
      </section>
      <section class="section about" id="sobre"><div><h2>Sobre a Escola</h2><p>Espaco institucional editavel pelo administrador para apresentar a escola, o curso e a aplicacao pratica do projeto.</p><button class="btn">Conheca Nossa Escola</button></div><div class="school-placeholder">Espaco para imagem da escola</div></section>
      <section class="section" id="tcc"><div class="card"><h2>Sobre o Projeto TCC</h2><p><b>LogiCode Academy: Plataforma Educacional para Simulacao de Processos Logisticos Utilizando QR Code, Codigo de Barras e Rastreabilidade de Estoque em Ambiente Web Responsivo.</b></p><p>O projeto aproxima alunos da rotina de um WMS com setores, permissoes, inventario, pedidos, avarias e rastreabilidade.</p></div></section>
    </main>
  `);
}

function feature(icon, title, text) {
  return `<article class="feature-card"><div class="feature-icon">${icon}</div><h3>${title}</h3><p>${text}</p></article>`;
}

function login() {
  state.route = "login";
  app(`
    <main class="login-screen">
      <form class="login-card" id="loginForm">
        ${logo()}
        <h1>Bem-vindo de volta!</h1>
        <p>Entre como administrador, professor ou aluno por setor</p>
        <div class="field"><label>Usuario</label><input id="loginUser" value="administrador" autocomplete="username" /></div><br>
        <div class="field"><label>Senha</label><input id="loginPass" type="password" value="${ADMIN_PASSWORD}" autocomplete="current-password" /></div>
        <button class="btn btn-lg" style="width:100%">Entrar</button>
        <p class="hint" style="margin-top:18px;">Exemplos: administrador, professor, ana, lucas, bianca, rafael. Senha obrigatoria apenas para administrador.</p>
      </form>
    </main>
  `);
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginValue = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value;
    const found = state.users.find(u => u.login === loginValue);
    if (!found) return alert("Usuario nao encontrado.");
    if (found.login === "administrador" && pass !== ADMIN_PASSWORD) return alert("Senha do administrador incorreta.");
    state.user = found;
    dashboard();
  });
}

function shell(view, title) {
  state.route = view;
  const menu = [
    ["dashboard", "Dashboard", icons.dashboard], ["codes", "Codigos", icons.codes], ["receiving", "Recebimento", icons.receiving],
    ["conference", "Conferencia", icons.conference], ["stock", "Estoque", icons.stock], ["movement", "Movimentacao", icons.movement],
    ["exit", "Saida", icons.exit], ["inventory", "Inventario", icons.inventory], ["orders", "Pedidos", icons.orders],
    ["transport", "Docas e Transporte", icons.transport], ["history", "Historico Geral", icons.history], ["activities", "Atividades", icons.activities],
    ["learn", "Aprendizado", icons.learn], ["certificate", "Certificados", icons.certificate], ["reports", "Relatorios", icons.reports],
    ["users", "Usuarios", icons.users], ["settings", "Configuracoes", icons.settings],
  ];
  const mobile = ["dashboard", "stock", "scan", "history", "exit"];
  return `
    <div class="shell">
      <aside class="sidebar">${logo()}<div class="side-menu">${menu.map(m => `<button class="${view===m[0]?"active":""}" data-route="${m[0]}"><span>${m[2]}</span>${m[1]}</button>`).join("")}</div><div class="side-user"><div class="avatar">${(state.user?.name || "A")[0]}</div><div><b>${state.user?.name || "Administrador"}</b><br>${currentProfile()}</div></div></aside>
      <main class="main"><div class="top-image"></div><div class="topbar"><b>${title}</b><div class="top-actions"><select id="routeSelect" aria-label="Ir para modulo">${menu.map(m => `<option value="${m[0]}" ${view===m[0]?"selected":""}>${m[1]}</option>`).join("")}</select><button class="icon-btn" title="Ler codigo" data-scan="open">QR</button> <button class="icon-btn" title="Perfil">${(state.user?.name || "A")[0]}</button></div></div><div class="content" id="content"></div></main>
      <nav class="mobile-menu">${mobile.map(k => k === "scan" ? `<button data-scan="open"><span>[QR]</span>Scanner</button>` : `<button class="${view===k?"active":""}" data-route="${k}"><span>${icons[k]}</span>${menu.find(m=>m[0]===k)?.[1] || k}</button>`).join("")}</nav>
    </div>
    <div id="modalRoot"></div>
    <div id="scanner" class="scanner hidden">
      <div class="scanner-panel">
        <div class="page-title"><h1>Ler QR Code / Codigo de Barras</h1><button class="icon-btn" id="closeScanner">X</button></div>
        <video id="scannerVideo" autoplay muted playsinline></video>
        <p id="scannerStatus">Aponte a camera para o codigo. Se o navegador nao permitir leitura automatica, use o campo manual para demonstracao.</p>
        <div class="scan-actions"><input id="manualCode" placeholder="Digite ou cole o codigo do produto"><button class="btn btn-lg" id="manualScan">Abrir Produto</button></div>
      </div>
    </div>`;
}

function renderShell(view, title, body) {
  app(shell(view, title));
  document.getElementById("content").innerHTML = body;
  bindCommon();
}

function bindCommon() {
  document.querySelectorAll("[data-route]").forEach(btn => btn.addEventListener("click", () => route(btn.dataset.route)));
  document.querySelectorAll("[data-scan]").forEach(btn => btn.addEventListener("click", () => openScanner()));
  const close = document.getElementById("closeScanner");
  if (close) close.addEventListener("click", closeScanner);
  const manual = document.getElementById("manualScan");
  if (manual) manual.addEventListener("click", () => handleScan(document.getElementById("manualCode").value));
  const routeSelect = document.getElementById("routeSelect");
  if (routeSelect) routeSelect.addEventListener("change", (e) => route(e.target.value));
}

function dashboard() {
  const total = state.products.reduce((s,p)=>s+p.qty,0);
  const av = state.products.filter(p=>p.state !== "Bom Estado").length;
  const low = state.products.filter(p=>p.qty <= p.min).length;
  renderShell("dashboard", "Dashboard", `
    <div class="cards">
      ${stat("[P]", "Produtos", state.products.length, "cadastrados")}
      ${stat("[E]", "Estoque Total", total, "unidades")}
      ${stat("[A]", "Avariados", av, "itens")}
      ${stat("[!]", "Estoque Baixo", low, "alertas")}
    </div>
    <div class="dashboard-grid">
      <section class="card"><h2>Atividades Recentes</h2>${state.history.slice(0,5).map(h => historyLine(h)).join("")}</section>
      <section class="card"><h2>Painel do Professor</h2>${state.activities.map((a,i)=>`<div class="activity"><span class="tag">${i+1}</span><div><b>${a.student}</b><br><small>${a.class} | ${a.done} tarefas | ${a.errors} erros | ${a.time}</small></div><b>${a.points}</b></div>`).join("")}<br><button class="btn" data-route="activities">Ver atividades</button></section>
    </div>`);
}

function stat(icon, label, value, sub) {
  return `<article class="card stat"><div class="stat-icon">${icon}</div><div><small>${label}</small><strong>${value}</strong><small>${sub}</small></div></article>`;
}

function historyLine(h) {
  return `<div class="activity"><span class="tag">${h.action}</span><div><b>${h.product}</b><br><small>${h.from} -> ${h.to} | ${h.user} (${h.profile})</small></div><small>${h.date}</small></div>`;
}

function tabs(items, active) {
  return `<div class="tabs">${items.map(i => `<button class="${i.key===active?"active":""}" data-route="${i.route || i.key}">${i.label}</button>`).join("")}</div>`;
}

function codes() {
  renderShell("codes", "Codigos Logisticos", `
    ${tabs([{key:"codes",label:"Gerar QR Code"},{key:"history",label:"Historico Geral",route:"history"}], "codes")}
    <div class="split">
      <section class="card">
        <div class="form-grid">
          <div class="field span-2"><label>Tipo de QR Code</label><select id="qrType"><option>Produto</option><option>Texto</option><option>Numero</option><option>Link</option><option>Imagem/Anexo</option></select></div>
          <div class="field span-2"><label>Formato</label><select><option>QR Code</option><option>EAN-13</option><option>Code128</option><option>UPC</option></select></div>
          <div class="field span-4"><label>Informacao codificada</label><textarea id="qrText" rows="4">${state.qrText}</textarea></div>
          <div class="field span-2"><label>Anexo opcional</label><input type="file" /></div>
          <div class="field span-2"><label>Produto</label><select id="qrProduct">${state.products.map(p=>`<option value="${p.id}">${p.code} - ${p.name}</option>`)}</select></div>
        </div>
        <br><button class="btn btn-lg" id="makeQr">Gerar Etiqueta</button> <button class="btn ghost btn-lg" data-scan="open">Ler pela camera</button>
      </section>
      <aside class="card"><h2>Explicacao pedagogica</h2><p>QR Code guarda mais informacoes e pode conter texto, link ou dados do produto. Codigo de barras e linear, rapido e muito usado em etiquetas. Ambos ajudam na entrada, saida, localizacao, conferencia e rastreabilidade.</p></aside>
    </div>
    <div class="wide-grid"><div class="qr-preview"><canvas id="qrCanvas" width="230" height="230"></canvas></div><div class="card"><h2>Etiqueta Logistica</h2><div class="barcode"></div><p id="labelText"></p><button class="btn">Download PNG</button> <button class="btn">Download PDF</button> <button class="btn ghost" onclick="window.print()">Imprimir</button></div></div>
  `);
  drawQr();
  document.getElementById("makeQr").addEventListener("click", drawQr);
  document.getElementById("qrProduct").addEventListener("change", (e) => {
    const p = state.products.find(x => String(x.id) === e.target.value);
    document.getElementById("qrText").value = `${p.name} | Codigo: ${p.code} | Lote: ${p.lot} | ${p.location}`;
    drawQr();
  });
}

function drawQr() {
  const text = document.getElementById("qrText")?.value || state.qrText;
  state.qrText = text;
  const c = document.getElementById("qrCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0,0,230,230);
  ctx.fillStyle = "#111";
  const size = 10;
  let hash = 0;
  for (let i=0; i<text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  function marker(x,y){ ctx.fillRect(x,y,70,70); ctx.fillStyle="#fff"; ctx.fillRect(x+10,y+10,50,50); ctx.fillStyle="#111"; ctx.fillRect(x+22,y+22,26,26); }
  marker(10,10); marker(150,10); marker(10,150);
  for (let y=0; y<23; y++) for (let x=0; x<23; x++) {
    const protectedMarker = (x<8&&y<8)||(x>14&&y<8)||(x<8&&y>14);
    if (!protectedMarker && (((x*31 + y*17 + hash) % 5) < 2)) ctx.fillRect(x*size, y*size, size-2, size-2);
  }
  const label = document.getElementById("labelText");
  if (label) label.textContent = text;
}

function receiving() {
  renderShell("receiving", "Recebimento de Produtos", `
    ${sectorGuard("Recebimento")}
    ${tabs([{key:"receiving",label:"Novo Recebimento"},{key:"history",label:"Historico Geral",route:"history"}], "receiving")}
    <form class="card" id="productForm"><h2>Dados do Produto</h2>
      <div class="form-grid">
        ${field("Nome do Produto", "name", "Caixa Didatica Logistica")}
        ${field("Codigo Interno / QR", "code", "CXA010")}
        ${field("Quantidade Recebida", "qty", "10", "number")}
        ${field("Unidade", "unit", "un")}
        ${select("Categoria", "category", ["Eletronicos","Perifericos","Alimentos","Limpeza","Material Escolar"])}
        ${field("Lote", "lot", "LOTE900")}
        ${field("Validade", "validity", "", "date")}
        ${select("Fornecedor", "supplier", ["Tech Escola","Distribuidora Vale","Fornecedor Externo","HP Educacional"])}
        ${select("Origem do Produto", "origin", ["Porto de Santos","Centro de Distribuicao","Fornecedor Externo","Matriz","Filial"])}
        ${select("Estado do Produto", "state", ["Bom Estado","Avariado","Embalagem danificada","Produto incompleto","Produto vencido"])}
        ${select("Setor de Destino", "sector", ["Conferencia","Estoque","Separacao","Expedicao","Avaria","Devolucao"])}
        ${select("Responsavel", "owner", state.users.map(u=>u.name))}
        ${field("Rua", "street", "Rua A")}
        ${field("Corredor", "corridor", "Corredor 02")}
        ${field("Prateleira", "shelf", "Prateleira 04")}
        ${field("Nivel", "level", "Nivel 03")}
        ${field("Posicao", "position", "Posicao B")}
        <div class="field span-2"><label>Foto do Produto</label><input name="photo" type="file" accept="image/*" capture="environment"></div>
        <div class="field span-2"><label>Foto da Nota Fiscal</label><input type="file" accept="image/*" capture="environment"></div>
        <div class="field span-4"><label>Observacao</label><textarea name="obs" rows="3" placeholder="Observacao da avaria, documento ou recebimento..."></textarea></div>
      </div><br><button class="btn success btn-lg">Salvar Recebimento</button>
    </form>`);
  document.getElementById("productForm").addEventListener("submit", addProduct);
}

function conference() {
  renderShell("conference", "Conferencia de Mercadorias", `
    ${sectorGuard("Conferencia")}
    <div class="page-title"><h1>Conferir por QR Code</h1><button class="btn btn-lg" data-scan="open">Ler QR Code / Codigo de Barras</button></div>
    <form class="card" id="conferenceForm">
      <div class="form-grid">
        ${field("Produto / Codigo", "code", "MON002")}
        ${field("Quantidade conferida", "qty", "15", "number")}
        ${field("Lote conferido", "lot", "LOTE456")}
        ${field("Validade conferida", "validity", "2027-12-20", "date")}
        ${select("Estado", "state", ["Bom Estado","Avariado","Embalagem danificada","Produto incompleto","Produto vencido"])}
        ${select("Enviar para", "to", ["Estoque","Avaria","Devolucao"])}
        <div class="field span-2"><label>Foto da conferencia/avaria</label><input name="photo" type="file" accept="image/*" capture="environment"></div>
        <div class="field span-4"><label>Observacao</label><textarea name="obs" rows="3">Quantidade, lote e validade conferidos.</textarea></div>
      </div><br><button class="btn success btn-lg">Confirmar Conferencia</button>
    </form>`);
  document.getElementById("conferenceForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!canUseSector("Conferencia")) return alert("Perfil sem permissao para conferencia.");
    const f = new FormData(e.currentTarget);
    const p = findProduct(f.get("code"));
    if (!p) return alert("Produto nao encontrado.");
    p.state = f.get("state");
    p.sector = f.get("to");
    p.lot = f.get("lot");
    p.validity = f.get("validity");
    recordHistory(p, "Conferido", "Recebimento", f.get("to"), f.get("qty"), f.get("obs"));
    persist();
    showProduct(p);
  });
}

function field(label, name, value="", type="text") {
  return `<div class="field"><label>${label}</label><input name="${name}" type="${type}" value="${value}"></div>`;
}
function select(label, name, options) {
  return `<div class="field"><label>${label}</label><select name="${name}">${options.map(o=>`<option>${o}</option>`).join("")}</select></div>`;
}

function addProduct(e) {
  e.preventDefault();
  if (!canUseSector("Recebimento")) return alert("Perfil sem permissao para recebimento.");
  const f = new FormData(e.currentTarget);
  const location = `${f.get("street")} / ${f.get("corridor")} / ${f.get("shelf")} / ${f.get("level")} / ${f.get("position")}`;
  const product = { id: uid(), name:f.get("name"), code:f.get("code"), qr:f.get("code"), lot:f.get("lot"), qty:Number(f.get("qty")), unit:f.get("unit"), category:f.get("category"), supplier:f.get("supplier"), origin:f.get("origin"), state:f.get("state"), sector:f.get("sector"), location, validity:f.get("validity"), min: 5, photo: "" };
  state.products.unshift(product);
  recordHistory(product, "Recebido", "Fornecedor", f.get("sector"), product.qty, f.get("obs"));
  persist();
  alert("Produto cadastrado e historico gerado automaticamente.");
  showProduct(product);
}

function stock() {
  const rows = productRows(state.products);
  renderShell("stock", "Estoque Geral", `
    <div class="page-title"><h1>Estoque Geral</h1><button class="btn btn-lg" data-scan="open">Ler QR Code / Codigo de Barras</button></div>
    <div class="card"><div class="filters"><input id="stockSearch" placeholder="Buscar por nome, codigo, QR, lote, fornecedor, setor ou prateleira..."><button class="btn ghost">Filtros</button></div><div class="table-wrap"><table><thead><tr><th>Produto</th><th>Codigo</th><th>Lote</th><th>Qtd</th><th>Setor</th><th>Localizacao</th><th>Estado</th><th>Abrir</th></tr></thead><tbody id="stockRows">${rows}</tbody></table></div></div>
    <div class="mini-cards">${stat("[E]","Estoque Total",state.products.reduce((s,p)=>s+p.qty,0),"unidades")}${stat("[!]","Baixo Estoque",state.products.filter(p=>p.qty<=p.min).length,"itens")}${stat("[V]","Vencendo","5","em 7 dias")}${stat("[A]","Avariados",state.products.filter(p=>p.state!=="Bom Estado").length,"itens")}</div>
  `);
  document.getElementById("stockSearch").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.getElementById("stockRows").innerHTML = productRows(state.products.filter(p => Object.values(p).join(" ").toLowerCase().includes(q)));
    bindProductButtons();
  });
  bindProductButtons();
}

function productRows(products) {
  return products.map(p => `<tr><td>${p.name}</td><td>${p.code}</td><td>${p.lot}</td><td>${p.qty}</td><td>${p.sector}</td><td>${p.location}</td><td class="${p.state==="Bom Estado"?"status-good":"status-bad"}">${p.state}</td><td><button class="btn ghost open-product" data-product="${p.id}">Ficha</button></td></tr>`).join("");
}

function bindProductButtons() {
  document.querySelectorAll(".open-product").forEach(btn => btn.addEventListener("click", () => {
    const p = state.products.find(x => String(x.id) === btn.dataset.product);
    showProduct(p);
  }));
}

function movement() {
  renderShell("movement", "Movimentacao de Mercadorias", `
    ${sectorGuard("Estoque")}
    ${tabs([{key:"movement",label:"Nova Movimentacao"},{key:"history",label:"Historico",route:"history"}], "movement")}
    <div class="page-title"><h1>Movimentar por QR Code</h1><button class="btn btn-lg" data-scan="open">Ler QR Code / Codigo de Barras</button></div>
    <div class="split">
      <form class="card" id="moveForm"><div class="form-grid">
        ${field("Produto / Codigo", "code", "NB001")}
        ${field("Quantidade", "qty", "1", "number")}
        ${select("Setor de origem", "from", ["Recebimento","Conferencia","Estoque","Separacao","Expedicao","Avaria"])}
        ${select("Setor de destino", "to", ["Conferencia","Estoque","Separacao","Expedicao","Avaria","Devolucao"])}
        ${field("Nova localizacao", "location", "Rua B / Corredor 01 / Prateleira 01 / Nivel 02 / Posicao A")}
        ${select("Motivo", "reason", ["Armazenagem","Separacao","Inventario","Avaria","Aula pratica"])}
        <div class="field span-4"><label>Observacao</label><textarea name="obs" rows="3">Movimentacao registrada por leitura ou busca manual.</textarea></div>
      </div><br><button class="btn success btn-lg">Confirmar Movimentacao</button></form>
      <aside class="card"><h2>Resumo</h2><p>Ao confirmar, o produto muda de setor/localizacao e o historico e gravado com responsavel, perfil, data e hora.</p></aside>
    </div>`);
  document.getElementById("moveForm").addEventListener("submit", submitMove);
}

function submitMove(e) {
  e.preventDefault();
  if (!canUseSector("Estoque")) return alert("Perfil sem permissao para movimentacao de estoque.");
  const f = new FormData(e.currentTarget);
  const p = findProduct(f.get("code"));
  if (!p) return alert("Produto nao encontrado.");
  const old = p.sector;
  p.sector = f.get("to");
  p.location = f.get("location");
  recordHistory(p, "Movimentado", f.get("from") || old, f.get("to"), f.get("qty"), `${f.get("reason")} - ${f.get("obs")}`);
  persist();
  showProduct(p);
}

function exitProducts() {
  renderShell("exit", "Saida de Produtos", `
    ${sectorGuard("Expedicao")}
    ${tabs([{key:"exit",label:"Nova Saida"},{key:"history",label:"Historico",route:"history"}], "exit")}
    <div class="page-title"><h1>Baixa por QR Code</h1><button class="btn btn-lg" data-scan="open">Ler QR Code / Codigo de Barras</button></div>
    <div class="split"><form class="card" id="exitForm"><div class="form-grid">
      ${field("Produto / Codigo", "code", "NB001")}
      ${field("Quantidade de Saida", "qty", "1", "number")}
      ${select("Destino", "dest", ["Cliente","Setor interno","Venda","Consumo interno","Devolucao","Expedicao"])}
      <div class="field span-4"><label>Observacao</label><textarea name="obs" rows="3">Saida registrada em aula pratica.</textarea></div>
    </div><br><button class="btn success btn-lg">Confirmar Saida</button> <button type="button" class="btn btn-lg" onclick="window.print()">Gerar Comprovante PDF</button><p class="hint status-bad">Atencao: verifique avaria ou vencimento antes da saida.</p></form>
    <aside class="card"><h2>Regra de estoque</h2><p>O sistema impede saida maior que o estoque disponivel e registra o historico automaticamente.</p></aside></div>`);
  document.getElementById("exitForm").addEventListener("submit", submitExit);
}

function submitExit(e) {
  e.preventDefault();
  if (!canUseSector("Expedicao")) return alert("Perfil sem permissao para saida/expedicao.");
  const f = new FormData(e.currentTarget);
  const p = findProduct(f.get("code"));
  if (!p) return alert("Produto nao encontrado.");
  const qty = Number(f.get("qty"));
  if (qty > p.qty) return alert("Quantidade maior que o estoque disponivel.");
  if (p.state !== "Bom Estado") alert("Alerta: produto esta avariado, vencido ou incompleto.");
  p.qty -= qty;
  recordHistory(p, "Saida", p.sector, f.get("dest"), qty, f.get("obs"));
  persist();
  showProduct(p);
}

function inventory() {
  renderShell("inventory", "Inventario Educacional", `
    <div class="page-title"><h1>Inventario por QR Code</h1><button class="btn btn-lg" data-scan="open">Ler QR Code / Codigo de Barras</button></div>
    <section class="card">
      <p class="hint">O aluno escaneia produtos, informa a quantidade fisica e o sistema compara com o estoque registrado.</p>
      <div class="table-wrap"><table><thead><tr><th>Produto</th><th>Endereco</th><th>Sistema</th><th>Fisico</th><th>Divergencia</th><th>Status</th></tr></thead><tbody>
        ${state.products.slice(0,4).map((p,i)=>`<tr><td>${p.name}</td><td>${p.location}</td><td>${p.qty}</td><td><input value="${i===1?p.qty-2:p.qty}" data-system="${p.qty}" class="countInput"></td><td class="diffCell">${i===1?-2:0}</td><td class="${i===1?"status-bad":"status-good"}">${i===1?"Divergente":"Conferido"}</td></tr>`).join("")}
      </tbody></table></div><br><button class="btn success btn-lg" id="finishInventory">Finalizar Inventario</button>
    </section>`);
  document.getElementById("finishInventory").addEventListener("click", () => {
    const p = state.products[0];
    recordHistory(p, "Inventario", p.sector, p.sector, p.qty, "Inventario da rua/prateleira finalizado.");
    alert("Inventario registrado no historico geral.");
  });
}

function orders() {
  renderShell("orders", "Pedidos de Cliente e Picking", `
    ${sectorGuard("Separacao")}
    <div class="page-title"><h1>Pedido Cliente: Supermercado Vale</h1><button class="btn btn-lg" data-scan="open">Ler item separado</button></div>
    <section class="card"><div class="table-wrap"><table><thead><tr><th>Item</th><th>Qtd</th><th>Endereco</th><th>Separado</th><th>Status</th></tr></thead><tbody>
      ${state.products.slice(0,3).map((p,i)=>`<tr><td>${p.name}</td><td>${[2,5,10][i]}</td><td>${p.location}</td><td><input type="checkbox" ${i===0?"checked":""}></td><td>${i===0?"OK":"Pendente"}</td></tr>`).join("")}
    </tbody></table></div><br><button class="btn success btn-lg">Conferir Pedido</button></section>`);
}

function transport() {
  renderShell("transport", "Docas e Transporte", `
    <div class="cards">${stat("[D1]","Doca 1","Recebimento","aguardando")}${stat("[D2]","Doca 2","Expedicao","em carga")}${stat("[D3]","Doca 3","Livre","disponivel")}${stat("[TR]","Transportadoras","4","cadastradas")}</div>
    <div class="wide-grid">
      <section class="card"><h2>Cadastro de Transportadora</h2><div class="form-grid">${field("Transportadora","carrier","TransVale Logistica")}${field("Motorista","driver","Carlos Silva")}${field("Veiculo","vehicle","Caminhao bau")}${field("Placa","plate","ABC1D23")}${select("Tipo de carga","cargo",["Carga seca","Fragil","Eletronicos","Alimentos","Avaria/Devolucao"])}${select("Status da doca","dock",["Aguardando","Em carga","Finalizado","Liberado"])}</div><br><button class="btn success">Salvar Operacao</button></section>
      <section class="card"><h2>Fila de Docas</h2>${["Caminhao aguardando conferencia","Carga em separacao para expedicao","Devolucao direcionada para avaria","Veiculo finalizado e liberado"].map((t,i)=>`<div class="activity"><span class="tag">D${i+1}</span><div><b>${t}</b><br><small>LogiCode Distribuidora Escola</small></div><small>${["08:30","09:10","10:20","11:00"][i]}</small></div>`).join("")}</section>
    </div>`);
}

function historyGeneral() {
  renderShell("history", "Historico Geral", `
    <div class="page-title"><h1>Historico Geral</h1><button class="btn btn-lg" data-scan="open">Buscar por codigo</button></div>
    <div class="card"><div class="filters"><input id="historySearch" placeholder="Buscar produto, codigo, acao, setor, responsavel..."><button class="btn" id="exportHistory">Exportar Excel</button><button class="btn ghost" onclick="window.print()">PDF</button></div><div class="table-wrap"><table><thead><tr><th>Produto</th><th>Codigo/QR</th><th>Acao</th><th>Origem</th><th>Destino</th><th>Qtd</th><th>Responsavel</th><th>Perfil</th><th>Data/Hora</th><th>Obs</th></tr></thead><tbody id="historyRows">${historyRows(state.history)}</tbody></table></div></div>`);
  document.getElementById("historySearch").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.getElementById("historyRows").innerHTML = historyRows(state.history.filter(h => Object.values(h).join(" ").toLowerCase().includes(q)));
  });
  document.getElementById("exportHistory").addEventListener("click", exportExcel);
}

function historyRows(items) {
  return items.map(h => `<tr><td>${h.product}</td><td>${h.code}</td><td>${h.action}</td><td>${h.from}</td><td>${h.to}</td><td>${h.qty}</td><td>${h.user}</td><td>${h.profile}</td><td>${h.date}</td><td>${h.obs || "-"}</td></tr>`).join("");
}

function activities() {
  renderShell("activities", "Atividades e Pontuacao", `
    <div class="wide-grid">
      <section class="card"><h2>Missoes por setor</h2>${["Receber mercadoria do Porto de Santos","Conferir lote, validade e quantidade","Ler QR Code e armazenar no endereco correto","Separar pedido do cliente","Dar saida por QR Code","Identificar avaria e registrar foto","Realizar inventario da Rua A"].map((m,i)=>`<article class="card mission"><b>Missao ${i+1}</b><p>${m}</p><span class="tag">${[15,15,20,15,15,20,20][i]} pontos</span></article>`).join("")}</section>
      <section class="card"><h2>Painel do Professor por Turma</h2>${state.activities.map((a,i)=>`<div class="activity"><span class="tag">${i+1}</span><div><b>${a.student}</b><br><small>${a.class} | ${a.done} atividades | ${a.errors} erros | ${a.time}</small></div><b>${a.points}</b></div>`).join("")}</section>
    </div>`);
}

function learn() {
  const topics = ["Recebimento","Conferencia","Armazenagem","Endereco logistico","Controle de lote","Validade","Estoque minimo","Avaria","Separacao","Expedicao","Codigo de barras","QR Code","Rastreabilidade","FIFO","FEFO","Picking","Packing","Inventario","Logistica 4.0"];
  renderShell("learn", "Aprendizado Logistico", `<div class="learning-grid">${topics.map(t=>`<article class="card"><h2>${t}</h2><p>Explicacao didatica para apoiar a pratica do aluno no setor liberado pelo professor.</p><input placeholder="Link de video do YouTube para este modulo"><br><br><button class="btn ghost">Como funciona?</button></article>`).join("")}</div>`);
}

function certificate() {
  renderShell("certificate", "Certificados", `
    <div class="wide-grid">
      <section class="card certificate-preview"><h2>Certificado de Conclusao</h2><p>Certificamos que <b>Ana Recebimento</b> concluiu o Modulo de Controle de Estoque e Rastreabilidade da plataforma LogiCode Academy.</p><p>Professor: Prof. Marina Lopes<br>Data: ${new Date().toLocaleDateString("pt-BR")}<br>Nota: 92 pontos</p><button class="btn" onclick="window.print()">Gerar PDF</button></section>
      <section class="card"><h2>Alunos aptos</h2>${state.activities.map(a=>`<div class="activity"><span class="tag">${a.points}</span><div><b>${a.student}</b><br><small>${a.done} atividades concluidas</small></div><button class="btn ghost">Emitir</button></div>`).join("")}</section>
    </div>`);
}

function reports() {
  const reports = ["Produtos cadastrados","Estoque atual","Produtos por setor","Produtos avariados","Produtos por origem","Produtos por lote","Movimentacoes","Saidas","Desempenho dos alunos","Ranking de pontuacao","Atividades concluidas","Historico por aluno","Inventario por rua","Docas e transportadoras","Certificados"];
  renderShell("reports", "Relatorios", `<div class="reports-grid">${reports.map(r=>`<article class="card"><h2>${r}</h2><p>Relatorio pronto para acompanhamento da turma e apresentacao do TCC.</p><button class="btn" onclick="window.print()">PDF</button> <button class="btn ghost export-report">Excel</button></article>`).join("")}</div>`);
  document.querySelectorAll(".export-report").forEach(btn => btn.addEventListener("click", exportExcel));
}

function usersSettings(kind) {
  renderShell(kind, kind === "users" ? "Usuarios e Setores" : "Configuracoes", `
    <div class="wide-grid">
      <section class="card">
        <h2>${kind === "users" ? "Criar professor, aluno e liberar setor" : "Senha do administrador"}</h2>
        <form id="${kind === "users" ? "userForm" : "passwordForm"}">
          <div class="form-grid">
            ${kind === "users"
              ? `${field("Nome","name","Novo Aluno")}${field("Login","login","aluno01")}${select("Perfil","role",["Aluno","Professor","Administrador"])}${select("Setor liberado","sector",["Recebimento","Conferencia","Estoque","Separacao","Expedicao","Avaria","Professor","Administrador"])}${field("Turma","class","3 Logistica A")}`
              : `${field("Senha atual","current","", "password")}${field("Nova senha","next","", "password")}${field("Confirmar senha","confirm","", "password")}${field("Variavel configuravel","env","LOGICODE_ADMIN_PASSWORD")}`}
          </div><br><button class="btn btn-lg">${kind === "users" ? "Salvar Usuario" : "Alterar Senha"}</button>
        </form>
      </section>
      <section class="card"><h2>${kind === "users" ? "Usuarios cadastrados" : "Institucional editavel"}</h2>${kind === "users" ? state.users.map(u=>`<div class="activity"><span class="tag">${u.role}</span><div><b>${u.name}</b><br><small>${u.login} | ${u.sector} | ${u.class || "-"}</small></div></div>`).join("") : `<textarea rows="8">Texto institucional da escola e apresentacao do TCC editavel pelo administrador.</textarea><br><br><button class="btn ghost">Atualizar Home</button>`}</section>
    </div>`);
  if (kind === "users") {
    document.getElementById("userForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      state.users.push({ id: uid(), name: f.get("name"), login: f.get("login"), role: f.get("role"), sector: f.get("sector"), class: f.get("class"), score: 0 });
      persist();
      alert("Usuario criado com setor liberado.");
      usersSettings("users");
    });
  } else {
    document.getElementById("passwordForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      if (f.get("current") !== ADMIN_PASSWORD) return alert("Senha atual incorreta.");
      if (!f.get("next") || f.get("next") !== f.get("confirm")) return alert("Confirme a nova senha corretamente.");
      ADMIN_PASSWORD = f.get("next");
      localStorage.setItem("logicodeAdminPassword", ADMIN_PASSWORD);
      alert("Senha do administrador alterada neste navegador.");
    });
  }
}

function showProduct(p) {
  if (!p) return alert("Produto nao encontrado.");
  const items = state.history.filter(h => h.productId === p.id || h.code === p.code);
  const modal = document.getElementById("modalRoot");
  modal.innerHTML = `
    <div class="modal-backdrop">
      <article class="modal-card">
        <div class="page-title"><h1>Ficha do Produto</h1><button class="icon-btn" id="closeModal">X</button></div>
        <div class="cards">${stat("[P]", "Produto", p.name, p.code)}${stat("[Q]", "Quantidade", p.qty, p.unit)}${stat("[S]", "Setor", p.sector, p.state)}${stat("[L]", "Lote", p.lot, p.validity || "sem validade")}</div>
        <div class="card"><h2>Endereco logistico</h2><p>${p.location}</p><p><b>Fornecedor:</b> ${p.supplier} | <b>Origem:</b> ${p.origin}</p></div>
        <div class="card"><h2>Linha do tempo / Historico do produto</h2>${items.length ? items.map(historyLine).join("") : "<p>Nenhum historico encontrado.</p>"}</div>
      </article>
    </div>`;
  document.getElementById("closeModal").addEventListener("click", () => modal.innerHTML = "");
}

let scanStream = null;
let scanTimer = null;
async function openScanner() {
  const scanner = document.getElementById("scanner");
  if (!scanner) return;
  scanner.classList.remove("hidden");
  const video = document.getElementById("scannerVideo");
  const status = document.getElementById("scannerStatus");
  document.getElementById("manualCode").value = "";
  try {
    scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = scanStream;
    status.textContent = "Camera aberta. A leitura automatica usa BarcodeDetector quando disponivel no navegador.";
    if ("BarcodeDetector" in window) {
      const detector = new BarcodeDetector({ formats: ["qr_code", "code_128", "ean_13", "upc_a", "upc_e"] });
      const loop = async () => {
        if (scanner.classList.contains("hidden")) return;
        try {
          const codes = await detector.detect(video);
          if (codes.length) return handleScan(codes[0].rawValue);
        } catch {}
        scanTimer = requestAnimationFrame(loop);
      };
      scanTimer = requestAnimationFrame(loop);
    } else {
      status.textContent = "Camera aberta. Este navegador nao possui BarcodeDetector; use o campo manual para demonstrar o codigo lido.";
    }
  } catch {
    status.textContent = "Nao foi possivel abrir a camera. Verifique permissoes ou use o campo manual.";
  }
}

function closeScanner() {
  document.getElementById("scanner")?.classList.add("hidden");
  if (scanTimer) cancelAnimationFrame(scanTimer);
  if (scanStream) scanStream.getTracks().forEach(t => t.stop());
  scanStream = null;
}

function handleScan(value) {
  const p = findProduct(value);
  if (!p) return alert("Codigo nao encontrado nos produtos de exemplo.");
  closeScanner();
  const codeFields = document.querySelectorAll('input[name="code"]');
  codeFields.forEach(input => input.value = p.code);
  showProduct(p);
}

function exportExcel() {
  const rows = [["Produto","Codigo","Acao","Origem","Destino","Qtd","Responsavel","Perfil","Data","Obs"], ...state.history.map(h => [h.product,h.code,h.action,h.from,h.to,h.qty,h.user,h.profile,h.date,h.obs])];
  const csv = rows.map(r => r.map(v => `"${String(v ?? "").replaceAll('"','""')}"`).join(";")).join("\n");
  const blob = new Blob([csv], { type: "application/vnd.ms-excel;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "logicode-historico.xls";
  a.click();
  URL.revokeObjectURL(a.href);
}

function route(name) {
  const routes = { home, login, dashboard, codes, receiving, conference, stock, movement, exit: exitProducts, inventory, orders, transport, history: historyGeneral, activities, learn, certificate, reports, users: () => usersSettings("users"), settings: () => usersSettings("settings") };
  (routes[name] || dashboard)();
}

home();
