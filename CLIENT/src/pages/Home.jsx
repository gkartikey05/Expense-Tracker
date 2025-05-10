import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Take Control of Your</span>
            <span className="block text-indigo-600">Finances</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track your income and expenses effortlessly with our intuitive
            personal finance app. Gain insights into your spending habits and
            achieve your financial goals.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                View Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Live Demo
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Key Features
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Expense Tracking
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Easily record and categorize your daily expenses to understand
                where your money goes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Visual Reports
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Beautiful charts and graphs to visualize your financial data and
                spot trends.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Budget Goals
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Set monthly budgets and get alerts when you're approaching your
                limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            What Users Say
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Freelance Designer",
                quote:
                  "This app helped me save 20% more each month by showing me exactly where I was overspending.",
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                quote:
                  "The clean interface and powerful reports make tracking finances actually enjoyable.",
              },
              {
                name: "Emma Rodriguez",
                role: "Small Business Owner",
                quote:
                  "I've tried many expense trackers, but this one finally stuck because it's so simple to use.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-indigo-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to take control of your finances?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Join thousands of users who are already managing their money better.
          </p>
          <div className="mt-8">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                Continue to Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started for Free
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-white">ExpenseTracker</span>
            <p className="mt-4 text-base text-gray-400 text-center">
              The simple way to track your personal finances and achieve your
              money goals.
            </p>
            <div className="mt-8 flex space-x-6">
              {["Privacy Policy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400">
              &copy; {new Date().getFullYear()} ExpenseTracker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
