
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import VendorLayout from "./components/VendorLayout";

import VendorDashboard from "./pages/VendorDashboard";
import AddInventory from "./pages/AddInventory";
import Inventory from "./pages/Inventory";
import RiskInsights from "./pages/RiskInsights";
import VendorProfile from "./pages/VendorProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
        <Route path="add-inventory" element={<AddInventory />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="risk-insights" element={<RiskInsights />} />
        <Route path="profile" element={<VendorProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
