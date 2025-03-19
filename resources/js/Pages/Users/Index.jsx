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

export default function Index({ users = [] }) {
  const [ isFormOpen, openFormPopup, closeFormPopup ] = usePopup();
  const [ isDetailOpen, openDetailPopup, closeDetailPopup ] = usePopup();
  const { data, setData, reset, processing, post, put, delete: destroy } = useForm({
    id: "", username: "", email: "", password: "", notelepon: "", alamat: "",
  });
  const [mode, setMode] = useState("Tambah");

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    mode === "Edit" ? put(`/users/${data.id}`, data) : post("/users", data);
    closeFormPopup();
  }

  function handleAddUser() {
    reset();
    setMode("Tambah");
    openFormPopup();
  }

  function handleEditUser(user) {
    setData({ ...user, password: "" });
    setMode("Edit");
    openFormPopup();
  }

  function handleDetailUser(user) {
    setData({ ...user, password: "" });
    openDetailPopup();
  }

  return (
    <DashboardLayout>
      <Head title="Users" />
      <Heading title="Data User" subTitle="user">
        <Button onClick={handleAddUser} className="text-white bg-[#01669E]">
          Tambah <BsPlusCircle size={24} />
        </Button>
      </Heading>

      {users.data.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableHeader>No</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader colSpan={3}>Aksi</TableHeader>
            </TableHead>
            <tbody>
              {users.data.map((user, index) => (
                <tr key={user.id}>
                  <TableData className="font-bold text-light-slate">{index + 1}</TableData>
                  <TableData className="text-nowrap">{user.username}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData className="px-1 w-[111px]">
                    <Button onClick={() => handleDetailUser(user)} className="bg-[#33D1AB] text-white text-[1rem]">
                      Detail <TbSearch size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[96px]">
                    <Button onClick={() => handleEditUser(user)} className="bg-primary text-white text-[1rem]">
                      Edit <TbEdit size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[115px]">
                    <ConfirmPopup
                      title="Hapus Admin?"
                      text="Apakah Anda yakin ingin menghapus Admin ini?"
                      onConfirm={() => destroy(`/users/${user.id}`)}
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination data={users} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data user.</p>
      )}

      {isFormOpen && (
        <FormPopup
          title={`${mode} User`}
          closePopup={closeFormPopup}
          handleSubmit={handleSubmit}
          data={data}
          handleChange={handleChange}
          fields={[
            { id: "username", type: "text", placeholder: "Username", required: true },
            { id: "email", type: "email", placeholder: "Email", required: true },
            { id: "password", type: "password", placeholder: "Password", autoComplete: "new-password" },
            { id: "notelepon", type: "text", placeholder: "No Telepon" },
            { id: "alamat", type: "textarea", placeholder: "Alamat" }
          ]}
        />
      )}

      {isDetailOpen && (
        <DetailPopup
          title="Detail User"
          closePopup={closeDetailPopup}
          data={data}
          fields={[
            { id: "username", placeholder: "Username" },
            { id: "email", placeholder: "Email" },
            { id: "notelepon", placeholder: "No Telepon" },
            { id: "alamat", placeholder: "Alamat" },
          ]}
        />
      )}
    </DashboardLayout>
  );
}
