import { Suspense, lazy, useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import MovementsPage from './pages/MovementsPage'
import ProductsPage from './pages/ProductsPage'
import { inventoryItems, recentMovements } from './data/inventory'

const LazyReportsPage = lazy(() => import('./pages/ReportsPage'))

function App() {
  const [products, setProducts] = useState(inventoryItems)
  const [movements, setMovements] = useState(recentMovements)
  const [nextProductId, setNextProductId] = useState(
    () => Math.max(0, ...inventoryItems.map((product) => product.id)) + 1,
  )
  const [nextMovementId, setNextMovementId] = useState(
    () => Math.max(0, ...recentMovements.map((movement) => movement.id)) + 1,
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

  if (activePage === 'movements') {
    return (
      <MovementsPage
        products={products}
        setProducts={setProducts}
        movements={movements}
        setMovements={setMovements}
        nextMovementId={nextMovementId}
        setNextMovementId={setNextMovementId}
        activePage={activePage}
        onNavigate={setActivePage}
      />
    )
  }

  if (activePage === 'reports') {
    return (
      <Suspense fallback={<div className="page-loading" role="status">Carregando relatórios...</div>}>
        <LazyReportsPage
          products={products}
          movements={movements}
          activePage={activePage}
          onNavigate={setActivePage}
        />
      </Suspense>
    )
  }

  return (
    <DashboardPage
      products={products}
      movements={movements}
      activePage={activePage}
      onNavigate={setActivePage}
    />
  )
}

export default App
