'use server';

import { getAdminSettings } from "@/services/getAdminSettings/get-admin-settings";

const getAdminSettingsAction = async (): Promise<string> => {
  try {
    const settings = await getAdminSettings();
    return JSON.stringify(settings);
  } catch (error) {
    console.error("Error in getAdminSettingsAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getAdminSettingsAction;
