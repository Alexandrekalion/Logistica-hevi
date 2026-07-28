# Implantação do protótipo

Este projeto é uma aplicação estática de demonstração. Antes de disponibilizá-lo
em qualquer ambiente acessível a terceiros, implemente autenticação e
autorização no servidor.

## Publicação estática

O repositório pode ser hospedado como site estático. Configure a plataforma
para servir a raiz do projeto e confirme que as rotas necessárias possuem
fallback para `index.html`.

## Demonstração local

Para habilitar o acesso administrativo no seu computador, copie
`config.local.example.js` para `config.local.js` e use uma senha temporária e
exclusiva. O arquivo local é ignorado pelo Git e não deve ser enviado ao
repositório.

## Cuidados

- use HTTPS quando a câmera for necessária;
- não publique credenciais, dados pessoais ou exportações reais;
- mantenha configurações locais e segredos fora do controle de versão.
