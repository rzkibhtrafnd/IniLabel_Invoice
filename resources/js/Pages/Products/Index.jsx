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
import formatToRupiah from "../../utils/formatToRupiah";
import Pagination from "../../Components/Tables/Pagination";

export default function Index({ products = [] }) {
  const { isOpen, openPopup, closePopup } = usePopup();
  const { data, setData, reset, processing } = useForm({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [mode, setMode] = useState("create"); // mode: "create", "edit", "detail"

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (mode === "edit") {
      router.put(`/products/${data.id}`, data);
    } else if (mode === "create") {
      router.post("/products", data);
    }
    closePopup();
  }

  function handleAddProduct() {
    reset();
    setMode("create");
    openPopup();
  }

  function handleEditProduct(product) {
    setData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setMode("edit");
    openPopup();
  }

  function handleDetailProduct(product) {
    setData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setMode("detail");
    openPopup();
  }

  function onDeleteProduct(id) {
    router.delete(`/products/${id}`);
  }

  return (
    <DashboardLayout>
      <Head title="Produk" />
      <Heading title="Data Produk" subTitle="produk">
        <Button onClick={handleAddProduct} className="bg-[#01669E]">
          Tambah
          <BsPlusCircle size={24} />
        </Button>
      </Heading>

      {products.data.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableHeader>No</TableHeader>
              <TableHeader>Nama</TableHeader>
              <TableHeader>Harga</TableHeader>
              <TableHeader>Stok</TableHeader>
              <TableHeader colSpan={3}>Aksi</TableHeader>
            </TableHead>
            <tbody>
              {products.data.map((product, index) => (
                <tr key={product.id}>
                  <TableData className="font-bold text-light-slate">
                    {index + 1}
                  </TableData>
                  <TableData className="text-nowrap">{product.name}</TableData>
                  <TableData>
                    {formatToRupiah(product.price)}
                  </TableData>
                  <TableData>{product.stock}</TableData>
                  <TableData className="px-1 w-[111px]">
                    <Button
                      onClick={() => handleDetailProduct(product)}
                      className="bg-[#33D1AB] text-[1rem]"
                    >
                      Detail
                      <TbSearch size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[96px]">
                    <Button
                      onClick={() => handleEditProduct(product)}
                      className="bg-primary text-[1rem]"
                    >
                      Edit
                      <TbEdit size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[115px]">
                    <Button
                      onClick={() => onDeleteProduct(product.id)}
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
          <Pagination data={products} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Tidak ada data produk.
        </p>
      )}

      {isOpen && (
        <Popup>
          <h2 className="text-lg font-bold mb-4">
            {mode === "edit"
              ? "Edit Produk"
              : mode === "detail"
              ? "Detail Produk"
              : "Tambah Produk"}
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="hidden" id="id" value={data.id} />

            <input
              type="text"
              id="name"
              placeholder="Nama Produk"
              autoComplete="off"
              value={data.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              required
              disabled={mode === "detail"}
            />
            <input
              type="text"
              id="description"
              placeholder="Deskripsi Produk"
              autoComplete="off"
              value={data.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              required
              disabled={mode === "detail"}
            />
            <input
              type="number"
              id="price"
              placeholder="Harga"
              autoComplete="off"
              value={data.price}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              required
              disabled={mode === "detail"}
            />
            <input
              type="number"
              id="stock"
              placeholder="Stok"
              autoComplete="off"
              value={data.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              required
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
