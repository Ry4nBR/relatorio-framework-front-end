import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { formatDateTime } from '../data/productUtils'

function MovementsTable({ movements }) {
  if (movements.length === 0) {
    return (
      <div className="products-empty">
        <p>Nenhuma movimentação registrada.</p>
        <span>As entradas e saídas aparecerão aqui após serem confirmadas.</span>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table className="movements-table">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col">Tipo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Data e horário</th>
            <th scope="col">Observação</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => {
            const isEntry = movement.type === 'entrada'
            const MovementIcon = isEntry ? ArrowDownToLine : ArrowUpFromLine

            return (
              <tr key={movement.id}>
                <td className="movement-product-cell">{movement.product}</td>
                <td>
                  <span className={`movement-type-badge ${isEntry ? 'movement-badge-entry' : 'movement-badge-exit'}`}>
                    <MovementIcon size={14} />
                    {isEntry ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td className={`movement-table-quantity ${isEntry ? 'quantity-entry' : 'quantity-exit'}`}>
                  {isEntry ? '+' : '−'}{movement.quantity} <span>{movement.unit}</span>
                </td>
                <td>{formatDateTime(movement.date)}</td>
                <td className="movement-observation">{movement.observation || '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MovementsTable
