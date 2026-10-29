
import { Link } from "react-router-dom";
import {
  Package,
  AlertTriangle,
  IndianRupee,
  Leaf,
  Plus,
  Clock,
  ShoppingBasket,
  BellRing,
} from "lucide-react";

const stockItems = [
  { name: "Fresh Milk", batch: "Batch #47 · 24 units", emoji: "🥛", risk: 78, label: "High Risk" },
  { name: "Tomatoes", batch: "Batch #32 · 18 kg", emoji: "🍅", risk: 65, label: "At Risk" },
  { name: "Fresh Spinach", batch: "Batch #51 · 8 bundles", emoji: "🥬", risk: 89, label: "Critical" },
];

const alerts = [
  {
    title: "Milk batch needs attention",
    description: "Batch #47 has a 78% estimated spoilage risk.",
    time: "Act soon",
    icon: AlertTriangle,
  },
  {
    title: "Rescue-stock opportunity",
    description: "Consider a discount on items nearing spoilage.",
    time: "Suggested action",
    icon: ShoppingBasket,
  },
  {
    title: "Inventory check",
    description: "Review your high-risk vegetables today.",
    time: "Stock reminder",
    icon: BellRing,
  },
];

function VendorDashboard() {
  return (
    <div>
      <div className="vendor-heading-row">
        <div>
          <p className="vendor-eyebrow">VENDOR WORKSPACE</p>
          <h1>Hello, Ramesh!</h1>
          <p>Here's what's happening with your stock today.</p>
        </div>

        <Link to="/vendor/add-inventory" className="vendor-primary-button">
          <Plus size={17} />
          Add Inventory
        </Link>
      </div>

      <div className="vendor-stats-grid">
        <div className="vendor-stat-card">
          <div className="vendor-stat-top">
            <span className="vendor-stat-label">Total Products</span>
            <span className="vendor-stat-icon"><Package size={19} /></span>
          </div>
          <div className="vendor-stat-value">128</div>
          <span className="vendor-stat-note">Across all active batches</span>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-top">
            <span className="vendor-stat-label">At-Risk Stock</span>
            <span className="vendor-stat-icon warning"><AlertTriangle size={19} /></span>
          </div>
          <div className="vendor-stat-value">12</div>
          <span className="vendor-stat-note">Batches need attention</span>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-top">
            <span className="vendor-stat-label">Estimated Stock Value</span>
            <span className="vendor-stat-icon"><IndianRupee size={19} /></span>
          </div>
          <div className="vendor-stat-value">₹24.8k</div>
          <span className="vendor-stat-note">Based on demo inventory</span>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-top">
            <span className="vendor-stat-label">Waste Prevention</span>
            <span className="vendor-stat-icon"><Leaf size={19} /></span>
          </div>
          <div className="vendor-stat-value">86%</div>
          <span className="vendor-stat-note">Illustrative demo metric</span>
        </div>
      </div>

      <div className="vendor-dashboard-grid">
        <section className="vendor-panel">
          <div className="vendor-panel-heading">
            <div>
              <h2>Stock That Needs Attention</h2>
              <p>Products with elevated spoilage risk</p>
            </div>
            <Link to="/vendor/inventory" className="vendor-text-link">
              View inventory →
            </Link>
          </div>

          <div className="vendor-stock-list">
            {stockItems.map((item) => (
              <div className="vendor-stock-row" key={item.batch}>
                <div className="vendor-product-icon">{item.emoji}</div>
                <div className="vendor-stock-info">
                  <strong>{item.name}</strong>
                  <span>{item.batch}</span>
                </div>
                <span className={`vendor-risk-pill ${item.risk >= 80 ? "high" : ""}`}>
                  {item.risk}%
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="vendor-panel">
          <div className="vendor-panel-heading">
            <div>
              <h2>Spoilage Risk Distribution</h2>
              <p>Illustrative breakdown of active batches</p>
            </div>
            <Link to="/vendor/risk-insights" className="vendor-text-link">
              Details →
            </Link>
          </div>

          <div className="vendor-risk-overview">
            <div className="vendor-risk-line">
              <div className="vendor-risk-line-label">
                <span>Low risk · Normal</span><strong>68%</strong>
              </div>
              <div className="vendor-progress-track">
                <div className="vendor-progress-fill" style={{ width: "68%" }} />
              </div>
            </div>

            <div className="vendor-risk-line">
              <div className="vendor-risk-line-label">
                <span>Medium risk · Warning</span><strong>22%</strong>
              </div>
              <div className="vendor-progress-track">
                <div className="vendor-progress-fill medium" style={{ width: "22%" }} />
              </div>
            </div>

            <div className="vendor-risk-line">
              <div className="vendor-risk-line-label">
                <span>High risk · Take action</span><strong>10%</strong>
              </div>
              <div className="vendor-progress-track">
                <div className="vendor-progress-fill high" style={{ width: "10%" }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="vendor-dashboard-grid">
        <section className="vendor-panel">
          <div className="vendor-panel-heading">
            <div>
              <h2>Latest Alerts</h2>
              <p>Suggested actions for your store</p>
            </div>
            <Clock size={19} color="#7d8d80" />
          </div>

          <div className="vendor-alert-list">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;

              return (
                <div className="vendor-alert-row" key={alert.title}>
                  <div className={`vendor-alert-symbol ${index === 1 ? "green" : ""}`}>
                    <Icon size={17} />
                  </div>
                  <div className="vendor-alert-copy">
                    <strong>{alert.title}</strong>
                    <p>{alert.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="vendor-panel">
          <div className="vendor-panel-heading">
            <div>
              <h2>Nearby B2B Buyers</h2>
              <p>Potential buyers for your available stock</p>
            </div>
          </div>

          <div className="vendor-alert-row">
            <div className="vendor-alert-symbol green">
              <ShoppingBasket size={18} />
            </div>
            <div className="vendor-alert-copy">
              <strong>Green Bowl Restaurant</strong>
              <p>Interested in fresh vegetables · Demo buyer</p>
            </div>
          </div>

          <div className="vendor-alert-row">
            <div className="vendor-alert-symbol green">
              <ShoppingBasket size={18} />
            </div>
            <div className="vendor-alert-copy">
              <strong>Fresh Mart Grocery</strong>
              <p>Potential bulk buyer · Demo buyer</p>
            </div>
          </div>

          <p style={{ color: "#879389", fontSize: "11px", lineHeight: 1.7 }}>
            Buyer details are sample data. Real nearby buyers will be connected later.
          </p>
        </section>
      </div>

      <section className="vendor-promo-panel">
        <div>
          <p className="vendor-eyebrow">COLD SHELF RESCUE</p>
          <h2>Turn at-risk stock into an opportunity.</h2>
          <p>
            Offer discounts on products nearing spoilage to help reduce waste
            and give buyers a chance to save on fresh stock.
          </p>
          <Link to="/vendor/inventory" className="vendor-primary-button" style={{ marginTop: 17 }}>
            Review At-Risk Stock
          </Link>
        </div>
        <div className="vendor-promo-emoji">🌱</div>
      </section>
    </div>
  );
}

export default VendorDashboard;
