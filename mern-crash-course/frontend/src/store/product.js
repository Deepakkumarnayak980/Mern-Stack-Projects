import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/product");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const text = await res.text(); // 👈 prevents JSON crash
      const data = text ? JSON.parse(text) : {};

      set({ products: data.data || [] });
    } catch (error) {
      console.error("Fetch products failed:", error);
      set({ products: [] });
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/product/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter((p) => p._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/product/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((p) =>
          p._id === pid ? data.data : p
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
