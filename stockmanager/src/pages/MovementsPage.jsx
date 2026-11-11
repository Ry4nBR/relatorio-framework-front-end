import { useState } from 'react'
import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, Plus } from 'lucide-react'
import AppSidebar from '../components/AppSidebar'
import DashboardHeader from '../components/DashboardHeader'
import MovementFormModal from '../components/MovementFormModal'
import MovementsTable from '../components/MovementsTable'
import PersistenceNotice from '../components/PersistenceNotice'
import '../styles/dashboard.css'
import '../styles/products.css'
import '../styles/movements.css'

function MovementsPage({
  products,
  setProducts,
  movements,
  setMovements,
  nextMovementId,
  setNextMovementId,
  activePage,
  onNavigate,
  onRestoreDemo,
  storageError,
  storageNotice,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const entries = movements.filter((movement) => movement.type === 'entrada').length
  const exits = movements.length - entries

  function registerMovement(fields) {
    const product = products.find((item) => item.id === fields.productId)
    if (!product) return 'O produto selecionado não está mais cadastrado.'
    if (!Number.isInteger(fields.quantity) || fields.quantity <= 0) {
      return 'Informe uma quantidade inteira maior que zero.'
    }
    if (fields.type === 'saida' && fields.quantity > product.quantity) {
      return `Quantidade indisponível. Estoque atual: ${product.quantity} ${product.unit}.`
    }

    const quantityChange = fields.type === 'entrada' ? fields.quantity : -fields.quantity
    setProducts((current) => current.map((item) => (
      item.id === fields.productId
        ? { ...item, quantity: item.quantity + quantityChange }
        : item
    )))
    setMovements((current) => [
      {
        id: nextMovementId,
        ...fields,
        date: new Date().toISOString(),
      },
      ...current,
    ])
    setNextMovementId((id) => id + 1)
    setIsModalOpen(false)
    return null
  }

  return (
    <div className="app-shell">
      <AppSidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-panel">
        <DashboardHeader
          title="Movimentações"
          subtitle="Histórico de entradas e saídas do estoque"
          onRestoreDemo={onRestoreDemo}
        />
        <div className="dashboard-content movements-content">
          <PersistenceNotice error={storageError} notice={storageNotice} />
          <section className="products-intro">
            <div>
              <span className="eyebrow">ALMOXARIFADO</span>
              <h2>Movimentações de estoque</h2>
              <p>Registre entradas e saídas e acompanhe o histórico do estoque.</p>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => setIsModalOpen(true)}
              disabled={products.length === 0}
            >
              <Plus size={17} />
              Nova movimentação
            </button>
          </section>

          <section className="movement-summary-grid" aria-label="Resumo das movimentações">
            <article className="movement-summary-card">
              <span className="movement-summary-icon movement-summary-total"><ArrowLeftRight size={18} /></span>
              <span className="movement-summary-copy"><span>Total de movimentações</span><strong>{movements.length}</strong></span>
            </article>
            <article className="movement-summary-card">
              <span className="movement-summary-icon movement-summary-entry"><ArrowDownToLine size={18} /></span>
              <span className="movement-summary-copy"><span>Entradas registradas</span><strong>{entries}</strong></span>
            </article>
            <article className="movement-summary-card">
              <span className="movement-summary-icon movement-summary-exit"><ArrowUpFromLine size={18} /></span>
              <span className="movement-summary-copy"><span>Saídas registradas</span><strong>{exits}</strong></span>
            </article>
          </section>

          <section className="content-panel movements-history-panel" aria-label="Histórico de movimentações">
            <div className="section-heading">
              <div>
                <h2>Histórico de movimentações</h2>
                <p>Registro de todas as entradas e saídas</p>
              </div>
              <span className="movement-history-count">{movements.length} registros</span>
            </div>
            <MovementsTable movements={movements} />
            <div className="products-footer">
              <span>{movements.length} movimentações no histórico</span>
              <span>Dados mantidos nesta sessão</span>
            </div>
          </section>
        </div>
      </main>
      {isModalOpen && (
        <MovementFormModal
          products={products}
          onClose={() => setIsModalOpen(false)}
          onSave={registerMovement}
        />
      )}
    </div>
  )
}

export default MovementsPage
