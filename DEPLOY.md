# Hospedagem do LogiCode Academy

Este projeto e estatico e pode ser hospedado como site simples.

## Arquivos principais

- `index.html`
- `styles.css`
- `app.js`
- `config.js`
- `assets/`
- `package.json`
- `serve-local.js`

## Rodar localmente

```bash
npm start
```

Depois acesse:

```text
http://localhost:5178
```

## Variavel de senha

Senha inicial padrao:

```text
LR1a2b3c4567@
```

Para producao, edite `config.js` ou gere esse arquivo no deploy usando:

```text
LOGICODE_ADMIN_PASSWORD
```

## Deploy no Vercel

Este projeto ja possui `vercel.json` e pode ser publicado como site estatico.

### Pela interface da Vercel

1. Acesse <https://vercel.com>.
2. Clique em **Add New Project**.
3. Importe o repositorio GitHub `Tr3mbolon4/Logistica-hevi`.
4. Nas configuracoes, use:

```text
Framework Preset: Other
Build Command: vazio ou npm run vercel-build
Output Directory: ./
Install Command: vazio ou npm install
```

5. Clique em **Deploy**.

### Pela CLI da Vercel

```bash
npm i -g vercel
vercel
vercel --prod
```

## Deploy no Emergent

1. Envie a pasta `Logistica-hevi`.
2. Configure o comando de start como:

```bash
npm start
```

3. Configure a porta se a plataforma fornecer `PORT`; o servidor ja respeita `process.env.PORT`.
4. Publique o app.

## Observacao importante

A leitura real por camera depende de HTTPS em producao. Em `localhost` funciona para testes; hospedado, use o dominio HTTPS da plataforma.

Na Vercel o dominio publicado ja usa HTTPS, entao a camera do celular pode pedir permissao normalmente.
