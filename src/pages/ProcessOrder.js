import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { getInventory, processOrder } from "../utils/ApiService";

const ProcessOrder = () => {
  const [formData, setFormData] = useState({
    orderId: generateOrderId(), // Automatically generate Order ID
    orderName: "",
    itemCode: "",
    quantity: "",
    date: "",
    time: "",
    address: "",
    totalAmount: "",
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to generate random Order ID
  function generateOrderId() {
    return `OD-${Math.floor(10000 + Math.random() * 90000)}`;
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formData.itemCode && name === "quantity") {
      const item = items.find((it) => it.itemCode === formData.itemCode);
      setFormData({
        ...formData,
        totalAmount: item.price * parseInt(value),
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await processOrder(formData);
      res?.success ? toast.success(res.message) : toast.error(res.message);
      setFormData({
        orderId: generateOrderId(),
        orderName: "",
        itemCode: "",
        quantity: "",
        date: "",
        time: "",
        address: "",
        totalAmount: "",
      });
    } catch (error) {
      toast.error("Failed to submit the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getInventory();
      setItems(data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="user-directory">
      <h2>Process New Order</h2>
      {loading && (
        <div className="overlay">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Order ID (Read-only) */}
        <div className="form-group">
          <label htmlFor="orderId">Order ID</label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            value={formData.orderId}
            readOnly
          />
        </div>

        {/* Order Name */}
        <div className="form-group">
          <label htmlFor="orderName">Order Name</label>
          <input
            type="text"
            id="orderName"
            name="orderName"
            value={formData.orderName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Item Code Dropdown */}
        <div className="form-group">
          <label htmlFor="itemCode">Item Code</label>
          <select
            id="itemCode"
            name="itemCode"
            value={formData.itemCode}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an item
            </option>
            {items.map((item) => (
              <option key={item?.itemCode} value={item?.itemCode}>
                {item?.itemName}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time */}
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Total Amount */}
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
            min="0"
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={loading}>
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default ProcessOrder;
