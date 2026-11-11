import { useState } from 'react'
import { X } from 'lucide-react'
import { productCategories, productUnits } from '../data/categories'
import { formatDate } from '../data/productUtils'

function ProductFormModal({ product, onClose, onSave }) {
  const [name, setName] = useState(product?.name ?? '')
  const [category, setCategory] = useState(product?.category ?? '')
  const [quantity, setQuantity] = useState(product?.quantity ?? 0)
  const [minimum, setMinimum] = useState(product?.minimum ?? 0)
  const [unit, setUnit] = useState(product?.unit ?? '')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const parsedQuantity = Number(quantity)
    const parsedMinimum = Number(minimum)
    if (!name.trim() || !category || !unit) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }
    if (!Number.isFinite(parsedQuantity) || parsedQuantity < 0 ||
      !Number.isFinite(parsedMinimum) || parsedMinimum < 0) {
      setError('As quantidades não podem ser negativas.')
      return
    }

    onSave({
      name: name.trim(),
      category,
      quantity: parsedQuantity,
      minimum: parsedMinimum,
      unit,
    })
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <div className="modal-heading">
          <div>
            <h2 id="product-modal-title">{product ? 'Editar produto' : 'Cadastrar produto'}</h2>
            <p>Informe os dados do produto para o almoxarifado.</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar">
            <X size={19} />
          </button>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          {product && (
            <div className="form-field">
              <label htmlFor="product-id">ID</label>
              <input id="product-id" value={product.id} disabled />
            </div>
          )}
          <div className="form-field form-field-full">
            <label htmlFor="product-name">Nome do produto <span>*</span></label>
            <input
              autoFocus
              id="product-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Papel A4"
              maxLength={80}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="product-category">Categoria <span>*</span></label>
            <select
              id="product-category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {productCategories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="product-unit">Unidade de medida <span>*</span></label>
            <select
              id="product-unit"
              name="unit"
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {productUnits.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="product-quantity">Quantidade em estoque <span>*</span></label>
            <input
              id="product-quantity"
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="product-minimum">Quantidade mínima <span>*</span></label>
            <input
              id="product-minimum"
              name="minimum"
              type="number"
              min="0"
              step="1"
              value={minimum}
              onChange={(event) => setMinimum(event.target.value)}
              required
            />
          </div>
          {product && (
            <div className="form-field form-field-full">
              <label htmlFor="product-date">Data de cadastro</label>
              <input id="product-date" value={formatDate(product.createdAt)} disabled />
            </div>
          )}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Cancelar</button>
            <button className="primary-button" type="submit">
              {product ? 'Salvar alterações' : 'Cadastrar produto'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ProductFormModal
