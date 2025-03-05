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

export default function Index({ users = [] }) {
  const { isOpen, openPopup, closePopup } = usePopup();

  const { data, setData, reset, processing } = useForm({
    id: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (data.id) {
      router.put(`users/${data.id}`, data);
    } else {
      router.post("users", data);
    }
    closePopup();
  }

  function handleAddUser() {
    reset();
    openPopup();
  }

  function handleEditUser(user) {
    setData({
      id: user.id,
      username: user.username,
      email: user.email,
      password: "",
    });
    openPopup();
  }

  function onDeleteUser(id) {
    router.delete(`users/${id}`);
  }

  return (
    <DashboardLayout>
      <Head title="Users" />
      <Heading title="Data User" subTitle="user">
        <Button onClick={handleAddUser}>
          Tambah
          <BsPlusCircle size={24} />
        </Button>
      </Heading>

      {users.length > 0 ? (
        <Table>
          <TableHead>
            <TableHeader>No</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader colSpan={3}>Aksi</TableHeader>
          </TableHead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <TableData className="font-bold text-light-slate">
                  {index + 1}
                </TableData>
                <TableData>{user.username}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>
                  <Button onClick={openPopup} className="bg-[#33D1AB] text-[1rem]">
                    Detail
                    <TbSearch size={24} />
                  </Button>
                </TableData>
                <TableData>
                  <Button onClick={() => handleEditUser(user)} className="bg-primary text-[1rem]">
                    Edit
                    <TbEdit size={24} />
                  </Button>
                </TableData>
                <TableData>
                  <Button onClick={() => onDeleteUser(user.id)} className="bg-[#D30368] text-[1rem]">
                    Hapus
                    <MdOutlineCancel size={24} />
                  </Button>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data user.</p>
      )}

      {isOpen && (
        <Popup>
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">{data.id ? "Edit User" : "Tambah User"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" id="id" value={data.id} />

              <input
                type="text"
                id="username"
                placeholder="Username"
                autoComplete="off"
                value={data.username}
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
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required={!data.id}
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
          </div>
        </Popup>
      )}
    </DashboardLayout>
  );
}
