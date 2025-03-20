import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import Heading from "../../Components/Heading";
import Button from "../../Components/Buttons";
import { BsPlusCircle } from "react-icons/bs";
import Table from "../../Components/Tables/Table";
import TableHead from "../../Components/Tables/TableHead";
import TableHeader from "../../Components/Tables/TableHeader";
import TableData from "../../Components/Tables/TableData";
import Pagination from "../../Components/Tables/Pagination";
import { TbEdit, TbSearch } from "react-icons/tb";
import ConfirmPopup from "../../Components/Popup/ConfirmPopup";
import FormPopup from "../../Components/Popup/FormPopup";
import DetailPopup from "../../Components/Popup/DetailPopup";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import usePopup from "../../hooks/usePopup";

export default function Index({ receipts = [] }) {
  const [isFormOpen, openFormPopup, closeFormPopup] = usePopup();
  const [isDetailOpen, openDetailPopup, closeDetailPopup] = usePopup();
  const { data, setData, reset, post, put, processing, delete: destroy } = useForm({
    id: "", invoice_id: "", metode_pembayaran: "", status: "", jumlah_bayar: "", tanggal_bayar: "",
  });
  const [mode, setMode] = useState("Tambah");

  const handleChange = (e) => setData(e.target.id, e.target.value);

  function handleAddReceipt() {
    reset();
    setMode("Tambah");
    openFormPopup();
  }

  return (
    <DashboardLayout>
      <Head title="Receipts" />
      <Heading title="Data Receipts" subTitle="receipts">
        <Button onClick={handleAddReceipt} className="bg-[#01669E] text-white">
          Tambah
          <BsPlusCircle size={24} />
        </Button>
      </Heading>
      {receipts.data.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableHeader>No</TableHeader>
              <TableHeader>Invoice</TableHeader>
              <TableHeader>Metode Pembayaran</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Jumlah Bayar</TableHeader>
              <TableHeader>Tanggal Bayar</TableHeader>
              <TableHeader colSpan={3}>Aksi</TableHeader>
            </TableHead>
            <tbody>
              {receipts.data.map((receipt, index) => (
                <tr key={receipt.id}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{receipt.invoice_id}</TableData>
                  <TableData>{receipt.metode_pembayaran}</TableData>
                  <TableData>{receipt.status}</TableData>
                  <TableData>{receipt.jumlah_bayar}</TableData>
                  <TableData>{receipt.tanggal_bayar}</TableData>
                  <TableData>
                    <Button onClick={() => openDetailPopup()} className="bg-[#33D1AB] text-white">
                      Detail
                      <TbSearch size={20} />
                    </Button>
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination data={receipts} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data receipts.</p>
      )}

      {isFormOpen && (
        <FormPopup
          title={`${mode} Receipt`}
          closePopup={closeFormPopup}
          handleSubmit={() => {}}
          data={data}
          handleChange={handleChange}
          fields={[
            { id: "metode_pembayaran", type: "text", placeholder: "Metode Pembayaran", required: true },
            { id: "status", type: "text", placeholder: "Status", required: true },
            { id: "jumlah_bayar", type: "number", placeholder: "Jumlah Bayar", required: true },
            { id: "tanggal_bayar", type: "date", placeholder: "Tanggal Bayar", required: true },
          ]}
        />
      )}

      {isDetailOpen && (
        <DetailPopup
          title="Detail Receipt"
          closePopup={closeDetailPopup}
          data={data}
          fields={[
            { id: "metode_pembayaran", placeholder: "Metode Pembayaran" },
            { id: "status", placeholder: "Status" },
            { id: "jumlah_bayar", placeholder: "Jumlah Bayar" },
            { id: "tanggal_bayar", placeholder: "Tanggal Bayar" },
          ]}
        />
      )}
    </DashboardLayout>
  );
}
