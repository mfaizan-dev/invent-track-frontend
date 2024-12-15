import { END_POINTS, HOST } from "./Constants";

export const login = async (username, password) => {
  try {
    const res = await fetch(`${HOST}${END_POINTS.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error login", error);
    return { success: false, message: "Something went wrong. Try again!" };
  }
};

export const register = async (name, username, password) => {
  try {
    const res = await fetch(`${HOST}${END_POINTS.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Something went wrong. Try again!" };
  }
};

export const getInventory = async () => {
  try {
    const res = await fetch(`${HOST}${END_POINTS.inventory}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return data?.inventory || [];
  } catch (e) {
    console.error("Fetch inventory error:", e);
    return [];
  }
};

export const getOrders = async () => {
  try {
    const res = await fetch(`${HOST}${END_POINTS.orders}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return data?.orders || [];
  } catch (e) {
    console.error("Fetch orders error:", e);
    return [];
  }
};

export const addInventoryItem = async (itemData, editedItem) => {
  try {
    const res = await fetch(`${HOST}${END_POINTS.addItem}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemData, update: editedItem ? true : false }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Something went wrong. Try again!" };
  }
};

export const deleteInventoryItem = async (itemCode) => {
  try {
    const res = await fetch(`${HOST}${END_POINTS.deleteItem}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemCode }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting user", error);
    return { success: false, message: "Something went wrong. Try again!" };
  }
};

export const processOrder = async (orderData) => {
  try {
    const res = await fetch(`${HOST}${END_POINTS.processOrder}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Something went wrong. Try again!" };
  }
};
