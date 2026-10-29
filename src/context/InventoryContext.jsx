
import { createContext, useContext, useEffect, useState } from "react";

const InventoryContext = createContext(null);

const STORAGE_KEY = "coldshelf_inventory";

function loadInventory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState(loadInventory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
  }, [inventory]);

  function addProduct(product) {
    setInventory((previous) => [product, ...previous]);
  }

  function updateProduct(id, updates) {
    setInventory((previous) =>
      previous.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  }

  function deleteProduct(id) {
    setInventory((previous) =>
      previous.filter((product) => product.id !== id)
    );
  }

  return (
    <InventoryContext.Provider
      value={{ inventory, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useInventory must be used inside InventoryProvider");
  }

  return context;
}
