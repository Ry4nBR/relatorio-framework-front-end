function PersistenceNotice({ error, notice }) {
  if (!error && !notice) return null

  return (
    <div
      className={`persistence-notice${error ? ' persistence-notice-error' : ''}`}
      role={error ? 'alert' : 'status'}
    >
      <span>{error || notice}</span>
    </div>
  )
}

export default PersistenceNotice
