function SummaryCard({ label, value, caption, icon: Icon, tone }) {
  return (
    <article className="summary-card">
      <div className="summary-card-top">
        <span className="summary-label">{label}</span>
        <span className={`summary-icon summary-icon-${tone}`}>
          <Icon size={19} strokeWidth={1.9} />
        </span>
      </div>
      <div className="summary-value">{value}</div>
      <p className="summary-caption">{caption}</p>
    </article>
  )
}

export default SummaryCard
