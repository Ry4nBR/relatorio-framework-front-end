import { useMemo, useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import AppSidebar from '../components/AppSidebar'
import DashboardHeader from '../components/DashboardHeader'
import PersistenceNotice from '../components/PersistenceNotice'
import ProductFormModal from '../components/ProductFormModal'
import ProductsTable from '../components/ProductsTable'
import { productCategories } from '../data/categories'
import { getCurrentLocalDate } from '../data/productUtils'
import '../styles/dashboard.css'
import '../styles/products.css'

function ProductsPage({
  products,
  setProducts,
  nextProductId,
  setNextProductId,
  activePage,
  onNavigate,
  onRestoreDemo,
  storageError,
  storageNotice,
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')
    return products.filter((product) => {
      const matchesName = product.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch)
      const matchesCategory = !category || product.category === category
      return matchesName && matchesCategory
    })
  }, [products, search, category])

  function openCreateModal() {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  function openEditModal(product) {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  function saveProduct(fields) {
    if (editingProduct) {
      setProducts((current) => current.map((product) => (
        product.id === editingProduct.id
          ? {
            ...product,
            ...fields,
            initials: fields.name.slice(0, 2).toLocaleUpperCase('pt-BR'),
          }
          : product
      )))
    } else {
      setProducts((current) => [
        ...current,
        {
          id: nextProductId,
          ...fields,
          createdAt: getCurrentLocalDate(),
          initials: fields.name.slice(0, 2).toLocaleUpperCase('pt-BR'),
          color: 'blue',
        },
      ])
      setNextProductId((id) => id + 1)
    }
    closeModal()
  }

  function deleteProduct(product) {
    if (!window.confirm(`Deseja excluir o produto "${product.name}"?`)) return
    setProducts((current) => current.filter((item) => item.id !== product.id))
  }

  return (
    <div className="app-shell">
      <AppSidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-panel">
        <DashboardHeader
          title="Produtos"
          subtitle="Cadastro e gerenciamento do estoque"
          onRestoreDemo={onRestoreDemo}
        />
        <div className="dashboard-content products-content">
          <PersistenceNotice error={storageError} notice={storageNotice} />
          <section className="products-intro">
            <div>
              <span className="eyebrow">ALMOXARIFADO</span>
              <h2>Produtos</h2>
              <p>Cadastre, consulte e mantenha os produtos do seu estoque.</p>
            </div>
            <button className="primary-button" type="button" onClick={openCreateModal}>
              <Plus size={17} />
              Novo produto
            </button>
          </section>

          <section className="content-panel products-panel" aria-label="Lista de produtos">
            <div className="products-toolbar">
              <div className="products-count">
                <strong>{products.length}</strong>
                <span>{products.length === 1 ? 'produto cadastrado' : 'produtos cadastrados'}</span>
              </div>
              <div className="products-filters">
                <label className="products-search">
                  <Search size={16} aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Pesquisar produto..."
                    aria-label="Pesquisar produtos pelo nome"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  {search && (
                    <button
                      type="button"
                      className="clear-search"
                      onClick={() => setSearch('')}
                      aria-label="Limpar pesquisa"
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>
                <label className="category-filter">
                  <select
                    aria-label="Filtrar por categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="">Todas as categorias</option>
                    {productCategories.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <ProductsTable
              products={filteredProducts}
              onEdit={openEditModal}
              onDelete={deleteProduct}
            />
            <div className="products-footer">
              <span>Exibindo {filteredProducts.length} de {products.length} produtos</span>
              <span>Dados salvos nesta sessão</span>
            </div>
          </section>
        </div>
      </main>
      {isModalOpen && (
        <ProductFormModal
          key={editingProduct?.id ?? 'new'}
          product={editingProduct}
          onClose={closeModal}
          onSave={saveProduct}
        />
      )}
    </div>
  )
}

export default ProductsPage
