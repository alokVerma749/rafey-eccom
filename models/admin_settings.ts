import mongoose from 'mongoose';

const FeatureFlagsSchema = new mongoose.Schema({
  enableSale: { type: Boolean, default: false },
  showOutOfStock: { type: Boolean, default: true },
  enableMarquee: { type: Boolean, default: true },
}, { _id: false });

const SiteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Wonders Tapestry' },
  contactEmail: { type: String, default: 'wonderstapestry@gmail.com' },
  phoneNumber: { type: String, default: '+91-9918192225' },
  address: { type: String, default: '123 Main Street, City, Country' },
  freeDeliveryThreshold: { type: Number, default: 1000 },
}, { _id: false });

const HomepageSettingsSchema = new mongoose.Schema({
  bannerImage: { type: String, default: '' },
  bannerText: { type: String, default: '' },
  marqueeText: { type: [String], default: [] },
}, { _id: false });

const AnnouncementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, index: true },
}, { _id: false });

const AdminSettingsSchema = new mongoose.Schema({
  featureFlags: { type: FeatureFlagsSchema, default: () => ({}) },
  siteSettings: { type: SiteSettingsSchema, default: () => ({}) },
  homepageSettings: { type: HomepageSettingsSchema, default: () => ({}) },
  announcements: { type: [AnnouncementSchema], default: [] },
}, { timestamps: true });

const AdminSettings = mongoose.models.AdminSettings || mongoose.model('AdminSettings', AdminSettingsSchema);
export default AdminSettings;
