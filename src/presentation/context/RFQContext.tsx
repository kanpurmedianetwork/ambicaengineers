import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../domain/entities/Product';
import { RFQItem } from '../../domain/entities/RFQItem';

interface RFQContextType {
  items: RFQItem[];
  totalItemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, quantity?: number, notes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearRFQ: () => void;
  isInRFQ: (productId: string) => boolean;
}

const RFQContext = createContext<RFQContextType | undefined>(undefined);

const STORAGE_KEY = 'ambica_rfq_cart';

export const RFQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<RFQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save RFQ state', e);
    }
  }, [items]);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addItem = (product: Product, quantity = 1, notes = '') => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, quantity, notes, addedAt: new Date().toISOString() }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateNotes = (productId: string, notes: string) => {
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, notes } : item
      )
    );
  };

  const clearRFQ = () => {
    setItems([]);
  };

  const isInRFQ = (productId: string) => {
    return items.some(item => item.product.id === productId);
  };

  return (
    <RFQContext.Provider
      value={{
        items,
        totalItemCount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearRFQ,
        isInRFQ,
      }}
    >
      {children}
    </RFQContext.Provider>
  );
};

export const useRFQ = (): RFQContextType => {
  const context = useContext(RFQContext);
  if (!context) {
    throw new Error('useRFQ must be used within an RFQProvider');
  }
  return context;
};
