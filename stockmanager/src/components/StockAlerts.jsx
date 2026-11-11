import { AlertTriangle, ArrowRight } from 'lucide-react'

function StockAlerts({ items }) {
  return (
    <section className="content-panel alerts-panel" aria-labelledby="alerts-title">
      <div className="section-heading">
        <div className="section-title-group">
          <span className="section-icon alert-heading-icon"><AlertTriangle size={17} /></span>
          <div>
            <h2 id="alerts-title">Alertas de estoque</h2>
            <p>Produtos que precisam de reposição</p>
          </div>
        </div>
        <span className="alert-count">{items.length} alertas</span>
      </div>
      {items.length > 0 ? (
        <ul className="alert-list">
          {items.map((item) => (
            <li className="alert-item" key={item.id}>
              <span className="alert-item-icon"><AlertTriangle size={16} /></span>
              <span className="alert-item-copy">
                <strong>{item.name}</strong>
                <span>{item.quantity} {item.unit} disponíveis · mínimo {item.minimum}</span>
              </span>
              <span className={`alert-level ${item.status === 'out' ? 'alert-level-out' : ''}`}>
                {item.status === 'out' ? 'Esgotado' : 'Baixo'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">Nenhum produto precisa de reposição.</p>
      )}
      <a className="panel-link" href="#estoque">
        Ver estoque <ArrowRight size={15} />
      </a>
    </section>
  )
}

export default StockAlerts
