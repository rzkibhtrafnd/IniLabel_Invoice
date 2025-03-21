import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import formatToRupiah from "../../utils/formatToRupiah";

export default function ShowReceipt({ receipt }) {
  const containerRef = useRef(null);
  const [isMedium, setIsMedium] = useState(true);

  // Jika Receipt memuat relasi invoice beserta detailnya, gunakan:
  const invoice = receipt.invoice || {};
  const details = invoice.details || [];

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
      <Head title="Detail Receipt" />
      <Link
        href="/receipts"
        className="inline-flex items-center text-blue-500 hover:underline"
      >
        <IoIosArrowBack size={24} className="mr-2" /> Kembali
      </Link>
      <div
        ref={containerRef}
        className={`grid gap-6 ${
          isMedium ? "grid-cols-1" : "grid-cols-[6fr_4fr] auto-rows-auto"
        }`}
      >
        {/* Kolom Detail Receipt */}
        <div className={`flex flex-col gap-4 ${isMedium ? "order-1" : ""}`}>
          <h2 className="text-2xl font-bold">Detail Receipt</h2>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-600">Invoice</label>
            <div className="border border-gray-300 px-3 py-2 rounded-[10px]">
              {receipt.invoice_id}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-600">
              Metode Pembayaran
            </label>
            <div className="border border-gray-300 px-3 py-2 rounded-[10px]">
              {receipt.metode_pembayaran}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-600">Status</label>
            <div className="border border-gray-300 px-3 py-2 rounded-[10px]">
              {receipt.status}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-600">
              Tanggal Bayar
            </label>
            <div className="border border-gray-300 px-3 py-2 rounded-[10px]">
              {receipt.tanggal_bayar}
            </div>
          </div>
          {receipt.bukti_pembayaran && (
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-600">
                Bukti Pembayaran
                </label>
                <img
                src={receipt.bukti_pembayaran}
                alt="Bukti Pembayaran"
                className="border border-gray-300 rounded-[10px] max-w-full"
                />
            </div>
            )}
        </div>

        {/* Kolom Ringkasan & Tombol Aksi */}
        <div
          className={`bg-[#F6F6F6] flex flex-col gap-4 p-6 rounded-xl ${
            isMedium ? "order-3" : ""
          }`}
        >
          <div>
            <label className="block text-sm text-gray-600 font-semibold">
              Jumlah Bayar
            </label>
            <div className="border border-gray-300 px-3 py-2 rounded-[10px]">
              {formatToRupiah(receipt.jumlah_bayar)}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <a
              href={`/receipts/${receipt.id}/download`}
              className="bg-[#01669E] text-white p-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-semibold cursor-pointer rounded-md text-center"
            >
              Download PDF
            </a>
            <a
              href={`/receipts/${receipt.id}/send-email`}
              className="bg-green-600 text-white p-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-semibold cursor-pointer rounded-md text-center"
            >
              Send Email
            </a>
            <a
              href={`/receipts/${receipt.id}/send-wa`}
              className="bg-[#25D366] text-white p-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-semibold cursor-pointer rounded-md text-center"
            >
              Send WA
            </a>
          </div>
        </div>

        {/* Opsional: Tabel Order Detail jika terdapat detail dari invoice */}
        {details.length > 0 && (
          <div
            className={`flex flex-col gap-2 ${
              isMedium ? "order-2" : "col-span-2"
            }`}
          >
            <h2 className="text-2xl font-bold">Order Detail</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full overflow-hidden">
                <thead>
                  <tr>
                    <th className="p-1 text-sm text-gray-600 text-start">
                      Items
                    </th>
                    <th className="p-1 text-sm text-gray-600 w-[60px]">
                      Qty
                    </th>
                    <th className="p-1 text-sm text-gray-600 w-[110px]">
                      Harga
                    </th>
                    <th className="p-1 text-sm text-gray-600 w-[110px]">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail, index) => (
                    <tr key={index}>
                      <td className="p-1 min-w-[150px]">
                        <div className="border-2 border-gray-300 px-3 py-2 rounded-[7px]">
                          {detail.product.name}
                        </div>
                      </td>
                      <td className="p-2 w-[60px]">
                        <div className="border-2 border-gray-300 px-3 py-2 rounded-[7px] text-center">
                          {detail.kuantitas}
                        </div>
                      </td>
                      <td className="p-2 w-[110px]">
                        <div className="border-2 border-gray-300 px-3 py-2 rounded-[7px] text-center">
                          {formatToRupiah(detail.product.price)}
                        </div>
                      </td>
                      <td className="p-2 w-[110px]">
                        <div className="border-2 border-gray-300 px-3 py-2 rounded-[7px] text-center">
                          {formatToRupiah(detail.total_harga)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
