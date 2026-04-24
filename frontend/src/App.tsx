import { useEffect, useState, useCallback } from "react";
import { getExpenses } from "./api/expenseApi";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import Filters from "./components/Filters/Filters";
import Spinner from "./components/Spinner/Spinner";
import type { Expense } from "./interfaces/expense";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getExpenses(category, sort);
      setExpenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, sort]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await getExpenses(category, sort);
        if (isMounted) {
          setExpenses(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [category, sort]);

  return (
    <div className="app-container">
      <h1 className="title">ExpenseFlow</h1>

      <ExpenseForm onSuccess={fetchData} />

      <Filters setCategory={setCategory} setSort={setSort} />
      {loading ? <Spinner /> : <ExpenseList expenses={expenses} />}
    </div>
  );
}

export default App;
