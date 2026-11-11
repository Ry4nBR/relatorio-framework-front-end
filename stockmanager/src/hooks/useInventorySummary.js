export function useInventorySummary(items) {
  return items.reduce(
    (summary, item) => {
      summary.totalItems += 1
      summary.totalUnits += item.quantity
      if (item.quantity <= item.minimum) {
        summary.lowStock += 1
      }
      return summary
    },
    { totalItems: 0, totalUnits: 0, lowStock: 0 },
  )
}
