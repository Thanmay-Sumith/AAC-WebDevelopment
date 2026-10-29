
import { useMemo, useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Trash2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import "./Inventory.css";

const initialProducts = [
  { id: "CS-047", name: "Fresh Milk", category: "Dairy", emoji: "🥛", quantity: 24, unit: "units", price: 32, expiry: "2026-10-30", risk: 78 },
  { id: "CS-032", name: "Tomatoes", category: "Vegetables", emoji: "🍅", quantity: 18, unit: "kg", price: 45, expiry: "2026-10-30", risk: 65 },
  { id: "CS-051", name: "Fresh Spinach", category: "Vegetables", emoji: "🥬", quantity: 8, unit: "bundles", price: 20, expiry: "2026-10-29", risk: 89 },
  { id: "CS-024", name: "Apples", category: "Fruits", emoji: "🍎", quantity: 15, unit: "kg", price: 120, expiry: "2026-11-04", risk: 22 },
  { id: "CS-061", name: "Paneer", category: "Dairy", emoji: "🧀", quantity: 10, unit: "packs", price: 85, expiry: "2026-10-31", risk: 48 },
  { id: "CS-018", name: "Bread", category: "Bakery", emoji: "🍞", quantity: 20, unit: "packs", price: 35, expiry: "2026-10-29", risk: 92 },
  { id: "CS-073", name: "Carrots", category: "Vegetables", emoji: "🥕", quantity: 12, unit: "kg", price: 40, expiry: "2026-11-02", risk: 35 },
];

function getRiskLabel(risk) {
  if (risk === null || risk === undefined) {
    return "Not calculated";
  }

  if (risk >= 80) return "Critical";
  if (risk >= 50) return "At Risk";

  return "Normal";
}

function Inventory() {
  const { inventory, deleteProduct } = useInventory();

  const [demoProducts, setDemoProducts] = useState(initialProducts);

  const products = useMemo(() => {
    const savedProducts = inventory.map((item) => ({
      id: item.id,
      batchId: item.batchId,
      name: item.productName,
      category: item.category,

      emoji:
        {
          Dairy: "🥛",
          Fruits: "🍎",
          Vegetables: "🥬",
          "Meat & Seafood": "🐟",
          Bakery: "🍞",
          "Frozen Foods": "🧊",
          Other: "📦",
        }[item.category] || "📦",

      quantity: item.quantity,
      unit: item.unit,
      price: item.sellingPrice,
      expiry: item.expiryDate,
      risk: null,
    }));

    return [...savedProducts, ...demoProducts];
  }, [inventory, demoProducts]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
  product.name.toLowerCase().includes(query) ||
  (product.batchId || product.id).toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.category === category;

      const label = getRiskLabel(product.risk);
      const matchesRisk =
        riskFilter === "All" || label === riskFilter;

      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [products, search, category, riskFilter]);

  const atRiskCount = products.filter(
  (p) => p.risk !== null && p.risk >= 50
).length;

const criticalCount = products.filter(
  (p) => p.risk !== null && p.risk >= 80
).length;

const normalCount = products.filter(
  (p) => p.risk !== null && p.risk < 50
).length;

const uncalculatedCount = products.filter(
  (p) => p.risk === null || p.risk === undefined
).length;

  function removeProduct(id) {
  const confirmed = window.confirm(
    "Remove this product from the inventory?"
  );

  if (!confirmed) return;

  const isSavedProduct = inventory.some(
    (product) => product.id === id
  );

  if (isSavedProduct) {
    deleteProduct(id);
  } else {
    setDemoProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  }

  if (selectedProduct?.id === id) {
    setSelectedProduct(null);
  }
}

  return (
    <div className="inventory-page">
      <div className="inventory-heading-row">
        <div>
          <p className="vendor-eyebrow">STOCK MANAGEMENT</p>
          <h1>Inventory</h1>
          <p>Track your products, quantities, freshness, and estimated risk.</p>
        </div>

        <Link to="/vendor/add-inventory" className="vendor-primary-button">
          <Plus size={17} />
          Add Product
        </Link>
      </div>

      <div className="inventory-summary-grid">
        <div className="inventory-summary-card">
          <span className="inventory-summary-icon"><Package size={20} /></span>
          <div><p>Total Products</p><strong>{products.length}</strong><small>Products in this demo</small></div>
        </div>

        <div className="inventory-summary-card">
          <span className="inventory-summary-icon warning"><AlertTriangle size={20} /></span>
          <div><p>At-Risk Products</p><strong>{atRiskCount}</strong><small>Risk score of 50% or higher</small></div>
        </div>

        <div className="inventory-summary-card">
          <span className="inventory-summary-icon danger"><AlertTriangle size={20} /></span>
          <div><p>Critical Risk</p><strong>{criticalCount}</strong><small>Risk score of 80% or higher</small></div>
        </div>

        <div className="inventory-summary-card">
          <span className="inventory-summary-icon healthy"><CheckCircle2 size={20} /></span>
          <div><p>Normal Risk</p><strong>{normalCount}</strong><small>Below 50% estimated risk</small></div>
        </div>
      </div>
        <div className="inventory-summary-card">
  <span className="inventory-summary-icon">
    <Package size={20} />
  </span>

  <div>
    <p>Risk Pending</p>
    <strong>{uncalculatedCount}</strong>
    <small>Awaiting risk calculation</small>
  </div>
</div>
      <section className="inventory-table-card">
        <div className="inventory-table-heading">
          <div>
            <h2>All Products</h2>
            <p>Showing {filteredProducts.length} of {products.length} products</p>
          </div>
          <span className="inventory-demo-tag">DEMO DATA</span>
        </div>

        <div className="inventory-filters">
          <label className="inventory-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search product or batch ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button type="button" aria-label="Clear search" onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </label>

          <label className="inventory-filter-select">
            <SlidersHorizontal size={16} />
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="All">All categories</option>
              <option value="Dairy">Dairy</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Bakery">Bakery</option>
            </select>
          </label>

          <label className="inventory-filter-select">
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}>
              <option value="All">All risk levels</option>
              <option value="Normal">Normal</option>
              <option value="At Risk">At Risk</option>
              <option value="Critical">Critical</option>
              <option value="Not calculated">Not calculated</option>
            </select>
          </label>
        </div>

        <div className="inventory-table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>BATCH ID</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>EXPIRY DATE</th>
                <th>SPOILAGE RISK</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const label = getRiskLabel(product.risk);

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="inventory-product-cell">
                        <span className="inventory-product-emoji">{product.emoji}</span>
                        <div><strong>{product.name}</strong><small>{product.category}</small></div>
                      </div>
                    </td>
                    <td>
  <span className="inventory-batch-id">
    {product.batchId || product.id}
  </span>
</td>
                    <td>{product.quantity} {product.unit}</td>
                    <td>₹{product.price}</td>
                    <td>{product.expiry}</td>
                    <td>
                      <div className="inventory-risk-cell">
                        <span
  className={`inventory-risk-badge ${label.toLowerCase().replaceAll(" ", "-")}`}
>
  {product.risk == null
    ? "Not calculated"
    : `${label} · ${product.risk}%`}
</span>
                        <div className="inventory-risk-track">
  <div
    className={`inventory-risk-fill ${label.toLowerCase().replaceAll(" ", "-")}`}
    style={{ width: `${product.risk ?? 0}%` }}
  />
</div>
                      </div>
                    </td>
                    <td>
                      <div className="inventory-row-actions">
                        <button type="button" title="View details" aria-label={`View ${product.name}`} onClick={() => setSelectedProduct(product)}>
                          <Eye size={16} />
                        </button>
                        <button type="button" title="Remove demo item" aria-label={`Remove ${product.name}`} onClick={() => removeProduct(product.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="inventory-empty-state">
                      <Package size={27} />
                      <strong>No matching products</strong>
                      <p>Try changing your search or filters.</p>
                      <button type="button" onClick={() => { setSearch(""); setCategory("All"); setRiskFilter("All"); }}>
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedProduct && (
        <div className="inventory-modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <section className="inventory-modal" role="dialog" aria-modal="true" aria-labelledby="inventory-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="inventory-modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close details">
              <X size={20} />
            </button>
            <div className="inventory-product-emoji large">{selectedProduct.emoji}</div>
            <p className="vendor-eyebrow">PRODUCT DETAILS</p>
            <h2 id="inventory-modal-title">{selectedProduct.name}</h2>
            <p className="inventory-modal-subtitle">
  {selectedProduct.category} · {selectedProduct.batchId || selectedProduct.id}
</p>

            <div className="inventory-modal-details">
              <div><span>Quantity</span><strong>{selectedProduct.quantity} {selectedProduct.unit}</strong></div>
              <div><span>Price</span><strong>₹{selectedProduct.price}</strong></div>
              <div><span>Expiry</span><strong>{selectedProduct.expiry}</strong></div>
              <div><span>Estimated risk</span><strong>{selectedProduct.risk}% · {getRiskLabel(selectedProduct.risk)}</strong></div>
            </div>
            <p className="inventory-modal-note">Demo product information. Real stock and risk calculations will be connected later.</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default Inventory;
