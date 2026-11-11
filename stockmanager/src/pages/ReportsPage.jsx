import { useMemo, useState } from 'react'
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  Boxes,
  Package,
  TriangleAlert,
} from 'lucide-react'
import AppSidebar from '../components/AppSidebar'
import DashboardHeader from '../components/DashboardHeader'
import MovementsTable from '../components/MovementsTable'
import ReportsCharts from '../components/ReportsCharts'
import SummaryCard from '../components/SummaryCard'
import { downloadMovementsCsv, filterMovementsByPeriod, getCategoryChartData, getMovementChartData } from '../data/reportUtils'
import '../styles/dashboard.css'
import '../styles/products.css'
import '../styles/movements.css'
import '../styles/reports.css'

function ReportsPage({ products, movements, activePage, onNavigate }) {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filteredMovements = useMemo(
    () => filterMovementsByPeriod(movements, dateFrom, dateTo),
    [movements, dateFrom, dateTo],
  )
  const movementChartData = useMemo(
    () => getMovementChartData(filteredMovements),
    [filteredMovements],
  )
  const categoryChartData = useMemo(
    () => getCategoryChartData(products),
    [products],
  )
  const summary = [
    {
      label: 'Produtos cadastrados',
      value: products.length.toLocaleString('pt-BR'),
      caption: 'Catálogo atual',
      icon: Boxes,
      tone: 'blue',
    },
    {
      label: 'Unidades disponíveis',
      value: products.reduce((total, product) => total + product.quantity, 0).toLocaleString('pt-BR'),
      caption: 'Saldo atual em estoque',
      icon: Package,
      tone: 'green',
    },
    {
      label: 'Entradas no período',
      value: filteredMovements.filter((movement) => movement.type === 'entrada').length,
      caption: 'Movimentações de entrada',
      icon: ArrowDownToLine,
      tone: 'green',
    },
    {
      label: 'Saídas no período',
      value: filteredMovements.filter((movement) => movement.type === 'saida').length,
      caption: 'Movimentações de saída',
      icon: ArrowUpFromLine,
      tone: 'purple',
    },
    {
      label: 'Estoque baixo',
      value: products.filter((product) => product.quantity <= product.minimum).length,
      caption: 'Produtos no mínimo ou abaixo',
      icon: TriangleAlert,
      tone: 'amber',
    },
  ]

  function clearPeriod() {
    setDateFrom('')
    setDateTo('')
  }

  return (
    <div className="app-shell">
      <AppSidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-panel">
        <DashboardHeader title="Relatórios" subtitle="Indicadores e histórico do almoxarifado" />
        <div className="dashboard-content reports-content">
          <section className="products-intro">
            <div>
              <span className="eyebrow">ANÁLISE DO ESTOQUE</span>
              <h2>Relatórios</h2>
              <p>Indicadores calculados a partir dos produtos e movimentações cadastrados.</p>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => downloadMovementsCsv(filteredMovements, products)}
              disabled={filteredMovements.length === 0}
            >
              <ArrowDownToLine size={17} />
              Exportar CSV
            </button>
          </section>

          <section className="summary-grid reports-summary-grid" aria-label="Indicadores do estoque">
            {summary.map((card) => <SummaryCard key={card.label} {...card} />)}
          </section>

          <section className="content-panel report-filters" aria-label="Filtros de período">
            <div className="report-filter-copy">
              <ArrowLeftRight size={17} />
              <div>
                <strong>Período das movimentações</strong>
                <span>Os totais de entradas, saídas e o histórico seguem o intervalo selecionado.</span>
              </div>
            </div>
            <div className="report-date-fields">
              <label>
                <span>De</span>
                <input
                  aria-label="Data inicial"
                  type="date"
                  value={dateFrom}
                  max={dateTo || undefined}
                  onChange={(event) => setDateFrom(event.target.value)}
                />
              </label>
              <label>
                <span>Até</span>
                <input
                  aria-label="Data final"
                  type="date"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={(event) => setDateTo(event.target.value)}
                />
              </label>
              {(dateFrom || dateTo) && (
                <button className="secondary-button clear-period-button" type="button" onClick={clearPeriod}>
                  Limpar
                </button>
              )}
            </div>
          </section>

          <ReportsCharts
            movementData={movementChartData}
            categoryData={categoryChartData}
          />

          <section className="content-panel report-history-panel" aria-label="Histórico de movimentações do relatório">
            <div className="section-heading">
              <div>
                <h2>Histórico de movimentações</h2>
                <p>{filteredMovements.length} registros no período selecionado</p>
              </div>
              <span className="movement-history-count">{filteredMovements.length} registros</span>
            </div>
            <MovementsTable movements={filteredMovements} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default ReportsPage
