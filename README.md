# Relatório - Framework Front-end

Projeto acadêmico da disciplina Frameworks Front-end, com o relatório técnico
sobre React e o StockManager, um dashboard para controle de materiais de escritório.

## Estrutura

```text
relatorio-framework-front-end/
├── README.md
├── documentacao/
│   └── Relatorio_Tecnico_React_Ryan_Amorim_Revisado.pdf
└── projeto/
    └── dashboard-almoxarifado/
        ├── public/
        ├── src/
        │   ├── components/
        │   ├── data/
        │   ├── hooks/
        │   ├── pages/
        │   ├── styles/
        │   ├── App.jsx
        │   └── main.jsx
        ├── package.json
        └── index.html
```

## Executar o StockManager

No PowerShell, na raiz do repositório:

```powershell
Set-Location .\projeto\dashboard-almoxarifado
npm install
npm run dev
```

Para validar a aplicação:

```powershell
npm run lint
npm run build
```

O dashboard oferece cadastro e gerenciamento de produtos, movimentações de
entrada e saída, alertas de estoque, relatórios com gráficos e exportação CSV.
Produtos e movimentações são persistidos localmente no navegador.

Detalhes de execução e funcionalidades estão no
[README do StockManager](./projeto/dashboard-almoxarifado/README.md).