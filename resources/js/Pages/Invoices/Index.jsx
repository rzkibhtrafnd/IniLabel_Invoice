import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import Button from "../../Components/Buttons";
import Table from "../../Components/Tables/Table";
import TableHead from "../../Components/Tables/TableHead";
import TableHeader from "../../Components/Tables/TableHeader";
import TableData from "../../Components/Tables/TableData";
import { BsPlusCircle } from "react-icons/bs";
import { TbEdit, TbSearch } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import formatToRupiah from "../../utils/formatToRupiah";

export default function Invoice({ invoices }) {
  const { get, delete: destroy } = useForm();

  function onDetailInvoice(id) {
    get(`/invoices/${id}`);
  }

  function onUpdateInvoice(id) {
    get(`/invoices/${id}/edit`);
  }

  function onDeleteInvoice(id) {
    destroy(`/invoices/${id}`);
  }

  return (
    <DashboardLayout>
      <Head title="Invoice" />
      <Heading title="Data Invoice" subTitle="Invoice">
        <Link href="/invoices/create">
          <Button className="bg-[#01669E]">
            Tambah
            <BsPlusCircle size={24} />
          </Button>
        </Link>
      </Heading>

      {invoices.data.length > 0 ? (
        <Table>
          <TableHead>
            <TableHeader>Id</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Total Harga</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader colSpan={3}>Aksi</TableHeader>
          </TableHead>
          <tbody>
            {invoices.data.map((invoice) => (
              <tr key={invoice.id}>
                <TableData className="font-bold text-light-slate">
                  {invoice.id}
                </TableData>
                <TableData className="text-nowrap">
                  {invoice.customer.name}
                </TableData>
                <TableData>
                  {formatToRupiah(invoice.total_bayar)}
                </TableData>
                <TableData>{invoice.status}</TableData>
                <TableData className="px-1 w-[111px]">
                  <Button onClick={() => onDetailInvoice(invoice.id)} className="bg-[#33D1AB] text-[1rem]">
                    Detail
                    <TbSearch size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[96px]">
                  <Button onClick={() => onUpdateInvoice(invoice.id)} className="bg-primary text-[1rem]">
                    Edit
                    <TbEdit size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[115px]">
                  <Button onClick={() => onDeleteInvoice(invoice.id)} className="bg-[#D30368] text-[1rem]">
                    Hapus
                    <MdOutlineCancel size={24} />
                  </Button>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data invoice.</p>
      )}

    </DashboardLayout>
  );
}
