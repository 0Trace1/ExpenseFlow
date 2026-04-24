import "./Filters.css";

const Filters = ({ setCategory, setSort }) => {
  return (
    <div className="filters">
      <input
        placeholder="Filter by category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="date_desc">Newest</option>
        <option value="">Default</option>
      </select>
    </div>
  );
};

export default Filters;
