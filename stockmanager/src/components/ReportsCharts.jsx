import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const categoryColors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9', '#ec4899']

function MovementsChart({ data }) {
  return (
    <section className="content-panel report-chart-panel" aria-labelledby="movement-chart-title">
      <div className="section-heading">
        <div>
          <h2 id="movement-chart-title">Entradas versus saídas</h2>
          <p>Movimentações por dia no período selecionado</p>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="report-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="#edf1f6" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11 }}
              />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="entradas" name="Entradas" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" name="Saídas" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="report-chart-empty">Sem movimentações para o período selecionado.</p>
      )}
    </section>
  )
}

function CategoryChart({ data }) {
  return (
    <section className="content-panel report-chart-panel" aria-labelledby="category-chart-title">
      <div className="section-heading">
        <div>
          <h2 id="category-chart-title">Produtos por categoria</h2>
          <p>Distribuição do catálogo atual</p>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="category-chart-content">
          <div className="category-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="quantidade"
                  nameKey="categoria"
                  innerRadius="57%"
                  outerRadius="82%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.categoria} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} produto(s)`, name]}
                  contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="category-legend">
            {data.map((entry, index) => (
              <li key={entry.categoria}>
                <span className="category-legend-name">
                  <span className="category-legend-dot" style={{ backgroundColor: categoryColors[index % categoryColors.length] }} />
                  {entry.categoria}
                </span>
                <strong>{entry.quantidade}</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="report-chart-empty">Cadastre produtos para ver sua distribuição.</p>
      )}
    </section>
  )
}

function ReportsCharts({ movementData, categoryData }) {
  return (
    <div className="reports-charts-grid">
      <MovementsChart data={movementData} />
      <CategoryChart data={categoryData} />
    </div>
  )
}

export default ReportsCharts
