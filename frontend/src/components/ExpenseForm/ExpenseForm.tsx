import { useState } from "react";
import { createExpense } from "../../api/expenseApi";
import "./ExpenseForm.css";
import { toast } from "react-toastify";

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

    const amount = Number(form.amount);

    if (!form.amount || !form.category || !form.date) {
      toast.error("Please fill all required fields");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setLoading(true);

    const idempotencyKey = crypto.randomUUID();

    try {
      await createExpense(
        {
          ...form,
          amount,
        },
        idempotencyKey,
      );

      await onSuccess();

      setForm({ amount: "", category: "", description: "", date: "" });

      toast.success("Expense Added Successfully");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create expense",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>
            Amount <span className="required">*</span>
          </label>
          <input
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Category <span className="required">*</span>
          </label>
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-button-div">
        <button disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
