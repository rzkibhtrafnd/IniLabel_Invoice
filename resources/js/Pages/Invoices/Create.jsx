import { useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import Table from "../../Components/Tables/Table";
import { MdOutlineCancel } from "react-icons/md";
import { router } from "@inertiajs/react"; // Import router dari Inertia

export default function Invoice({ products = [], customers = [] }) {
  const [rows, setRows] = useState([{ item: "", qty: 1, total: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("Belum dibayar"); // State untuk status pembayaran
  const [selectedCustomer, setSelectedCustomer] = useState(""); // State untuk customer yang dipilih
  const [dueDate, setDueDate] = useState(""); // State untuk jatuh tempo

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
      newRows[index].qty = parseInt(value) || 1;
      newRows[index].total = newRows[index].qty * (productPrices[newRows[index].item] || 0);
    }
    setRows(newRows);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const subtotal = rows.reduce((sum, row) => sum + row.total, 0);
  const total = subtotal - discount + shipping + tax;

  // Format angka dengan "Rp"
  const formatCurrency = (value) => {
    return `Rp ${value.toLocaleString()}`;
  };

  // Fungsi untuk menangani pembuatan transaksi
  const handleCreateTransaction = () => {
    const items = rows.map((row) => ({
      produk_id: products.find((product) => product.name === row.item)?.id || null,
      kuantitas: row.qty,
    }));

    const data = {
      customer_id: selectedCustomer,
      jatuh_tempo: dueDate,
      status: paymentStatus,
      items: items,
      diskon: discount,
      ongkir: shipping,
      tax: tax,
    };

    // Kirim data ke backend menggunakan Inertia
    router.post("/invoices", data, {
      onSuccess: () => {
        alert("Transaksi berhasil dibuat!");
      },
      onError: (errors) => {
        alert("Terjadi kesalahan: " + JSON.stringify(errors));
      },
    });
  };

  return (
    <DashboardLayout>
      <Head title="Tambah Invoices" />
      <Link href="/invoices" className="inline-flex items-center text-blue-500 hover:underline">
        <IoIosArrowBack size={24} className="mr-2" /> Kembali
      </Link>
      <h2 className="text-2xl font-bold">Tambah Invoice</h2>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-[#646262]">Nama Customer</label>
        <select
          className="w-full p-2 border rounded cursor-pointer"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">Pilih Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] flex flex-col gap-2">
          <label className="font-semibold text-[#646262]">Jatuh Tempo</label>
          <input
            type="date"
            className="w-full p-2 border rounded cursor-pointer"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px] flex flex-col gap-2">
          <label className="font-semibold text-[#646262]">Status Pembayaran</label>
          <select
            className="w-full p-2 border rounded cursor-pointer"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="Belum dibayar">Belum dibayar</option>
            <option value="Dibayar sebagian">Dibayar sebagian</option>
            <option value="Lunas">Lunas</option>
          </select>
        </div>
      </div>

      <h2 className="text-2xl font-bold">Order Detail</h2>

      <Table>
        <thead>
          <tr>
            <th className="p-2 text-sm text-[#646262] text-start">Items</th>
            <th className="p-2 text-sm text-[#646262] w-[70px]">Qty</th>
            <th className="p-2 text-sm text-[#646262] w-[110px]">Satuan</th>
            <th className="p-2 text-sm text-[#646262] w-[110px]">Total</th>
            <th className="p-2 text-sm text-[#646262] w-[40px]"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="p-2">
                <select
                  className="w-full p-2 border rounded"
                  value={row.item}
                  onChange={(e) => updateRow(index, "item", e.target.value)}
                >
                  <option value="">Pilih Item</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2 w-[70px]">
                <input
                  type="number"
                  value={row.qty}
                  min="1"
                  className="w-full p-2 border rounded"
                  onChange={(e) => updateRow(index, "qty", e.target.value)}
                />
              </td>
              <td className="p-2 w-[110px] text-center">
                {productPrices[row.item] ? formatCurrency(productPrices[row.item]) : "-"}
              </td>
              <td className="p-2 w-[110px] text-center">
                {formatCurrency(row.total)}
              </td>
              <td className="p-2 text-center">
                <button onClick={() => removeRow(index)} className="text-red-500 hover:underline">
                  <MdOutlineCancel size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={addItem} className="mt-4 px-4 py-2 text-blue-600 cursor-pointer">
        Tambah Item
      </button>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block font-semibold">Diskon</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-semibold">Ongkir</label>
          <input
            type="number"
            value={shipping}
            onChange={(e) => setShipping(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-semibold">Pajak</label>
          <input
            type="number"
            value={tax}
            onChange={(e) => setTax(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>

      <div className="text-right font-bold text-lg">
        Total Harga: {formatCurrency(total)}
      </div>

      {/* Tombol Buat Transaksi */}
      <div className="mt-6">
        <button
          onClick={handleCreateTransaction}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Buat Transaksi
        </button>
      </div>
    </DashboardLayout>
  );
}
