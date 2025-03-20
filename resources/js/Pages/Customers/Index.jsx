import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import Table from "../../Components/Tables/Table";
import TableHead from "../../Components/Tables/TableHead";
import TableHeader from "../../Components/Tables/TableHeader";
import TableData from "../../Components/Tables/TableData";
import usePopup from "../../hooks/usePopup";
import Button from "../../Components/Buttons";
import { TbEdit, TbSearch } from "react-icons/tb";
import { BsPlusCircle } from "react-icons/bs";
import Pagination from "../../Components/Tables/Pagination";
import ConfirmPopup from "../../Components/Popup/ConfirmPopup";
import FormPopup from "../../Components/Popup/FormPopup";
import DetailPopup from "../../Components/Popup/DetailPopup";

export default function Index({ customers = [] }) {
  const [isFormOpen, openFormPopup, closeFormPopup] = usePopup();
  const [isDetailOpen, openDetailPopup, closeDetailPopup] = usePopup();
  const [mode, setMode] = useState("Tambah");
  
  const { data, setData, reset, post, put, processing, delete: destroy } = useForm({
    id: "", name: "", email: "", phone: "", address: "",
  });

  const handleChange = (e) => setData(e.target.id, e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Edit" ? put(`/customers/${data.id}`, data) : post("/customers", data);
    closeFormPopup();
  };

  const handleAddCustomer = () => {
    reset();
    setMode("Tambah");
    openFormPopup();
  };

  const handleEditCustomer = (customer) => {
    setData({ ...customer });
    setMode("Edit");
    openFormPopup();
  };

  const handleDetailCustomer = (customer) => {
    setData({ ...customer });
    setMode("Detail");
    openDetailPopup();
  };

  return (
    <DashboardLayout>
      <Head title="Customer" />
      <Heading title="Data Customer" subTitle="customer">
        <Button onClick={handleAddCustomer} className="bg-[#01669E] text-white">
          Tambah <BsPlusCircle size={24} />
        </Button>
      </Heading>

      {customers.data.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableHeader>No</TableHeader>
              <TableHeader>Nama</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Telepon</TableHeader>
              <TableHeader colSpan={3}>Aksi</TableHeader>
            </TableHead>
            <tbody>
              {customers.data.map((customer, index) => (
                <tr key={customer.id}>
                  <TableData className="font-bold text-light-slate">{index + 1}</TableData>
                  <TableData className="text-nowrap">{customer.name}</TableData>
                  <TableData>{customer.email}</TableData>
                  <TableData>{customer.phone}</TableData>
                  <TableData className="px-1 w-[111px]">
                    <Button onClick={() => handleDetailCustomer(customer)} className="bg-[#33D1AB] text-white text-[1rem]">
                      Detail <TbSearch size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[96px]">
                    <Button onClick={() => handleEditCustomer(customer)} className="bg-primary text-white text-[1rem]">
                      Edit <TbEdit size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[115px]">
                    <ConfirmPopup 
                      title="Hapus Customer?" 
                      text="Apakah Anda yakin ingin menghapus Customer ini?" 
                      onConfirm={() => destroy(`/customers/${customer.id}`)} 
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination data={customers} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data customer.</p>
      )}

      {isFormOpen && (
        <FormPopup
          title={`${mode} Customer`}
          closePopup={closeFormPopup}
          handleSubmit={handleSubmit}
          data={data}
          handleChange={handleChange}
          fields={[
            { id: "name", type: "text", placeholder: "Nama Lengkap", required: true },
            { id: "email", type: "email", placeholder: "Email", required: true },
            { id: "phone", type: "text", placeholder: "Nomor Telepon", required: true },
            { id: "address", type: "text", placeholder: "Alamat", required: true }
          ]}
        />
      )}

      {isDetailOpen && (
        <DetailPopup
          title="Detail Customer"
          closePopup={closeDetailPopup}
          data={data}
          fields={[
            { id: "name", placeholder: "Nama Lengkap" },
            { id: "email", placeholder: "Email" },
            { id: "phone", placeholder: "Nomor Telepon" },
            { id: "address", placeholder: "Alamat" }
          ]}
        />
      )}
    </DashboardLayout>
  );
}
