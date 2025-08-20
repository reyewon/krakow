import { useState, useEffect } from "react";
import { PiggyBank, Plus, Trash2, Calculator } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: 'GBP' | 'PLN';
  category: string;
  date: string;
}

const categories = [
  { id: 'food', name: 'Food & Drinks', icon: '🍽️' },
  { id: 'transport', name: 'Transport', icon: '🚗' },
  { id: 'accommodation', name: 'Accommodation', icon: '🏨' },
  { id: 'attractions', name: 'Attractions', icon: '🎭' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'other', name: 'Other', icon: '💰' }
];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number>(1000);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    currency: 'GBP' as 'GBP' | 'PLN',
    category: 'food'
  });

  // Load data from localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('poland-trip-expenses');
    const savedBudget = localStorage.getItem('poland-trip-budget');
    
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    if (savedBudget) {
      setBudget(parseFloat(savedBudget));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('poland-trip-expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('poland-trip-budget', budget.toString());
  }, [budget]);

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      currency: newExpense.currency,
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0]
    };

    setExpenses([...expenses, expense]);
    setNewExpense({ description: '', amount: '', currency: 'GBP', category: 'food' });
    setShowAddForm(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalSpent = expenses.reduce((total, expense) => {
    // Convert PLN to GBP for calculation (rough estimate)
    const amount = expense.currency === 'PLN' ? expense.amount / 5 : expense.amount;
    return total + amount;
  }, 0);

  const remaining = budget - totalSpent;
  const spentPercentage = Math.min((totalSpent / budget) * 100, 100);

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.icon || '💰';
  };

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <PiggyBank className="w-5 h-5" />
        Expense Tracker
      </h3>

      {/* Budget Overview */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Budget:</span>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
            className="text-sm font-medium bg-transparent border-b border-gray-300 focus:border-sienna outline-none w-20 text-right"
          />
          <span className="text-sm text-gray-600">GBP</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Spent: £{totalSpent.toFixed(2)}</span>
            <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
              Remaining: £{remaining.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                spentPercentage > 90 ? 'bg-red-500' : spentPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add Expense Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-sienna text-white rounded-md hover:bg-sienna-dark transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Expense
        </button>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="mb-4 p-3 bg-white rounded-lg border space-y-2">
          <input
            type="text"
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
          />
          
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
            />
            <select
              value={newExpense.currency}
              onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value as 'GBP' | 'PLN' })}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
            >
              <option value="GBP">GBP</option>
              <option value="PLN">PLN</option>
            </select>
          </div>

          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={addExpense}
              className="flex-1 px-2 py-1 bg-sienna text-white rounded text-sm hover:bg-sienna-dark transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Expenses List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {expenses.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No expenses recorded yet</p>
        ) : (
          expenses.map(expense => (
            <div key={expense.id} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm">{getCategoryIcon(expense.category)}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{expense.description}</p>
                  <p className="text-xs text-gray-500">{expense.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {expense.currency} {expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}