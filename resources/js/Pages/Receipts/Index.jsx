import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Heading from "../../Components/Heading";
import Button from "../../Components/Buttons";
import { BsPlusCircle } from "react-icons/bs";
import { TbEdit, TbSearch } from "react-icons/tb";
import Table from "../../Components/Tables/Table";
import TableHead from "../../Components/Tables/TableHead";
import TableHeader from "../../Components/Tables/TableHeader";
import TableData from "../../Components/Tables/TableData";
import Pagination from "../../Components/Tables/Pagination";
import ConfirmPopup from "../../Components/Popup/ConfirmPopup";
import formatToRupiah from "../../utils/formatToRupiah";

export default function Receipts({ receipts }) {
  const url = window.location.origin + '/receipts';
  const { get, delete: destroy } = useForm();

  function onDetailReceipt(id) {
    get(`/receipts/${id}`);
  }

  function onUpdateReceipt(id) {
    get(`/receipts/${id}/edit`);
  }

  return (
    <DashboardLayout>
      <Head title="Receipts" />
      <Heading title="Data Receipts" subTitle="Receipts">
        <Link href="/receipts/create">
          <Button className="bg-[#01669E] text-white">
            Tambah
            <BsPlusCircle size={24} />
          </Button>
        </Link>
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
              <TableHeader colSpan={3}>Aksi</TableHeader>
            </TableHead>
            <tbody>
              {receipts.data.map((receipt, index) => (
                <tr key={receipt.id}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{receipt.invoice_id}</TableData>
                  <TableData>{receipt.metode_pembayaran}</TableData>
                  <TableData>{receipt.status}</TableData>
                  <TableData>{formatToRupiah(receipt.jumlah_bayar)}</TableData>
                  <TableData className="px-1 w-[111px]">
                    <Button
                      onClick={() => onDetailReceipt(receipt.id)}
                      className="bg-[#33D1AB] text-white text-[1rem]"
                    >
                      Detail
                      <TbSearch size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[96px]">
                    <Button
                      onClick={() => onUpdateReceipt(receipt.id)}
                      className="bg-primary text-white text-[1rem]"
                    >
                      Edit
                      <TbEdit size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[115px]">
                    <ConfirmPopup
                      title="Hapus Receipt?"
                      text="Apakah Anda yakin ingin menghapus receipt ini?"
                      onConfirm={() => destroy(`/receipts/${receipt.id}`)}
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination data={receipts} url={url} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data receipts.</p>
      )}
    </DashboardLayout>
  );
}
