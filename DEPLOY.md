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
