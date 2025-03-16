import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import formatToRupiah from "../../utils/formatToRupiah";

export default function Invoice({ invoice = [] }) {
  const containerRef = useRef(null);
  const [isMedium, setIsMedium] = useState(true);
  const rows = invoice.details;

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
      <Head title="Detail Invoice" />
      <Link href="/invoices" className="inline-flex items-center text-blue-500 hover:underline">
        <IoIosArrowBack size={24} className="mr-2" /> Kembali
      </Link>
      <div
        ref={containerRef}
        className={`grid gap-6 ${isMedium ? "grid-cols-1" : "grid-cols-[6fr_4fr] auto-rows-auto"}`}
      >
        <div className={`flex flex-col gap-4 ${isMedium ? "order-1" : ""}`}>
          <h2 className="text-2xl font-bold">Detail Invoice</h2>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-600">Nama Customer</label>
            <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">{invoice.customer.name}</div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-gray-600">Jatuh Tempo</label>
              <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">{invoice.jatuh_tempo}</div>
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-gray-600">Status Pembayaran</label>
              <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">{invoice.status}</div>
            </div>
          </div>
        </div>
        <div className={`bg-white flex flex-col gap-4 p-4 rounded-xl shadow-md ${isMedium ? "order-3" : ""}`}>
          <div>
            <label className="block text-sm text-gray-600 font-semibold">Diskon</label>
            <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">{invoice.diskon}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 font-semibold">Ongkir</label>
            <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">{invoice.ongkir}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 font-semibold">Pajak</label>
            <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">0</div>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <p className="font-bold text-gray-900 flex text-xl justify-between">
              <span>Total: </span>
              <span>{formatToRupiah(invoice.total_bayar)}</span>
            </p>
            <button className="p-2 bg-green-500 text-white rounded-lg">Bagikan ke WhatsApp</button>
            <a href={`/invoices/${invoice.id}/download`} className="p-2 bg-blue-500 text-white text-center rounded-lg">
              Download PDF
            </a>
          </div>
        </div>
        <div className={`flex flex-col gap-2 ${isMedium ? "order-2" : "col-span-2"}`}>
          <h2 className="text-2xl font-bold">Order Detail</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden">
              <thead>
                <tr>
                  <th className="p-1 text-sm text-gray-600 text-start">Items</th>
                  <th className="p-1 text-sm text-gray-600 w-[60px]">Qty</th>
                  <th className="p-1 text-sm text-gray-600 w-[110px]">Satuan</th>
                  <th className="p-1 text-sm text-gray-600 w-[110px]">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((invoice, index) => (
                  <tr key={index}>
                    <td className="p-1 min-w-[150px] text-nowrap">
                      <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">
                        {invoice.product.name}
                      </div>
                    </td>
                    <td className="p-2 w-[60px]">
                      <div className="border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">
                        {invoice.kuantitas}
                      </div>
                    </td>
                    <td className="p-2 w-[110px]">
                      <div className="text-center border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">
                        {formatToRupiah(invoice.product.price)}
                      </div>
                    </td>
                    <td className="p-2 w-[160px]">
                      <div className="text-center border border-gray-300 bg-gray-100 px-3 py-2 rounded-md">
                        {formatToRupiah(invoice.total_harga)}
                      </div>
                    </td>
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
