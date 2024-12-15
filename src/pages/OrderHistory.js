import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { getOrders } from "../utils/ApiService";
import { ClipLoader } from "react-spinners";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Order ID", accessor: "orderId" },
      { Header: "Order Name", accessor: "orderName" },
      { Header: "Item Code", accessor: "itemCode" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Date", accessor: "date" },
      { Header: "Time", accessor: "time" },
      { Header: "Address", accessor: "address" },
      { Header: "Total Amount", accessor: "totalAmount" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: orders });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="user-directory">
      <h2>Order History</h2>
      {loading && (
        <div className="overlay">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
      {!loading && !orders.length && <p>No Orders Found</p>}
      {orders.length > 0 && (
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

export default OrderHistory;
