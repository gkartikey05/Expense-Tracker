import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

export const TransactionList = () => {
  const { transactions, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 rounded-lg border ${
              transaction.type === "income"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {transaction.description || "No description"}
                </p>
                <p className="text-sm text-gray-500">
                  {transaction.category} •{" "}
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  updateTransaction(transaction.id, { amount: 100 })
                }
                className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
