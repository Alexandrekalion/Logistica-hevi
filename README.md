# LogiCode Academy

Sistema web responsivo para TCC em Logistica, com simulacao educacional de WMS, QR Code, codigo de barras, recebimento, conferencia, estoque, movimentacao, saida, inventario, pedidos, docas, transportadoras, certificados, atividades, pontuacao, aprendizado, historico e relatorios.

## Como abrir

Abra o arquivo `index.html` em um navegador moderno.

Ou rode como servidor local:

```bash
npm start
```

Depois acesse `http://localhost:5178`.

Login inicial:

- Usuario: `administrador`
- Senha: `LR1a2b3c4567@`

## Configuracao da senha

O prototipo usa `config.js` para expor `window.LOGICODE_ADMIN_PASSWORD`. Em hospedagens com build/server, gere esse arquivo usando a variavel de ambiente `LOGICODE_ADMIN_PASSWORD`.

Tambem e possivel alterar a senha no painel `Configuracoes`; a alteracao fica salva no navegador via `localStorage`.

## Estrutura

- `index.html`: entrada da aplicacao.
- `styles.css`: layout responsivo inspirado na imagem enviada.
- `app.js`: telas, dados demonstrativos e interacoes.
- `config.js`: configuracao inicial.
- `assets/`: pasta opcional para imagens institucionais da escola.
- `serve-local.js`: servidor Node.js para hospedagem.
- `package.json`: scripts para rodar em plataformas como Emergent.
- `vercel.json`: configuracao pronta para deploy na Vercel.
- `DEPLOY.md`: instrucoes de hospedagem.

## Modulos incluidos

- Home institucional e pagina Sobre o Projeto TCC.
- Login com administrador inicial.
- Dashboard logistico.
- Codigos Logisticos com QR Code, codigo de barras e camera.
- Recebimento de produtos com lote, validade, avaria, fotos e endereco logistico.
- Conferencia por setor, com validacao de lote, validade, quantidade, estado e foto.
- Estoque geral com busca, filtros simulados, mapa do armazem e rastreabilidade.
- Movimentacao interna por QR Code/codigo de barras.
- Saida de produtos por QR Code/codigo de barras e comprovante.
- Inventario educacional com divergencia fisico x sistema.
- Pedidos de cliente e picking.
- Docas e transportadoras.
- Historico geral obrigatorio com produto, codigo, acao, origem, destino, quantidade, responsavel, perfil, data/hora, observacao e foto quando houver.
- Atividades, missoes e ranking.
- Aprendizado Logistico e Logistica 4.0.
- Certificados.
- Relatorios com exportacao simulada para PDF e Excel.

## Perfis por setor

Os usuarios podem ser liberados para Recebimento, Conferencia, Estoque, Separacao, Expedicao, Avaria, Professor ou Administrador. Administrador e Professor conseguem navegar por todos os setores. Alunos ficam bloqueados nos setores nao liberados.

## Scanner

As telas Estoque, Movimentacao, Saida, Inventario e Conferencia possuem botao "Ler QR Code / Codigo de Barras". Em navegadores com suporte a `BarcodeDetector`, a leitura usa camera. Em navegadores sem esse recurso, o sistema abre a camera e oferece campo manual para demonstracao do codigo lido.

## Testes realizados

- Login administrador.
- Criacao de aluno com setor liberado.
- Cadastro de produto.
- Geracao visual de QR Code.
- Abertura do scanner e busca manual por codigo.
- Movimentacao por codigo.
- Saida por codigo.
- Historico na ficha do produto.
- Historico geral com busca.
- Relatorios com botoes PDF e Excel.
- Bloqueio de permissao por setor.
- Layout em largura de celular com menu inferior.

## Observacoes

Esta entrega e um prototipo estatico preparado para apresentacao e evolucao. Os dados sao persistidos localmente no navegador com `localStorage`, simulando banco de dados para o TCC. Para producao, recomenda-se conectar a um banco real e API com autenticacao.

Para uso da camera em hospedagem, publique em HTTPS. Navegadores de celular normalmente bloqueiam camera em paginas sem HTTPS.

## Deploy na Vercel

Importe o repositorio no painel da Vercel e use:

- Framework Preset: `Other`
- Build Command: vazio ou `npm run vercel-build`
- Output Directory: `./`

A Vercel fornece HTTPS automaticamente, necessario para a camera funcionar no celular.
