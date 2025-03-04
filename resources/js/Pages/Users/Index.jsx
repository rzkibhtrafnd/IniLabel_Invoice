import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import Table from "../../Components/Tables/Table";
import TableHead from "../../Components/Tables/TableHead";
import TableHeader from "../../Components/Tables/TableHeader";
import TableData from "../../Components/Tables/TableData";
import Popup from "../../Components/Popup";

export default function Index({ users }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSave = (userData) => {
    console.log("Data disimpan:", userData);
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <Heading title="Data User" subTitle="user" />
      <button onClick={handleAddUser} className="px-4 py-2 bg-primary text-white rounded mb-4">
        Tambah User
      </button>
      <Table>
        <TableHead>
          <TableHeader>No</TableHeader>
          <TableHeader>Username</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Aksi</TableHeader>
        </TableHead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <TableData className="font-bold text-light-slate">{index + 1}</TableData>
              <TableData>{user.username}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>
                <button
                  onClick={() => handleEditUser(user)}
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Edit
                </button>
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} user={editingUser} />
    </DashboardLayout>
  );
}
