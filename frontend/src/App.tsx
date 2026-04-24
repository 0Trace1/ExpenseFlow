import { useEffect, useState, useCallback } from "react";
import { getExpenses } from "./api/expenseApi";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import Filters from "./components/Filters/Filters";
import type { Expense } from "./interfaces/expense";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date_desc");

  const fetchData = useCallback(async () => {
    try {
      const data = await getExpenses(category, sort);
      setExpenses(data);
    } catch (err) {
      console.error(err);
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
    <div style={{ padding: 20 }}>
      <h1>ExpenseFlow</h1>

      <ExpenseForm onSuccess={fetchData} />

      <Filters setCategory={setCategory} setSort={setSort} />

      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
