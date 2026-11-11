const statusLabels = {
  ok: 'Em estoque',
  low: 'Estoque baixo',
  out: 'Sem estoque',
}

function InventoryTable({ items }) {
  return (
    <div className="table-scroll">
      <table className="inventory-table">
        <thead>
          <tr>
            <th scope="col">Material</th>
            <th scope="col">Categoria</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="material-cell">
                  <span className={`material-avatar material-avatar-${item.color}`}>
                    {item.initials}
                  </span>
                  <span className="material-name">{item.name}</span>
                </div>
              </td>
              <td className="muted-cell">{item.category}</td>
              <td className="quantity-cell">{item.quantity} <span>{item.unit}</span></td>
              <td>
                <span className={`status-badge status-${item.status}`}>
                  <span className="status-dot" />
                  {statusLabels[item.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable
