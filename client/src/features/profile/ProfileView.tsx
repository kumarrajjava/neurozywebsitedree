import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Save, 
  LogOut, 
  CreditCard,
  ArrowLeft,
  Key
} from 'lucide-react';
import { User, BusinessData } from '../../types';

interface ProfileViewProps {
  user: User | null;
  businessData: BusinessData;
  onUpdateUser: (updatedUser: User) => void;
  onUpdateBusiness: (updatedBusiness: BusinessData) => void;
  onNavigateDashboard: () => void;
  onNavigateEditor: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  businessData,
  onUpdateUser,
  onUpdateBusiness,
  onNavigateDashboard,
  onNavigateEditor,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'plan' | 'security'>('profile');
  
  // User Form State
  const [fullName, setFullName] = useState(user?.fullName || 'Rajesh Kumar');
  const [email, setEmail] = useState(user?.email || 'rajesh@sweetbites.com');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '9876543210');
  const [city, setCity] = useState(businessData?.city || 'Lucknow');

  // Business Profile Form State
  const [businessName, setBusinessName] = useState(businessData?.name || 'Sweet Bites Bakery');
  const [category, setCategory] = useState(businessData?.category || 'bakery');
  const [address, setAddress] = useState(businessData?.address || 'Hazratganj, Lucknow, Uttar Pradesh');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      id: user?.id || 'usr_saved',
      fullName,
      email,
      phoneNumber,
      planTier: user?.planTier || 'STARTER'
    };
    onUpdateUser(updatedUser);

    const updatedBusiness: BusinessData = {
      ...businessData,
      name: businessName,
      category: category as any,
      city,
      address
    };
    onUpdateBusiness(updatedBusiness);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white pt-8 pb-14 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateDashboard}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white border border-white/10"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold backdrop-blur-sm border border-indigo-400/30 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified Merchant Account</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Profile & Account Settings
              </h1>
              <p className="text-xs md:text-sm text-indigo-200">
                Manage your personal information, shop details, and subscription plan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateEditor}
              className="px-4 py-2.5 bg-white text-indigo-900 rounded-xl font-bold text-xs shadow hover:bg-indigo-50 transition"
            >
              Go to Website Editor
            </button>
            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 rounded-xl font-bold text-xs transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-6">
        
        {/* Success Alert Banner */}
        {savedSuccess && (
          <div className="mb-4 p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in slide-in-from-top">
            <Check className="w-4 h-4" />
            <span>Profile and business details updated successfully!</span>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-2 text-xs font-bold text-slate-600">
            
            {/* User Avatar Card */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 mb-4 flex items-center gap-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#9333EA] text-white flex items-center justify-center font-black text-xl shadow-md">
                {fullName.charAt(0) || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-slate-900 truncate text-sm">{fullName}</p>
                <p className="text-[11px] text-indigo-600 font-semibold">{businessName}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full p-3 rounded-xl flex items-center gap-2.5 transition text-left ${
                activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-200/60'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Owner Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('business')}
              className={`w-full p-3 rounded-xl flex items-center gap-2.5 transition text-left ${
                activeTab === 'business' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-200/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Business & Shop Info</span>
            </button>

            <button
              onClick={() => setActiveTab('plan')}
              className={`w-full p-3 rounded-xl flex items-center gap-2.5 transition text-left ${
                activeTab === 'plan' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-200/60'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Subscription & Billing</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full p-3 rounded-xl flex items-center gap-2.5 transition text-left ${
                activeTab === 'security' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-200/60'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Security & Password</span>
            </button>
          </div>

          {/* Right Tab Form Container */}
          <div className="flex-1 p-6 md:p-8">
            
            {/* TAB 1: OWNER PROFILE */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-900">Personal Profile</h3>
                  <p className="text-xs text-slate-500">Your registered contact details for Neurozy account ownership.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone / WhatsApp Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">City / Region</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: BUSINESS & SHOP INFO */}
            {activeTab === 'business' && (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-900">Business Profile</h3>
                  <p className="text-xs text-slate-500">Information displayed on your live website footer, address, and Google Maps.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Registered Business Name</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Industry Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none bg-white capitalize"
                      >
                        <option value="bakery">Bakery & Pastry Cafe</option>
                        <option value="clothing">Boutique & Fashion Store</option>
                        <option value="salon">Salon & Wellness Spa</option>
                        <option value="restaurant">Restaurant & Dine</option>
                        <option value="coaching">Coaching & Education</option>
                        <option value="service">Local Home Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Live Free Subdomain</label>
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                        <input
                          type="text"
                          readOnly
                          value={businessData.subdomain}
                          className="w-full p-2.5 font-mono text-xs bg-transparent outline-none text-slate-700 font-bold"
                        />
                        <span className="text-[11px] font-bold text-indigo-600 pr-3">.neurozy.site</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Store Address & Landmark</label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:border-indigo-500 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Update Business Details</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: SUBSCRIPTION & BILLING */}
            {activeTab === 'plan' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-900">Subscription & Plan Status</h3>
                  <p className="text-xs text-slate-500">Manage your active tier, limits, and domain perks.</p>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white tracking-wider">
                      Current Plan: {user?.planTier || 'STARTER'}
                    </span>
                    <h4 className="text-lg font-black text-slate-900">
                      ₹199 / month — Active
                    </h4>
                    <p className="text-xs text-slate-600">
                      Includes 1 Live Website on <strong>{businessData.subdomain}.neurozy.site</strong>, WhatsApp ordering, and catalog items.
                    </p>
                  </div>

                  <button
                    onClick={() => alert('Plan Upgrade: You are currently on the Starter Plan. To upgrade to Business (₹499/mo) with Custom Domain support, contact support@neurozy.site')}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition"
                  >
                    Upgrade Plan
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-500">Live Sites Used</span>
                    <p className="text-xl font-extrabold text-slate-900">1 / 1</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-500">Catalog Capacity</span>
                    <p className="text-xl font-extrabold text-slate-900">{businessData.products.length} / 25</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-500">Custom Domain</span>
                    <p className="text-xl font-extrabold text-indigo-600">Available in Pro</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SECURITY & LOGOUT */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-900">Security & Sign Out</h3>
                  <p className="text-xs text-slate-500">Keep your store login credentials safe and secure.</p>
                </div>

                <div className="space-y-4 max-w-sm text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-medium outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-medium outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => alert('Password updated successfully!')}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
                  >
                    Update Password
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Sign Out of All Sessions</p>
                    <p className="text-[11px] text-slate-500">You will need to sign in again to edit your website.</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 border border-rose-300 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

