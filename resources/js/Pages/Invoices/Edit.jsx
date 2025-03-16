import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { MdOutlineCancel } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import formatToRupiah from "../../utils/formatToRupiah";

export default function Invoice({ invoice = [], products = [], customers = [] }) {
  const containerRef = useRef(null);
  const [isMedium, setIsMedium] = useState(true);
  const [rows, setRows] = useState(invoice.details);
  const { data, setData, put, processing } = useForm({
    customer_id: invoice.customer_id,
    jatuh_tempo: invoice.jatuh_tempo,
    status: invoice.status,
    items: invoice.details,
    diskon: Number(invoice.diskon),
    ongkir: Number(invoice.ongkir),
    tax: 0,
  });

  const productPrices = products.reduce((acc, product) => {
    acc[product.id] = product.price;
    return acc;
  }, {});

  const addItem = () => {
    setRows([...rows, { produk_id: "", kuantitas: 1, total_harga: 0 }]);
  };

  const updateRow = (index, key, value) => {
    const newRows = [...rows];
    if (key === "id") {
      newRows[index].produk_id = value;
      newRows[index].total_harga = newRows[index].kuantitas * (productPrices[value] || 0);
    } else if (key === "kuantitas") {
      if (value === "") {
        newRows[index].kuantitas = "";
        newRows[index].total_harga = 0;
      } else {
        newRows[index].kuantitas = parseInt(value) || 1;
        newRows[index].total_harga = newRows[index].kuantitas * (productPrices[newRows[index].produk_id] || 0);
      }
    }
    setRows(newRows);
    setData('items', newRows);
  };

  const removeRow = (index) => {
    const newRows = [...rows.slice(0, index), ...rows.slice(index + 1)];
    setRows(newRows);
    setData('items', newRows);
  };
  
  const subtotal = rows.reduce((sum, row) => sum + Number(row.total_harga), 0);
  const total = subtotal - data.diskon + data.ongkir + data.tax;

  const handleCreateTransaction = (e) => {
    e.preventDefault();
    put(`/invoices/${invoice.id}`, data);
  };

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
    <DashboardLayout className="bg-white">
      <Head title="Edit Invoice" />
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
          <h2 className="text-2xl font-bold">Edit Invoice</h2>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#646262]">Nama Customer</label>
            <select
              value={data.customer_id}
              onChange={(e) => setData('customer_id', e.target.value)}
              className="w-full p-2 border rounded-[10px] cursor-pointer"
            >
              <option value="">Pilih Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">Jatuh Tempo</label>
              <input
                type="date"
                className="w-full p-2 border rounded-[10px] cursor-pointer"
                value={data.jatuh_tempo}
                onChange={(e) => setData('jatuh_tempo', e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">Status Pembayaran</label>
              <select
                className="w-full p-2 border rounded-[10px] cursor-pointer"
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Dibayar sebagian">Dibayar sebagian</option>
                <option value="Lunas">Lunas</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`bg-[#F6F6F6] flex flex-col gap-4 p-6 rounded-xl ${isMedium ? "order-3" : ""}`}>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Diskon</label>
            <input
              type="text"
              inputMode="numeric"
              value={data.diskon === 0 ? "" : data.diskon} 
              onChange={(e) => setData('diskon', e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded-[10px] mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Ongkir</label>
            <input
              type="text"
              inputMode="numeric"
              value={data.ongkir === 0 ? "" : data.ongkir}
              onChange={(e) => setData('ongkir', e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded-[10px] mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Pajak</label>
            <input
              type="text"
              inputMode="numeric"
              value={data.tax === 0 ? "" : data.tax}
              onChange={(e) => setData('tax', e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded-[10px] mt-1"
            />
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <p className="font-bold text-[#111] flex text-xl justify-between">
              <span>Total: </span>
              <span>{formatToRupiah(total)}</span>
            </p>
            <button
              onClick={handleCreateTransaction}
              className="bg-[#01669E] text-white p-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-semibold cursor-pointer rounded-md text-center"
            >
              Simpan Perubahan
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
                        className="min-w-[150px] w-full border-2 bg-[#FCFDFD] border-[#D5D5D5] cursor-pointer rounded-[7px] p-2"
                        value={row.id}
                        onChange={(e) => updateRow(index, "id", e.target.value)}
                      >
                        <option value={row.product?.id || ''}>{row.product?.name || 'Pilih Item'}</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 w-[60px]">
                      <input
                        type="text"
                        inputMode="number"
                        value={row.kuantitas}
                        className="w-[60px] p-2 border-2 bg-[#FCFDFD] border-[#D5D5D5] rounded-[7px]"
                        onChange={(e) => updateRow(index, "kuantitas", e.target.value)}
                      />
                    </td>
                    <td className="p-2 w-[110px] text-center">
                      <div className="p-2 border-2 bg-[#FCFDFD] border-[#D5D5D5] rounded-[7px]">
                        {productPrices[row.produk_id] ? formatToRupiah(productPrices[row.produk_id]) : "-"}
                      </div>
                    </td>
                    <td className="p-2 w-[110px] text-center">
                      <div className="p-2 border-2 bg-[#FCFDFD] border-[#D5D5D5] rounded-[7px]">
                        {formatToRupiah(row.total_harga)}
                      </div>
                    </td>
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
