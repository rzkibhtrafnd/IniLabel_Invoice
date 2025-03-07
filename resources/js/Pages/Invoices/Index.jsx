import { Head, Link } from "@inertiajs/react";
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

const items = [
  {
    id: 'iaudgbviad7yv98y',
    name: 'Titis Fajar',
    price: 'Rp 3.000.000',
    status: 'Failed',
  },
];

export default function Invoice({ invoices = items }) {
  return (
    <DashboardLayout>
      <Head title="Invoices" />
      <Heading title="Data Invoice" subTitle="Invoice">
        <Link href="/invoices/create">
          <Button className="bg-[#01669E]">
            Tambah
            <BsPlusCircle size={24} />
          </Button>
        </Link>
      </Heading>

      {invoices.length > 0 ? (
        <Table>
          <TableHead>
            <TableHeader>Id</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Total Harga</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader colSpan={3}>Aksi</TableHeader>
          </TableHead>
          <tbody>
            {invoices.map((invoices) => (
              <tr key={invoices.id}>
                <TableData className="font-bold text-light-slate">
                  {invoices.id}
                </TableData>
                <TableData className="text-nowrap">{invoices.name}</TableData>
                <TableData>{invoices.price}</TableData>
                <TableData>{invoices.status}</TableData>
                <TableData className="px-1 w-[111px]">
                  <Button className="bg-[#33D1AB] text-[1rem]">
                    Detail
                    <TbSearch size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[96px]">
                  <Button className="bg-primary text-[1rem]">
                    Edit
                    <TbEdit size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[115px]">
                  <Button className="bg-[#D30368] text-[1rem]">
                    Hapus
                    <MdOutlineCancel size={24} />
                  </Button>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data customer.</p>
      )}
    </DashboardLayout>
  );
}
