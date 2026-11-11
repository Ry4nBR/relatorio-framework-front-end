import { useEffect, useRef, useState } from 'react'
import { inventoryItems, recentMovements } from '../data/inventory'

export const INVENTORY_STORAGE_KEY = 'stockmanager:inventory:v1'

function isValidInventory(data) {
  return Boolean(
    data &&
    Array.isArray(data.products) &&
    Array.isArray(data.movements) &&
    data.products.every((product) => (
      product &&
      Number.isInteger(product.id) &&
      typeof product.name === 'string' &&
      typeof product.category === 'string' &&
      Number.isFinite(product.quantity) &&
      Number.isFinite(product.minimum) &&
      typeof product.unit === 'string' &&
      typeof product.createdAt === 'string'
    )) &&
    data.movements.every((movement) => (
      movement &&
      Number.isInteger(movement.id) &&
      Number.isInteger(movement.productId) &&
      typeof movement.product === 'string' &&
      (movement.type === 'entrada' || movement.type === 'saida') &&
      Number.isFinite(movement.quantity) &&
      movement.quantity > 0 &&
      typeof movement.unit === 'string' &&
      typeof movement.date === 'string' &&
      typeof movement.observation === 'string'
    ))
  )
}

function loadInventory() {
  const demoInventory = {
    products: inventoryItems,
    movements: recentMovements,
  }

  if (typeof window === 'undefined') {
    return {
      ...demoInventory,
      storageError: null,
      canPersist: false,
    }
  }

  try {
    const savedInventory = window.localStorage.getItem(INVENTORY_STORAGE_KEY)
    if (savedInventory === null) {
      return {
        ...demoInventory,
        storageError: null,
        canPersist: true,
      }
    }

    const parsedInventory = JSON.parse(savedInventory)
    if (!isValidInventory(parsedInventory)) {
      return {
        ...demoInventory,
        storageError: 'Os dados salvos estão em formato inválido. Eles foram preservados e não serão substituídos automaticamente.',
        canPersist: false,
      }
    }

    return {
      products: parsedInventory.products,
      movements: parsedInventory.movements,
      storageError: null,
      canPersist: true,
    }
  } catch {
    return {
      ...demoInventory,
      storageError: 'Não foi possível ler os dados salvos no navegador. Eles não serão substituídos automaticamente.',
      canPersist: false,
    }
  }
}

function cloneDemoData() {
  return {
    products: inventoryItems.map((product) => ({ ...product })),
    movements: recentMovements.map((movement) => ({ ...movement })),
  }
}

export function useInventory() {
  const [initialInventory] = useState(loadInventory)
  const [products, setProducts] = useState(initialInventory.products)
  const [movements, setMovements] = useState(initialInventory.movements)
  const [nextProductId, setNextProductId] = useState(
    () => Math.max(0, ...initialInventory.products.map((product) => product.id)) + 1,
  )
  const [nextMovementId, setNextMovementId] = useState(
    () => Math.max(0, ...initialInventory.movements.map((movement) => movement.id)) + 1,
  )
  const [canPersist, setCanPersist] = useState(initialInventory.canPersist)
  const [storageError, setStorageError] = useState(initialInventory.storageError)
  const [storageNotice, setStorageNotice] = useState('')
  const persistenceBlocked = useRef(false)

  useEffect(() => {
    if (!canPersist || persistenceBlocked.current || typeof window === 'undefined') return

    try {
      window.localStorage.setItem(
        INVENTORY_STORAGE_KEY,
        JSON.stringify({ products, movements }),
      )
    } catch {
      persistenceBlocked.current = true
      queueMicrotask(() => {
        setStorageError('Não foi possível salvar os dados no navegador. As alterações atuais permanecem disponíveis nesta sessão.')
      })
    }
  }, [products, movements, canPersist])

  function restoreDemoData() {
    const confirmed = window.confirm(
      'Restaurar os dados de demonstração? Os produtos e as movimentações atuais serão substituídos.',
    )
    if (!confirmed) return

    const demoData = cloneDemoData()
    setProducts(demoData.products)
    setMovements(demoData.movements)
    setNextProductId(Math.max(0, ...demoData.products.map((product) => product.id)) + 1)
    setNextMovementId(Math.max(0, ...demoData.movements.map((movement) => movement.id)) + 1)
    persistenceBlocked.current = false
    setCanPersist(true)
    setStorageError(null)
    setStorageNotice('Os dados de demonstração foram restaurados nesta sessão.')
  }

  return {
    products,
    setProducts,
    movements,
    setMovements,
    nextProductId,
    setNextProductId,
    nextMovementId,
    setNextMovementId,
    storageError,
    storageNotice,
    restoreDemoData,
  }
}
