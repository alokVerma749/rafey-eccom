import connect_db from "@/config/db";

export const checkPincodeServiceabilityService = async (pincode: string) => {
  await connect_db();

  if (!pincode) {
    console.error("Error: Pincode is required but was not provided.");
    return null;
  }

  try {
    const response = await fetch(
      `https://staging-express.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.DELHIVERY_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching pincode data:", error instanceof Error ? error.message : error);
    return null;
  }
};
