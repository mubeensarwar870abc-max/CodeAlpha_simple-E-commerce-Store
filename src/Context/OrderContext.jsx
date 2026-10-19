import React, { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");

    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `BN-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};