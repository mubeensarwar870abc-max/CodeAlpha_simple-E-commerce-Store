import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import defaultStore from "../data/defaultStore";

const STORAGE_KEY = "booknest_store";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const loadStore = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultStore,
        ...parsed,
        settings: { ...defaultStore.settings, ...(parsed.settings || {}) },
        categories: Array.isArray(parsed.categories)
          ? parsed.categories
          : defaultStore.categories,
        featuredProducts: Array.isArray(parsed.featuredProducts)
          ? parsed.featuredProducts
          : defaultStore.featuredProducts,
        offers: Array.isArray(parsed.offers) ? parsed.offers : defaultStore.offers,
      };
    }
  } catch {
    /* use defaults */
  }
  return defaultStore;
};

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(loadStore);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store]);

  const updateSettings = useCallback((updates) => {
    setStore((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, []);

  const getCategory = useCallback(
    (categoryId) => store.categories.find((c) => c.id === categoryId),
    [store.categories]
  );

  const getCategoryByRoute = useCallback(
    (route) => store.categories.find((c) => c.route === route),
    [store.categories]
  );

  const updateCategory = useCallback((categoryId, updates) => {
    setStore((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, ...updates } : cat
      ),
    }));
  }, []);

  const addProduct = useCallback((categoryId, sectionId, product) => {
    setStore((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          sections: cat.sections.map((sec) => {
            if (sec.id !== sectionId) return sec;
            const newId = Date.now();
            return {
              ...sec,
              products: [...sec.products, { ...product, id: newId }],
            };
          }),
        };
      }),
    }));
  }, []);

  const updateProduct = useCallback((categoryId, sectionId, productId, updates) => {
    setStore((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          sections: cat.sections.map((sec) => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              products: sec.products.map((p) =>
                p.id === productId ? { ...p, ...updates } : p
              ),
            };
          }),
        };
      }),
    }));
  }, []);

  const deleteProduct = useCallback((categoryId, sectionId, productId) => {
    setStore((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          sections: cat.sections.map((sec) => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              products: sec.products.filter((p) => p.id !== productId),
            };
          }),
        };
      }),
    }));
  }, []);

  const reorderProduct = useCallback((categoryId, sectionId, productId, direction) => {
    setStore((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          sections: cat.sections.map((sec) => {
            if (sec.id !== sectionId) return sec;
            const products = [...sec.products];
            const idx = products.findIndex((p) => p.id === productId);
            if (idx === -1) return sec;
            const newIdx = direction === "up" ? idx - 1 : idx + 1;
            if (newIdx < 0 || newIdx >= products.length) return sec;
            [products[idx], products[newIdx]] = [products[newIdx], products[idx]];
            return { ...sec, products };
          }),
        };
      }),
    }));
  }, []);

  const updateFeaturedProducts = useCallback((products) => {
    setStore((prev) => ({ ...prev, featuredProducts: products }));
  }, []);

  const addFeaturedProduct = useCallback((product) => {
    setStore((prev) => ({
      ...prev,
      featuredProducts: [...prev.featuredProducts, { ...product, id: Date.now() }],
    }));
  }, []);

  const updateFeaturedProduct = useCallback((productId, updates) => {
    setStore((prev) => ({
      ...prev,
      featuredProducts: prev.featuredProducts.map((p) =>
        p.id === productId ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const deleteFeaturedProduct = useCallback((productId) => {
    setStore((prev) => ({
      ...prev,
      featuredProducts: prev.featuredProducts.filter((p) => p.id !== productId),
    }));
  }, []);

  const updateOffers = useCallback((offers) => {
    setStore((prev) => ({ ...prev, offers }));
  }, []);

  const addOffer = useCallback((offer) => {
    setStore((prev) => ({
      ...prev,
      offers: [...prev.offers, { ...offer, id: Date.now() }],
    }));
  }, []);

  const updateOffer = useCallback((offerId, updates) => {
    setStore((prev) => ({
      ...prev,
      offers: prev.offers.map((o) => (o.id === offerId ? { ...o, ...updates } : o)),
    }));
  }, []);

  const deleteOffer = useCallback((offerId) => {
    setStore((prev) => ({
      ...prev,
      offers: prev.offers.filter((o) => o.id !== offerId),
    }));
  }, []);

  const resetStore = useCallback(() => {
    setStore(defaultStore);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        store,
        updateSettings,
        getCategory,
        getCategoryByRoute,
        updateCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        reorderProduct,
        updateFeaturedProducts,
        addFeaturedProduct,
        updateFeaturedProduct,
        deleteFeaturedProduct,
        updateOffers,
        addOffer,
        updateOffer,
        deleteOffer,
        resetStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
