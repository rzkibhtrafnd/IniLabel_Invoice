import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, Link, } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import formatToRupiah from "../../utils/formatToRupiah";

export default function Invoice({ invoice = [] }) {
  const containerRef = useRef(null);
  const [isMedium, setIsMedium] = useState(true);
  const rows = invoice.details;

  const handleShare = async () => {
    const shareData = {
      title: "Judul Konten",
      text: "Deskripsi singkat konten.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Berhasil dibagikan");
      } catch (error) {
        console.error("Gagal membagikan", error);
      }
    } else {
      window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareData.text + " " + shareData.url
      )}`;
    }
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
    <DashboardLayout>
      <Head title="Tambah Invoice" />
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
            <select
              value={invoice.customer.id}
              className="w-full p-2 border rounded cursor-pointer"
            >
              <option value={invoice.customer.id}>{invoice.customer.name}</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">Jatuh Tempo</label>
              <input
                type="date"
                className="w-full p-2 border rounded cursor-pointer"
                value={invoice.jatuh_tempo}
              />
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">Status Pembayaran</label>
              <select
                className="w-full p-2 border rounded cursor-pointer"
                value={invoice.status}
              >
                <option value={invoice.status}>{invoice.status}</option>
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
              value={invoice.diskon} 
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Ongkir</label>
            <input
              type="text"
              inputMode="numeric"
              value={invoice.ongkir}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-[#646262] font-semibold">Pajak</label>
            <input
              type="text"
              inputMode="numeric"
              value={0}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <p className="font-bold text-[#111] flex text-xl justify-between">
              <span>Total: </span>
              <span>{formatToRupiah(invoice.total_bayar)}</span>
            </p>
            <button onClick={handleShare} className="p-2 bg-green-500 text-white rounded-lg">
                Bagikan ke WhatsApp
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
                {rows.map((invoice, index) => (
                  <tr key={index}>
                    <td className="p-1 min-w-[150px]">
                      <select
                        className="w-full border bg-[#FCFDFD] border-[#D5D5D5] cursor-pointer rounded-md p-2"
                        onChange={(e) => updateRow(index, "id", e.target.value)}
                      >
                        <option value={invoice.id}>{invoice.product.name}</option>
                      </select>
                    </td>
                    <td className="p-2 w-[60px]">
                      <input
                        type="text"
                        inputMode="number"
                        value={invoice.kuantitas}
                        className="w-full p-2 border bg-[#FCFDFD] border-[#D5D5D5] rounded-md"
                      />
                    </td>
                    <td className="p-2 w-[110px] text-center">{formatToRupiah(invoice.product.price)}</td>
                    <td className="p-2 w-[110px] text-center">{formatToRupiah(invoice.total_harga)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
