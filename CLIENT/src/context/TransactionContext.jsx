import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Safely access auth context
  let user = null;
  try {
    const auth = useAuth();
    user = auth.user;
  } catch{
    console.warn("Auth context not available");
  }

  // Load transactions from localStorage
  useEffect(() => {
    if (user) {
      // Load transactions only if user exists
      const loadTransactions = () => {
        try {
          const stored = localStorage.getItem(`transactions_${user.email}`);
          if (stored) setTransactions(JSON.parse(stored));
        } finally {
          setLoading(false);
        }
      };
      loadTransactions();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Save transactions to localStorage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `transactions_${user.email}`,
        JSON.stringify(transactions)
      );
    }
  }, [transactions, user]);

  const addTransaction = (transaction) => {
    try {
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "Failed to add transaction"
      );
    }
  };

  const updateTransaction = (id, updates) => {
    try {
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "Failed to update transaction"
      );
    }
  };

  const deleteTransaction = (id) => {
    try {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "Failed to delete transaction"
      );
    }
  };

  const getTransactionById = (id) => {
    return transactions.find((t) => t.id === id);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionById,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};