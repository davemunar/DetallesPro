import { useState, useCallback } from 'react';
import { Product, QuoteItem } from '../types';

export const useQuote = () => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const addToQuote = useCallback((product: Product, quantity: number, wantsAdvisory: boolean) => {
    setQuoteItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // If item exists, update its quantity and advisory status
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, wantsAdvisory: item.wantsAdvisory || wantsAdvisory }
            : item
        );
      }
      // Otherwise, add the new item to the quote
      return [...prevItems, { ...product, quantity, wantsAdvisory }];
    });
  }, []);

  const removeFromQuote = useCallback((productId: string) => {
    setQuoteItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuoteItemQuantity = useCallback((productId: string, quantity: number) => {
    setQuoteItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const openQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
  }, []);

  const clearQuote = useCallback(() => {
    setQuoteItems([]);
  }, []);

  return {
    quoteItems,
    isQuoteModalOpen,
    addToQuote,
    removeFromQuote,
    updateQuoteItemQuantity,
    openQuoteModal,
    closeQuoteModal,
    clearQuote,
  };
};
