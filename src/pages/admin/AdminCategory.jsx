import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../Context/StoreContext";

const emptyProduct = {
  title: "",
  image: "/images/1.jpg",
  price: 0,
  discount: 10,
  discountPrice: 0,
  rating: 4,
};

const AdminCategory = () => {
  const { categoryId } = useParams();

  const {
    getCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    reorderProduct,
  } = useStore();

  const navigate = useNavigate();

  const category = getCategory(categoryId);

  const [activeSection, setActiveSection] = useState(
    category?.sections[0]?.id || ""
  );

  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyProduct);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Category not found</p>
      </div>
    );
  }

  const section = category.sections.find(
    (s) => s.id === activeSection
  );

  const isFixedPrice = section?.priceMode === "fixed";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 500000) {
      alert(
        "Image 500KB se choti honi chahiye. Ya image path use karein."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = (ev) => {
      setFormData((prev) => ({
        ...prev,
        image: ev.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({
      ...emptyProduct,
    });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);

    setFormData({
      ...product,
      discountPrice: product.discountPrice ?? 0,
    });

    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert("Product ka naam zaroori hai");
      return;
    }

    const originalPrice = Number(formData.price) || 0;

    let finalDiscountPrice = Number(formData.discountPrice) || 0;

    /*
      Percentage discount wale products ke liye
      discountPrice automatically calculate hoga.
    */
    if (!isFixedPrice) {
      const discount = Number(formData.discount) || 0;

      finalDiscountPrice = Math.round(
        originalPrice - (originalPrice * discount) / 100
      );
    }

    const productData = {
      ...formData,
      price: originalPrice,
      discount: Number(formData.discount) || 0,
      discountPrice: finalDiscountPrice,
      rating: Number(formData.rating) || 1,
    };

    if (editingProduct) {
      updateProduct(
        categoryId,
        activeSection,
        editingProduct.id,
        productData
      );
    } else {
      addProduct(
        categoryId,
        activeSection,
        productData
      );
    }

    setShowForm(false);
    setFormData({
      ...emptyProduct,
    });
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    if (
      window.confirm(
        "Kya aap is product ko delete karna chahte hain?"
      )
    ) {
      deleteProduct(
        categoryId,
        activeSection,
        productId
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Dashboard
            </button>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {category.icon} {category.title}
              </h1>

              <p className="text-sm text-gray-500">
                Products manage karein
              </p>
            </div>

          </div>

          <button
            onClick={openAddForm}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
          >
            + Naya Product
          </button>

        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Sections */}
        <div className="flex flex-wrap gap-2 mb-6">

          {category.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeSection === sec.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {sec.title} {sec.titleHighlight} (
              {sec.products.length})
            </button>
          ))}

        </div>

        {/* Empty Section */}
        {section?.products.length === 0 && !showForm && (
          <div className="bg-white rounded-xl p-12 text-center text-gray-400">

            <p className="text-lg">
              Is section mein koi product nahi hai
            </p>

            <button
              onClick={openAddForm}
              className="mt-4 text-blue-600 hover:underline"
            >
              Pehla product add karein
            </button>

          </div>
        )}

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {section?.products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >

              <div className="h-40 bg-gray-50 flex items-center justify-center">

                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain p-2"
                />

              </div>

              <div className="p-4">

                <h3 className="font-semibold text-gray-800">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  Rs {product.price}

                  {isFixedPrice
                    ? ` → Rs ${product.discountPrice}`
                    : ` (${product.discount}% off)`}

                </p>

                <p className="text-yellow-500 text-sm mt-1">

                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)}

                </p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() =>
                      reorderProduct(
                        categoryId,
                        activeSection,
                        product.id,
                        "up"
                      )
                    }
                    disabled={index === 0}
                    className="px-2 py-1 bg-gray-100 rounded text-sm disabled:opacity-30"
                    title="Upar move karein"
                  >
                    ↑
                  </button>

                  <button
                    onClick={() =>
                      reorderProduct(
                        categoryId,
                        activeSection,
                        product.id,
                        "down"
                      )
                    }
                    disabled={
                      index === section.products.length - 1
                    }
                    className="px-2 py-1 bg-gray-100 rounded text-sm disabled:opacity-30"
                    title="Neeche move karein"
                  >
                    ↓
                  </button>

                  <button
                    onClick={() => openEditForm(product)}
                    className="flex-1 bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-bold mb-4">

              {editingProduct
                ? "Product Edit Karein"
                : "Naya Product Add Karein"}

            </h2>

            <div className="space-y-4">

              {/* Product Name */}
              <div>

                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

              </div>

              {/* Image Path */}
              <div>

                <label className="block text-sm font-medium mb-1">
                  Image Path (e.g. /images/1.jpg)
                </label>

                <input
                  type="text"
                  value={
                    formData.image.startsWith("data:")
                      ? ""
                      : formData.image
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="/images/product.jpg"
                />

              </div>

              {/* Image Upload */}
              <div>

                <label className="block text-sm font-medium mb-1">
                  Ya Image Upload Karein (max 500KB)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm"
                />

              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center">

                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-h-full object-contain"
                  />

                </div>
              )}

              <div className="grid grid-cols-2 gap-4">

                {/* Original Price */}
                <div>

                  <label className="block text-sm font-medium mb-1">
                    Original Price (Rs)
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.price}
                    onChange={(e) => {
                      const value = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );

                      setFormData({
                        ...formData,
                        price: value === "" ? 0 : Number(value),
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. 1000"
                  />

                </div>

                {/* Sale Price / Discount */}
                {isFixedPrice ? (
                  <div>

                    <label className="block text-sm font-medium mb-1">
                      Sale Price (Rs)
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.discountPrice}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );

                        setFormData({
                          ...formData,
                          discountPrice:
                            value === "" ? 0 : Number(value),
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. 850"
                    />

                  </div>
                ) : (
                  <div>

                    <label className="block text-sm font-medium mb-1">
                      Discount (%)
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.discount}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );

                        let discount =
                          value === "" ? 0 : Number(value);

                        if (discount > 100) {
                          discount = 100;
                        }

                        setFormData({
                          ...formData,
                          discount,
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. 10"
                    />

                  </div>
                )}

                {/* Rating */}
                <div>

                  <label className="block text-sm font-medium mb-1">
                    Rating (1-5)
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />

                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminCategory;