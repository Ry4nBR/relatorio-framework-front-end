import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import { inventoryItems } from './data/inventory'

function App() {
  const [products, setProducts] = useState(inventoryItems)
  const [nextProductId, setNextProductId] = useState(
    () => Math.max(0, ...inventoryItems.map((product) => product.id)) + 1,
  )
  const [activePage, setActivePage] = useState('dashboard')

  if (activePage === 'products') {
    return (
      <ProductsPage
        products={products}
        setProducts={setProducts}
        nextProductId={nextProductId}
        setNextProductId={setNextProductId}
        activePage={activePage}
        onNavigate={setActivePage}
      />
    )
  }

  return (
    <DashboardPage
      products={products}
      activePage={activePage}
      onNavigate={setActivePage}
    />
  )
}

export default App
