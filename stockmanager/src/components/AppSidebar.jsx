import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
} from 'lucide-react'

const navigationItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#dashboard', active: true },
  { label: 'Produtos', icon: Package, href: '#estoque' },
  { label: 'Movimentações', icon: ArrowLeftRight, href: '#movimentacoes' },
  { label: 'Relatórios', icon: BarChart3, href: '#relatorios' },
]

function AppSidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" aria-label="StockManager, página inicial">
        <span className="brand-mark">
          <Package size={21} />
        </span>
        <span>StockManager</span>
      </a>

      <div className="sidebar-section-label">MENU</div>
      <nav className="sidebar-nav" aria-label="Navegação principal">
        {navigationItems.map(({ label, icon: Icon, href, active }) => (
          <a
            className={`nav-link${active ? ' nav-link-active' : ''}`}
            href={href}
            key={label}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={1.9} />
            <span>{label}</span>
          </a>
        ))}
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
