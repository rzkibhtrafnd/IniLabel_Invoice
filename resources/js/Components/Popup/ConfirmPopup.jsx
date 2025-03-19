import Swal from "sweetalert2";
import Button from "../Buttons";
import { MdOutlineCancel } from "react-icons/md";

export default function ConfirmPopup({ title, text, onConfirm }) {
  const showDialog = () => {
    Swal.fire({
      title: title || "Apakah Anda yakin?",
      text: text || "Data ini tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: {
        actions: "flex justify-center gap-3",
        confirmButton: "bg-red-600 text-white px-4 py-2 rounded cursor-pointer",
        cancelButton: "bg-gray-300 text-black px-4 py-2 rounded cursor-pointer",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
        Swal.fire({
          title: "Terhapus!",
          text: "Data berhasil dihapus.",
          icon: "success",
          customClass: {
            confirmButton: "bg-green-600 text-white px-4 py-2 rounded cursor-pointer",
          },
          buttonsStyling: false,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Dibatalkan",
          text: "Data tetap aman :)",
          icon: "error",
          customClass: {
            confirmButton: "bg-blue-600 text-white px-4 py-2 rounded cursor-pointer",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  return (
    <Button onClick={showDialog} className="bg-[#D30368] text-white text-[1rem]">
      Hapus
      <MdOutlineCancel size={24} />
    </Button>
  );
}
