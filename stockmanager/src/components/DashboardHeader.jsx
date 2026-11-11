import { Bell, Search } from 'lucide-react'

function DashboardHeader() {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Almoxarifado</span>
        <span className="breadcrumb-divider">/</span>
        <strong>Visão geral</strong>
      </div>
      <div className="topbar-actions">
        <button className="icon-button search-button" type="button" aria-label="Pesquisar">
          <Search size={19} />
        </button>
        <button className="icon-button notification-button" type="button" aria-label="Notificações">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
        <div className="user-avatar" aria-label="Perfil do usuário">RA</div>
      </div>
    </header>
  )
}

export default DashboardHeader
