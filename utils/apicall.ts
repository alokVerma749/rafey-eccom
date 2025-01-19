// Utility function for API calls
export const apiCall = async (url: string, method: string, body: any) => {
  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error("Error making API call:", error);
    throw new Error("Failed to make API call");
  }
};
