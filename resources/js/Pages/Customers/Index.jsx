import { Head, router, useForm, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import Table from "../../Components/Tables/Table";
import TableHead from "../../Components/Tables/TableHead";
import TableHeader from "../../Components/Tables/TableHeader";
import TableData from "../../Components/Tables/TableData";
import Popup from "../../Components/Popup";
import usePopup from "../../hooks/usePopup";
import Button from "../../Components/Buttons";
import { TbEdit, TbSearch } from "react-icons/tb";
import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

export default function Index({ customers = [] }) {
  const { isOpen, openPopup, closePopup } = usePopup();

  const { data, setData, reset, processing } = useForm({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (data.id) {
      router.put(`/customers/${data.id}`, data);
    } else {
      router.post("/customers", data);
    }
    closePopup();
  }

  function handleAddCustomer() {
    reset();
    openPopup();
  }

  function handleEditCustomer(customer) {
    setData({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
    openPopup();
  }

  function onDeleteCustomer(id) {
    router.delete(`/customers/${id}`);
  }

  return (
    <DashboardLayout>
      <Head title="Customers" />
      <Heading title="Data Customer" subTitle="customer">
        <Button onClick={handleAddCustomer} className="bg-[#01669E]">
          Tambah
          <BsPlusCircle size={24} />
        </Button>
      </Heading>

      {customers.length > 0 ? (
        <Table>
          <TableHead>
            <TableHeader>No</TableHeader>
            <TableHeader>Nama</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Telepon</TableHeader>
            <TableHeader colSpan={3}>Aksi</TableHeader>
          </TableHead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <TableData className="font-bold text-light-slate">
                  {index + 1}
                </TableData>
                <TableData className="text-nowrap">{customer.name}</TableData>
                <TableData>{customer.email}</TableData>
                <TableData>{customer.phone}</TableData>
                <TableData className="px-1 w-[111px]">
                  <Button onClick={openPopup} className="bg-[#33D1AB] text-[1rem]">
                    Detail
                    <TbSearch size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[96px]">
                  <Button onClick={() => handleEditCustomer(customer)} className="bg-primary text-[1rem]">
                    Edit
                    <TbEdit size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[115px]">
                  <Button onClick={() => onDeleteCustomer(customer.id)} className="bg-[#D30368] text-[1rem]">
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

      {isOpen && (
        <Popup>
            <h2 className="text-lg font-bold mb-4">
              {data.id ? "Edit Customer" : "Tambah Customer"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" id="id" value={data.id} />

              <input
                type="text"
                id="name"
                placeholder="Nama Lengkap"
                autoComplete="off"
                value={data.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="off"
                value={data.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="text"
                id="phone"
                placeholder="Nomor Telepon"
                autoComplete="off"
                value={data.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="text"
                id="address"
                placeholder="Alamat"
                autoComplete="off"
                value={data.address}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded"
                  disabled={processing}
                >
                  {processing ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
        </Popup>
      )}
    </DashboardLayout>
  );
}
