# LogiCode Academy

Protótipo web responsivo desenvolvido para um TCC de Logística. Simula fluxos
educacionais de WMS, estoque, movimentação, inventário, pedidos, docas e
relatórios, com dados mantidos localmente no navegador.

## Executar localmente

```bash
npm start
```

Depois, acesse `http://localhost:5178`.

## Acesso de demonstração

Não há credencial administrativa padrão no repositório. Para habilitar o
acesso administrativo somente na sua máquina:

1. copie `config.local.example.js` para `config.local.js`;
2. defina uma senha temporária, exclusiva para a demonstração;
3. mantenha `config.local.js` fora do Git.

Sem essa configuração, o acesso administrativo permanece bloqueado. Esta é uma
aplicação estática de demonstração: uma senha no navegador não constitui
autenticação segura para produção.

## Estrutura

- `index.html`: entrada da aplicação;
- `app.js`: telas, dados demonstrativos e interações;
- `config.js`: configuração pública sem credenciais;
- `config.local.example.js`: modelo de configuração local não versionada;
- `serve-local.js`: servidor local;
- `DEPLOY.md`: instruções de hospedagem.

## Uso e implantação

Os dados deste protótipo ficam no `localStorage` do navegador. Antes de usar
dados reais ou publicar a aplicação, implemente um backend com autenticação,
autorização, banco de dados e proteção adequada para os dados tratados.

Para uso da câmera em hospedagem, publique em HTTPS.
