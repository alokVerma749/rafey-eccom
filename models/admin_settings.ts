import mongoose from 'mongoose';

const AdminSettingsSchema = new mongoose.Schema({
  featureFlags: {
    type: Object,
    default: {
      enableDiscounts: false, // Toggle discounts globally
      showOutOfStock: true,  // Show out-of-stock products
    }
  },
  siteSettings: {
    type: Object,
    default: {
      siteName: 'My E-Commerce Store',
      contactEmail: 'support@store.com',
      phoneNumber: '+1-234-567-890',
      address: '123 Main Street, City, Country',
    }
  },
  homepageSettings: {
    bannerImage: { type: String }, // URL for homepage banner
    bannerText: { type: String }, // Banner description or headline
  },
  announcements: [{
    message: { type: String },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date }, // Optional expiry for announcements
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AdminSettings = mongoose.models.AdminSettings || mongoose.model('AdminSettings', AdminSettingsSchema);
export default AdminSettings;
