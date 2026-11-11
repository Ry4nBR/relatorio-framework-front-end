import { formatDate } from './productUtils.js'

function getLocalDateKey(date) {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function filterMovementsByPeriod(movements, dateFrom, dateTo) {
  return movements.filter((movement) => {
    const movementDate = getLocalDateKey(movement.date)
    if (dateFrom && movementDate < dateFrom) return false
    if (dateTo && movementDate > dateTo) return false
    return true
  })
}

export function getMovementChartData(movements) {
  const groupedByDate = new Map()

  movements.forEach((movement) => {
    const movementDate = getLocalDateKey(movement.date)
    const day = groupedByDate.get(movementDate) ?? {
      date: formatDate(movementDate),
      entradas: 0,
      saidas: 0,
    }
    if (movement.type === 'entrada') day.entradas += 1
    else day.saidas += 1
    groupedByDate.set(movementDate, day)
  })

  return Array.from(groupedByDate.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([, day]) => day)
}

export function getCategoryChartData(products) {
  const categoryCounts = new Map()

  products.forEach((product) => {
    categoryCounts.set(product.category, (categoryCounts.get(product.category) ?? 0) + 1)
  })

  return Array.from(categoryCounts, ([categoria, quantidade]) => ({ categoria, quantidade }))
    .sort((categoryA, categoryB) => categoryA.categoria.localeCompare(categoryB.categoria, 'pt-BR'))
}

function escapeCsvField(value) {
  const field = String(value ?? '')
  const spreadsheetSafeField = /^[\t\r=+\-@]/.test(field) ? `'${field}` : field
  return `"${spreadsheetSafeField.replaceAll('"', '""')}"`
}

export function createMovementsCsv(movements, products) {
  const headers = ['Produto', 'Tipo', 'Quantidade', 'Unidade', 'Data e horário', 'Observação']
  const productNames = new Map(products.map((product) => [product.id, product.name]))
  const rows = movements.map((movement) => [
    productNames.get(movement.productId) ?? movement.product,
    movement.type === 'entrada' ? 'Entrada' : 'Saída',
    movement.quantity,
    movement.unit,
    new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(movement.date)),
    movement.observation,
  ])
  return `\uFEFF${[headers, ...rows].map((row) => row.map(escapeCsvField).join(';')).join('\r\n')}`
}

export function downloadMovementsCsv(movements, products) {
  const csv = createMovementsCsv(movements, products)
  const file = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = 'stockmanager-movimentacoes.csv'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
