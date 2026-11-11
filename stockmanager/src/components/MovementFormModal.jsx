import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, X } from 'lucide-react'

function MovementFormModal({ products, onClose, onSave }) {
  const [type, setType] = useState('entrada')
  const [productId, setProductId] = useState(products[0]?.id ?? '')
  const [quantity, setQuantity] = useState('')
  const [observation, setObservation] = useState('')
  const [error, setError] = useState('')
  const selectedProduct = products.find((product) => product.id === Number(productId))

  function handleSubmit(event) {
    event.preventDefault()
    const parsedQuantity = Number(quantity)

    if (!selectedProduct) {
      setError('Selecione um produto cadastrado.')
      return
    }
    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      setError('Informe uma quantidade inteira maior que zero.')
      return
    }
    if (type === 'saida' && parsedQuantity > selectedProduct.quantity) {
      setError(`Quantidade indisponível. Estoque atual: ${selectedProduct.quantity} ${selectedProduct.unit}.`)
      return
    }

    const saveError = onSave({
      productId: selectedProduct.id,
      product: selectedProduct.name,
      type,
      quantity: parsedQuantity,
      unit: selectedProduct.unit,
      observation: observation.trim(),
    })
    if (saveError) setError(saveError)
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="product-modal movement-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movement-modal-title"
      >
        <div className="modal-heading">
          <div>
            <h2 id="movement-modal-title">Registrar movimentação</h2>
            <p>Registre uma entrada ou saída do estoque.</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar">
            <X size={19} />
          </button>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <fieldset className="movement-type-field form-field-full">
            <legend>Tipo de movimentação <span>*</span></legend>
            <div className="movement-type-options">
              <button
                className={`movement-type-option${type === 'entrada' ? ' movement-type-selected' : ''}`}
                type="button"
                onClick={() => {
                  setType('entrada')
                  setError('')
                }}
                aria-pressed={type === 'entrada'}
              >
                <ArrowDownToLine size={17} />
                Entrada
              </button>
              <button
                className={`movement-type-option${type === 'saida' ? ' movement-type-selected' : ''}`}
                type="button"
                onClick={() => {
                  setType('saida')
                  setError('')
                }}
                aria-pressed={type === 'saida'}
              >
                <ArrowUpFromLine size={17} />
                Saída
              </button>
            </div>
          </fieldset>

          <div className="form-field form-field-full">
            <label htmlFor="movement-product">Produto <span>*</span></label>
            <select
              id="movement-product"
              name="product"
              value={productId}
              onChange={(event) => {
                setProductId(event.target.value)
                setError('')
              }}
              required
              disabled={products.length === 0}
            >
              {products.length === 0 && <option value="">Nenhum produto cadastrado</option>}
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — {product.quantity} {product.unit} disponíveis
                </option>
              ))}
            </select>
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="movement-quantity">Quantidade <span>*</span></label>
            <input
              id="movement-quantity"
              name="quantity"
              type="number"
              min="1"
              max={type === 'saida' ? selectedProduct?.quantity : undefined}
              step="1"
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value)
                setError('')
              }}
              placeholder="Informe a quantidade"
              required
              disabled={!selectedProduct}
            />
            {type === 'saida' && selectedProduct && (
              <span className="movement-stock-hint">
                Disponível: {selectedProduct.quantity} {selectedProduct.unit}
              </span>
            )}
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="movement-observation">Observação <span className="optional-label">(opcional)</span></label>
            <textarea
              id="movement-observation"
              name="observation"
              value={observation}
              onChange={(event) => setObservation(event.target.value)}
              placeholder="Adicione um detalhe sobre a movimentação"
              maxLength={240}
              rows="3"
            />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Cancelar</button>
            <button className="primary-button" type="submit" disabled={products.length === 0}>
              Confirmar {type}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default MovementFormModal
