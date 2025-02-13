import connect_db from '@/config/db';
import AdminSettings from '@/models/admin_settings';

export const getAdminSettings = async () => {
  await connect_db();
  try {
    const settings = AdminSettings.find();
    return settings
  } catch (error) {
    console.error("Error fetching settings:", error instanceof Error ? error.message : error);
    return [];
  }
};
