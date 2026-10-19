import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Context/StoreContext";

const AdminOffers = () => {
  const { store, addOffer, updateOffer, deleteOffer } = useStore();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  const handleSave = () => {
    if (!form.title.trim()) return alert("Title zaroori hai");
    if (editing) {
      updateOffer(editing.id, form);
    } else {
      addOffer(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", description: "", image: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 500000) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((prev) => ({ ...prev, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/dashboard")} className="text-blue-600 text-sm">
              ← Dashboard
            </button>
            <h1 className="text-xl font-bold">Special Offers</h1>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setForm({ title: "", description: "", image: "" });
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Add Offer
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6">
        {store.offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-40 bg-gray-50">
              {offer.image && (
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{offer.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setEditing(offer);
                    setForm(offer);
                    setShowForm(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete?")) deleteOffer(offer.id);
                  }}
                  className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? "Edit" : "Add"} Offer</h2>
            <div className="space-y-3">
              <input
                placeholder="Offer title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg h-24"
              />
              <input
                placeholder="Image path"
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;
