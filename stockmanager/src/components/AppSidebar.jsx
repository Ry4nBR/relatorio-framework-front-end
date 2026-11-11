import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
} from 'lucide-react'

const navigationItems = [
  { label: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
  { label: 'Produtos', icon: Package, page: 'products' },
  { label: 'Movimentações', icon: ArrowLeftRight, href: '#movimentacoes' },
  { label: 'Relatórios', icon: BarChart3, href: '#relatorios' },
]

function AppSidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <button
        className="brand"
        type="button"
        onClick={() => onNavigate('dashboard')}
        aria-label="StockManager, página inicial"
      >
        <span className="brand-mark">
          <Package size={21} />
        </span>
        <span>StockManager</span>
      </button>

      <div className="sidebar-section-label">MENU</div>
      <nav className="sidebar-nav" aria-label="Navegação principal">
        {navigationItems.map(({ label, icon: Icon, page, href }) => {
          const isActive = activePage === page
          const content = (
            <>
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
            </>
          )

          return page ? (
            <button
              className={`nav-link${isActive ? ' nav-link-active' : ''}`}
              type="button"
              key={label}
              onClick={() => onNavigate(page)}
              aria-current={isActive ? 'page' : undefined}
            >
              {content}
            </button>
          ) : (
            <a
              className="nav-link"
              href={href}
              key={label}
              onClick={() => onNavigate('dashboard')}
            >
              {content}
            </a>
          )
        })}
      </nav>

      <div className="sidebar-bottom">
        <a className="nav-link settings-link" href="#configuracoes">
          <Settings size={18} strokeWidth={1.9} />
          <span>Configurações</span>
        </a>
        <div className="admin-profile">
          <div className="user-avatar">AD</div>
          <div className="admin-profile-copy">
            <strong>Administrador</strong>
            <span>Almoxarifado</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar
