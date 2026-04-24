import "./ExpenseList.css";

const ExpenseList = ({ expenses }) => {
  const total = expenses.reduce((sum: number, e) => sum + Number(e.amount), 0);

  return (
    <div className="list">
      <div className="total">Total: ₹{total}</div>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>₹{e.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
