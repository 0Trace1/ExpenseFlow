import "./ExpenseList.css";

const ExpenseList = ({ expenses }) => {
  const total = expenses.reduce((sum: number, e) => sum + Number(e.amount), 0);

  return (
    <div className="list">
      <h3>Total: ₹{total}</h3>

      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.category} - ₹{e.amount} - {e.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
