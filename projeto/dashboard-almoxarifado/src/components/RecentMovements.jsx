import { ArrowDownLeft, ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react'
import { formatDateTime } from '../data/productUtils'

function RecentMovements({ movements, onViewAll }) {
  return (
    <section className="content-panel movements-panel" id="movimentacoes" aria-labelledby="movements-title">
      <div className="section-heading">
        <div className="section-title-group">
          <span className="section-icon movement-heading-icon"><Clock3 size={17} /></span>
          <div>
            <h2 id="movements-title">Últimas movimentações</h2>
            <p>Entradas e saídas recentes</p>
          </div>
        </div>
        <button className="panel-link panel-link-heading" type="button" onClick={onViewAll}>
          Ver todas <ArrowRight size={15} />
        </button>
      </div>
      <ul className="movement-list">
        {movements.map((movement) => {
          const isEntry = movement.type === 'entrada'
          const MovementIcon = isEntry ? ArrowDownLeft : ArrowUpRight

          return (
            <li className="movement-item" key={movement.id}>
              <span className={`movement-icon ${isEntry ? 'movement-entry' : 'movement-exit'}`}>
                <MovementIcon size={17} />
              </span>
              <span className="movement-copy">
                <strong>{movement.product}</strong>
                <span>{formatDateTime(movement.date)}</span>
              </span>
              <span className={`movement-quantity ${isEntry ? 'quantity-entry' : 'quantity-exit'}`}>
                {isEntry ? '+' : '−'}{movement.quantity} {movement.unit}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RecentMovements
