
import { useState } from "react";
import {
  UserRound,
  Store,
  MapPin,
  Phone,
  Mail,
  Thermometer,
  BellRing,
  ShieldCheck,
  Save,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import "./VendorProfile.css";

function VendorProfile() {
  const [profile, setProfile] = useState({
    fullName: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "",
    storeName: "Ramesh Fresh Mart",
    location: "Hyderabad, Telangana",
    businessType: "Grocery Store",
    storageType: "Refrigerated Storage",
    temperature: "4",
  });

  const [notifications, setNotifications] = useState({
    spoilageAlerts: true,
    expiryReminders: true,
    stockUpdates: false,
  });

  const [saved, setSaved] = useState(false);

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
    setSaved(false);
  }

  function handleNotificationChange(name) {
    setNotifications((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
    alert("Demo settings saved! Backend integration will be added later.");
  }

  return (
    <div className="vendor-profile-page">
      <div className="vendor-profile-heading">
        <div>
          <p className="vendor-eyebrow">YOUR WORKSPACE</p>
          <h1>Profile & Settings</h1>
          <p>
            Manage your vendor details, store information, storage preferences,
            and notifications.
          </p>
        </div>

        <div className="vendor-profile-status">
          <span className="vendor-profile-status-dot" />
          Demo Account
        </div>
      </div>

      <div className="vendor-profile-overview">
        <div className="vendor-profile-avatar">
          {profile.fullName.trim().charAt(0).toUpperCase() || "V"}
        </div>

        <div className="vendor-profile-overview-copy">
          <h2>{profile.fullName || "Your Name"}</h2>
          <p>{profile.storeName || "Your Store"}</p>
          <span><MapPin size={14} /> {profile.location || "Store location not added"}</span>
        </div>

        <div className="vendor-profile-role">
          <Leaf size={15} />
          Vendor
        </div>
      </div>

      <form className="vendor-profile-form" onSubmit={handleSubmit}>
        <section className="vendor-profile-card">
          <div className="vendor-profile-section-heading">
            <span className="vendor-profile-section-icon">
              <UserRound size={20} />
            </span>
            <div>
              <h2>Personal Information</h2>
              <p>Keep your contact details up to date.</p>
            </div>
          </div>

          <div className="vendor-profile-fields">
            <label className="vendor-profile-field">
              <span>Full Name</span>
              <div className="vendor-profile-input-wrap">
                <UserRound size={17} />
                <input
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </label>

            <label className="vendor-profile-field">
              <span>Email Address</span>
              <div className="vendor-profile-input-wrap">
                <Mail size={17} />
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </label>

            <label className="vendor-profile-field">
              <span>Phone Number</span>
              <div className="vendor-profile-input-wrap">
                <Phone size={17} />
                <input
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </label>
          </div>
        </section>

        <section className="vendor-profile-card">
          <div className="vendor-profile-section-heading">
            <span className="vendor-profile-section-icon">
              <Store size={20} />
            </span>
            <div>
              <h2>Store Information</h2>
              <p>Details about your business and location.</p>
            </div>
          </div>

          <div className="vendor-profile-fields">
            <label className="vendor-profile-field">
              <span>Store Name</span>
              <input
                name="storeName"
                value={profile.storeName}
                onChange={handleProfileChange}
                placeholder="Enter your store name"
                required
              />
            </label>

            <label className="vendor-profile-field">
              <span>Business Type</span>
              <select
                name="businessType"
                value={profile.businessType}
                onChange={handleProfileChange}
              >
                <option>Grocery Store</option>
                <option>Street Vendor</option>
                <option>Fruit & Vegetable Shop</option>
                <option>Dairy Shop</option>
                <option>Restaurant</option>
                <option>Other</option>
              </select>
            </label>

            <label className="vendor-profile-field full-width">
              <span>Store Location</span>
              <div className="vendor-profile-input-wrap">
                <MapPin size={17} />
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleProfileChange}
                  placeholder="City, State"
                  required
                />
              </div>
            </label>
          </div>
        </section>

        <section className="vendor-profile-card">
          <div className="vendor-profile-section-heading">
            <span className="vendor-profile-section-icon">
              <Thermometer size={20} />
            </span>
            <div>
              <h2>Storage Preferences</h2>
              <p>Help ColdShelf understand your typical storage setup.</p>
            </div>
          </div>

          <div className="vendor-profile-fields">
            <label className="vendor-profile-field">
              <span>Storage Environment</span>
              <select
                name="storageType"
                value={profile.storageType}
                onChange={handleProfileChange}
              >
                <option>Refrigerated Storage</option>
                <option>Open Cart</option>
                <option>Shaded Stall</option>
                <option>Indoor Room</option>
                <option>Glass Display</option>
              </select>
            </label>

            <label className="vendor-profile-field">
              <span>Typical Temperature (°C)</span>
              <div className="vendor-profile-input-wrap">
                <Thermometer size={17} />
                <input
                  name="temperature"
                  type="number"
                  min="-30"
                  max="60"
                  value={profile.temperature}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </label>
          </div>

          <div className="vendor-profile-info-note">
            <ShieldCheck size={17} />
            <p>
              Storage preferences are demo settings. Actual risk predictions
              will require reliable storage and product data.
            </p>
          </div>
        </section>

        <section className="vendor-profile-card">
          <div className="vendor-profile-section-heading">
            <span className="vendor-profile-section-icon">
              <BellRing size={20} />
            </span>
            <div>
              <h2>Notification Preferences</h2>
              <p>Choose which alerts you want enabled in this demo.</p>
            </div>
          </div>

          <div className="vendor-profile-notifications">
            <label className="vendor-profile-toggle-row">
              <span className="vendor-profile-toggle-copy">
                <strong>Spoilage Risk Alerts</strong>
                <small>Highlight batches with elevated spoilage risk.</small>
              </span>
              <input
                type="checkbox"
                checked={notifications.spoilageAlerts}
                onChange={() => handleNotificationChange("spoilageAlerts")}
              />
              <span className="vendor-profile-toggle" />
            </label>

            <label className="vendor-profile-toggle-row">
              <span className="vendor-profile-toggle-copy">
                <strong>Expiry Reminders</strong>
                <small>Remind you to review products nearing expiry.</small>
              </span>
              <input
                type="checkbox"
                checked={notifications.expiryReminders}
                onChange={() => handleNotificationChange("expiryReminders")}
              />
              <span className="vendor-profile-toggle" />
            </label>

            <label className="vendor-profile-toggle-row">
              <span className="vendor-profile-toggle-copy">
                <strong>Stock Updates</strong>
                <small>Receive updates when stock information changes.</small>
              </span>
              <input
                type="checkbox"
                checked={notifications.stockUpdates}
                onChange={() => handleNotificationChange("stockUpdates")}
              />
              <span className="vendor-profile-toggle" />
            </label>
          </div>
        </section>

        <div className="vendor-profile-form-footer">
          <p>
            {saved && (
              <span className="vendor-profile-saved">
                <CheckCircle2 size={16} /> Demo settings saved
              </span>
            )}
          </p>

          <button type="submit" className="vendor-primary-button">
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default VendorProfile;
