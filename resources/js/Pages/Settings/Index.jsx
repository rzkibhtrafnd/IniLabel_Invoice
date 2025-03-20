import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Button from "../../Components/Buttons";
import { IoIosArrowBack } from "react-icons/io";
import { IoQrCodeOutline } from "react-icons/io5";
import { RiImageAddLine, RiDeleteBinLine } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";

function ImageUpload({ label, id, data, setData, width = "max-w-[20rem]", background = "bg-white", icon: Icon }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(data[id] ? `/storage/${data[id]}` : null);

  useEffect(() => {
    if (data[id] instanceof File) {
      const objectUrl = URL.createObjectURL(data[id]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof data[id] === "string") {
      fetch(`/storage/${data[id]}`)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], data[id].split("/").pop(), { type: blob.type });
          
          setData(id, file);
          setPreview(URL.createObjectURL(file));
        });
    }
  }, [data[id]]);
  

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setData(id, file);
  }

  function handleRemoveImage() {
    setData(id, null);
    setPreview(null);
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-[#646262]">{label}</label>
      <div
        className={`relative border-2 w-full ${width} border-dashed border-[#4C535F] p-8 rounded-lg ${background} text-center cursor-pointer flex flex-col items-center`}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          id={id}
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />

        {preview ? (
          <>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
            >
              <RiDeleteBinLine size={20} />
            </button>
            <div className="relative w-full">
              <img
                src={preview}
                alt="Preview"
                className="h-auto w-full object-cover rounded"
              />
            </div>
          </>
        ) : (
          <div className="text-[#4C535F] flex flex-col items-center">
            {Icon && <Icon size={40} />}
            <span>Klik untuk unggah {label}</span>
          </div>
        )}
      </div>
    </div>
  );
}


function InputField({ label, id, type = "text", data, setData, placeholder, required = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-[#646262]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={data[id]}
        placeholder={placeholder}
        onChange={(e) => setData(id, e.target.value)}
        required={required}
        className="w-full bg-[#E0E4EC] text-[#333] py-2 px-4 border border-[#E0E4EC] rounded-lg
                   placeholder:text-[#8D98AA] 
                   focus:ring focus:ring-[#01669E] 
                   focus:border-[#01669E] focus:bg-white outline-none transition-all"
      />
    </div>
  );
}

function BankInputList({ data, setData }) {
  function addBankField() {
    setData("banks", [...data.banks, { name: "", account_number: "" }]);
  }

  function removeBankField(index) {
    setData("banks", data.banks.filter((_, i) => i !== index));
  }

  function handleBankChange(index, field, value) {
    const newBanks = [...data.banks];
    newBanks[index][field] = value;
    setData("banks", newBanks);
  }

  return (
    <div className="flex flex-col gap-4">
      {data.banks.map((bank, index) => (
        <div key={index} className="flex gap-2 items-end">
          <div className="flex flex-col w-1/2">
            {index === 0 && <label className="text-sm font-semibold text-[#646262] mb-1">Nomor Rekening</label>}
            <input
              type="text"
              placeholder="Masukkan Nomor Rekening"
              value={bank.account_number}
              onChange={(e) => handleBankChange(index, "account_number", e.target.value)}
              className="w-full bg-[#E0E4EC] text-[#333] py-2 px-4 border border-[#E0E4EC] rounded-lg
                        placeholder:text-[#8D98AA] 
                        focus:ring focus:ring-[#01669E] 
                        focus:border-[#01669E] focus:bg-white outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col w-1/2">
            {index === 0 && <label className="text-sm font-semibold text-[#646262] mb-1">Nama Bank</label>}
            <input
              type="text"
              placeholder="Masukkan Nama Bank"
              value={bank.name}
              onChange={(e) => handleBankChange(index, "name", e.target.value)}
              className="w-full bg-[#E0E4EC] text-[#333] py-2 px-4 border border-[#E0E4EC] rounded-lg
                        placeholder:text-[#8D98AA] 
                        focus:ring focus:ring-[#01669E] 
                        focus:border-[#01669E] focus:bg-white outline-none transition-all"
              required
            />
          </div>

          <Button
            type="button"
            onClick={() => removeBankField(index)}
            className="bg-[#D30368] text-white rounded-lg p-2 h-10"
          >
            Hapus
            <MdOutlineCancel size={24} />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={addBankField}
        className="w-fit bg-[#01669E] text-white rounded-lg px-4 py-2"
      >
        Tambah Bank
        <BsPlusCircle size={24} />
      </Button>
    </div>
  );
}

export default function SettingsForm({ setting }) {
  const initialData = {
    company_name: setting?.company_name || "",
    logo: setting?.logo || null,
    banks: setting?.banks || [],
    qris: setting?.qris || null,
    contact_service: setting?.contact_service || "",
    slogan: setting?.slogan || "",
    tax: setting?.tax || 0,
  };

  const { data, setData, post, processing, reset } = useForm(initialData);

  function handleSubmit(e) {
    e.preventDefault();
    post("/settings", data);
  }

  return (
    <DashboardLayout className="bg-white">
      <Head title="Pengaturan" />
      <Link href="/settings" className="inline-flex items-center text-blue-500 hover:underline">
        <IoIosArrowBack size={24} className="mr-2" /> Kembali
      </Link>
      <h2 className="text-2xl font-bold">Pengaturan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUpload label="Logo Perusahaan" id="logo" data={data} setData={setData} width="max-w-[20rem]" background="bg-[#E0E4EC]" icon={RiImageAddLine} />
        <InputField label="Nama Perusahaan" id="company_name" data={data} setData={setData} placeholder="Masukkan Nama Perusahaan" />
        <InputField label="Slogan Perusahaan" id="slogan" data={data} setData={setData} placeholder="Masukkan Bio/ Slogan/ Deskripsi" />
        <BankInputList data={data} setData={setData} />
        <InputField label="Kontak Service" id="contact_service" data={data} setData={setData} placeholder="Masukkan Kontak Service" />
        <InputField label="Pajak (%)" id="tax" type="number" data={data} setData={setData} placeholder="Masukkan Jumlah Pajak" />
        <ImageUpload label="Upload Qr Pembayaran" id="qris" data={data} setData={setData} width="w-full" icon={IoQrCodeOutline} />
        <div className="w-fit ml-auto flex gap-4">
          <Button type="submit" className="text-nowrap bg-blue-600 text-white w-full py-2" disabled={processing}>
            Simpan
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
