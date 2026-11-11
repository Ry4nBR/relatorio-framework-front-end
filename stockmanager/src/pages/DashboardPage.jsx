import { ArrowDownToLine, ArrowUpFromLine, Boxes, Package, TriangleAlert } from 'lucide-react'
import AppSidebar from '../components/AppSidebar'
import DashboardHeader from '../components/DashboardHeader'
import InventoryTable from '../components/InventoryTable'
import SummaryCard from '../components/SummaryCard'
import { inventoryItems } from '../data/inventory'
import { useInventorySummary } from '../hooks/useInventorySummary'
import '../styles/dashboard.css'

function DashboardPage() {
  const summary = useInventorySummary(inventoryItems)

  const cards = [
    {
      label: 'Itens cadastrados',
      value: summary.totalItems,
      caption: 'Materiais diferentes no catálogo',
      icon: Boxes,
      tone: 'blue',
    },
    {
      label: 'Unidades em estoque',
      value: summary.totalUnits.toLocaleString('pt-BR'),
      caption: 'Quantidade total disponível',
      icon: Package,
      tone: 'green',
    },
    {
      label: 'Estoque baixo',
      value: summary.lowStock,
      caption: 'Itens precisam de atenção',
      icon: TriangleAlert,
      tone: 'amber',
    },
    {
      label: 'Movimentações hoje',
      value: '—',
      caption: 'Entradas e saídas do dia',
      icon: ArrowUpFromLine,
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
            <div>
              <p className="eyebrow">PAINEL DE CONTROLE</p>
              <h1>Visão geral</h1>
              <p className="welcome-copy">
                Acompanhe os materiais e a situação do seu almoxarifado.
              </p>
            </div>
            <button className="primary-button" type="button">
              <ArrowDownToLine size={17} />
              Registrar entrada
            </button>
          </section>

          <section className="summary-grid" aria-label="Resumo do estoque">
            {cards.map((card) => <SummaryCard key={card.label} {...card} />)}
          </section>

          <section className="inventory-panel">
            <div className="panel-heading">
              <div>
                <h2>Materiais em estoque</h2>
                <p>Resumo dos itens cadastrados no almoxarifado</p>
              </div>
              <button className="text-button" type="button">Ver todos</button>
            </div>
            <InventoryTable items={inventoryItems} />
            <div className="panel-footer">
              <span>Exibindo {inventoryItems.length} materiais</span>
              <span className="footer-note"><ArrowUpFromLine size={14} /> Dados de demonstração</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
