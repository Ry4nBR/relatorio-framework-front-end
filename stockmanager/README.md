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

Os dados de demonstração e alterações de produtos ou movimentações permanecem em memória durante a sessão do navegador.
