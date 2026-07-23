# Up Clips — Landing Page

Landing page oficial da Up Clips, desenvolvida em React/Next.js com vinext e preparada para Cloudflare Workers.

## Endereços

- Domínio principal: `https://upclips.com.br`
- Repositório: `https://github.com/Desperate2Grow/up_lp`

## Rodar no computador

Pré-requisito: Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

## Validar a versão de produção

```bash
npm run build
```

## Publicação automática pela Cloudflare

Conecte este repositório em **Workers & Pages > Create > Import a repository**.

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npm run deploy`
- Root directory: `/`

O Worker deve usar o nome `up-clips`, igual ao campo `name` de `wrangler.jsonc`.

Depois da primeira publicação, adicione `upclips.com.br` em **Settings > Domains & Routes > Add > Custom Domain**. Configure `www.upclips.com.br` para redirecionar para o domínio principal.

## Atualizações com GitHub Desktop

1. Abra o repositório no GitHub Desktop.
2. Faça as alterações nos arquivos.
3. Escreva um resumo no campo **Summary**.
4. Clique em **Commit to main**.
5. Clique em **Push origin**.

Cada envio para a branch `main` inicia uma nova publicação na Cloudflare.
