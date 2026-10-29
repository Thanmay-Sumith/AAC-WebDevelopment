
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Leaf,
  LayoutDashboard,
  PackagePlus,
  Package,
  ChartNoAxesCombined,
  UserRoundCog,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import "./VendorLayout.css";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/vendor",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Add Inventory",
    path: "/vendor/add-inventory",
    icon: PackagePlus,
  },
  {
    label: "Inventory",
    path: "/vendor/inventory",
    icon: Package,
  },
  {
    label: "Risk Insights",
    path: "/vendor/risk-insights",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Profile & Settings",
    path: "/vendor/profile",
    icon: UserRoundCog,
  },
];

function VendorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/auth");
  }

  return (
    <div className="vendor-app">
      {sidebarOpen && (
        <button
          type="button"
          className="vendor-sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`vendor-sidebar ${
          sidebarOpen ? "vendor-sidebar-open" : ""
        }`}
      >
        <NavLink
          to="/vendor"
          className="vendor-brand"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="vendor-brand-icon">
            <Leaf size={25} />
          </span>
          <span>ColdShelf</span>
        </NavLink>

        <div className="vendor-sidebar-label">WORKSPACE</div>

        <nav className="vendor-navigation" aria-label="Vendor navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `vendor-nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={19} strokeWidth={1.9} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="vendor-sidebar-bottom">
          <div className="vendor-sidebar-tip">
            <Leaf size={22} />
            <p>Less waste.<br />More freshness.</p>
            <span>Every batch matters.</span>
          </div>

          <button
            type="button"
            className="vendor-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Back to Sign In</span>
          </button>
        </div>
      </aside>

      <div className="vendor-main">
        <header className="vendor-topbar">
          <button
            type="button"
            className="vendor-mobile-menu"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <label className="vendor-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search inventory, products, or alerts..."
              aria-label="Search inventory, products, or alerts"
            />
          </label>

          <div className="vendor-topbar-actions">
            <button
              type="button"
              className="vendor-icon-button"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={19} />
              <span className="vendor-notification-dot" />
            </button>

            <button
              type="button"
              className="vendor-user-button"
              onClick={() => navigate("/vendor/profile")}
            >
              <span className="vendor-avatar">R</span>
              <span className="vendor-user-copy">
                <strong>Ramesh Kumar</strong>
                <small>Vendor</small>
              </span>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>

        <main className="vendor-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default VendorLayout;
