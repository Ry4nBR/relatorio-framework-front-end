import { ArrowDownToLine, ArrowLeftRight, Boxes, Package, TriangleAlert } from 'lucide-react'
import AppSidebar from '../components/AppSidebar'
import DashboardHeader from '../components/DashboardHeader'
import InventoryTable from '../components/InventoryTable'
import RecentMovements from '../components/RecentMovements'
import SummaryCard from '../components/SummaryCard'
import StockAlerts from '../components/StockAlerts'
import { inventoryItems, recentMovements } from '../data/inventory'
import { useInventorySummary } from '../hooks/useInventorySummary'
import '../styles/dashboard.css'

function DashboardPage() {
  const summary = useInventorySummary(inventoryItems)
  const lowStockItems = inventoryItems.filter((item) => item.quantity <= item.minimum)

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
      value: recentMovements.length,
      caption: 'Entradas e saídas recentes',
      icon: ArrowLeftRight,
      tone: 'purple',
    },
  ]

  return (
    <div className="app-shell" id="dashboard">
      <AppSidebar />
      <main className="main-panel">
        <DashboardHeader />
        <div className="dashboard-content">
          <section className="welcome-section">
            <div className="welcome-heading">
              <span className="eyebrow">RESUMO DO ALMOXARIFADO</span>
              <span className="welcome-date">Acompanhe seus produtos e movimentações em um só lugar.</span>
            </div>
            <button className="primary-button" type="button">
              <ArrowDownToLine size={17} />
              Registrar entrada
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
                <button className="text-button" type="button">Ver todos</button>
              </div>
              <InventoryTable items={inventoryItems} />
              <div className="panel-footer">
                <span>Exibindo {inventoryItems.length} produtos</span>
                <span className="footer-note">Dados de demonstração</span>
              </div>
            </section>
            <div className="side-panels">
              <StockAlerts items={lowStockItems} />
              <RecentMovements movements={recentMovements} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
