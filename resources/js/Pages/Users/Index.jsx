import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
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
    notelepon: "",
    alamat: "",
  });
  const [mode, setMode] = useState("create"); // mode: "create", "edit", "detail"

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (mode === "edit") {
      router.put(`users/${data.id}`, data);
    } else if (mode === "create") {
      router.post("users", data);
    }
    closePopup();
  }

  function handleAddUser() {
    reset();
    setMode("create");
    openPopup();
  }

  function handleEditUser(user) {
    setData({
      id: user.id,
      username: user.username,
      email: user.email,
      notelepon: user.notelepon || "",
      alamat: user.alamat || "",
      password: "",
    });
    setMode("edit");
    openPopup();
  }

  function handleDetailUser(user) {
    setData({
      id: user.id,
      username: user.username,
      email: user.email,
      notelepon: user.notelepon || "",
      alamat: user.alamat || "",
      password: "",
    });
    setMode("detail");
    openPopup();
  }

  function onDeleteUser(id) {
    router.delete(`users/${id}`);
  }

  return (
    <DashboardLayout>
      <Head title="Users" />
      <Heading title="Data User" subTitle="user">
        <Button onClick={handleAddUser} className="bg-[#01669E]">
          Tambah
          <BsPlusCircle size={24} />
        </Button>
      </Heading>

      {users.data.length > 0 ? (
        <Table data={users}>
          <TableHead>
            <TableHeader>No</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader colSpan={3}>Aksi</TableHeader>
          </TableHead>
          <tbody>
            {users.data.map((user, index) => (
              <tr key={user.id}>
                <TableData className="font-bold text-light-slate">
                  {index + 1}
                </TableData>
                <TableData className="text-nowrap">{user.username}</TableData>
                <TableData>{user.email}</TableData>
                <TableData className="px-1 w-[111px]">
                  <Button
                    onClick={() => handleDetailUser(user)}
                    className="bg-[#33D1AB] text-[1rem]"
                  >
                    Detail
                    <TbSearch size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[96px]">
                  <Button
                    onClick={() => handleEditUser(user)}
                    className="bg-primary text-[1rem]"
                  >
                    Edit
                    <TbEdit size={24} />
                  </Button>
                </TableData>
                <TableData className="px-1 w-[115px]">
                  <Button
                    onClick={() => onDeleteUser(user.id)}
                    className="bg-[#D30368] text-[1rem]"
                  >
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
          <h2 className="text-lg font-bold mb-4">
            {mode === "edit"
              ? "Edit User"
              : mode === "detail"
              ? "Detail User"
              : "Tambah User"}
          </h2>
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
              disabled={mode === "detail"}
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
              disabled={mode === "detail"}
            />

            {/* Tampilkan field password hanya untuk create dan edit */}
            {mode !== "detail" && (
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required={mode === "create"}
              />
            )}

            <input
              type="text"
              id="notelepon"
              placeholder="Notelepon"
              autoComplete="off"
              value={data.notelepon}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              disabled={mode === "detail"}
            />

            <textarea
              id="alamat"
              placeholder="Alamat"
              autoComplete="off"
              value={data.alamat}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              disabled={mode === "detail"}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              {mode !== "detail" && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded"
                  disabled={processing}
                >
                  {processing ? "Menyimpan..." : "Simpan"}
                </button>
              )}
            </div>
          </form>
        </Popup>
      )}
    </DashboardLayout>
  );
}
