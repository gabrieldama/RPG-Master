# RPG Master

Projeto React feito em aula, com tema de RPG. Tem páginas de Início, Sobre, Jogos,
Personagens, FAQ, News, Mesas e Dados. Os dados vêm de um JSON Server (`db.json`).

## Como rodar no computador

Precisa de Node 20.19+ (ou 22.12+). Em dois terminais, dentro da pasta do projeto:

```
npm install
npm run server   # JSON Server em http://localhost:3000
npm run dev      # site em http://localhost:5173
```

## Hospedagem no Vercel

O site e a API ficam no mesmo projeto do Vercel:

- o site (Vite) é publicado normalmente;
- a pasta `api/` roda o JSON Server como função do Vercel, em `/api/...`;
- o arquivo `vercel.json` faz as rotas do React funcionarem ao recarregar a página.

Para publicar: no Vercel, **Add New > Project**, importe este repositório do GitHub
e clique em **Deploy** (sem mudar nenhuma configuração).

**Atenção:** o Vercel não grava arquivos. Na hospedagem, o `db.json` é carregado na
memória: o que for cadastrado ou deletado funciona, mas volta ao conteúdo do
`db.json` quando o servidor reinicia (e pode variar entre acessos). Para guardar os
dados de verdade, seria preciso usar um banco de dados.
