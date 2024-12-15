// src/components/ManageItems.js
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { deleteInventoryItem, getInventory } from "../utils/ApiService";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

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

  const handleEdit = async (code) => {
    const item = items.find((it) => it.itemCode === code);
    navigate("/addInventory", {
      state: {
        item,
      },
    });
  };

  const handleDelete = async (code) => {
    setSpinner(true);
    const res = await deleteInventoryItem(code);
    res?.success ? toast.success(res.message) : toast.error(res.message);
    setSpinner(false);
    if (res?.success) {
      await fetchItems();
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Item Code", accessor: "itemCode" },
      { Header: "Item Name", accessor: "itemName" },
      { Header: "Category", accessor: "category" },
      { Header: "Price", accessor: "price" },
      { Header: "Available Stock", accessor: "availableStock" },
      { Header: "Total Sold", accessor: "totalSold" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: "0.5rem",
            }}
          >
            <button
              onClick={() => handleEdit(row.original.itemCode)}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                backgroundColor: "#ff325f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontFamily: "sans-serif",
                fontWeight: 500,
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.itemCode)}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                backgroundColor: "#ff325f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontFamily: "sans-serif",
                fontWeight: 500,
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [items]
  );

  const tableInstance = useTable({ columns, data: items });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="user-directory">
      <h2>Manage Inventory Items</h2>
      {spinner && (
        <div className="overlay">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
      {loading && <p>Loading ...</p>}
      {!loading && !items.length && <p>No Records Found</p>}
      {items.length > 0 && (
        <div className="table-container">
          <table {...getTableProps()} className="user-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
