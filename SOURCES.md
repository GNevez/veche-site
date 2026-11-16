# Fontes da comunidade

## Fluxo

- `/fontes` lista as fontes publicadas pela API, com busca, ordenação e paginação de 24 itens.
- `/fontes/enviar` permite login pela conta Veche e upload multipart de um arquivo JSON. O token fica somente na memória da página; recarregar exige novo login.
- A API exige autenticação, valida todos os itens, registra usuário/data/versão do aceite e publica no mesmo armazenamento S3/R2 usado pelas mídias.
- As cópias estáticas anteriormente criadas em `veche-site/public/sources` foram removidas. Os arquivos originais de `VecheApi/wwwroot/sources` não são importados automaticamente para o novo catálogo e continuam sujeitos à configuração estática antiga da API.

## Configuração e entrega

1. Aplique a migration `PublishedSources` no banco de destino pelo fluxo de migrations do projeto.
2. Mantenha a configuração existente `Media__Provider=S3`, `Media__S3__ServiceUrl`, `Media__S3__Bucket`, credenciais e `Media__PublicBaseUrl`. Nenhuma credencial S3 vai ao navegador.
3. Configure `NEXT_PUBLIC_API_URL` no site antes do build.
4. Os objetos novos usam `uploads/sources/<uuid>.json`, Content-Type application/json e cache de 5 minutos. Configure a CDN para respeitar Cache-Control de origem e acrescentar X-Content-Type-Options: nosniff. Se o aplicativo precisar ler via navegador, configure CORS GET/HEAD no R2/CDN sem credenciais.
5. Não há migração, upload real para produção ou deploy automático nesta implementação.

## Contratos

- `GET /api/source-catalog?search=&sort=name&page=1` retorna `{items,total,page,pages}`. `sort=entries` ordena por número de entradas. `classics=true` filtra clássicos.
- `GET /api/source-catalog/<uuid>` retorna uma fonte.
- `POST /api/source-catalog`, autenticado, recebe Name (2–24), Description (10–100), File, Classics, AcceptedTerms e TermsVersion.
- `DELETE /api/source-catalog/<uuid>` permite remover por autor ou moderador. Configure moderadores usando `SourceCatalog__ModeratorIds__0=<id>`, etc. A URL pode continuar no cache público por até 5 minutos; remoção urgente requer purge na CDN. Cópias já baixadas não são revogadas.

## Validação

Máximo 20 MB, profundidade 16, de 30 a 50.000 entradas. O documento exige `name` e `downloads`. Cada item exige `title`, `fileSize`, data legível em `uploadDate` e 1–30 endereços HTTPS ou magnet em `uris`. Propriedades repetidas e credenciais embutidas em URLs HTTPS são rejeitadas. Campos extras como `platform` são preservados. Nenhuma URL do arquivo é acessada na validação. O SHA-256 impede reenvio do mesmo documento (não detecta equivalência semântica).

Limite de 3 tentativas de envio por conta/hora/instância da API, sem fila. Para várias instâncias, use limitação compartilhada na borda. A validação técnica não certifica direitos autorais ou segurança dos destinos, nem substitui moderação humana.

Execute `dotnet run --project VecheApi/tests/SourceCatalog` a partir da raiz do workspace para testar o validador. A correção de SSRF no consumo de URLs arbitrárias em `SourceService` é uma tarefa separada e continua pendente.
