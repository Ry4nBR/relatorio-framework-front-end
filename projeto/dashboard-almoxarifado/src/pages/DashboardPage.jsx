import { ArrowDownToLine, ArrowLeftRight, Boxes, Package, TriangleAlert } from 'lucide-react'
import AppSidebar from '../components/AppSidebar'
import DashboardHeader from '../components/DashboardHeader'
import InventoryTable from '../components/InventoryTable'
import PersistenceNotice from '../components/PersistenceNotice'
import RecentMovements from '../components/RecentMovements'
import SummaryCard from '../components/SummaryCard'
import StockAlerts from '../components/StockAlerts'
import { useInventorySummary } from '../hooks/useInventorySummary'
import '../styles/dashboard.css'

function DashboardPage({
  products,
  movements,
  activePage,
  onNavigate,
  onRestoreDemo,
  storageError,
  storageNotice,
}) {
  const summary = useInventorySummary(products)
  const lowStockItems = products.filter((item) => item.quantity <= item.minimum)

  const cards = [
    {
      label: 'Produtos cadastrados',
      value: summary.totalItems,
      caption: 'Produtos no catálogo',
      icon: Boxes,
      tone: 'blue',
    },
    {
      label: 'Unidades em estoque',
      value: summary.totalUnits.toLocaleString('pt-BR'),
      caption: 'Unidades disponíveis no estoque',
      icon: Package,
      tone: 'green',
    },
    {
      label: 'Produtos com estoque baixo',
      value: summary.lowStock,
      caption: 'Abaixo do estoque mínimo',
      icon: TriangleAlert,
      tone: 'amber',
    },
    {
      label: 'Movimentações realizadas',
      value: movements.length,
      caption: 'Entradas e saídas recentes',
      icon: ArrowLeftRight,
      tone: 'purple',
    },
  ]

  return (
    <div className="app-shell" id="dashboard">
      <AppSidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-panel">
        <DashboardHeader onRestoreDemo={onRestoreDemo} />
        <div className="dashboard-content">
          <PersistenceNotice error={storageError} notice={storageNotice} />
          <section className="welcome-section">
            <div className="welcome-heading">
              <span className="eyebrow">RESUMO DO ALMOXARIFADO</span>
              <span className="welcome-date">Acompanhe seus produtos e movimentações em um só lugar.</span>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => onNavigate('movements')}
            >
              <ArrowDownToLine size={17} />
              Registrar movimentação
            </button>
          </section>

          <section className="summary-grid" aria-label="Resumo do estoque">
            {cards.map((card) => <SummaryCard key={card.label} {...card} />)}
          </section>

          <div className="dashboard-grid">
            <section className="content-panel inventory-panel" id="estoque">
              <div className="section-heading inventory-heading">
                <div>
                  <h2>Estoque recente</h2>
                  <p>Acompanhe os níveis dos produtos cadastrados</p>
                </div>
                <button className="text-button" type="button" onClick={() => onNavigate('products')}>Ver todos</button>
              </div>
              <InventoryTable items={products} />
              <div className="panel-footer">
                <span>Exibindo {products.length} produtos</span>
                <span className="footer-note">Dados de demonstração</span>
              </div>
            </section>
            <div className="side-panels">
              <StockAlerts items={lowStockItems} />
              <RecentMovements
                movements={movements.slice(0, 4)}
                onViewAll={() => onNavigate('movements')}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
