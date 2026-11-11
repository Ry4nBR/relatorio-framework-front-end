import { Pencil, Trash2 } from 'lucide-react'
import { formatDate, getStockStatus } from '../data/productUtils'

const statusLabels = {
  ok: 'Em estoque',
  low: 'Estoque baixo',
  out: 'Sem estoque',
}

function ProductsTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="products-empty">
        <p>Nenhum produto encontrado.</p>
        <span>Tente alterar a pesquisa ou os filtros selecionados.</span>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table className="products-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Produto</th>
            <th scope="col">Categoria</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Estoque mínimo</th>
            <th scope="col">Status</th>
            <th scope="col">Data de cadastro</th>
            <th scope="col" aria-label="Ações" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const status = getStockStatus(product)

            return (
              <tr key={product.id}>
                <td className="product-id">#{product.id}</td>
                <td className="product-name-cell">{product.name}</td>
                <td>{product.category}</td>
                <td className="product-quantity">{product.quantity} <span>{product.unit}</span></td>
                <td>{product.minimum} <span className="product-unit">{product.unit}</span></td>
                <td>
                  <span className={`status-badge status-${status}`}>
                    <span className="status-dot" />
                    {statusLabels[status]}
                  </span>
                </td>
                <td>{formatDate(product.createdAt)}</td>
                <td>
                  <div className="product-row-actions">
                    <button
                      className="row-action"
                      type="button"
                      aria-label={`Editar ${product.name}`}
                      onClick={() => onEdit(product)}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="row-action row-action-delete"
                      type="button"
                      aria-label={`Excluir ${product.name}`}
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
