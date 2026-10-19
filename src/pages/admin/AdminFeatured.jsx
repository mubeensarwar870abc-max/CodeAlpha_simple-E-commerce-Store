import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Context/StoreContext";

const AdminFeatured = () => {
  const { store, addFeaturedProduct, updateFeaturedProduct, deleteFeaturedProduct } =
    useStore();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", image: "", price: 0, rating: 4 });

  const handleSave = () => {
    if (!form.name.trim()) return alert("Name zaroori hai");
    if (editing) {
      updateFeaturedProduct(editing.id, form);
    } else {
      addFeaturedProduct(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", image: "", price: 0, rating: 4 });
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
            <h1 className="text-xl font-bold">Featured Products</h1>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setForm({ name: "", image: "", price: 0, rating: 4 });
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Add
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6">
        {store.featuredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
              {p.image ? (
                <img src={p.image} alt={p.name} className="max-h-full object-contain" />
              ) : (
                <span className="text-gray-300">No image</span>
              )}
            </div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">Rs {p.price}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setEditing(p);
                  setForm(p);
                  setShowForm(true);
                }}
                className="flex-1 bg-blue-600 text-white py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Delete?")) deleteFeaturedProduct(p.id);
                }}
                className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? "Edit" : "Add"} Featured Product</h2>
            <div className="space-y-3">
              <input
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                placeholder="Image path (/images/...)"
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
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

export default AdminFeatured;
