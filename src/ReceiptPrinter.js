import React, { useState } from "react";
import "./receipt.css";

function MiniReceipt() {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [billNo] = useState(Math.floor(Math.random() * 10000));
  const date = new Date().toLocaleDateString();

  const addItem = () => {
    if (!item || !qty || !price) return alert("Please fill all fields!");

    const newItem = { item, qty: Number(qty), price: Number(price) };

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setItem("");
    setQty("");
    setPrice("");
  };

  const deleteItem = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  const editItem = (index) => {
    const i = items[index];
    setItem(i.item);
    setQty(i.qty);
    setPrice(i.price);
    setEditIndex(index);
  };

  const clearTable = () => setItems([]);

  const getTotal = () =>
    items.reduce((total, i) => total + i.qty * i.price, 0).toFixed(2);

  const handlePrint = () => window.print();

  return (
    <div className="receipt-container">
      <div className="receipt">
        <h3 className="title">🧾 Mini Receipt</h3>
        <p>Date: {date}</p>
        <p>Bill No: #{billNo}</p>

        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price (Rs)</th>
              <th className="no-print">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr key={index}>
                <td>{i.item}</td>
                <td>{i.qty}</td>
                <td>{(i.qty * i.price).toFixed(2)}</td>
                <td className="no-print">
                  <button
                    className="btn edit"
                    onClick={() => editItem(index)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => deleteItem(index)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="total">Total: Rs {getTotal()}</h4>
      </div>

      <div className="controls no-print">
        <input
          type="text"
          placeholder="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="button-group">
          <button onClick={addItem} className="btn add">
            {editIndex !== null ? "💾 Update" : "➕ Add"}
          </button>
          <button onClick={clearTable} className="btn clear">🗑️ Clear</button>
          <button onClick={handlePrint} className="btn print">🖨️ Print</button>
        </div>
      </div>
    </div>
  );
}

export default MiniReceipt;
