
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Leaf,
  TrendingUp,
  Thermometer,
  ArrowRight,
  ShieldAlert,
  Package,
} from "lucide-react";
import "./RiskInsights.css";

const demoBatches = [
  {
    id: "CS-051",
    name: "Fresh Spinach",
    category: "Vegetables",
    emoji: "🥬",
    quantity: "8 bundles",
    expiry: "29 Oct 2026",
    risk: 89,
    reason: "Highly perishable; requires an immediate stock check.",
    action: "Inspect stock and consider a discount.",
  },
  {
    id: "CS-018",
    name: "Bread",
    category: "Bakery",
    emoji: "🍞",
    quantity: "20 packs",
    expiry: "29 Oct 2026",
    risk: 92,
    reason: "Short shelf life; check freshness and remaining stock.",
    action: "Prioritize sale or suitable redistribution.",
  },
  {
    id: "CS-047",
    name: "Fresh Milk",
    category: "Dairy",
    emoji: "🥛",
    quantity: "24 units",
    expiry: "30 Oct 2026",
    risk: 78,
    reason: "Temperature-sensitive product with elevated demo risk.",
    action: "Check refrigeration and batch condition.",
  },
  {
    id: "CS-032",
    name: "Tomatoes",
    category: "Vegetables",
    emoji: "🍅",
    quantity: "18 kg",
    expiry: "30 Oct 2026",
    risk: 65,
    reason: "Inspect ripeness and current storage conditions.",
    action: "Review stock and consider an early sale.",
  },
  {
    id: "CS-061",
    name: "Paneer",
    category: "Dairy",
    emoji: "🧀",
    quantity: "10 packs",
    expiry: "31 Oct 2026",
    risk: 48,
    reason: "Monitor storage conditions and freshness.",
    action: "Continue regular monitoring.",
  },
  {
    id: "CS-024",
    name: "Apples",
    category: "Fruits",
    emoji: "🍎",
    quantity: "15 kg",
    expiry: "4 Nov 2026",
    risk: 22,
    reason: "Lower estimated risk in this demo dataset.",
    action: "Continue normal stock rotation.",
  },
];

function getRiskLevel(risk) {
  if (risk >= 80) return "High";
  if (risk >= 50) return "Medium";
  return "Low";
}

function RiskInsights() {
  const [riskFilter, setRiskFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredBatches = useMemo(() => {
    return demoBatches.filter((batch) => {
      const matchesRisk =
        riskFilter === "All" || getRiskLevel(batch.risk) === riskFilter;

      const matchesCategory =
        categoryFilter === "All" || batch.category === categoryFilter;

      return matchesRisk && matchesCategory;
    });
  }, [riskFilter, categoryFilter]);

  const highRiskCount = demoBatches.filter((b) => b.risk >= 80).length;
  const mediumRiskCount = demoBatches.filter(
    (b) => b.risk >= 50 && b.risk < 80
  ).length;
  const lowRiskCount = demoBatches.filter((b) => b.risk < 50).length;

  const averageRisk = Math.round(
    demoBatches.reduce((sum, batch) => sum + batch.risk, 0) /
      demoBatches.length
  );

  const urgentBatches = [...demoBatches]
    .filter((batch) => batch.risk >= 80)
    .sort((a, b) => b.risk - a.risk);

  return (
    <div className="risk-insights-page">
      <div className="risk-insights-heading">
        <div>
          <p className="vendor-eyebrow">PREDICTIVE STOCK MONITORING</p>
          <h1>Risk Insights</h1>
          <p>
            Understand spoilage risk, prioritize batches, and take action to
            reduce avoidable waste.
          </p>
        </div>

        <Link to="/vendor/inventory" className="vendor-primary-button">
          <Package size={17} />
          View Inventory
        </Link>
      </div>

      <div className="risk-demo-notice">
        <AlertTriangle size={18} />
        <p>
          <strong>Demo analysis:</strong> Risk scores and recommendations below
          are sample values, not live predictions from actual storage,
          temperature, or weather data.
        </p>
      </div>

      <div className="risk-summary-grid">
        <article className="risk-summary-card">
          <div className="risk-summary-top">
            <span>Average Risk Score</span>
            <span className="risk-summary-icon purple">
              <TrendingUp size={19} />
            </span>
          </div>
          <strong className="risk-summary-value">{averageRisk}%</strong>
          <p>Across {demoBatches.length} sample batches</p>
        </article>

        <article className="risk-summary-card">
          <div className="risk-summary-top">
            <span>High Risk</span>
            <span className="risk-summary-icon red">
              <ShieldAlert size={19} />
            </span>
          </div>
          <strong className="risk-summary-value">{highRiskCount}</strong>
          <p>80% risk or above</p>
        </article>

        <article className="risk-summary-card">
          <div className="risk-summary-top">
            <span>Medium Risk</span>
            <span className="risk-summary-icon orange">
              <AlertTriangle size={19} />
            </span>
          </div>
          <strong className="risk-summary-value">{mediumRiskCount}</strong>
          <p>50–79% estimated risk</p>
        </article>

        <article className="risk-summary-card">
          <div className="risk-summary-top">
            <span>Low Risk</span>
            <span className="risk-summary-icon green">
              <CheckCircle2 size={19} />
            </span>
          </div>
          <strong className="risk-summary-value">{lowRiskCount}</strong>
          <p>Below 50% estimated risk</p>
        </article>
      </div>

      <div className="risk-insights-grid">
        <section className="risk-panel">
          <div className="risk-panel-heading">
            <div>
              <h2>Risk Distribution</h2>
              <p>How the sample batches are classified</p>
            </div>
            <TrendingUp size={19} />
          </div>

          <div className="risk-distribution">
            <div className="risk-distribution-number">
              <strong>{demoBatches.length}</strong>
              <span>Sample batches</span>
            </div>

            <div className="risk-distribution-bars">
              <div className="risk-distribution-row">
                <div className="risk-distribution-label">
                  <span><i className="risk-dot low" />Low risk</span>
                  <strong>{lowRiskCount} batches</strong>
                </div>
                <div className="risk-track">
                  <div
                    className="risk-fill low"
                    style={{
                      width: `${(lowRiskCount / demoBatches.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="risk-distribution-row">
                <div className="risk-distribution-label">
                  <span><i className="risk-dot medium" />Medium risk</span>
                  <strong>{mediumRiskCount} batches</strong>
                </div>
                <div className="risk-track">
                  <div
                    className="risk-fill medium"
                    style={{
                      width: `${(mediumRiskCount / demoBatches.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="risk-distribution-row">
                <div className="risk-distribution-label">
                  <span><i className="risk-dot high" />High risk</span>
                  <strong>{highRiskCount} batches</strong>
                </div>
                <div className="risk-track">
                  <div
                    className="risk-fill high"
                    style={{
                      width: `${(highRiskCount / demoBatches.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="risk-panel risk-method-panel">
          <div className="risk-panel-heading">
            <div>
              <h2>What affects spoilage risk?</h2>
              <p>Signals ColdShelf can use in a future risk engine</p>
            </div>
            <Thermometer size={20} />
          </div>

          <div className="risk-factor">
            <span className="risk-factor-icon"><Clock size={18} /></span>
            <div>
              <strong>Product age and expiry</strong>
              <p>Time since purchase and remaining shelf life.</p>
            </div>
          </div>

          <div className="risk-factor">
            <span className="risk-factor-icon"><Thermometer size={18} /></span>
            <div>
              <strong>Storage and temperature</strong>
              <p>Whether storage conditions suit the product.</p>
            </div>
          </div>

          <div className="risk-factor">
            <span className="risk-factor-icon"><Leaf size={18} /></span>
            <div>
              <strong>Product perishability</strong>
              <p>Different foods deteriorate at different rates.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="risk-panel risk-batch-panel">
        <div className="risk-batch-heading">
          <div>
            <h2>Batch Risk Analysis</h2>
            <p>Review individual products and their suggested next steps.</p>
          </div>

          <Link to="/vendor/add-inventory" className="risk-add-link">
            Add batch <ArrowRight size={15} />
          </Link>
        </div>

        <div className="risk-filters">
          <label>
            Risk level
            <select
              value={riskFilter}
              onChange={(event) => setRiskFilter(event.target.value)}
            >
              <option value="All">All levels</option>
              <option value="High">High risk</option>
              <option value="Medium">Medium risk</option>
              <option value="Low">Low risk</option>
            </select>
          </label>

          <label>
            Category
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="All">All categories</option>
              <option value="Dairy">Dairy</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Bakery">Bakery</option>
            </select>
          </label>

          <span className="risk-results-count">
            {filteredBatches.length} batches
          </span>
        </div>

        <div className="risk-batch-list">
          {filteredBatches.map((batch) => {
            const level = getRiskLevel(batch.risk);

            return (
              <article className="risk-batch-row" key={batch.id}>
                <div className="risk-batch-product">
                  <span className="risk-batch-emoji">{batch.emoji}</span>
                  <div>
                    <strong>{batch.name}</strong>
                    <span>{batch.id} · {batch.category}</span>
                    <small>{batch.quantity} · Expires {batch.expiry}</small>
                  </div>
                </div>

                <div className="risk-batch-score">
                  <div className="risk-batch-score-label">
                    <span>Estimated risk</span>
                    <strong className={`risk-score-text ${level.toLowerCase()}`}>
                      {batch.risk}%
                    </strong>
                  </div>
                  <div className="risk-track">
                    <div
                      className={`risk-fill ${level.toLowerCase()}`}
                      style={{ width: `${batch.risk}%` }}
                    />
                  </div>
                  <span className={`risk-level-badge ${level.toLowerCase()}`}>
                    {level} Risk
                  </span>
                </div>

                <div className="risk-batch-action">
                  <strong>Suggested action</strong>
                  <p>{batch.action}</p>
                  <small>{batch.reason}</small>
                </div>
              </article>
            );
          })}

          {filteredBatches.length === 0 && (
            <div className="risk-empty-state">
              <Leaf size={27} />
              <strong>No batches match these filters.</strong>
              <button
                type="button"
                onClick={() => {
                  setRiskFilter("All");
                  setCategoryFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="risk-action-banner">
        <div className="risk-action-banner-icon">
          <AlertTriangle size={23} />
        </div>
        <div>
          <h2>Start with your highest-risk batches</h2>
          <p>
            Inspect products, verify storage conditions, and review options for
            selling or safely redistributing stock before it spoils.
          </p>
        </div>
        <Link to="/vendor/inventory" className="vendor-primary-button">
          Review Stock <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

export default RiskInsights;
