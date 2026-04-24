const BASE_URL = "http://localhost:3000";

export const createExpense = async (data, key: string) => {
  const res = await fetch(`${BASE_URL}/expenses/create_expense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": key,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create expense");
  return res.json();
};

export const getExpenses = async (category?: string, sort?: string) => {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);

  const res = await fetch(`${BASE_URL}/expenses/get_expenses?${params}`);
  return res.json();
};
