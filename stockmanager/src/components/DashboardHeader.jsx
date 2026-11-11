import { CalendarDays, Search } from 'lucide-react'

const formattedDate = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(new Date())

function DashboardHeader() {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>Dashboard</h1>
        <p>Visão geral do almoxarifado</p>
      </div>
      <div className="topbar-actions">
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <input type="search" placeholder="Pesquisar produtos..." aria-label="Pesquisar produtos" />
          <kbd>⌘ K</kbd>
        </label>
        <div className="header-date">
          <CalendarDays size={17} />
          <span>{formattedDate}</span>
        </div>
        <div className="header-admin">
          <div className="user-avatar" aria-hidden="true">AD</div>
          <span>Administrador</span>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
