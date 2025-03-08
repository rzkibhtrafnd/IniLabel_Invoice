import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { MdOutlineCancel } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

export default function Invoice({ products = [], customers = [] }) {
  const containerRef = useRef(null);
  const [isMedium, setIsMedium] = useState(true);
  const [rows, setRows] = useState([{ item: "", qty: 1, total: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);

  const productPrices = products.reduce((acc, product) => {
    acc[product.name] = product.price;
    return acc;
  }, {});

  const addItem = () => {
    setRows([...rows, { item: "", qty: 1, total: 0 }]);
  };

  const updateRow = (index, key, value) => {
    const newRows = [...rows];
    if (key === "item") {
      newRows[index].item = value;
      newRows[index].total = newRows[index].qty * (productPrices[value] || 0);
    } else if (key === "qty") {
      if (value === "") {
        newRows[index].qty = "";
      } else {
        newRows[index].qty = parseInt(value) || 1;
        newRows[index].total = newRows[index].qty * (productPrices[newRows[index].item] || 0);
      }
    }
    setRows(newRows);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const subtotal = rows.reduce((sum, row) => sum + row.total, 0);
  const total = subtotal - discount + shipping + tax;

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setIsMedium(entry.contentRect.width < 650);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <DashboardLayout>
      <Head title="Tambah Invoices" />
      <Link href="/invoices" className="inline-flex items-center text-blue-500 hover:underline">
        <IoIosArrowBack size={24} className="mr-2" /> Kembali
      </Link>
      <div
        ref={containerRef}
        className={`grid gap-6 ${
          isMedium ? "grid-cols-1" : "grid-cols-[6fr_4fr] auto-rows-auto"
        }`}
      >
        <div className={`flex flex-col gap-4 ${isMedium ? "order-1" : ""}`}>
          <h2 className="text-2xl font-bold">Tambah Invoice</h2>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#646262]">Nama Customer</label>
            <select className="w-full p-2 border rounded cursor-pointer">
              <option>Pilih Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">Jatuh Tempo</label>
              <input type="date" className="w-full p-2 border rounded cursor-pointer" />
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">Status Pembayaran</label>
              <select className="w-full p-2 border rounded cursor-pointer">
                <option>Pilih Status</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`bg-white flex flex-col gap-4 p-4 rounded-xl shadow-md ${isMedium ? "order-3" : ""}`}>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Diskon</label>
            <input
              type="text"
              inputMode="numeric"
              value={discount === 0 ? "" : discount} 
              onChange={(e) => setDiscount(e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Ongkir</label>
            <input
              type="text"
              inputMode="numeric"
              value={shipping === 0 ? "" : shipping}
              onChange={(e) => setShipping(e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Pajak</label>
            <input
              type="text"
              inputMode="numeric"
              value={tax === 0 ? "" : tax}
              onChange={(e) => setTax(e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <p className="font-bold text-[#111] flex text-xl justify-between">
              <span>Total: </span>
              <span>{total.toLocaleString()}</span>
            </p>
            <button className="bg-[#01669E] text-white p-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-semibold cursor-pointer rounded-md text-center">
              Cetak Invoice
            </button>
          </div>
        </div>
        <div className={`flex flex-col gap-2 ${isMedium ? "order-2" : "col-span-2"}`}>
          <h2 className="text-2xl font-bold">Order Detail</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden">
              <thead>
                <tr>
                  <th className="p-1 text-sm text-[#646262] text-start">Items</th>
                  <th className="p-1 text-sm text-[#646262] w-[60px]">Qty</th>
                  <th className="p-1 text-sm text-[#646262] w-[110px]">Satuan</th>
                  <th className="p-1 text-sm text-[#646262] w-[110px]">Total</th>
                  <th className="p-1 text-sm text-[#646262] w-[40px]"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="p-1 min-w-[150px]">
                      <select
                        className="w-full border bg-[#FCFDFD] border-[#D5D5D5] cursor-pointer rounded-md p-2"
                        value={row.item}
                        onChange={(e) => updateRow(index, "item", e.target.value)}
                      >
                        <option>Pilih Item</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.name}>{product.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 w-[60px]">
                      <input
                        type="text"
                        inputMode="number"
                        value={row.qty}
                        className="w-full p-2 border bg-[#FCFDFD] border-[#D5D5D5] rounded-md"
                        onChange={(e) => updateRow(index, "qty", e.target.value)}
                      />
                    </td>
                    <td className="p-2 w-[110px] text-center">{productPrices[row.item]?.toLocaleString() || "-"}</td>
                    <td className="p-2 w-[110px] text-center">{row.total.toLocaleString()}</td>
                    <td className="p-2 text-center">
                      <button onClick={() => removeRow(index)} className="text-red-500 cursor-pointer"><MdOutlineCancel size={24}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={addItem} className="p-1 items-center gap-2 flex w-fit text-[#4D4FED] font-bold underline cursor-pointer">
            <CiSquarePlus size={24} /> Tambah Item
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
