import { Suspense, lazy, useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import MovementsPage from './pages/MovementsPage'
import ProductsPage from './pages/ProductsPage'
import { useInventory } from './hooks/useInventory'

const LazyReportsPage = lazy(() => import('./pages/ReportsPage'))

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const inventory = useInventory()
  const sharedProps = {
    products: inventory.products,
    movements: inventory.movements,
    activePage,
    onNavigate: setActivePage,
    onRestoreDemo: inventory.restoreDemoData,
    storageError: inventory.storageError,
    storageNotice: inventory.storageNotice,
  }

  if (activePage === 'products') {
    return (
      <ProductsPage
        {...sharedProps}
        setProducts={inventory.setProducts}
        nextProductId={inventory.nextProductId}
        setNextProductId={inventory.setNextProductId}
      />
    )
  }

  if (activePage === 'movements') {
    return (
      <MovementsPage
        {...sharedProps}
        setProducts={inventory.setProducts}
        setMovements={inventory.setMovements}
        nextMovementId={inventory.nextMovementId}
        setNextMovementId={inventory.setNextMovementId}
      />
    )
  }

  if (activePage === 'reports') {
    return (
      <Suspense fallback={<div className="page-loading" role="status">Carregando relatórios...</div>}>
        <LazyReportsPage
          {...sharedProps}
        />
      </Suspense>
    )
  }

  return (
    <DashboardPage
      {...sharedProps}
    />
  )
}

export default App
