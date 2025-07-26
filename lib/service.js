const { apiBaseUrl } = require("./constants");

export const apiService = async function request(endpoint = "") {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({})); // try to read error body
    throw new Error(
      errorBody.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};
