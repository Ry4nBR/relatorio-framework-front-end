import { ArrowDownLeft, ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react'

function RecentMovements({ movements }) {
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
        <a className="panel-link panel-link-heading" href="#movimentacoes">
          Ver todas <ArrowRight size={15} />
        </a>
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
                <span>{movement.person} · {movement.time}</span>
              </span>
              <span className={`movement-quantity ${isEntry ? 'quantity-entry' : 'quantity-exit'}`}>
                {isEntry ? '+' : '−'}{movement.quantity}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RecentMovements
