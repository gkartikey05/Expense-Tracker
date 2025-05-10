import { Summary } from "../components/Dashboard/Summary";
import { TransactionForm } from "../components/Dashboard/TransactionForm";
import { TransactionList } from "../components/Dashboard/TransactionList";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TransactionForm />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Summary />
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
};
