import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../Context/OrderContext";

const AdminOrders = () => {
  const navigate = useNavigate();

  const {
    orders,
    updateOrderStatus,
    deleteOrder,
  } = useOrders();

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Kya aap is order ko delete karna chahte hain?")) {
      deleteOrder(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order Management
            </h1>

            <p className="text-sm text-gray-500">
              View and manage customer orders
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            ← Dashboard
          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-1">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="text-3xl font-bold text-yellow-500 mt-1">
              {orders.filter((o) => o.status === "Pending").length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Processing
            </p>

            <p className="text-3xl font-bold text-blue-500 mt-1">
              {orders.filter((o) => o.status === "Processing").length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Delivered
            </p>

            <p className="text-3xl font-bold text-green-600 mt-1">
              {orders.filter((o) => o.status === "Delivered").length}
            </p>
          </div>

        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Customer Orders
            </h2>
          </div>

          {orders.length === 0 ? (

            <div className="text-center py-16">

              <div className="text-5xl mb-4">
                📦
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Orders Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Customer orders will appear here.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Order
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Items
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Total
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="px-6 py-5">

                        <p className="font-semibold text-gray-800">
                          {order.id}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(
                            order.createdAt
                          ).toLocaleString()}
                        </p>

                      </td>

                      <td className="px-6 py-5">

                        <p className="font-semibold text-gray-800">
                          {order.customer.fullName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.customer.phone}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.customer.city}
                        </p>

                      </td>

                      <td className="px-6 py-5">

                        <p className="font-medium text-gray-800">
                          {order.items.length} product
                          {order.items.length !== 1 ? "s" : ""}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.items.reduce(
                            (total, item) =>
                              total + item.quantity,
                            0
                          )}{" "}
                          item(s)
                        </p>

                      </td>

                      <td className="px-6 py-5">

                        <p className="font-bold text-gray-800">
                          Rs {order.grandTotal.toLocaleString()}
                        </p>

                      </td>

                      <td className="px-6 py-5">

                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-lg text-sm font-semibold outline-none ${getStatusClass(
                            order.status
                          )}`}
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                      <td className="px-6 py-5">

                        <button
                          onClick={() =>
                            handleDelete(order.id)
                          }
                          className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default AdminOrders;