import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";

export default function CreateReceipt({ invoices = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    invoice_id: "",
    metode_pembayaran: "Tunai",
    status: "Dibayar Sebagian",
    jumlah_bayar: "",
    tanggal_bayar: new Date().toISOString().split("T")[0],
    bukti_pembayaran: null,
  });

  const handleCreateReceipt = (e) => {
    e.preventDefault();
    post("/receipts");
  };

  return (
    <DashboardLayout className="bg-white">
      <Head title="Tambah Receipt" />
      <div className="mb-4">
        <Link
          href="/receipts"
          className="inline-flex items-center text-blue-500 hover:underline"
        >
          <IoIosArrowBack size={24} className="mr-2" /> Kembali
        </Link>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleCreateReceipt} encType="multipart/form-data">
          <h2 className="text-2xl font-bold mb-4">Tambah Receipt</h2>
          {/* Pilih Invoice */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-semibold text-[#646262]">Invoice</label>
            <select
              value={data.invoice_id}
              onChange={(e) => setData("invoice_id", e.target.value)}
              className="w-full p-2 border rounded-[10px] cursor-pointer"
            >
              <option value="">Pilih Invoice</option>
              {invoices.map((invoice) => (
                <option key={invoice.id} value={invoice.id}>
                  {invoice.id} - {invoice.total_bayar}
                </option>
              ))}
            </select>
            {errors.invoice_id && (
              <span className="text-red-500 text-sm">{errors.invoice_id}</span>
            )}
          </div>

          {/* Metode & Status Pembayaran */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">
                Metode Pembayaran
              </label>
              <select
                className="w-full p-2 border rounded-[10px] cursor-pointer"
                value={data.metode_pembayaran}
                onChange={(e) =>
                  setData("metode_pembayaran", e.target.value)
                }
              >
                <option value="Tunai">Tunai</option>
                <option value="Transfer">Transfer</option>
                <option value="Virtual Account">Virtual Account</option>
              </select>
              {errors.metode_pembayaran && (
                <span className="text-red-500 text-sm">
                  {errors.metode_pembayaran}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">
                Status Pembayaran
              </label>
              <select
                className="w-full p-2 border rounded-[10px] cursor-pointer"
                value={data.status}
                onChange={(e) => setData("status", e.target.value)}
              >
                <option value="Dibayar Sebagian">Dibayar Sebagian</option>
                <option value="Lunas">Lunas</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-sm">{errors.status}</span>
              )}
            </div>
          </div>

          {/* Jumlah & Tanggal Bayar */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">
                Jumlah Bayar
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-[10px]"
                value={data.jumlah_bayar}
                onChange={(e) => setData("jumlah_bayar", e.target.value)}
              />
              {errors.jumlah_bayar && (
                <span className="text-red-500 text-sm">
                  {errors.jumlah_bayar}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="font-semibold text-[#646262]">
                Tanggal Bayar
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-[10px]"
                value={data.tanggal_bayar}
                onChange={(e) => setData("tanggal_bayar", e.target.value)}
              />
              {errors.tanggal_bayar && (
                <span className="text-red-500 text-sm">
                  {errors.tanggal_bayar}
                </span>
              )}
            </div>
          </div>

          {/* Bukti Pembayaran */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-semibold text-[#646262]">
              Bukti Pembayaran
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded-[10px]"
              onChange={(e) =>
                setData("bukti_pembayaran", e.target.files[0])
              }
            />
            {errors.bukti_pembayaran && (
              <span className="text-red-500 text-sm">
                {errors.bukti_pembayaran}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="bg-[#01669E] text-white p-2 shadow-md font-semibold cursor-pointer rounded-md text-center w-full"
          >
            {processing ? "Memproses..." : "Buat Receipt"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
