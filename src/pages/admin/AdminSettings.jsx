import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Context/StoreContext";

const AdminSettings = () => {
  const { store, updateSettings } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...store.settings });

  const handleSave = () => {
    updateSettings(form);
    alert("Settings save ho gayi!");
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 500000) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((prev) => ({ ...prev, heroImage: ev.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/admin/dashboard")} className="text-blue-600 text-sm">
            ← Dashboard
          </button>
          <h1 className="text-xl font-bold">Site Settings</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site Name</label>
            <input
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero Title</label>
            <input
              value={form.heroTitle}
              onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
            <textarea
              value={form.heroSubtitle}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg h-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero Image URL</label>
            <input
              value={form.heroImage.startsWith("data:") ? "" : form.heroImage}
              onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://... ya /images/..."
            />
            <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="mt-2 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
            <input
              value={form.contactWhatsApp}
              onChange={(e) => setForm({ ...form, contactWhatsApp: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="923160612173"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
