
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  PackagePlus,
  CalendarDays,
  Thermometer,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import "./AddInventory.css";
import { useInventory } from "../context/InventoryContext";
const initialForm = {
  productName: "",
  category: "Dairy",
  batchId: "",
  quantity: "",
  unit: "units",
  purchasePrice: "",
  sellingPrice: "",
  purchaseDate: "",
  expiryDate: "",
  storage: "Refrigerated",
  temperature: "",
  notes: "",
};

function AddInventory() {
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);
  const { addProduct } = useInventory();
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setSaved(false);
  }
function handleSubmit(event) {
  event.preventDefault();

  if (
    form.expiryDate &&
    form.purchaseDate &&
    form.expiryDate < form.purchaseDate
  ) {
    alert("Expiry date cannot be earlier than the purchase date.");
    return;
  }

  if (Number(form.sellingPrice) < Number(form.purchasePrice)) {
    const proceed = window.confirm(
      "The selling price is lower than the purchase price. Add this batch anyway?"
    );
    if (!proceed) return;
  }

  const product = {
    ...form,
    id: crypto.randomUUID(),
    batchId: form.batchId.trim() || `CS-${Date.now().toString().slice(-6)}`,
    quantity: Number(form.quantity),
    purchasePrice: Number(form.purchasePrice),
    sellingPrice: Number(form.sellingPrice),
    temperature: form.temperature === "" ? null : Number(form.temperature),
    createdAt: new Date().toISOString(),
  };

  addProduct(product);
  setSaved(true);
  setForm(initialForm);
  window.scrollTo({ top: 0, behavior: "smooth" });
}


  function handleReset() {
    setForm(initialForm);
    setSaved(false);
  }

  return (
    <div className="add-inventory-page">
      <div className="add-inventory-breadcrumb">
        <Link to="/vendor" className="add-inventory-back">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <span>/</span>
        <span>Add Inventory</span>
      </div>

      <div className="add-inventory-heading">
        <div className="add-inventory-title-icon">
          <PackagePlus size={25} />
        </div>
        <div>
          <p className="vendor-eyebrow">INVENTORY MANAGEMENT</p>
          <h1>Add New Inventory</h1>
          <p>
            Record a new product batch to monitor stock freshness and spoilage
            risk.
          </p>
        </div>
      </div>

      {saved && (
        <div className="add-inventory-success" role="status">
          <CheckCircle2 size={21} />
          <div>
            <strong>Product added successfully!</strong>
<p>
  Your batch has been added to the shared demo inventory.
  Open Inventory to view the product.
</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="add-inventory-layout">
          <div className="add-inventory-main-column">
            <section className="add-inventory-card">
              <div className="add-inventory-card-heading">
                <span className="add-inventory-section-number">01</span>
                <div>
                  <h2>Product Information</h2>
                  <p>Identify the product and its batch.</p>
                </div>
              </div>

              <div className="add-inventory-fields">
                <label className="add-inventory-field full">
                  Product Name *
                  <input
                    name="productName"
                    value={form.productName}
                    onChange={handleChange}
                    placeholder="e.g. Fresh Milk"
                    required
                  />
                </label>

                <label className="add-inventory-field">
                  Category *
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option>Dairy</option>
                    <option>Fruits</option>
                    <option>Vegetables</option>
                    <option>Meat & Seafood</option>
                    <option>Bakery</option>
                    <option>Frozen Foods</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="add-inventory-field">
                  Batch ID
                  <input
                    name="batchId"
                    value={form.batchId}
                    onChange={handleChange}
                    placeholder="e.g. BATCH-047"
                  />
                </label>

                <label className="add-inventory-field">
                  Quantity *
                  <input
                    name="quantity"
                    type="number"
                    min="0.01"
                    step="any"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 24"
                    required
                  />
                </label>

                <label className="add-inventory-field">
                  Measurement Unit *
                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    required
                  >
                    <option value="units">Units</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="litres">Litres (L)</option>
                    <option value="packs">Packs</option>
                    <option value="boxes">Boxes</option>
                    <option value="bundles">Bundles</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="add-inventory-card">
              <div className="add-inventory-card-heading">
                <span className="add-inventory-section-number">02</span>
                <div>
                  <h2>Pricing & Stock Dates</h2>
                  <p>Enter the cost, selling price, and freshness dates.</p>
                </div>
              </div>

              <div className="add-inventory-fields">
                <label className="add-inventory-field">
                  Purchase Price (₹) *
                  <input
                    name="purchasePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.purchasePrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </label>

                <label className="add-inventory-field">
                  Selling Price (₹) *
                  <input
                    name="sellingPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.sellingPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </label>

                <label className="add-inventory-field">
                  Purchase Date *
                  <span className="add-inventory-input-icon">
                    <CalendarDays size={17} />
                    <input
                      name="purchaseDate"
                      type="date"
                      value={form.purchaseDate}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </label>

                <label className="add-inventory-field">
                  Expiry Date *
                  <span className="add-inventory-input-icon">
                    <CalendarDays size={17} />
                    <input
                      name="expiryDate"
                      type="date"
                      value={form.expiryDate}
                      onChange={handleChange}
                      min={form.purchaseDate || undefined}
                      required
                    />
                  </span>
                </label>
              </div>
            </section>

            <section className="add-inventory-card">
              <div className="add-inventory-card-heading">
                <span className="add-inventory-section-number">03</span>
                <div>
                  <h2>Storage Conditions</h2>
                  <p>Help ColdShelf estimate the spoilage risk.</p>
                </div>
              </div>

              <div className="add-inventory-fields">
                <label className="add-inventory-field">
                  Storage Type *
                  <select
                    name="storage"
                    value={form.storage}
                    onChange={handleChange}
                    required
                  >
                    <option>Refrigerated</option>
                    <option>Frozen</option>
                    <option>Room Temperature</option>
                    <option>Shaded Stall</option>
                    <option>Open Cart</option>
                    <option>Glass Display</option>
                  </select>
                </label>

                <label className="add-inventory-field">
                  Temperature (°C)
                  <span className="add-inventory-input-icon">
                    <Thermometer size={17} />
                    <input
                      name="temperature"
                      type="number"
                      step="0.1"
                      value={form.temperature}
                      onChange={handleChange}
                      placeholder="e.g. 4"
                    />
                  </span>
                </label>

                <label className="add-inventory-field full">
                  Additional Notes
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any details about the batch or its condition..."
                  />
                </label>
              </div>
            </section>
          </div>

          <aside className="add-inventory-side-column">
            <section className="add-inventory-preview">
              <div className="add-inventory-preview-icon">🌿</div>
              <p className="vendor-eyebrow">BATCH PREVIEW</p>
              <h2>{form.productName || "Your product"}</h2>
              <span className="add-inventory-category">
                {form.category}
              </span>

              <div className="add-inventory-preview-divider" />

              <div className="add-inventory-preview-row">
                <span>Batch ID</span>
                <strong>{form.batchId || "Not assigned"}</strong>
              </div>
              <div className="add-inventory-preview-row">
                <span>Quantity</span>
                <strong>
                  {form.quantity
                    ? `${form.quantity} ${form.unit}`
                    : "Not entered"}
                </strong>
              </div>
              <div className="add-inventory-preview-row">
                <span>Storage</span>
                <strong>{form.storage}</strong>
              </div>
              <div className="add-inventory-preview-row">
                <span>Expiry date</span>
                <strong>{form.expiryDate || "Not entered"}</strong>
              </div>

              <div className="add-inventory-preview-note">
                <Thermometer size={18} />
                <p>
                  Spoilage risk will be calculated when the risk engine is
                  connected. No risk score is generated by this form yet.
                </p>
              </div>
            </section>

            <section className="add-inventory-help">
              <h3>Tips for accurate tracking</h3>
              <ul>
                <li>Enter the correct expiry date for each batch.</li>
                <li>Record storage conditions as accurately as possible.</li>
                <li>Use a unique batch ID when available.</li>
              </ul>
            </section>
          </aside>
        </div>

        <div className="add-inventory-actions">
          <button
            type="button"
            className="add-inventory-reset"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Clear Form
          </button>

          <button type="submit" className="vendor-primary-button">
            <PackagePlus size={17} />
            Validate Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInventory;
