export function getStockStatus(product) {
  if (product.quantity === 0) return 'out'
  if (product.quantity <= product.minimum) return 'low'
  return 'ok'
}

export function formatDate(date) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T00:00:00`))
}

export function formatDateTime(date) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function getCurrentLocalDate() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}
