import mongoose from 'mongoose';

const AdminSettingsSchema = new mongoose.Schema({
  featureFlags: {
    type: Object,
    default: {
      enableDiscounts: false,
      showOutOfStock: true,
      enableMarquee: true,
    },
  },
  siteSettings: {
    type: Object,
    default: {
      siteName: 'My E-Commerce Store',
      contactEmail: 'support@store.com',
      phoneNumber: '+1-234-567-890',
      address: '123 Main Street, City, Country',
      freeDeliveryThreshold: 1000, // Minimum cart value for free delivery
    },
  },
  homepageSettings: {
    bannerImage: { type: String, default: '' },
    bannerText: { type: String, default: '' },
    marqueeText: { type: String, default: '' },
  },
  announcements: [{
    message: { type: String, required: true },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, index: true },
  }],
}, { timestamps: true });

const AdminSettings = mongoose.models.AdminSettings || mongoose.model('AdminSettings', AdminSettingsSchema);
export default AdminSettings;
