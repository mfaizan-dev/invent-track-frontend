import React, { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { addInventoryItem } from "../utils/ApiService";
import { useLocation } from "react-router-dom";

const AddInventory = () => {
  const location = useLocation();
  const { item: editedItem } = location?.state || {};

  const [formData, setFormData] = useState({
    itemCode: editedItem?.itemCode || "",
    itemName: editedItem?.itemName || "",
    category: editedItem?.category || "",
    price: editedItem?.price || "",
    availableStock: editedItem?.availableStock || "",
    totalSold: editedItem?.totalSold || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addInventoryItem(formData, editedItem);
      res?.success ? toast.success(res.message) : toast.error(res.message);
      setFormData({
        itemCode: "",
        itemName: "",
        category: "",
        price: "",
        availableStock: "",
        totalSold: "",
      });
    } catch (error) {
      toast.error("Failed to add inventory item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-directory">
      <h2>Add New Inventory Item</h2>
      {loading && (
        <div className="overlay">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemCode">Item Code</label>
          <input
            type="text"
            id="itemCode"
            name="itemCode"
            value={formData.itemCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Garments">Garments</option>
            <option value="Furniture">Furniture</option>
            <option value="Stationery">Stationery</option>
            <option value="Groceries">Groceries</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Toys">Toys</option>
            <option value="Automotive">Automotive</option>
            <option value="Beauty">Beauty</option>
            <option value="Health">Health</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Mobile Accessories">Mobile Accessories</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableStock">Available Stock</label>
          <input
            type="number"
            id="availableStock"
            name="availableStock"
            value={formData.availableStock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalSold">Total Sold</label>
          <input
            type="number"
            id="totalSold"
            name="totalSold"
            value={formData.totalSold}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          {editedItem ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
