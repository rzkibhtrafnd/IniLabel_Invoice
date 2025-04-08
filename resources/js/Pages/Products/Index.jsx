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
import formatToRupiah from "../../utils/formatToRupiah";
import Pagination from "../../Components/Tables/Pagination";
import ConfirmPopup from "../../Components/Popup/ConfirmPopup";
import FormPopup from "../../Components/Popup/FormPopup";
import DetailPopup from "../../Components/Popup/DetailPopup";

export default function Index({ products = [] }) {
  const url = window.location.origin + '/products';
  const [ isFormOpen, openFormPopup, closeFormPopup ] = usePopup();
  const [ isDetailOpen, openDetailPopup, closeDetailPopup ] = usePopup();
  
  const { data, setData, reset, post, put, delete: destroy } = useForm({
    id: "", name: "", description: "", price: "", stock: "", unit: ""
  });
  const [mode, setMode] = useState("Tambah");

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    mode === "Edit" ? put(`/products/${data.id}`, data) : post("/products", data);
    closeFormPopup();
  }

  function handleAddProduct() {
    reset();
    setMode("Tambah");
    openFormPopup();
  }

  function handleEditProduct(product) {
    setData({ ...product });
    setMode("Edit");
    openFormPopup();
  }

  function handleDetailProduct(product) {
    setData({ ...product });
    openDetailPopup();
  }

  return (
    <DashboardLayout>
      <Head title="Produk" />
      <Heading title="Data Produk" subTitle="produk">
        <Button onClick={handleAddProduct} className="text-white bg-[#01669E]">
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
                  <TableData className="font-bold text-light-slate">{index + 1}</TableData>
                  <TableData className="text-nowrap">{product.name}</TableData>
                  <TableData>{formatToRupiah(product.price)}</TableData>
                  <TableData>{product.stock}</TableData>
                  <TableData className="px-1 w-[111px]">
                    <Button onClick={() => handleDetailProduct(product)} className="bg-[#33D1AB] text-base text-white">
                      Detail
                      <TbSearch size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[96px]">
                    <Button onClick={() => handleEditProduct(product)} className="bg-primary text-base text-white">
                      Edit
                      <TbEdit size={24} />
                    </Button>
                  </TableData>
                  <TableData className="px-1 w-[115px]">
                    <ConfirmPopup
                      title="Hapus Produk?"
                      text="Apakah Anda yakin ingin menghapus Produk ini?"
                      onConfirm={() => destroy(`/products/${product.id}`)}
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination data={products} url={url} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">Tidak ada data produk.</p>
      )}

      {isFormOpen && (
        <FormPopup
          title={`${mode} Produk`}
          closePopup={closeFormPopup}
          handleSubmit={handleSubmit}
          data={data}
          handleChange={handleChange}
          fields={[
            { id: "name", type: "text", placeholder: "Nama Produk", required: true },
            { id: "description", type: "text", placeholder: "Deskripsi Produk", required: true },
            { id: "price", type: "number", placeholder: "Harga", required: true },
            { id: "stock", type: "number", placeholder: "Stok", required: true },
            { id: "unit", type: "text", placeholder: "Satuan", required: true }
          ]}
        />
      )}

      {isDetailOpen && (
        <DetailPopup
          title="Detail Produk"
          closePopup={closeDetailPopup}
          data={data}
          fields={[
            { id: "name", placeholder: "Nama Produk" },
            { id: "description", placeholder: "Deskripsi Produk" },
            { id: "price", placeholder: "Harga" },
            { id: "stock", placeholder: "Stok" },
            { id: "unit", placeholder: "Satuan" }
          ]}
        />
      )}
    </DashboardLayout>
  );
}