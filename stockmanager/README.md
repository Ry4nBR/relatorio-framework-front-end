# StockManager

Dashboard web para acompanhar o estoque de materiais de escritório.

## Executar localmente

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run lint
npm run build
```

## Módulos

- **Dashboard:** indicadores de produtos e unidades, alertas para itens no estoque mínimo ou abaixo dele e movimentações recentes.
- **Produtos:** cadastro, edição, exclusão, pesquisa e filtro por categoria.
- **Movimentações:** registro de entradas e saídas com atualização do estoque e histórico.
- **Relatórios:** totais do estoque, filtros de movimentação por período, gráficos de entradas/saídas e produtos por categoria, e exportação CSV do histórico filtrado.

## Persistência local

O hook `useInventory` carrega produtos e movimentações da chave `stockmanager:inventory:v1` no LocalStorage ao iniciar a aplicação. Se ainda não houver dados salvos, inicia com os dados de demonstração e salva esse inventário; nas próximas visitas, recupera o conteúdo salvo em vez de substituir pelos exemplos.

Alterações de produtos e movimentações são salvas automaticamente no navegador e permanecem disponíveis após atualizar ou reabrir a aplicação. Se os dados salvos estiverem inválidos ou o navegador não permitir a leitura, a aplicação informa o problema e evita sobrescrevê-los automaticamente. A opção **Restaurar demonstração**, no cabeçalho, solicita confirmação antes de substituir o inventário atual.

A persistência é local a este navegador e dispositivo. Não há back-end ou banco de dados nesta versão.
