import { useState } from "react";
import { createExpense } from "../../api/expenseApi";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const idempotencyKey = crypto.randomUUID();

    try {
      await createExpense(
        {
          ...form,
          amount: Number(form.amount),
        },
        idempotencyKey,
      );

      setForm({ amount: "", category: "", description: "", date: "" });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to create expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <button disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
