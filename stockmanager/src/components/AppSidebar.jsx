import { ClipboardList, LayoutDashboard, Package, Settings } from 'lucide-react'

const navigationItems = [
  { label: 'Visão geral', icon: LayoutDashboard, active: true },
  { label: 'Estoque', icon: Package },
  { label: 'Movimentações', icon: ClipboardList },
]

function AppSidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="StockManager, página inicial">
        <span className="brand-mark">
          <Package size={21} />
        </span>
        <span>Stock<span className="brand-accent">Manager</span></span>
      </a>

      <div className="sidebar-section-label">MENU</div>
      <nav className="sidebar-nav" aria-label="Navegação principal">
        {navigationItems.map(({ label, icon: Icon, active }) => (
          <a
            className={`nav-link${active ? ' nav-link-active' : ''}`}
            href={active ? '#dashboard' : '#'}
            key={label}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={1.9} />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <a className="nav-link" href="#">
          <Settings size={18} strokeWidth={1.9} />
          <span>Configurações</span>
        </a>
        <div className="sidebar-note">
          <span className="sidebar-note-dot" />
          <span>Almoxarifado central</span>
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar
